import { Metadata } from 'next';
import { EnhancedToolLayout } from '@/components/tools/EnhancedToolLayout';
import MortgageCalculator from '@/components/converters/finance/MortgageCalculator';
import { getFAQsByToolId } from '@/config/tool-faqs';
import { generateOptimizedKeywords } from '@/config/seo-keywords';

// Force static generation
export const dynamic = 'force-static';

const keywords = generateOptimizedKeywords('10-year-fixed-mortgage-calculator', 'finance', '10-Year Fixed Mortgage Calculator');

export const metadata: Metadata = {
  title: '10-Year Fixed Mortgage Calculator - Fast Payoff Calculator | InterConverter',
  description: 'Calculate 10-year fixed mortgage payments with maximum interest savings. Fast payoff mortgage calculator with high monthly payments and accelerated equity building.',
  keywords: keywords.join(', '),
  openGraph: {
    title: '10-Year Fixed Mortgage Calculator - Fast Payoff Calculator',
    description: 'Professional 10-year mortgage calculator for maximum interest savings. Calculate accelerated payments and fast equity building.',
    type: 'website',
    images: [
      {
        url: '/images/og-10-year-fixed-mortgage-calculator.jpg',
        width: 1200,
        height: 630,
        alt: '10-Year Fixed Mortgage Calculator Tool'
      }
    ]
  },
  alternates: {
    canonical: '/finance/10-year-fixed-mortgage-calculator'
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

export default function TenYearFixedMortgageCalculatorPage() {
  const faqs = getFAQsByToolId('10-year-fixed-mortgage-calculator', 'finance');

  return (
    <EnhancedToolLayout
      title="10-Year Fixed Mortgage Calculator"
      description="Calculate 10-year fixed mortgage payments for fastest payoff and maximum interest savings with instant calculations."
      keywords={keywords}
      toolId="10-year-fixed-mortgage-calculator"
      category="finance"
      emoji="⚡"
      customHowToUse={[
        "Enter the loan amount for your mortgage",
        "Set the 10-year fixed interest rate",
        "Calculate high monthly payments instantly",
        "Compare total interest savings vs longer terms",
        "Analyze cash flow requirements",
        "Review accelerated equity building projections"
      ]}
      customFeatures={[
        "10-year accelerated payment calculation",
        "Maximum interest savings analysis",
        "Fast equity building projection",
        "Cash flow requirement analysis",
        "Comparison with longer mortgage terms",
        "Total cost minimization strategy"
      ]}
      faqs={faqs}
    >
      <MortgageCalculator />
    </EnhancedToolLayout>
  );
}
