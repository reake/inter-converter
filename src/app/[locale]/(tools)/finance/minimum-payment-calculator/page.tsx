import { Metadata } from 'next';
import { EnhancedToolLayout } from '@/components/tools/EnhancedToolLayout';
import CreditCardPayoffCalculator from '@/components/converters/finance/CreditCardPayoffCalculator';
import { getFAQsByToolId } from '@/config/tool-faqs';
import { generateOptimizedKeywords } from '@/config/seo-keywords';

// Force static generation
export const dynamic = 'force-static';

const keywords = generateOptimizedKeywords('minimum-payment-calculator', 'finance', 'Minimum Payment Calculator');

export const metadata: Metadata = {
  title: 'Minimum Payment Calculator - Credit Card Payoff Time | InterConverter',
  description: 'Calculate minimum credit card payments and payoff time. Understand the impact of minimum payments on debt with instant calculations.',
  keywords: keywords.join(', '),
  openGraph: {
    title: 'Minimum Payment Calculator - Credit Card Payoff Time',
    description: 'Professional minimum payment calculator for credit card debt. Calculate payoff time and total interest costs.',
    type: 'website',
    images: [
      {
        url: '/images/og-minimum-payment-calculator.jpg',
        width: 1200,
        height: 630,
        alt: 'Minimum Payment Calculator Tool'
      }
    ]
  },
  alternates: {
    canonical: '/finance/minimum-payment-calculator'
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

export default function MinimumPaymentCalculatorPage() {
  const faqs = getFAQsByToolId('minimum-payment-calculator', 'finance');

  return (
    <EnhancedToolLayout
      title="Minimum Payment Calculator"
      description="Calculate minimum credit card payments and payoff time with instant calculations."
      keywords={keywords}
      toolId="minimum-payment-calculator"
      category="finance"
      emoji="💳"
      customHowToUse={[
        "Enter current credit card balance",
        "Input annual interest rate (APR)",
        "Set minimum payment percentage or amount",
        "Calculate total payoff time",
        "View detailed payment schedule",
        "Compare different payment strategies"
      ]}
      customFeatures={[
        "Minimum payment calculation by balance",
        "Payoff time estimation with interest",
        "Total interest cost analysis",
        "Monthly payment schedule breakdown",
        "Debt payoff strategy comparison",
        "Total cost vs payment amount analysis"
      ]}
      faqs={faqs}
    >
      <CreditCardPayoffCalculator />
    </EnhancedToolLayout>
  );
}
