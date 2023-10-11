/** @type {import('next').NextConfig} */
const fs = require("fs");
const tryReadFile = function (filepath) {
  try {
    return fs.readFileSync(filepath).toString();
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
        "process.env.DEV_MACHINE_API_HOST": __dirname.startsWith("/var/www")
          ? JSON.stringify("")
          : JSON.stringify("http://localhost:4402"),
        "process.env.Yandex_Metrika_dangerouslySetInnerHTML": JSON.stringify(
          tryReadFile("webpack-define-plugin/yandex_metrika.html")
        ),
        "process.env.Yandex_Map_dangerouslySetInnerHTML": JSON.stringify(
          tryReadFile("webpack-define-plugin/yandex-map-iframe.html")
        ),
        "process.env.Yandex_Map_My_JS_Code": JSON.stringify(
          tryReadFile("webpack-define-plugin/yandex-map-iframe.js")
        ),
      })
    );
    return config;
  },
};
