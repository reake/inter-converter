import { Metadata } from 'next';
import { EnhancedToolLayout } from '@/components/tools/EnhancedToolLayout';
import { AgeCalculator } from '@/components/converters/time/AgeCalculator';
import { getFAQsByToolId } from '@/config/tool-faqs';
import { generateOptimizedKeywords } from '@/config/seo-keywords';

// Force static generation
export const dynamic = 'force-static';

const keywords = generateOptimizedKeywords('age-calculator', 'time', 'Age Calculator');

export const metadata: Metadata = {
  title: 'Age Calculator - Calculate Your Exact Age | InterConverter',
  description: 'Calculate your exact age in years, months, days, hours and minutes. Find your next birthday, zodiac sign, and fun age statistics.',
  keywords: keywords.join(', '),
  openGraph: {
    title: 'Age Calculator - Calculate Your Exact Age',
    description: 'Professional age calculator for precise age calculations. Calculate your exact age in multiple formats with birthday and zodiac information.',
    type: 'website',
    images: [
      {
        url: '/images/og-age-calculator.jpg',
        width: 1200,
        height: 630,
        alt: 'Age Calculator Tool'
      }
    ]
  },
  alternates: {
    canonical: '/time/age-calculator'
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

export default function AgeCalculatorPage() {
  const faqs = getFAQsByToolId('age-calculator', 'time');

  return (
    <EnhancedToolLayout
      title="Age Calculator"
      description="Calculate your exact age in years, months, days, hours and minutes with precise date calculations."
      keywords={keywords}
      toolId="age-calculator"
      category="time"
      emoji="🎂"
      customHowToUse={[
        "Enter your birth date",
        "Select the calculation date (default: today)",
        "View your exact age in multiple formats",
        "Check your next birthday countdown",
        "Discover your zodiac sign and fun facts"
      ]}
      customFeatures={[
        "Exact age calculation in years, months, days",
        "Age in hours, minutes, and seconds",
        "Next birthday countdown",
        "Zodiac sign determination",
        "Age milestones and statistics",
        "Leap year birthday handling"
      ]}
      faqs={faqs}
    >
      <AgeCalculator />
    </EnhancedToolLayout>
  );
}
