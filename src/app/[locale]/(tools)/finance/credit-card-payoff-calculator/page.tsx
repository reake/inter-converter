import { Metadata } from 'next';
import { EnhancedToolLayout } from '@/components/tools/EnhancedToolLayout';
import CreditCardPayoffCalculator from '@/components/converters/finance/CreditCardPayoffCalculator';
import { getFAQsByToolId } from '@/config/tool-faqs';
import { generateOptimizedKeywords } from '@/config/seo-keywords';

// Force static generation
export const dynamic = 'force-static';

const keywords = generateOptimizedKeywords('credit-card-payoff-calculator', 'finance', 'Credit Card Payoff Calculator');

export const metadata: Metadata = {
  title: 'Credit Card Payoff Calculator - Debt Elimination Plan | InterConverter',
  description: 'Calculate credit card payoff time and interest costs. Plan debt elimination strategies with minimum and extra payment scenarios.',
  keywords: keywords.join(', '),
  openGraph: {
    title: 'Credit Card Payoff Calculator - Debt Elimination Plan',
    description: 'Professional credit card payoff calculator for debt management. Calculate payoff time, interest costs, and optimize payment strategies.',
    type: 'website',
    images: [
      {
        url: '/images/og-credit-card-payoff-calculator.jpg',
        width: 1200,
        height: 630,
        alt: 'Credit Card Payoff Calculator Tool'
      }
    ]
  },
  alternates: {
    canonical: '/finance/credit-card-payoff-calculator'
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

export default function CreditCardPayoffCalculatorPage() {
  const faqs = getFAQsByToolId('credit-card-payoff-calculator', 'finance');

  return (
    <EnhancedToolLayout
      title="Credit Card Payoff Calculator"
      description="Calculate credit card payoff strategies and eliminate debt faster with instant calculations."
      keywords={keywords}
      toolId="credit-card-payoff-calculator"
      category="finance"
      emoji="💳"
      customHowToUse={[
        "Enter current credit card balance amount",
        "Input interest rate (APR) from statement",
        "Set monthly payment amount you can afford",
        "Calculate payoff time and total interest",
        "Compare different payment strategies",
        "Plan debt elimination and savings goals"
      ]}
      customFeatures={[
        "Payoff time calculation with interest breakdown",
        "Total interest cost projections",
        "Payment strategy comparison tools",
        "Debt avalanche vs snowball analysis",
        "Extra payment impact and savings analysis",
        "Money-saving recommendations and tips"
      ]}
      faqs={faqs}
    >
      <CreditCardCalculator />
    </EnhancedToolLayout>
  );
}
