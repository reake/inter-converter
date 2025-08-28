import { Metadata } from 'next';
import ToolLayout from '@/components/layout/ToolLayout';
import { Stopwatch } from '@/components/converters/time/Stopwatch';
import { getSEOConfigByToolId } from '@/config/seo-tools';

const seoConfig = getSEOConfigByToolId('stopwatch');

export const metadata: Metadata = {
  title: seoConfig?.title || 'Stopwatch - Precision Online Timer | InterConverter',
  description: seoConfig?.description || 'Accurate online stopwatch with lap timing. Perfect for sports, workouts, and precise time measurement with centisecond accuracy.',
  keywords: seoConfig?.keywords?.join(', ') || 'stopwatch, online stopwatch, lap timer, precision timer, sports timer',
  openGraph: {
    title: seoConfig?.title || 'Stopwatch | InterConverter',
    description: seoConfig?.description || 'Precision online stopwatch with lap timing',
    type: 'website',
  },
  alternates: {
    canonical: seoConfig?.canonicalPath || '/time/stopwatch'
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
      <Stopwatch />
    </ToolLayout>
  );
}
