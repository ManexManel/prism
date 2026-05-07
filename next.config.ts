import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  experimental: {
    // suppress the middleware→proxy rename warning until we upgrade
  },
}

export default nextConfig
