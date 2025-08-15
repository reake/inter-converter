import NotFound from "@/components/blocks/not-found";
import { routing } from '@/i18n/routing';

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
  return <NotFound />;
}