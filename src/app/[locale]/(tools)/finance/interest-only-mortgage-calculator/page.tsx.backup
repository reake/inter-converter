import { Metadata } from 'next';
import { EnhancedToolLayout } from '@/components/tools/EnhancedToolLayout';
import InterestOnlyMortgageCalculator from '@/components/converters/finance/InterestOnlyMortgageCalculator';
import { getFAQsByToolId } from '@/config/tool-faqs';
import { generateOptimizedKeywords } from '@/config/seo-keywords';

// Force static generation
export const dynamic = 'force-static';

const keywords = generateOptimizedKeywords('interest-only-mortgage-calculator', 'finance', 'Interest-Only Mortgage Calculator');

export const metadata: Metadata = {
  title: 'Interest-Only Mortgage Calculator - IO Payment Calculator | InterConverter',
  description: 'Calculate interest-only mortgage payments and total costs. Analyze payment shock and balloon payment scenarios with instant calculations.',
  keywords: keywords.join(', '),
  openGraph: {
    title: 'Interest-Only Mortgage Calculator - IO Payment Calculator',
    description: 'Professional interest-only mortgage calculator for payment analysis. Calculate IO payments and payment shock scenarios.',
    type: 'website',
    images: [
      {
        url: '/images/og-interest-only-mortgage-calculator.jpg',
        width: 1200,
        height: 630,
        alt: 'Interest-Only Mortgage Calculator Tool'
      }
    ]
  },
  alternates: {
    canonical: '/finance/interest-only-mortgage-calculator'
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

export default function InterestOnlyMortgageCalculatorPage() {
  const faqs = getFAQsByToolId('interest-only-mortgage-calculator', 'finance');

  return (
    <EnhancedToolLayout
      title="Interest-Only Mortgage Calculator"
      description="Calculate interest-only mortgage payments and total costs with instant calculations."
      keywords={keywords}
      toolId="interest-only-mortgage-calculator"
      category="finance"
      emoji="🏠"
      customHowToUse={[
        "Enter loan amount and interest rate",
        "Set interest-only period length",
        "Input loan term after IO period",
        "Calculate interest-only payments",
        "View payment shock analysis",
        "Compare with traditional mortgages"
      ]}
      customFeatures={[
        "Interest-only payment calculation",
        "Payment shock analysis after IO period",
        "Balloon payment scenario planning",
        "Total interest cost comparison",
        "Amortization schedule visualization",
        "Risk assessment and warnings"
      ]}
      faqs={faqs}
    >
      <InterestOnlyMortgageCalculator />
    </EnhancedToolLayout>
  );
}
