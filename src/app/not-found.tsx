import { Metadata } from 'next';
import NotFound from '@/components/blocks/not-found';
import { SearchProvider } from '@/lib/search-context';

// Force static generation
export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: '404 - Page Not Found | InterConverter',
  description: 'The page you are looking for could not be found. Explore our free online conversion tools and calculators instead.',
  robots: 'noindex, nofollow',
};

export default function GlobalNotFoundPage() {
  return (
    <SearchProvider>
      <NotFound />
    </SearchProvider>
  );
}
