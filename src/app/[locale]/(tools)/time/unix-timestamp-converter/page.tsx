import { Metadata } from 'next';
import { EnhancedToolLayout } from '@/components/tools/EnhancedToolLayout';
import { TimestampConverter } from '@/components/converters/time/TimestampConverter';
import { getFAQsByToolId } from '@/config/tool-faqs';
import { generateOptimizedKeywords } from '@/config/seo-keywords';

// Force static generation
export const dynamic = 'force-static';

const keywords = generateOptimizedKeywords('unix-timestamp-converter', 'time', 'Unix Timestamp Converter');

export const metadata: Metadata = {
  title: 'Unix Timestamp Converter - Convert Unix Time Online | InterConverter',
  description: 'Convert Unix timestamps to human-readable dates and vice versa. Free online Unix time converter with timezone support.',
  keywords: keywords.join(', '),
  openGraph: {
    title: 'Unix Timestamp Converter - Convert Unix Time Online',
    description: 'Professional Unix timestamp converter for developers. Convert epoch time to readable dates and vice versa with timezone support.',
    type: 'website',
    images: [
      {
        url: '/images/og-unix-timestamp-converter.jpg',
        width: 1200,
        height: 630,
        alt: 'Unix Timestamp Converter Tool'
      }
    ]
  },
  alternates: {
    canonical: '/time/unix-timestamp-converter'
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

export default function UnixTimestampConverterPage() {
  const faqs = getFAQsByToolId('unix-timestamp-converter', 'time');

  return (
    <EnhancedToolLayout
      title="Unix Timestamp Converter"
      description="Convert Unix timestamps to human-readable dates and vice versa with timezone support."
      keywords={keywords}
      toolId="unix-timestamp-converter"
      category="time"
      emoji="⏱️"
      customHowToUse={[
        "Enter a Unix timestamp (epoch time)",
        "Or select a date and time to convert",
        "Choose your preferred timezone",
        "View the converted result instantly",
        "Copy the result for your application"
      ]}
      customFeatures={[
        "Bidirectional timestamp conversion",
        "Timezone support for accurate conversion",
        "Current timestamp display",
        "Millisecond precision support",
        "Batch conversion capabilities",
        "Developer-friendly output formats"
      ]}
      faqs={faqs}
    >
      <TimestampConverter />
    </EnhancedToolLayout>
  );
}
