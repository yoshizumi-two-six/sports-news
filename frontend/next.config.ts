import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 以下の webpack の設定を追加してください
  webpack: (config) => {
    config.watchOptions = {
      poll: 100000,   // 1秒ごとにチェックする
      aggregateTimeout: 300,
    };
    return config;
  },
};

export default nextConfig;