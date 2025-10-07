import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/api/',
        '/payment/success',
        '/_next/',
        '/private/',
        '/gls/',
      ],
    },
    sitemap: 'https://www.digitalqt.com/sitemap.xml',
  }
}