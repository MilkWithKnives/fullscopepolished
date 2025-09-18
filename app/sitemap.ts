// app/sitemap.ts
import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const site = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://example.com';

  // Add/adjust routes as your site grows. (Dynamic blog, etc., can be added later.)
  const routes = [
    '',
    '/portfolio',
    '/portfolio/photo',
    '/portfolio/video',
    '/portfolio/drone',
    '/services',
    '/services/photography',
    '/services/videography',
    '/pricing',
    '/about',
    '/journal',
    '/contact',
    '/book-us',
  ];

  const now = new Date();

  return routes.map((path) => ({
    url: `${site}${path}`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: path === '' ? 1 : 0.7,
  }));
}