import { Metadata } from 'next';
import { EnhancedToolLayout } from '@/components/tools/EnhancedToolLayout';
import SavingsCalculator from '@/components/converters/finance/SavingsCalculator';
import { getFAQsByToolId } from '@/config/tool-faqs';
import { generateOptimizedKeywords } from '@/config/seo-keywords';

// Force static generation
export const dynamic = 'force-static';

const keywords = generateOptimizedKeywords('cd-calculator', 'finance', 'CD Calculator');

export const metadata: Metadata = {
  title: 'CD Calculator - Certificate of Deposit Returns | InterConverter',
  description: 'Calculate Certificate of Deposit returns and compare CD rates. Plan fixed-term savings with guaranteed returns.',
  keywords: keywords.join(', '),
  openGraph: {
    title: 'CD Calculator - Certificate of Deposit Returns',
    description: 'Professional CD calculator for fixed-term savings. Calculate Certificate of Deposit returns and compare different CD options.',
    type: 'website',
    images: [
      {
        url: '/images/og-cd-calculator.jpg',
        width: 1200,
        height: 630,
        alt: 'CD Calculator Tool'
      }
    ]
  },
  alternates: {
    canonical: '/finance/cd-calculator'
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

export default function CDCalculatorPage() {
  const faqs = getFAQsByToolId('cd-calculator', 'finance');

  return (
    <EnhancedToolLayout
      title="CD Calculator"
      description="Calculate certificate of deposit returns and compare CD rates with instant calculations."
      keywords={keywords}
      toolId="cd-calculator"
      category="finance"
      emoji="💰"
      customHowToUse={[
        "Enter initial deposit amount for CD",
        "Set CD interest rate (APY) from bank",
        "Choose CD term length in months or years",
        "Select compounding frequency (daily, monthly, quarterly)",
        "Calculate maturity value and total interest",
        "Compare different CD options and rates"
      ]}
      customFeatures={[
        "CD maturity value calculation with compound interest",
        "Interest earnings projection over term",
        "APY vs APR comparison and analysis",
        "Compounding frequency impact analysis",
        "Early withdrawal penalty calculations",
        "CD ladder planning and optimization"
      ]}
      faqs={faqs}
    >
      <InvestmentCalculator />
    </EnhancedToolLayout>
  );
}
