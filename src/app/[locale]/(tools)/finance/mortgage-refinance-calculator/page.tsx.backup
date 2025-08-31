import { Metadata } from 'next';
import { EnhancedToolLayout } from '@/components/tools/EnhancedToolLayout';
import MortgageCalculator from '@/components/converters/finance/MortgageCalculator';
import { getFAQsByToolId } from '@/config/tool-faqs';
import { generateOptimizedKeywords } from '@/config/seo-keywords';

// Force static generation
export const dynamic = 'force-static';

const keywords = generateOptimizedKeywords('mortgage-refinance-calculator', 'finance', 'Mortgage Refinance Calculator');

export const metadata: Metadata = {
  title: 'Mortgage Refinance Calculator - Refinancing Savings Analysis | InterConverter',
  description: 'Calculate mortgage refinancing savings and break-even analysis. Compare current vs new mortgage terms with instant calculations.',
  keywords: keywords.join(', '),
  openGraph: {
    title: 'Mortgage Refinance Calculator - Refinancing Savings Analysis',
    description: 'Professional mortgage refinance calculator for savings analysis. Calculate break-even points and compare terms.',
    type: 'website',
    images: [
      {
        url: '/images/og-mortgage-refinance-calculator.jpg',
        width: 1200,
        height: 630,
        alt: 'Mortgage Refinance Calculator Tool'
      }
    ]
  },
  alternates: {
    canonical: '/finance/mortgage-refinance-calculator'
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

export default function MortgageRefinanceCalculatorPage() {
  const faqs = getFAQsByToolId('mortgage-refinance-calculator', 'finance');

  return (
    <EnhancedToolLayout
      title="Mortgage Refinance Calculator"
      description="Calculate mortgage refinancing savings and break-even analysis with instant calculations."
      keywords={keywords}
      toolId="mortgage-refinance-calculator"
      category="finance"
      emoji="🔄"
      customHowToUse={[
        "Enter current mortgage balance and terms",
        "Input new loan interest rate and terms",
        "Set total refinancing closing costs",
        "Calculate monthly payment savings",
        "Analyze break-even point timeline",
        "Compare total interest costs over time"
      ]}
      customFeatures={[
        "Refinance savings calculation with all costs",
        "Break-even analysis and timeline projection",
        "Side-by-side mortgage cost comparison",
        "Monthly payment reduction analysis",
        "Total interest savings tracking over time",
        "Closing cost impact on savings assessment"
      ]}
      faqs={faqs}
    >
      <MortgageCalculator />
    </EnhancedToolLayout>
  );
}
