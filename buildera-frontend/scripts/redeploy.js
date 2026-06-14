/**
 * Redeploy buildera.co to Hostinger Node.js hosting.
 *
 * Usage: node scripts/redeploy.js
 *
 * What it does:
 *   1. Creates a zip archive of the source (excludes node_modules, .next, uploads, .env.local)
 *   2. Uploads it to Hostinger via TUS protocol
 *   3. Triggers a server-side Node.js build (npm install + npm run build)
 *   4. Polls until build completes
 *
 * Requires: HOSTINGER_API_TOKEN env var (or hardcode below for local use)
 * Build entry: .next/standalone/server.js (Next.js standalone mode)
 */

const fs = require("fs");
const path = require("path");
const zlib = require("zlib");
const https = require("https");

const TOKEN = process.env.HOSTINGER_API_TOKEN;
if (!TOKEN) { console.error("Error: HOSTINGER_API_TOKEN env var is required."); process.exit(1); }
const BASE_URL = "https://developers.hostinger.com";
const DOMAIN = "buildera.co";
const USERNAME = "u843073993";
const SRC_DIR = path.join(__dirname, "..");
const ARCHIVE_PATH = path.join(__dirname, "..", "..", "buildera-deploy.zip");
const EXCLUDE = ["node_modules", ".next", "uploads", ".env.local", "tsconfig.tsbuildinfo"];

// ── Helpers ───────────────────────────────────────────────────────────────────

function apiRequest(method, url, body = null) {
  return new Promise((resolve, reject) => {
    const parsed = new URL(url);
    const data = body ? JSON.stringify(body) : null;
    const req = https.request({
      hostname: parsed.hostname, port: 443,
      path: parsed.pathname + parsed.search, method,
      headers: {
        "Authorization": `Bearer ${TOKEN}`,
        "Content-Type": "application/json",
        ...(data && { "Content-Length": Buffer.byteLength(data) })
      }
    }, (res) => {
      const chunks = [];
      res.on("data", c => chunks.push(c));
      res.on("end", () => {
        const raw = Buffer.concat(chunks).toString();
        try { resolve({ status: res.statusCode, data: JSON.parse(raw) }); }
        catch { resolve({ status: res.statusCode, data: raw }); }
      });
    });
    req.on("error", reject);
    if (data) req.write(data);
    req.end();
  });
}

function createZip(srcDir, outPath, exclude) {
  const getFiles = (dir, base) => {
    const results = [];
    for (const item of fs.readdirSync(dir)) {
      const full = path.join(dir, item);
      const rel = path.relative(base, full).replace(/\\/g, "/");
      if (exclude.some(ex => rel === ex || rel.startsWith(ex + "/"))) continue;
      const stat = fs.statSync(full);
      if (stat.isDirectory()) results.push(...getFiles(full, base));
      else results.push({ full, rel });
    }
    return results;
  };

  const files = getFiles(srcDir, srcDir);
  const buffers = [], entries = [];
  let offset = 0;

  for (const { full, rel } of files) {
    const data = fs.readFileSync(full);
    const compressed = zlib.deflateRawSync(data, { level: 6 });
    const nameBytes = Buffer.from(rel, "utf8");
    const now = new Date();
    const dosDate = ((now.getFullYear() - 1980) << 9) | ((now.getMonth() + 1) << 5) | now.getDate();
    const dosTime = (now.getHours() << 11) | (now.getMinutes() << 5) | Math.floor(now.getSeconds() / 2);
    let crc = 0xFFFFFFFF;
    for (let i = 0; i < data.length; i++) {
      crc ^= data[i];
      for (let j = 0; j < 8; j++) crc = (crc >>> 1) ^ (crc & 1 ? 0xEDB88320 : 0);
    }
    crc = (crc ^ 0xFFFFFFFF) >>> 0;
    const lh = Buffer.alloc(30 + nameBytes.length);
    lh.writeUInt32LE(0x04034b50, 0); lh.writeUInt16LE(20, 4); lh.writeUInt16LE(0, 6);
    lh.writeUInt16LE(8, 8); lh.writeUInt16LE(dosTime, 10); lh.writeUInt16LE(dosDate, 12);
    lh.writeUInt32LE(crc, 14); lh.writeUInt32LE(compressed.length, 18);
    lh.writeUInt32LE(data.length, 22); lh.writeUInt16LE(nameBytes.length, 26);
    lh.writeUInt16LE(0, 28); nameBytes.copy(lh, 30);
    entries.push({ nameBytes, crc, compressed, data, offset, dosTime, dosDate });
    buffers.push(lh, compressed);
    offset += lh.length + compressed.length;
  }

  const cdBuffers = [];
  for (const e of entries) {
    const cd = Buffer.alloc(46 + e.nameBytes.length);
    cd.writeUInt32LE(0x02014b50, 0); cd.writeUInt16LE(20, 4); cd.writeUInt16LE(20, 6);
    cd.writeUInt16LE(0, 8); cd.writeUInt16LE(8, 10);
    cd.writeUInt16LE(e.dosTime, 12); cd.writeUInt16LE(e.dosDate, 14);
    cd.writeUInt32LE(e.crc, 16); cd.writeUInt32LE(e.compressed.length, 20);
    cd.writeUInt32LE(e.data.length, 24); cd.writeUInt16LE(e.nameBytes.length, 28);
    cd.writeUInt16LE(0, 30); cd.writeUInt16LE(0, 32); cd.writeUInt16LE(0, 34);
    cd.writeUInt16LE(0, 36); cd.writeUInt32LE(0, 38); cd.writeUInt32LE(e.offset, 42);
    e.nameBytes.copy(cd, 46);
    cdBuffers.push(cd);
  }
  const cdSize = cdBuffers.reduce((s, b) => s + b.length, 0);
  const eocd = Buffer.alloc(22);
  eocd.writeUInt32LE(0x06054b50, 0); eocd.writeUInt16LE(0, 4); eocd.writeUInt16LE(0, 6);
  eocd.writeUInt16LE(entries.length, 8); eocd.writeUInt16LE(entries.length, 10);
  eocd.writeUInt32LE(cdSize, 12); eocd.writeUInt32LE(offset, 16); eocd.writeUInt16LE(0, 20);

  const all = Buffer.concat([...buffers, ...cdBuffers, eocd]);
  fs.writeFileSync(outPath, all);
  return { files: files.length, sizeMB: (all.length / 1024 / 1024).toFixed(2) };
}

function tusPreUpload(uploadUrl, authToken, authRestToken, fileSize, filename) {
  return new Promise((resolve, reject) => {
    const url = new URL(`${uploadUrl.replace(/\/$/, "")}/${filename}?override=true`);
    const req = https.request({
      hostname: url.hostname, port: 443,
      path: url.pathname + url.search, method: "POST",
      headers: {
        "X-Auth": authToken, "X-Auth-Rest": authRestToken,
        "upload-length": fileSize.toString(), "upload-offset": "0", "Content-Length": "0"
      }
    }, (res) => {
      let raw = "";
      res.on("data", c => raw += c);
      res.on("end", () => {
        if (res.statusCode === 201) resolve();
        else reject(new Error(`Pre-upload failed: ${res.statusCode} ${raw}`));
      });
    });
    req.on("error", reject);
    req.end();
  });
}

function tusUpload(archivePath, uploadUrl, authToken, authRestToken) {
  return new Promise((resolve, reject) => {
    const stats = fs.statSync(archivePath);
    const filename = path.basename(archivePath);
    const fullUrl = `${uploadUrl.replace(/\/$/, "")}/${filename}?override=true`;
    const parsed = new URL(fullUrl);
    const chunkSize = 10 * 1024 * 1024;
    let offset = 0;

    const uploadChunk = () => {
      const chunk = Buffer.alloc(Math.min(chunkSize, stats.size - offset));
      const fd = fs.openSync(archivePath, "r");
      fs.readSync(fd, chunk, 0, chunk.length, offset);
      fs.closeSync(fd);

      const req = https.request({
        hostname: parsed.hostname, port: 443,
        path: parsed.pathname + parsed.search, method: "PATCH",
        headers: {
          "X-Auth": authToken, "X-Auth-Rest": authRestToken,
          "Content-Type": "application/offset+octet-stream",
          "upload-offset": offset.toString(),
          "Content-Length": chunk.length
        }
      }, (res) => {
        let raw = "";
        res.on("data", c => raw += c);
        res.on("end", () => {
          if (res.statusCode === 204) {
            offset += chunk.length;
            const pct = Math.round(offset / stats.size * 100);
            process.stdout.write(`\r  Uploading... ${pct}% (${offset}/${stats.size} bytes)`);
            if (offset >= stats.size) { console.log("\n  Upload complete!"); resolve(); }
            else uploadChunk();
          } else {
            reject(new Error(`Chunk upload failed: ${res.statusCode} ${raw}`));
          }
        });
      });
      req.on("error", reject);
      req.write(chunk);
      req.end();
    };

    uploadChunk();
  });
}

// ── Main ──────────────────────────────────────────────────────────────────────

async function redeploy() {
  console.log("=== Buildera.co Redeployment ===\n");

  // 1. Create archive
  console.log("1. Creating source archive...");
  const { files, sizeMB } = createZip(SRC_DIR, ARCHIVE_PATH, EXCLUDE);
  console.log(`   ${files} files, ${sizeMB} MB → ${path.basename(ARCHIVE_PATH)}`);

  // 2. Get upload credentials
  console.log("\n2. Fetching upload credentials...");
  const credRes = await apiRequest("POST", `${BASE_URL}/api/hosting/v1/files/upload-urls`,
    { username: USERNAME, domain: DOMAIN });
  if (credRes.status !== 200) { console.error("Error:", credRes.data); process.exit(1); }
  const { url: uploadUrl, auth_key: authToken, rest_auth_key: authRestToken } = credRes.data;

  // 3. Pre-upload + TUS upload
  const filename = path.basename(ARCHIVE_PATH);
  const stats = fs.statSync(ARCHIVE_PATH);
  console.log("\n3. Registering upload with server...");
  await tusPreUpload(uploadUrl, authToken, authRestToken, stats.size, filename);
  console.log("   Registered.");
  console.log("\n4. Uploading archive...");
  await tusUpload(ARCHIVE_PATH, uploadUrl, authToken, authRestToken);

  // 4. Auto-detect build settings
  console.log("\n5. Auto-detecting build settings...");
  const settingsRes = await apiRequest("GET",
    `${BASE_URL}/api/hosting/v1/accounts/${USERNAME}/websites/${DOMAIN}/nodejs/builds/settings/from-archive?archive_path=${encodeURIComponent(filename)}`);
  const settings = settingsRes.status === 200 ? settingsRes.data : {};
  console.log(`   app_type: ${settings.app_type || "unknown"}, build: ${settings.build_script || "?"}`);

  // 5. Trigger build
  console.log("\n6. Triggering build on server...");
  const buildRes = await apiRequest("POST",
    `${BASE_URL}/api/hosting/v1/accounts/${USERNAME}/websites/${DOMAIN}/nodejs/builds`,
    { ...settings, node_version: 20, entry_file: ".next/standalone/server.js",
      build_script: "build", source_type: "archive",
      source_options: { archive_path: filename } });

  if (buildRes.status !== 200 && buildRes.status !== 201) {
    console.error("Build trigger failed:", buildRes.data);
    process.exit(1);
  }
  const uuid = buildRes.data?.uuid;
  console.log(`   Build UUID: ${uuid} (state: ${buildRes.data?.state})`);

  // 6. Poll until done
  console.log("\n7. Waiting for build to complete...");
  for (let i = 1; i <= 40; i++) {
    await new Promise(r => setTimeout(r, 10000));
    const statusRes = await apiRequest("GET",
      `${BASE_URL}/api/hosting/v1/accounts/${USERNAME}/websites/${DOMAIN}/nodejs/builds`);
    const build = (statusRes.data?.data || []).find(b => b.uuid === uuid);
    const state = build?.state;
    process.stdout.write(`\r   [${i}] state: ${state || "pending"}...`);
    if (state === "completed") { console.log("\n\n✓ Deployment complete! https://buildera.co"); break; }
    if (state === "failed") {
      console.log("\n\n✗ Build failed. Check Hostinger panel for logs.");
      process.exit(1);
    }
  }

  // Cleanup
  fs.unlinkSync(ARCHIVE_PATH);
  console.log("  (temp archive cleaned up)");
}

redeploy().catch(err => { console.error("Error:", err.message); process.exit(1); });
