if (!process.env.NEXT_PUBLIC_API_URL) {
  throw new Error("Missing required environment variable: NEXT_PUBLIC_API_URL");
}

export const env = {
  apiUrl: process.env.NEXT_PUBLIC_API_URL as string,
  apiKey: process.env.NEXT_PUBLIC_API_KEY ?? "",
  revalidateSecret: process.env.NEXTJS_REVALIDATE_SECRET ?? "",
};
