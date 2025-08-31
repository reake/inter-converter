import { Metadata } from 'next';
import { EnhancedToolLayout } from '@/components/tools/EnhancedToolLayout';
import CreditCardPayoffCalculator from '@/components/converters/finance/CreditCardPayoffCalculator';
import { getFAQsByToolId } from '@/config/tool-faqs';
import { generateOptimizedKeywords } from '@/config/seo-keywords';

// Force static generation
export const dynamic = 'force-static';

const keywords = generateOptimizedKeywords('credit-card-interest-calculator', 'finance', 'Credit Card Interest Calculator');

export const metadata: Metadata = {
  title: 'Credit Card Interest Calculator - APR Calculator | InterConverter',
  description: 'Calculate daily and monthly credit card interest charges. Understand how APR affects your balance and minimum payments with instant calculations.',
  keywords: keywords.join(', '),
  openGraph: {
    title: 'Credit Card Interest Calculator - APR Calculator',
    description: 'Professional credit card interest calculator for APR analysis. Calculate daily and monthly interest charges.',
    type: 'website',
    images: [
      {
        url: '/images/og-credit-card-interest-calculator.jpg',
        width: 1200,
        height: 630,
        alt: 'Credit Card Interest Calculator Tool'
      }
    ]
  },
  alternates: {
    canonical: '/finance/credit-card-interest-calculator'
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

export default function CreditCardInterestCalculatorPage() {
  const faqs = getFAQsByToolId('credit-card-interest-calculator', 'finance');

  return (
    <EnhancedToolLayout
      title="Credit Card Interest Calculator"
      description="Calculate daily and monthly interest charges on your credit card balance based on APR and payment timing"
      toolId="credit-card-interest-calculator"
      category="credit-cards"
      emoji="📊"
      customHowToUse={[
        "Enter your credit card balance",
        "Input the annual percentage rate (APR)",
        "Set your average daily balance",
        "Calculate daily interest charges",
        "View monthly finance charges",
        "Understand compound interest impact"
      ]}
      customFeatures={[
        "Daily interest rate calculation",
        "Monthly finance charge estimation",
        "Average daily balance method",
        "Compound interest visualization",
        "APR to daily rate conversion",
        "Interest cost projections"
      ]}
      faqs={faqs}
    >
      <CreditCardPayoffCalculator />
    </EnhancedToolLayout>
  );
}
