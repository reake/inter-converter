import { Metadata } from 'next';
import { EnhancedToolLayout } from '@/components/tools/EnhancedToolLayout';
import MortgageCalculator from '@/components/converters/finance/MortgageCalculator';
import { getFAQsByToolId } from '@/config/tool-faqs';
import { generateOptimizedKeywords } from '@/config/seo-keywords';

// Force static generation
export const dynamic = 'force-static';

const keywords = generateOptimizedKeywords('15-vs-30-year-mortgage-calculator', 'finance', '15 vs 30 Year Mortgage Calculator');

export const metadata: Metadata = {
  title: '15 vs 30 Year Mortgage Calculator - Compare Mortgage Terms | InterConverter',
  description: 'Compare 15-year vs 30-year mortgage payments, interest costs, and total savings. Make informed mortgage term decisions with detailed analysis.',
  keywords: keywords.join(', '),
  openGraph: {
    title: '15 vs 30 Year Mortgage Calculator - Compare Mortgage Terms',
    description: 'Professional mortgage comparison calculator. Compare 15-year vs 30-year mortgage terms, payments, and total interest costs.',
    type: 'website',
    images: [
      {
        url: '/images/og-15-vs-30-year-mortgage-calculator.jpg',
        width: 1200,
        height: 630,
        alt: '15 vs 30 Year Mortgage Calculator Tool'
      }
    ]
  },
  alternates: {
    canonical: '/finance/15-vs-30-year-mortgage-calculator'
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

export default function FifteenVsThirtyYearMortgageCalculatorPage() {
  const faqs = getFAQsByToolId('15-vs-30-year-mortgage-calculator', 'finance');

  return (
    <EnhancedToolLayout
      title="15 vs 30 Year Mortgage Calculator"
      description="Compare 15-year vs 30-year mortgage terms to make the best financial decision for your home loan with instant calculations."
      keywords={keywords}
      toolId="15-vs-30-year-mortgage-calculator"
      category="finance"
      emoji="⚖️"
      customHowToUse={[
        "Enter the loan amount for comparison",
        "Set interest rates for both 15 and 30-year terms",
        "Compare monthly payments side by side",
        "Analyze total interest costs over loan life",
        "Review equity building speed differences",
        "Make informed mortgage term decision"
      ]}
      customFeatures={[
        "Side-by-side mortgage comparison",
        "Total interest savings calculation",
        "Monthly payment difference analysis",
        "Equity building timeline comparison",
        "Break-even analysis tools",
        "Financial impact assessment"
      ]}
      faqs={faqs}
    >
      <MortgageCalculator />
    </EnhancedToolLayout>
  );
}
