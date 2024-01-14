/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "https://mbalashiha.ru",
  generateRobotsTxt: true, // (optional)
  exclude: ["/management", "/management/*", "/advert", "/advert/*"],
  // ...other options
};
