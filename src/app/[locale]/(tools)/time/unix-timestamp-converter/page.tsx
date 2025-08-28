import { Metadata } from 'next';
import ToolLayout from '@/components/layout/ToolLayout';
import { TimestampConverter } from '@/components/converters/time/TimestampConverter';
import { getSEOConfigByToolId } from '@/config/seo-tools';

const seoConfig = getSEOConfigByToolId('unix-timestamp-converter');

export const metadata: Metadata = {
  title: seoConfig?.title || 'Unix Timestamp Converter - Convert Unix Time Online | InterConverter',
  description: seoConfig?.description || 'Convert Unix timestamps to human-readable dates and vice versa. Free online Unix time converter with timezone support.',
  keywords: seoConfig?.keywords?.join(', ') || 'unix timestamp converter, epoch time converter, unix time, timestamp to date',
  openGraph: {
    title: seoConfig?.title || 'Unix Timestamp Converter | InterConverter',
    description: seoConfig?.description || 'Convert Unix timestamps to readable dates',
    type: 'website',
  },
  alternates: {
    canonical: seoConfig?.canonicalPath || '/time/unix-timestamp-converter'
  }
};

export default function UnixTimestampConverterPage() {
  return (
    <ToolLayout
      title={metadata.title as string}
      description={metadata.description as string}
      keywords={seoConfig?.keywords || []}
      canonicalUrl={`https://interconverter.com${seoConfig?.canonicalPath}`}
      structuredData={seoConfig?.structuredData}
    >
      <TimestampConverter />
    </ToolLayout>
  );
}
