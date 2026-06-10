export const env = {
  apiUrl: process.env.NEXT_PUBLIC_API_URL ?? "",
  apiKey: process.env.NEXT_PUBLIC_API_KEY ?? "",
  revalidateSecret: process.env.NEXTJS_REVALIDATE_SECRET ?? "",
};
