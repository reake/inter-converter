import { Metadata } from 'next';
import { EnhancedToolLayout } from '@/components/tools/EnhancedToolLayout';
import TimezoneConverter from '@/components/converters/time/TimezoneConverter';
import { getFAQsByToolId } from '@/config/tool-faqs';
import { generateOptimizedKeywords } from '@/config/seo-keywords';

// Force static generation
export const dynamic = 'force-static';

const keywords = generateOptimizedKeywords('timezone-converter', 'time', 'Timezone Converter');

export const metadata: Metadata = {
  title: 'Timezone Converter - Convert Time Between Zones | InterConverter',
  description: 'Convert time between different timezones worldwide. Free timezone converter with support for all major time zones and DST.',
  keywords: keywords.join(', '),
  openGraph: {
    title: 'Timezone Converter - Convert Time Between Zones',
    description: 'Professional timezone converter for global time conversion. Convert time between any timezones with DST support and world clock features.',
    type: 'website',
    images: [
      {
        url: '/images/og-timezone-converter.jpg',
        width: 1200,
        height: 630,
        alt: 'Timezone Converter Tool'
      }
    ]
  },
  alternates: {
    canonical: '/time/timezone-converter'
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

export default function TimezoneConverterPage() {
  const faqs = getFAQsByToolId('timezone-converter', 'time');

  return (
    <EnhancedToolLayout
      title="Timezone Converter"
      description="Convert time between different timezones worldwide with support for all major time zones and DST."
      keywords={keywords}
      toolId="timezone-converter"
      category="time"
      emoji="🌍"
      customHowToUse={[
        "Select the source timezone",
        "Enter the time to convert",
        "Choose the target timezone",
        "View the converted time instantly",
        "Add multiple timezones for comparison"
      ]}
      customFeatures={[
        "Support for all world timezones",
        "Automatic DST handling",
        "Multiple timezone comparison",
        "UTC and local time display",
        "Business hours calculator",
        "Meeting time planner"
      ]}
      faqs={faqs}
    >
      <TimezoneConverter />
    </EnhancedToolLayout>
  );
}
