import { Metadata } from 'next';
import { EnhancedToolLayout } from '@/components/tools/EnhancedToolLayout';
import LoanCalculator from '@/components/converters/finance/LoanCalculator';
import { getFAQsByToolId } from '@/config/tool-faqs';
import { generateOptimizedKeywords } from '@/config/seo-keywords';

// Force static generation
export const dynamic = 'force-static';

const keywords = generateOptimizedKeywords('home-improvement-loan-calculator', 'finance', 'Home Improvement Loan Calculator');

export const metadata: Metadata = {
  title: 'Home Improvement Loan Calculator - Renovation Financing | InterConverter',
  description: 'Calculate home improvement loan payments and financing options for renovation projects with instant calculations.',
  keywords: keywords.join(', '),
  openGraph: {
    title: 'Home Improvement Loan Calculator - Renovation Financing',
    description: 'Professional home improvement loan calculator for renovation financing. Calculate payments and compare loan options.',
    type: 'website',
    images: [
      {
        url: '/images/og-home-improvement-loan-calculator.jpg',
        width: 1200,
        height: 630,
        alt: 'Home Improvement Loan Calculator Tool'
      }
    ]
  },
  alternates: {
    canonical: '/finance/home-improvement-loan-calculator'
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

export default function HomeImprovementLoanCalculatorPage() {
  const faqs = getFAQsByToolId('home-improvement-loan-calculator', 'finance');

  return (
    <EnhancedToolLayout
      title="Home Improvement Loan Calculator"
      description="Calculate home improvement loan payments and renovation financing options with instant calculations."
      keywords={keywords}
      toolId="home-improvement-loan-calculator"
      category="finance"
      emoji="🏠"
      customHowToUse={[
        "Enter total renovation project cost",
        "Set desired loan amount needed",
        "Input interest rate from lender",
        "Choose loan term in years",
        "Calculate monthly payment instantly",
        "Compare different financing options"
      ]}
      customFeatures={[
        "Home improvement loan payment calculation",
        "Renovation financing options analysis",
        "Project cost breakdown and planning",
        "Interest rate comparison tools",
        "Loan term optimization strategies",
        "Monthly payment estimation with taxes"
      ]}
      faqs={faqs}
    >
      <LoanCalculator />
    </EnhancedToolLayout>
  );
}
