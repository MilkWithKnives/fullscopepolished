// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,

  eslint: {
    ignoreDuringBuilds: true, // skip lint during build
  },

  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "my.matterport.com" },
      { protocol: "https", hostname: "cdn.jsdelivr.net" },
      // uncomment if using Cloudinary:
      { protocol: "https", hostname: "res.cloudinary.com" },
    ],
  },

  // moved out of `experimental`
  outputFileTracingRoot: process.cwd(),
};

export default nextConfig;
