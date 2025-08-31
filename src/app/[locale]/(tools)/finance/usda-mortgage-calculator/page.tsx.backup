import { Metadata } from 'next';
import { EnhancedToolLayout } from '@/components/tools/EnhancedToolLayout';
import MortgageCalculator from '@/components/converters/finance/MortgageCalculator';
import { getFAQsByToolId } from '@/config/tool-faqs';
import { generateOptimizedKeywords } from '@/config/seo-keywords';

// Force static generation
export const dynamic = 'force-static';

const keywords = generateOptimizedKeywords('usda-mortgage-calculator', 'finance', 'USDA Mortgage Calculator');

export const metadata: Metadata = {
  title: 'USDA Mortgage Calculator - Rural Development Loan Calculator | InterConverter',
  description: 'Calculate USDA rural development loan payments and eligibility. Analyze USDA mortgage benefits and requirements with instant calculations.',
  keywords: keywords.join(', '),
  openGraph: {
    title: 'USDA Mortgage Calculator - Rural Development Loan Calculator',
    description: 'Professional USDA mortgage calculator for rural home loans. Calculate payments and check eligibility requirements.',
    type: 'website',
    images: [
      {
        url: '/images/og-usda-mortgage-calculator.jpg',
        width: 1200,
        height: 630,
        alt: 'USDA Mortgage Calculator Tool'
      }
    ]
  },
  alternates: {
    canonical: '/finance/usda-mortgage-calculator'
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

export default function USDAMortgageCalculatorPage() {
  const faqs = getFAQsByToolId('usda-mortgage-calculator', 'finance');

  return (
    <EnhancedToolLayout
      title="USDA Mortgage Calculator"
      description="Calculate USDA rural development loan payments and eligibility with instant calculations."
      keywords={keywords}
      toolId="usda-mortgage-calculator"
      category="finance"
      emoji="🏡"
      customHowToUse={[
        "Enter home purchase price",
        "Check rural area eligibility",
        "Input household income details",
        "Calculate monthly payments",
        "Review USDA loan benefits",
        "Compare with conventional loans"
      ]}
      customFeatures={[
        "USDA loan payment calculation",
        "Rural area eligibility assessment",
        "Zero down payment analysis",
        "Income limit verification tools",
        "Property location qualification check",
        "USDA vs conventional loan comparison"
      ]}
      faqs={faqs}
    >
      <MortgageCalculator />
    </EnhancedToolLayout>
  );
}
