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
    sitemap: 'https://overdoseparfums.com.ua/sitemap.xml',
    host: 'https://overdoseparfums.com.ua',
  };
}
