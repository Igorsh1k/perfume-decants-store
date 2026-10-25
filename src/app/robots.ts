import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin', '/account', '/api/'],
      },
    ],
    sitemap: 'https://www.overdoseparfums.com.ua/sitemap.xml',
    host: 'https://www.overdoseparfums.com.ua',
  };
}
