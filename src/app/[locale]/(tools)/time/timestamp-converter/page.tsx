import { Metadata } from 'next';
import { EnhancedToolLayout } from '@/components/tools/EnhancedToolLayout';
import { TimestampConverter } from '@/components/converters/time/TimestampConverter';
import { getFAQsByToolId } from '@/config/tool-faqs';
import { generateOptimizedKeywords } from '@/config/seo-keywords';

// Force static generation
export const dynamic = 'force-static';

const keywords = generateOptimizedKeywords('timestamp-converter', 'time', 'Timestamp Converter');

export const metadata: Metadata = {
  title: 'Timestamp Converter - Unix Time & Date Converter | InterConverter',
  description: 'Convert Unix timestamps to human readable dates. Free timestamp converter for epoch time, milliseconds, and date formats. Instant conversion.',
  keywords: keywords.join(', '),
  openGraph: {
    title: 'Timestamp Converter - Unix Time & Date Converter',
    description: 'Professional timestamp converter for developers. Convert Unix timestamps to readable dates and vice versa with timezone support.',
    type: 'website',
    images: [
      {
        url: '/images/og-timestamp-converter.jpg',
        width: 1200,
        height: 630,
        alt: 'Timestamp Converter Tool'
      }
    ]
  },
  alternates: {
    canonical: '/time/timestamp-converter'
  },
  authors: [{ name: 'InterConverter Team' }],
  creator: 'InterConverter',
  publisher: 'InterConverter',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  }
};

export default function TimestampConverterPage() {
  const faqs = getFAQsByToolId('timestamp-converter', 'time');

  return (
    <EnhancedToolLayout
      title="Timestamp Converter"
      description="Convert Unix timestamps to human-readable dates and vice versa with timezone support and millisecond precision."
      keywords={keywords}
      toolId="timestamp-converter"
      category="time"
      emoji="🕐"
      customHowToUse={[
        "Enter a Unix timestamp in the timestamp field",
        "Or enter a date in the date field",
        "Select your preferred timezone",
        "The conversion happens automatically",
        "Copy results for your application"
      ]}
      customFeatures={[
        "Convert Unix timestamps to readable dates",
        "Convert dates to Unix timestamps",
        "Support for different timezones",
        "Millisecond precision support",
        "Current timestamp display",
        "Batch conversion capabilities"
      ]}
      faqs={faqs}
    >
      <TimestampConverter />
    </EnhancedToolLayout>
  );
}