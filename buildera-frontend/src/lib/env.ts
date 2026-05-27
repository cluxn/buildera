function requireEnv(key: string): string {
  const val = process.env[key];
  if (!val) {
    console.error(`[env] Missing required env var: ${key}`);
    // Return empty string so SSR degrades rather than crashes
    return "";
  }
  return val;
}

export const env = {
  apiUrl: requireEnv("NEXT_PUBLIC_API_URL"),
  apiKey: process.env.NEXT_PUBLIC_API_KEY ?? "",
  revalidateSecret: process.env.NEXTJS_REVALIDATE_SECRET ?? "",
};
