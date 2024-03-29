/** @type {import('next').NextConfig} */
const fs = require("fs");
const util = require("util");
const __minify = require("html-minifier").minify;
const minify = (str) => {
  return __minify(str)
    .replace(/\s+/gim, " ")
    .replace(/[\r\n]+/gim, "");
};
const tryReadFile = function (filepath) {
  try {
    return fs.readFileSync(filepath).toString();
  } catch (e) {
    console.error(e.message || e.stack || e);
    return "";
  }
};
const isDevelopment = process.env.NODE_ENV === "development";
function getUrlOriginRegexp() {
  return /^(\w+)\:\/\/([^\/]+)/im;
}
function getProductionHost() {
  const publicOrigin = process.env.NEXT_PUBLIC_PRODUCTION_SITE_ORIGIN;
  if (!publicOrigin) {
    throw new Error("No process.env.NEXT_PUBLIC_PRODUCTION_SITE_ORIGIN.");
  }
  const m = publicOrigin.match(getUrlOriginRegexp());
  return m && m[2];
}
function getProductionProtocol() {
  const publicOrigin = process.env.NEXT_PUBLIC_PRODUCTION_SITE_ORIGIN;
  if (!publicOrigin) {
    throw new Error("No process.env.NEXT_PUBLIC_PRODUCTION_SITE_ORIGIN.");
  }
  const m = publicOrigin.match(getUrlOriginRegexp());
  return m && m[1];
}
function getImagesRemotePatters() {
  const remotePatterns = [];
  const isDevelopment = process.env.NODE_ENV === "development";
  if (isDevelopment) {
    remotePatterns.push({
      protocol: "http",
      hostname: "localhost",
    });
  }
  remotePatterns.push({
    protocol: getProductionProtocol(),
    hostname: getProductionHost(),
  });
  return remotePatterns;
}
module.exports = {
  images: {
    remotePatterns: getImagesRemotePatters(),
  },
  webpack(config, { buildId, dev, isServer, defaultLoaders, webpack }) {
    const isDevelopment = process.env.NODE_ENV === "development";
    // console.log();
    // console.log("process.env.NODE_ENV:", process.env.NODE_ENV);
    // console.log("process.env:", util.inspect(process.env));
    // console.log();
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
        "process.env.metrika_counters": isDevelopment
          ? undefined
          : JSON.stringify(
              minify(tryReadFile("webpack-define-plugin/metrika_counters.html"))
            ),
        "process.env.Yandex_Map_dangerouslySetInnerHTML": JSON.stringify(
          minify(tryReadFile("webpack-define-plugin/yandex-map-iframe.html"))
        ),
        "process.env.Yandex_Map_My_JS_Code": JSON.stringify(
          minify(tryReadFile("webpack-define-plugin/yandex-map-iframe.js"))
        ),
      })
    );
    return config;
  },
};
