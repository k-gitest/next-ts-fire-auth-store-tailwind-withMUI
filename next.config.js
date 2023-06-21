/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  webpack: (config) => {
    config.watchOptions = {
      aggregateTimeout: 200,
      poll: 1000,
      ignored: /node_modules/,
    }
    return config
  },

}

module.exports = nextConfig
