import { Metadata } from 'next';
import { EnhancedToolLayout } from '@/components/tools/EnhancedToolLayout';
import SavingsCalculator from '@/components/converters/finance/SavingsCalculator';
import { getFAQsByToolId } from '@/config/tool-faqs';
import { generateOptimizedKeywords } from '@/config/seo-keywords';

// Force static generation
export const dynamic = 'force-static';

const keywords = generateOptimizedKeywords('savings-calculator', 'finance', 'Savings Calculator');

export const metadata: Metadata = {
  title: 'Savings Calculator - Growth & Interest Planning | InterConverter',
  description: 'Calculate savings growth with compound interest. Plan your savings goals and track progress over time with professional accuracy.',
  keywords: keywords.join(', '),
  openGraph: {
    title: 'Savings Calculator - Compound Interest Calculator',
    description: 'Professional savings calculator for financial planning. Calculate compound interest growth and achieve savings goals.',
    type: 'website',
    images: [
      {
        url: '/images/og-savings-calculator.jpg',
        width: 1200,
        height: 630,
        alt: 'Savings Calculator Tool'
      }
    ]
  },
  alternates: {
    canonical: '/finance/savings-calculator'
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

export default function SavingsCalculatorPage() {
  const faqs = getFAQsByToolId('savings-calculator', 'finance');

  return (
    <EnhancedToolLayout
      title="Savings Calculator"
      description="Calculate savings growth and achieve your financial goals with instant calculations."
      keywords={keywords}
      toolId="savings-calculator"
      category="finance"
      emoji="💰"
      customHowToUse={[
        "Enter initial savings amount or starting balance",
        "Set monthly contribution amount",
        "Input interest rate (APY) from bank",
        "Choose savings timeline and target date",
        "Calculate future value with compound interest",
        "Plan and track financial goals progress"
      ]}
      customFeatures={[
        "Compound interest calculation with compounding frequency",
        "Monthly contribution tracking and planning",
        "Goal-based savings planning and milestones",
        "Interest earnings projection over time",
        "Savings timeline optimization strategies",
        "Financial milestone tracking and alerts"
      ]}
      faqs={faqs}
    >
      <SavingsCalculator />
    </EnhancedToolLayout>
  );
}
