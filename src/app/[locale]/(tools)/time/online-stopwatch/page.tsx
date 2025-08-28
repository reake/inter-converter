import { Metadata } from 'next';
import ToolLayout from '@/components/layout/ToolLayout';
import OnlineStopwatch from '@/components/converters/time/OnlineStopwatch';
import { getSEOConfigByToolId } from '@/config/seo-tools';

const seoConfig = getSEOConfigByToolId('online-stopwatch');

export const metadata: Metadata = {
  title: seoConfig?.title || 'Online Stopwatch - Precision Timer | InterConverter',
  description: seoConfig?.description || 'Accurate online stopwatch with lap timing. Perfect for sports, workouts, and precise time measurement with centisecond accuracy.',
  keywords: seoConfig?.keywords?.join(', ') || 'stopwatch, online stopwatch, lap timer, precision timer, sports timer',
  openGraph: {
    title: seoConfig?.title || 'Online Stopwatch | InterConverter',
    description: seoConfig?.description || 'Precision online stopwatch with lap timing',
    type: 'website',
  },
  alternates: {
    canonical: seoConfig?.canonicalPath || '/time/online-stopwatch'
  }
};

export default function StopwatchPage() {
  return (
    <ToolLayout
      title={metadata.title as string}
      description={metadata.description as string}
      keywords={seoConfig?.keywords || []}
      canonicalUrl={`https://interconverter.com${seoConfig?.canonicalPath}`}
      structuredData={seoConfig?.structuredData}
    >
      <OnlineStopwatch />
    </ToolLayout>
  );
}
