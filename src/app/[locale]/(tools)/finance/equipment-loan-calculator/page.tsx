import { Metadata } from 'next';
import { EnhancedToolLayout } from '@/components/tools/EnhancedToolLayout';
import LoanCalculator from '@/components/converters/finance/LoanCalculator';
import { getFAQsByToolId } from '@/config/tool-faqs';
import { generateOptimizedKeywords } from '@/config/seo-keywords';

// Force static generation
export const dynamic = 'force-static';

const keywords = generateOptimizedKeywords('equipment-loan-calculator', 'finance', 'Equipment Loan Calculator');

export const metadata: Metadata = {
  title: 'Equipment Loan Calculator - Business Financing | InterConverter',
  description: 'Calculate equipment financing payments for business machinery, tools, and equipment purchases. Compare lease vs buy options.',
  keywords: keywords.join(', '),
  openGraph: {
    title: 'Equipment Loan Calculator - Business Financing',
    description: 'Professional equipment loan calculator for business financing. Calculate payments for machinery, tools, and equipment with lease comparisons.',
    type: 'website',
    images: [
      {
        url: '/images/og-equipment-loan-calculator.jpg',
        width: 1200,
        height: 630,
        alt: 'Equipment Loan Calculator Tool'
      }
    ]
  },
  alternates: {
    canonical: '/finance/equipment-loan-calculator'
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

export default function EquipmentLoanCalculatorPage() {
  const faqs = getFAQsByToolId('equipment-loan-calculator', 'finance');

  return (
    <EnhancedToolLayout
      title="Equipment Loan Calculator"
      description="Calculate financing payments for business equipment, machinery, and tools with various loan and lease options."
      keywords={keywords}
      toolId="equipment-loan-calculator"
      category="finance"
      emoji="🔧"
      customHowToUse={[
        "Enter equipment purchase price",
        "Input down payment amount",
        "Set loan term and interest rate",
        "Compare loan vs lease options",
        "Calculate monthly payments",
        "Analyze tax benefits and depreciation"
      ]}
      customFeatures={[
        "Loan vs lease comparison",
        "Tax benefit calculations",
        "Depreciation considerations",
        "Seasonal payment options",
        "Equipment value tracking",
        "ROI analysis tools"
      ]}
      faqs={faqs}
    >
      <LoanCalculator />
    </EnhancedToolLayout>
  );
}
