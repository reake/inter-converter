import { Metadata } from 'next';
import { ToolLayout } from '@/components/tools/ToolLayout';
import { WorldClock } from '@/components/converters/time/WorldClock';
import { getSEOConfigByToolId } from '@/config/seo-tools';

const seoConfig = getSEOConfigByToolId('world-clock');

export const metadata: Metadata = {
  title: seoConfig?.title || 'World Clock - Time Zones Around the World | InterConverter',
  description: seoConfig?.description || 'Track time across multiple time zones worldwide. Live world clock with popular cities and UTC reference time.',
  keywords: seoConfig?.keywords?.join(', ') || 'world clock, time zones, global time, utc time, international time',
  openGraph: {
    title: seoConfig?.title || 'World Clock | InterConverter',
    description: seoConfig?.description || 'Track time across multiple time zones worldwide',
    type: 'website',
  },
  alternates: {
    canonical: seoConfig?.canonicalPath || '/time/world-clock'
  }
};

export default function WorldClockPage() {
  return (
    <ToolLayout
      title={metadata.title as string}
      description={metadata.description as string}
      keywords={seoConfig?.keywords || []}
      toolId="world-clock"
      category="time"
    >
      <WorldClock />
    </ToolLayout>
  );
}
