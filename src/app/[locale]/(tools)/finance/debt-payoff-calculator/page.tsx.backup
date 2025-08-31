import { Metadata } from 'next';
import { EnhancedToolLayout } from '@/components/tools/EnhancedToolLayout';
import DebtCalculator from '@/components/converters/finance/DebtCalculator';
import { getFAQsByToolId } from '@/config/tool-faqs';
import { generateOptimizedKeywords } from '@/config/seo-keywords';

// Force static generation
export const dynamic = 'force-static';

const keywords = generateOptimizedKeywords('debt-payoff-calculator', 'finance', 'Debt Payoff Calculator');

export const metadata: Metadata = {
  title: 'Debt Payoff Calculator - Snowball & Avalanche Methods | InterConverter',
  description: 'Calculate debt payoff strategies using snowball and avalanche methods. Plan multiple debt elimination with optimized payment allocation.',
  keywords: keywords.join(', '),
  openGraph: {
    title: 'Debt Payoff Calculator - Snowball & Avalanche Methods',
    description: 'Professional debt payoff calculator with snowball and avalanche methods. Optimize multiple debt elimination strategies.',
    type: 'website',
    images: [
      {
        url: '/images/og-debt-payoff-calculator.jpg',
        width: 1200,
        height: 630,
        alt: 'Debt Payoff Calculator Tool'
      }
    ]
  },
  alternates: {
    canonical: '/finance/debt-payoff-calculator'
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

export default function DebtPayoffCalculatorPage() {
  const faqs = getFAQsByToolId('debt-payoff-calculator', 'finance');

  return (
    <EnhancedToolLayout
      title="Debt Payoff Calculator"
      description="Calculate optimal debt payoff strategies using snowball and avalanche methods for multiple debts."
      keywords={keywords}
      toolId="debt-payoff-calculator"
      category="finance"
      emoji="🎯"
      customHowToUse={[
        "Enter all your debts with balances and rates",
        "Set your total monthly payment budget",
        "Compare snowball vs avalanche methods",
        "View payoff timeline and interest savings",
        "Track progress with payment schedules",
        "Optimize your debt elimination strategy"
      ]}
      customFeatures={[
        "Snowball method calculations",
        "Avalanche method optimization",
        "Multiple debt tracking",
        "Interest savings comparison",
        "Payment allocation optimization",
        "Debt-free timeline projection"
      ]}
      faqs={faqs}
    >
      <DebtCalculator />
    </EnhancedToolLayout>
  );
}
