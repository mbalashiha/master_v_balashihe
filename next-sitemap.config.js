/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || "https://mbalashiha.ru",
  generateRobotsTxt: true, // (optional)
  exclude: ["/management", "/management/*"],
  // ...other options
};
