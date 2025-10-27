import type { NextConfig } from "next"

const repoBasePath = process.env.NEXT_PUBLIC_BASE_PATH || ""
const assetPrefix = repoBasePath ? `${repoBasePath}/` : undefined

const nextConfig: NextConfig = {
  output: "export",
  basePath: repoBasePath,
  assetPrefix,
  trailingSlash: true,
}

export default nextConfig
