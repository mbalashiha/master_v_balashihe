/** @type {import('next').NextConfig} */
const fs = require("fs");
const tryReadFile = function (filepath) {
  try {
    return fs
      .readFileSync("webpack-define-plugin/yandex_metrika.html")
      .toString();
  } catch (e) {
    console.error(e.message || e.stack || e);
    return "";
  }
};
module.exports = {
  webpack(config, { buildId, dev, isServer, defaultLoaders, webpack }) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ["@svgr/webpack"],
    });
    config.plugins.push(
      new webpack.DefinePlugin({
        "process.env.Yandex_Metrika_dangerouslySetInnerHTML": JSON.stringify(
          tryReadFile("webpack-define-plugin/yandex_metrika.html")
        ),
        "process.env.Yandex_Map_dangerouslySetInnerHTML": JSON.stringify(
          tryReadFile("webpack-define-plugin/yandex-map-iframe.html")
        ),
      })
    );
    return config;
  },
};
