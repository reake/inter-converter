import { Metadata } from 'next';
import { EnhancedToolLayout } from '@/components/tools/EnhancedToolLayout';
import { WorkingDaysCalculator } from '@/components/converters/time/WorkingDaysCalculator';
import { getFAQsByToolId } from '@/config/tool-faqs';
import { generateOptimizedKeywords } from '@/config/seo-keywords';

// Force static generation
export const dynamic = 'force-static';

const keywords = generateOptimizedKeywords('working-days-calculator', 'time', 'Working Days Calculator');

export const metadata: Metadata = {
  title: 'Working Days Calculator - Business Days Between Dates | InterConverter',
  description: 'Calculate working days between dates excluding weekends and holidays. Free business days calculator with custom holiday support.',
  keywords: keywords.join(', '),
  openGraph: {
    title: 'Working Days Calculator - Business Days Between Dates',
    description: 'Professional working days calculator for business planning. Calculate business days between dates excluding weekends and holidays.',
    type: 'website',
    images: [
      {
        url: '/images/og-working-days-calculator.jpg',
        width: 1200,
        height: 630,
        alt: 'Working Days Calculator Tool'
      }
    ]
  },
  alternates: {
    canonical: '/time/working-days-calculator'
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

export default function WorkingDaysCalculatorPage() {
  const faqs = getFAQsByToolId('working-days-calculator', 'time');

  return (
    <EnhancedToolLayout
      title="Working Days Calculator"
      description="Calculate working days between dates excluding weekends and holidays with custom holiday support."
      keywords={keywords}
      toolId="working-days-calculator"
      category="time"
      emoji="📊"
      customHowToUse={[
        "Select the start date for calculation",
        "Choose the end date",
        "Configure weekend days (Saturday/Sunday)",
        "Add custom holidays if needed",
        "View total working days result"
      ]}
      customFeatures={[
        "Weekend exclusion (customizable)",
        "Holiday calendar integration",
        "Custom holiday date support",
        "Business planning tools",
        "Project timeline calculation",
        "Multiple country holiday support"
      ]}
      faqs={faqs}
    >
      <WorkingDaysCalculator />
    </EnhancedToolLayout>
  );
}
