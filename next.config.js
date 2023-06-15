/** @type {import('next').NextConfig} */

module.exports = {
  experimental: {
    concurrentFeatures: true,
    serverComponents: true,
    appDir: true,
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ["@svgr/webpack"],
    });
    return config;
  },
};
