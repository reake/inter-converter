import { Metadata } from 'next';
import { EnhancedToolLayout } from '@/components/tools/EnhancedToolLayout';
import LoanCalculator from '@/components/converters/finance/LoanCalculator';
import { getFAQsByToolId } from '@/config/tool-faqs';
import { generateOptimizedKeywords } from '@/config/seo-keywords';

// Force static generation
export const dynamic = 'force-static';

const keywords = generateOptimizedKeywords('title-loan-calculator', 'finance', 'Title Loan Calculator');

export const metadata: Metadata = {
  title: 'Title Loan Calculator - Car Title Loan Payment Calculator | InterConverter',
  description: 'Calculate title loan payments and costs. Understand the risks and costs of car title loans with instant calculations.',
  keywords: keywords.join(', '),
  openGraph: {
    title: 'Title Loan Calculator - Car Title Loan Payment Calculator',
    description: 'Professional title loan calculator for car title loans. Calculate payments and understand loan risks.',
    type: 'website',
    images: [
      {
        url: '/images/og-title-loan-calculator.jpg',
        width: 1200,
        height: 630,
        alt: 'Title Loan Calculator Tool'
      }
    ]
  },
  alternates: {
    canonical: '/finance/title-loan-calculator'
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

export default function TitleLoanCalculatorPage() {
  const faqs = getFAQsByToolId('title-loan-calculator', 'finance');

  return (
    <EnhancedToolLayout
      title="Title Loan Calculator"
      description="Calculate title loan payments and costs with instant calculations."
      keywords={keywords}
      toolId="title-loan-calculator"
      category="finance"
      emoji="🚗"
      customHowToUse={[
        "Enter vehicle market value",
        "Set desired loan amount",
        "Input annual interest rate",
        "Choose loan term length",
        "Calculate monthly payments",
        "Review loan risks and warnings"
      ]}
      customFeatures={[
        "Title loan payment calculations",
        "High-interest rate impact analysis",
        "Comprehensive risk assessment",
        "Alternative loan option comparison",
        "Vehicle value estimation tools",
        "Cost warning and alert system"
      ]}
      faqs={faqs}
    >
      <LoanCalculator />
    </EnhancedToolLayout>
  );
}
