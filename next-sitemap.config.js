/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl:
    process.env.NEXT_PUBLIC_PRODUCTION_SITE_ORIGIN || "https://mbalashiha.ru",
  generateRobotsTxt: true, // (optional)
  exclude: ["/management", "/management/*"],
  // ...other options
};
