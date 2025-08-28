import { Metadata } from 'next';
import { EnhancedToolLayout } from '@/components/tools/EnhancedToolLayout';
import SavingsCalculator from '@/components/converters/finance/SavingsCalculator';
import { getFAQsByToolId } from '@/config/tool-faqs';
import { generateOptimizedKeywords } from '@/config/seo-keywords';

// Force static generation
export const dynamic = 'force-static';

const keywords = generateOptimizedKeywords('money-market-calculator', 'finance', 'Money Market Calculator');

export const metadata: Metadata = {
  title: 'Money Market Calculator - Money Market Account Returns | InterConverter',
  description: 'Calculate money market account returns and interest earnings. Compare money market rates and growth with instant calculations.',
  keywords: keywords.join(', '),
  openGraph: {
    title: 'Money Market Calculator - Money Market Account Returns',
    description: 'Professional money market calculator for account returns. Calculate interest earnings and compare rates.',
    type: 'website',
    images: [
      {
        url: '/images/og-money-market-calculator.jpg',
        width: 1200,
        height: 630,
        alt: 'Money Market Calculator Tool'
      }
    ]
  },
  alternates: {
    canonical: '/finance/money-market-calculator'
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

export default function MoneyMarketCalculatorPage() {
  const faqs = getFAQsByToolId('money-market-calculator', 'finance');

  return (
    <EnhancedToolLayout
      title="Money Market Calculator"
      description="Calculate money market account returns and interest earnings with instant calculations."
      keywords={keywords}
      toolId="money-market-calculator"
      category="finance"
      emoji="💰"
      customHowToUse={[
        "Enter initial deposit amount",
        "Set annual interest rate (APY)",
        "Choose compounding frequency",
        "Set investment time period",
        "Calculate total returns and earnings",
        "Compare different account options"
      ]}
      customFeatures={[
        "Money market return calculation with compounding",
        "Interest earnings projection over time",
        "Compounding frequency impact analysis",
        "Account comparison and rate tools",
        "Growth timeline visualization charts",
        "Interest rate sensitivity analysis"
      ]}
      faqs={faqs}
    >
      <SavingsCalculator />
    </EnhancedToolLayout>
  );
}
