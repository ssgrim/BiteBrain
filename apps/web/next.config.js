/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  transpilePackages: ["@bitebrain/ui", "@bitebrain/core"],
}

module.exports = nextConfig
