import { MetadataRoute } from 'next'
import { games } from '@/lib/games-data';
import { members } from '@/lib/members';
 
const URL = 'https://game-to-aim-cyber.web.app';

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    '',
    '/games',
    '/members',
    '/showcase',
  ];

  const staticPages = staticRoutes.map((route) => ({
    url: `${URL}${route}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: route === '' ? 1 : 0.8,
  }));
  
  // You can add dynamic routes for games, members etc. if they have individual pages in the future.

  return [
    ...staticPages
  ];
}
