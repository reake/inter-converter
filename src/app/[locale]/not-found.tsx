import { Metadata } from 'next';
import NotFound from '@/components/blocks/not-found';

// Cloudflare Pages Edge Runtime 配置
export const runtime = 'edge';

export const metadata: Metadata = {
  title: '404 - Page Not Found | InterConverter',
  description: 'The page you are looking for could not be found. Explore our free online conversion tools and calculators instead.',
  robots: 'noindex, nofollow',
};

export default function NotFoundPage() {
  return <NotFound />;
}
