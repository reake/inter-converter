import { Metadata } from 'next';
import { EnhancedToolLayout } from '@/components/tools/EnhancedToolLayout';
import { DateDifferenceCalculator } from '@/components/converters/time/DateDifferenceCalculator';
import { getFAQsByToolId } from '@/config/tool-faqs';
import { generateOptimizedKeywords } from '@/config/seo-keywords';

// Force static generation
export const dynamic = 'force-static';

const keywords = generateOptimizedKeywords('date-difference-calculator', 'time', 'Date Difference Calculator');

export const metadata: Metadata = {
  title: 'Date Difference Calculator - Calculate Days Between Dates | InterConverter',
  description: 'Calculate the difference between two dates in days, months, years, hours, and minutes. Free online date calculator with business days support.',
  keywords: keywords.join(', '),
  openGraph: {
    title: 'Date Difference Calculator - Calculate Days Between Dates',
    description: 'Professional date difference calculator for precise time calculations. Calculate duration between dates in multiple formats with business days support.',
    type: 'website',
    images: [
      {
        url: '/images/og-date-difference-calculator.jpg',
        width: 1200,
        height: 630,
        alt: 'Date Difference Calculator Tool'
      }
    ]
  },
  alternates: {
    canonical: '/time/date-difference-calculator'
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

export default function DateDifferenceCalculatorPage() {
  const faqs = getFAQsByToolId('date-difference-calculator', 'time');

  return (
    <EnhancedToolLayout
      title="Date Difference Calculator"
      description="Calculate the difference between two dates in days, months, years, hours, and minutes with precise date arithmetic."
      keywords={keywords}
      toolId="date-difference-calculator"
      category="time"
      emoji="📅"
      customHowToUse={[
        "Select or enter the start date",
        "Select or enter the end date",
        "Choose calculation options (include/exclude end date)",
        "View results in multiple formats",
        "Copy the results you need"
      ]}
      customFeatures={[
        "Calculate difference in years, months, and days",
        "Show total days, hours, and minutes",
        "Business days calculation",
        "Age calculation mode",
        "Leap year and month length accuracy",
        "Copy results to clipboard"
      ]}
      faqs={faqs}
    >
      <DateDifferenceCalculator />
    </EnhancedToolLayout>
  );
}