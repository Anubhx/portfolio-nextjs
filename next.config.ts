import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  pageExtensions: ["ts", "tsx", "mdx"],
  images: {
    formats: ["image/avif", "image/webp"],
  },
  // Enable strict mode for better React practices
  reactStrictMode: true,
};

export default nextConfig;
