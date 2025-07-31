import type { NextConfig } from "next";

const nextConfig: NextConfig = {
   webpack(config) {
    config.module.rules.push({
      test: /pdf\.worker\.entry\.js$/,
      use: { loader: "file-loader" },
    });
    return config;
  },
};

export default nextConfig;
