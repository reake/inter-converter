import { Metadata } from 'next';
import { EnhancedToolLayout } from '@/components/tools/EnhancedToolLayout';
import MortgageCalculator from '@/components/converters/finance/MortgageCalculator';
import { getFAQsByToolId } from '@/config/tool-faqs';
import { generateOptimizedKeywords } from '@/config/seo-keywords';

// Force static generation
export const dynamic = 'force-static';

const keywords = generateOptimizedKeywords('20-year-fixed-mortgage-calculator', 'finance', '20-Year Fixed Mortgage Calculator');

export const metadata: Metadata = {
  title: '20-Year Fixed Mortgage Calculator - Balanced Payment Calculator | InterConverter',
  description: 'Calculate 20-year fixed mortgage payments with balanced monthly payments and interest savings. Mid-term mortgage calculator for optimal payment balance.',
  keywords: keywords.join(', '),
  openGraph: {
    title: '20-Year Fixed Mortgage Calculator - Balanced Payment Calculator',
    description: 'Professional 20-year mortgage calculator for balanced payments and moderate interest savings. Find the optimal mid-term mortgage solution.',
    type: 'website',
    images: [
      {
        url: '/images/og-20-year-fixed-mortgage-calculator.jpg',
        width: 1200,
        height: 630,
        alt: '20-Year Fixed Mortgage Calculator Tool'
      }
    ]
  },
  alternates: {
    canonical: '/finance/20-year-fixed-mortgage-calculator'
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

export default function TwentyYearFixedMortgageCalculatorPage() {
  const faqs = getFAQsByToolId('20-year-fixed-mortgage-calculator', 'finance');

  return (
    <EnhancedToolLayout
      title="20-Year Fixed Mortgage Calculator"
      description="Calculate 20-year fixed mortgage payments for balanced monthly payments and moderate interest savings with instant calculations."
      keywords={keywords}
      toolId="20-year-fixed-mortgage-calculator"
      category="finance"
      emoji="⚖️"
      customHowToUse={[
        "Enter the loan amount for your mortgage",
        "Set the 20-year fixed interest rate",
        "Calculate balanced monthly payments instantly",
        "Compare with 15 and 30-year mortgage terms",
        "Analyze moderate interest savings potential",
        "Review payment affordability and cash flow"
      ]}
      customFeatures={[
        "20-year balanced payment calculation",
        "Moderate interest savings analysis",
        "Mid-term equity building projection",
        "Payment affordability balance assessment",
        "Mortgage term comparison tools",
        "Financial flexibility evaluation"
      ]}
      faqs={faqs}
    >
      <MortgageCalculator />
    </EnhancedToolLayout>
  );
}
