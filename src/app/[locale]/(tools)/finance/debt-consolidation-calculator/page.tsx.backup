import { Metadata } from 'next';
import { EnhancedToolLayout } from '@/components/tools/EnhancedToolLayout';
import DebtCalculator from '@/components/converters/finance/DebtCalculator';
import { getFAQsByToolId } from '@/config/tool-faqs';
import { generateOptimizedKeywords } from '@/config/seo-keywords';

// Force static generation
export const dynamic = 'force-static';

const keywords = generateOptimizedKeywords('debt-consolidation-calculator', 'finance', 'Debt Consolidation Calculator');

export const metadata: Metadata = {
  title: 'Debt Consolidation Calculator - Loan Consolidation Calculator | InterConverter',
  description: 'Calculate debt consolidation savings, monthly payments, and payoff strategies. Compare consolidation loan options with instant calculations.',
  keywords: keywords.join(', '),
  openGraph: {
    title: 'Debt Consolidation Calculator - Loan Consolidation Calculator',
    description: 'Professional debt consolidation calculator for loan planning. Calculate savings and compare consolidation options.',
    type: 'website',
    images: [
      {
        url: '/images/og-debt-consolidation-calculator.jpg',
        width: 1200,
        height: 630,
        alt: 'Debt Consolidation Calculator Tool'
      }
    ]
  },
  alternates: {
    canonical: '/finance/debt-consolidation-calculator'
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

export default function DebtConsolidationCalculatorPage() {
  const faqs = getFAQsByToolId('debt-consolidation-calculator', 'finance');

  return (
    <EnhancedToolLayout
      title="Debt Consolidation Calculator"
      description="Calculate debt consolidation savings and compare loan options with instant calculations."
      keywords={keywords}
      toolId="debt-consolidation-calculator"
      category="finance"
      emoji="💰"
      customHowToUse={[
        "Enter current debt balances and amounts",
        "Input interest rates for each existing debt",
        "Set consolidation loan terms and rate",
        "Calculate monthly payment savings",
        "Compare payoff timelines and scenarios",
        "Analyze total interest savings over time"
      ]}
      customFeatures={[
        "Multiple debt consolidation analysis",
        "Monthly payment comparison and savings",
        "Interest savings calculation over loan life",
        "Payoff timeline comparison charts",
        "Loan option evaluation and recommendations",
        "Debt-to-income ratio impact analysis"
      ]}
      faqs={faqs}
    >
      <DebtCalculator />
    </EnhancedToolLayout>
  );
}
