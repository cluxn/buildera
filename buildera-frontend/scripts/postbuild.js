const fs = require("fs");

fs.cpSync("public", ".next/standalone/public", { recursive: true });
fs.cpSync(".next/static", ".next/standalone/.next/static", { recursive: true });
console.log("Postbuild: copied public/ and .next/static/ to .next/standalone/");
