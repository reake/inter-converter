import { Metadata } from 'next';
import { EnhancedToolLayout } from '@/components/tools/EnhancedToolLayout';
import { DateCalculator } from '@/components/converters/time/DateCalculator';
import { getFAQsByToolId } from '@/config/tool-faqs';
import { generateOptimizedKeywords } from '@/config/seo-keywords';

// Force static generation
export const dynamic = 'force-static';

const keywords = generateOptimizedKeywords('date-calculator', 'time', 'Date Calculator');

export const metadata: Metadata = {
  title: 'Date Calculator - Calculate Date Differences & Add Time | InterConverter',
  description: 'Calculate differences between dates, add or subtract time from dates. Free date calculator with years, months, days breakdown.',
  keywords: keywords.join(', '),
  openGraph: {
    title: 'Date Calculator - Calculate Date Differences & Add Time',
    description: 'Professional date calculator for time calculations. Add or subtract time from dates and calculate differences with precise results.',
    type: 'website',
    images: [
      {
        url: '/images/og-date-calculator.jpg',
        width: 1200,
        height: 630,
        alt: 'Date Calculator Tool'
      }
    ]
  },
  alternates: {
    canonical: '/time/date-calculator'
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

export default function DateCalculatorPage() {
  const faqs = getFAQsByToolId('date-calculator', 'time');

  return (
    <EnhancedToolLayout
      title="Date Calculator"
      description="Calculate differences between dates, add or subtract time from dates with precise calculations."
      keywords={keywords}
      toolId="date-calculator"
      category="time"
      emoji="📅"
      customHowToUse={[
        "Choose calculation mode (add/subtract or difference)",
        "Select or enter the starting date",
        "Add/subtract years, months, days, or hours",
        "Or select end date for difference calculation",
        "View results in multiple formats"
      ]}
      customFeatures={[
        "Add or subtract time from dates",
        "Calculate differences between dates",
        "Years, months, days breakdown",
        "Business days calculation",
        "Leap year handling",
        "Multiple output formats"
      ]}
      faqs={faqs}
    >
      <DateCalculator />
    </EnhancedToolLayout>
  );
}
