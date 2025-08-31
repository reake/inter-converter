import { Metadata } from 'next';
import { EnhancedToolLayout } from '@/components/tools/EnhancedToolLayout';
import LoanCalculator from '@/components/converters/finance/LoanCalculator';
import { getFAQsByToolId } from '@/config/tool-faqs';
import { generateOptimizedKeywords } from '@/config/seo-keywords';

// Force static generation
export const dynamic = 'force-static';

const keywords = generateOptimizedKeywords('home-equity-loan-calculator', 'finance', 'Home Equity Loan Calculator');

export const metadata: Metadata = {
  title: 'Home Equity Loan Calculator - HELOC Calculator | InterConverter',
  description: 'Calculate home equity loan payments, available equity, and borrowing capacity based on home value with instant calculations.',
  keywords: keywords.join(', '),
  openGraph: {
    title: 'Home Equity Loan Calculator - HELOC Calculator',
    description: 'Professional home equity loan calculator for borrowing capacity. Calculate payments and available equity.',
    type: 'website',
    images: [
      {
        url: '/images/og-home-equity-loan-calculator.jpg',
        width: 1200,
        height: 630,
        alt: 'Home Equity Loan Calculator Tool'
      }
    ]
  },
  alternates: {
    canonical: '/finance/home-equity-loan-calculator'
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

export default function HomeEquityLoanCalculatorPage() {
  const faqs = getFAQsByToolId('home-equity-loan-calculator', 'finance');

  return (
    <EnhancedToolLayout
      title="Home Equity Loan Calculator"
      description="Calculate home equity loan payments and available borrowing capacity with instant calculations."
      keywords={keywords}
      toolId="home-equity-loan-calculator"
      category="finance"
      emoji="🏠"
      customHowToUse={[
        "Enter current home market value",
        "Input remaining mortgage balance owed",
        "Set desired loan amount to borrow",
        "Choose interest rate and loan term",
        "Calculate monthly payment and costs",
        "Review equity requirements and LTV limits"
      ]}
      customFeatures={[
        "Available equity calculation based on home value",
        "Loan-to-value ratio analysis and limits",
        "Monthly payment estimation with interest",
        "HELOC vs home equity loan comparison",
        "Interest rate impact and cost analysis",
        "Borrowing capacity and qualification assessment"
      ]}
      faqs={faqs}
    >
      <LoanCalculator />
    </EnhancedToolLayout>
  );
}
