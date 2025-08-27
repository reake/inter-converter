import { routing } from '@/i18n/routing';
import { notFound } from 'next/navigation';

// Generate static params for catch-all routes

// Force static generation
export const dynamic = 'force-static';
export function generateStaticParams() {
  // Only generate params for static export builds
  if (process.env.BUILD_TARGET === 'static') {
    return routing.locales.map((locale) => ({
      locale,
      not_found: ['404'] // Generate a basic 404 path
    }));
  }
  return [];
}

export default function NotFoundCatchAll() {
  // Trigger Next.js 404 page (uses src/app/[locale]/not-found.tsx or src/app/not-found.tsx)
  notFound();
  return null;
}