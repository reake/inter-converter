import { Metadata } from 'next';
import { EnhancedToolLayout } from '@/components/tools/EnhancedToolLayout';
import MortgageCalculator from '@/components/converters/finance/MortgageCalculator';
import { getFAQsByToolId } from '@/config/tool-faqs';
import { generateOptimizedKeywords } from '@/config/seo-keywords';

// Force static generation
export const dynamic = 'force-static';

const keywords = generateOptimizedKeywords('mortgage-amortization-calculator', 'finance', 'Mortgage Amortization Calculator');

export const metadata: Metadata = {
  title: 'Mortgage Amortization Calculator - Payment Schedule | InterConverter',
  description: 'Calculate mortgage amortization schedule with principal and interest breakdown for each payment with instant calculations.',
  keywords: keywords.join(', '),
  openGraph: {
    title: 'Mortgage Amortization Calculator - Payment Schedule',
    description: 'Professional mortgage amortization calculator for payment schedules. Calculate principal and interest breakdown.',
    type: 'website',
    images: [
      {
        url: '/images/og-mortgage-amortization-calculator.jpg',
        width: 1200,
        height: 630,
        alt: 'Mortgage Amortization Calculator Tool'
      }
    ]
  },
  alternates: {
    canonical: '/finance/mortgage-amortization-calculator'
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

export default function MortgageAmortizationCalculatorPage() {
  const faqs = getFAQsByToolId('mortgage-amortization-calculator', 'finance');

  return (
    <EnhancedToolLayout
      title="Mortgage Amortization Calculator"
      description="Calculate mortgage amortization schedule and payment breakdown with instant calculations."
      keywords={keywords}
      toolId="mortgage-amortization-calculator"
      category="finance"
      emoji="📊"
      customHowToUse={[
        "Enter total loan amount",
        "Set annual interest rate",
        "Choose loan term in years",
        "Calculate amortization schedule",
        "View detailed payment schedule",
        "Analyze principal vs interest breakdown"
      ]}
      customFeatures={[
        "Complete mortgage amortization schedule",
        "Monthly payment breakdown analysis",
        "Principal vs interest tracking over time",
        "Remaining balance calculation by period",
        "Total interest cost calculation",
        "Interactive payment schedule visualization"
      ]}
      faqs={faqs}
    >
      <MortgageCalculator />
    </EnhancedToolLayout>
  );
}
