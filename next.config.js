/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  webpack: (config) => {
    config.watchOptions = { //監視オプション
      aggregateTimeout: 200, //ファイル変更からの遅延ミリ秒。この間に変更されても1回のリビルドで済む
      poll: 1000, //変更確認の間隔ミリ秒。1000で1秒ごと。
      ignored: /node_modules/, //監視から除外する正規表現
    }
    return config
  },

}

module.exports = nextConfig
