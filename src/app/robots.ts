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
        '/private/'
      ],
    },
    sitemap: 'https://digitalqt.com/sitemap.xml',
  }
}