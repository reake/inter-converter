import { Metadata } from 'next';
import { EnhancedToolLayout } from '@/components/tools/EnhancedToolLayout';
import MortgageCalculator from '@/components/converters/finance/MortgageCalculator';
import { getFAQsByToolId } from '@/config/tool-faqs';
import { generateOptimizedKeywords } from '@/config/seo-keywords';

// Force static generation
export const dynamic = 'force-static';

const keywords = generateOptimizedKeywords('mortgage-apr-calculator', 'finance', 'Mortgage APR Calculator');

export const metadata: Metadata = {
  title: 'Mortgage APR Calculator - True Mortgage Cost Calculator | InterConverter',
  description: 'Calculate mortgage APR including fees and closing costs. Compare true cost of mortgage loans with instant calculations.',
  keywords: keywords.join(', '),
  openGraph: {
    title: 'Mortgage APR Calculator - True Mortgage Cost Calculator',
    description: 'Professional mortgage APR calculator for true loan costs. Calculate APR including fees and closing costs.',
    type: 'website',
    images: [
      {
        url: '/images/og-mortgage-apr-calculator.jpg',
        width: 1200,
        height: 630,
        alt: 'Mortgage APR Calculator Tool'
      }
    ]
  },
  alternates: {
    canonical: '/finance/mortgage-apr-calculator'
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

export default function MortgageAPRCalculatorPage() {
  const faqs = getFAQsByToolId('mortgage-apr-calculator', 'finance');

  return (
    <EnhancedToolLayout
      title="Mortgage APR Calculator"
      description="Calculate mortgage APR including fees and closing costs with instant calculations."
      keywords={keywords}
      toolId="mortgage-apr-calculator"
      category="finance"
      emoji="📊"
      customHowToUse={[
        "Enter total loan amount",
        "Set nominal interest rate",
        "Input total closing costs",
        "Add all lender fees",
        "Calculate true APR instantly",
        "Compare different loan offers"
      ]}
      customFeatures={[
        "True APR calculation with all costs",
        "Closing cost inclusion and analysis",
        "Lender fee impact assessment",
        "Loan offer comparison tools",
        "Detailed cost breakdown display",
        "Interest rate vs APR comparison"
      ]}
      faqs={faqs}
    >
      <MortgageCalculator />
    </EnhancedToolLayout>
  );
}
