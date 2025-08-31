import { Metadata } from 'next';
import { EnhancedToolLayout } from '@/components/tools/EnhancedToolLayout';
import SavingsCalculator from '@/components/converters/finance/SavingsCalculator';
import { getFAQsByToolId } from '@/config/tool-faqs';
import { generateOptimizedKeywords } from '@/config/seo-keywords';

// Force static generation
export const dynamic = 'force-static';

const keywords = generateOptimizedKeywords('high-yield-savings-calculator', 'finance', 'High-Yield Savings Calculator');

export const metadata: Metadata = {
  title: 'High-Yield Savings Calculator - Best APY Rates | InterConverter',
  description: 'Calculate high-yield savings account growth and compare rates. Maximize your savings with the best APY rates available.',
  keywords: keywords.join(', '),
  openGraph: {
    title: 'High-Yield Savings Calculator - Best APY Rates',
    description: 'Professional high-yield savings calculator for maximizing returns. Compare APY rates and optimize your savings strategy.',
    type: 'website',
    images: [
      {
        url: '/images/og-high-yield-savings-calculator.jpg',
        width: 1200,
        height: 630,
        alt: 'High-Yield Savings Calculator Tool'
      }
    ]
  },
  alternates: {
    canonical: '/finance/high-yield-savings-calculator'
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

export default function HighYieldSavingsCalculatorPage() {
  const faqs = getFAQsByToolId('high-yield-savings-calculator', 'finance');

  return (
    <EnhancedToolLayout
      title="High-Yield Savings Calculator"
      description="Calculate growth potential with high-yield savings accounts and compare the best APY rates available."
      keywords={keywords}
      toolId="high-yield-savings-calculator"
      category="finance"
      emoji="📈"
      customHowToUse={[
        "Enter initial savings amount",
        "Input high-yield APY rate",
        "Set monthly contribution amount",
        "Calculate compound growth",
        "Compare with traditional savings",
        "Find optimal savings strategy"
      ]}
      customFeatures={[
        "High APY rate calculations",
        "Online vs traditional bank comparison",
        "Compound interest optimization",
        "Rate change impact analysis",
        "FDIC insurance considerations",
        "Savings goal achievement tracking"
      ]}
      faqs={faqs}
    >
      <SavingsCalculator />
    </EnhancedToolLayout>
  );
}
