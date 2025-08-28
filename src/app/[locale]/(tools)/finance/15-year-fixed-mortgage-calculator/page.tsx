import { Metadata } from 'next';
import { EnhancedToolLayout } from '@/components/tools/EnhancedToolLayout';
import MortgageCalculator from '@/components/converters/finance/MortgageCalculator';
import { getFAQsByToolId } from '@/config/tool-faqs';
import { generateOptimizedKeywords } from '@/config/seo-keywords';

// Force static generation
export const dynamic = 'force-static';

const keywords = generateOptimizedKeywords('15-year-fixed-mortgage-calculator', 'finance', '15-Year Fixed Mortgage Calculator');

export const metadata: Metadata = {
  title: '15-Year Fixed Mortgage Calculator - Accelerated Payoff Calculator | InterConverter',
  description: 'Calculate 15-year fixed mortgage payments with significant interest savings. Accelerated mortgage payoff calculator with faster equity building.',
  keywords: keywords.join(', '),
  openGraph: {
    title: '15-Year Fixed Mortgage Calculator - Accelerated Payoff Calculator',
    description: 'Professional 15-year mortgage calculator for accelerated payoff and substantial interest savings. Calculate faster equity building.',
    type: 'website',
    images: [
      {
        url: '/images/og-15-year-fixed-mortgage-calculator.jpg',
        width: 1200,
        height: 630,
        alt: '15-Year Fixed Mortgage Calculator Tool'
      }
    ]
  },
  alternates: {
    canonical: '/finance/15-year-fixed-mortgage-calculator'
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

export default function FifteenYearFixedMortgageCalculatorPage() {
  const faqs = getFAQsByToolId('15-year-fixed-mortgage-calculator', 'finance');

  return (
    <EnhancedToolLayout
      title="15-Year Fixed Mortgage Calculator"
      description="Calculate 15-year fixed mortgage payments for accelerated payoff and substantial interest savings with instant calculations."
      keywords={keywords}
      toolId="15-year-fixed-mortgage-calculator"
      category="finance"
      emoji="🚀"
      customHowToUse={[
        "Enter the loan amount for your mortgage",
        "Set the 15-year fixed interest rate",
        "Calculate monthly payments instantly",
        "Compare interest savings vs 30-year mortgage",
        "Analyze accelerated equity building speed",
        "Review total cost benefits and savings"
      ]}
      customFeatures={[
        "15-year accelerated payment calculation",
        "Substantial interest savings analysis",
        "Faster equity building projection",
        "Payment affordability assessment",
        "Comparison with standard mortgage terms",
        "Total cost optimization strategies"
      ]}
      faqs={faqs}
    >
      <MortgageCalculator />
    </EnhancedToolLayout>
  );
}
