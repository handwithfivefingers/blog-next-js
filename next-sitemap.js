const siteUrl = 'https://nextjs.truyenmai.com';
module.exports = {
  siteUrl,
  generateRobotsTxt: false,
  robotsTxtOptions: {
    policies: [
      { userAgent: "*", allow: '/' },
    ],
    additionalSitemaps: [
      `${siteUrl}/sitemap.xml`,
      `${siteUrl}/server-sitemap.xml`
    ]
  },
}