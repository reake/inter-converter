import { Metadata } from 'next';
import { EnhancedToolLayout } from '@/components/tools/EnhancedToolLayout';
import SavingsCalculator from '@/components/converters/finance/SavingsCalculator';
import { getFAQsByToolId } from '@/config/tool-faqs';
import { generateOptimizedKeywords } from '@/config/seo-keywords';

// Force static generation
export const dynamic = 'force-static';

const keywords = generateOptimizedKeywords('compound-interest-calculator', 'finance', 'Compound Interest Calculator');

export const metadata: Metadata = {
  title: 'Compound Interest Calculator - Investment Growth Analysis | InterConverter',
  description: 'Calculate compound interest growth over time. Understand the power of compounding for savings and investment planning with professional accuracy.',
  keywords: keywords.join(', '),
  openGraph: {
    title: 'Compound Interest Calculator - Investment Growth Analysis',
    type: 'website',
    images: [
      {
        url: '/images/og-compound-interest-calculator.jpg',
        width: 1200,
        height: 630,
        alt: 'Compound Interest Calculator Tool'
      }
    ]
  },
  alternates: {
    canonical: '/finance/compound-interest-calculator'
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

export default function CompoundInterestCalculatorPage() {
  const faqs = getFAQsByToolId('compound-interest-calculator', 'finance');

  return (
    <EnhancedToolLayout
      title="Compound Interest Calculator"
      description="Calculate compound interest growth and investment returns with instant calculations."
      keywords={keywords}
      toolId="compound-interest-calculator"
      category="finance"
      emoji="💹"
      customHowToUse={[
        "Enter initial principal amount to invest",
        "Set annual interest rate or expected return",
        "Choose compounding frequency (daily, monthly, quarterly, annually)",
        "Specify time period in years",
        "Add regular contributions amount (optional)",
        "Calculate compound growth and future value"
      ]}
      customFeatures={[
        "Compound interest calculation with multiple frequencies",
        "Regular contribution support and planning",
        "Growth visualization charts and projections",
        "Interest vs principal breakdown analysis",
        "Future value projections over time",
        "Investment growth comparison scenarios"
      ]}
      faqs={faqs}
    >
      <SavingsCalculator />
    </EnhancedToolLayout>
  );
}
