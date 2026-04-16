import type { NextConfig } from "next";

const repoBasePath = "/ai-tool-finder-parents";
const isProductionBuild = process.env.NODE_ENV === "production";

const nextConfig: NextConfig = {
  output: 'export',
  images: { unoptimized: true },
  ...(isProductionBuild && {
    basePath: repoBasePath,
    assetPrefix: repoBasePath,
  }),
};

export default nextConfig;
