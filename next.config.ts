import type { NextConfig } from "next";

module.exports = {
  eslint: {
    ignoreDuringBuilds: true,
  },
}
const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
};


export default nextConfig;
