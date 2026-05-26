import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "api.buildera.co",
      },
    ],
  },
  experimental: {
    optimizePackageImports: ["@tabler/icons-react", "motion"],
  },
};

export default nextConfig;
