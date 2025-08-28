import { Metadata } from 'next';
import ToolLayout from '@/components/layout/ToolLayout';
import { TimezoneConverter } from '@/components/converters/time/TimezoneConverter';
import { getSEOConfigByToolId } from '@/config/seo-tools';

const seoConfig = getSEOConfigByToolId('timezone-converter');

export const metadata: Metadata = {
  title: seoConfig?.title || 'Timezone Converter - Convert Time Between Zones | InterConverter',
  description: seoConfig?.description || 'Convert time between different timezones worldwide. Free timezone converter with support for all major time zones and DST.',
  keywords: seoConfig?.keywords?.join(', ') || 'timezone converter, time zone converter, world time, time conversion, utc converter',
  openGraph: {
    title: seoConfig?.title || 'Timezone Converter | InterConverter',
    description: seoConfig?.description || 'Convert time between different timezones',
    type: 'website',
  },
  alternates: {
    canonical: seoConfig?.canonicalPath || '/time/timezone-converter'
  }
};

export default function TimezoneConverterPage() {
  return (
    <ToolLayout
      title={metadata.title as string}
      description={metadata.description as string}
      keywords={seoConfig?.keywords || []}
      canonicalUrl={`https://interconverter.com${seoConfig?.canonicalPath}`}
      structuredData={seoConfig?.structuredData}
    >
      <TimezoneConverter />
    </ToolLayout>
  );
}
