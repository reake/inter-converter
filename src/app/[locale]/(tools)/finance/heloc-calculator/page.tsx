import { Metadata } from 'next';
import { EnhancedToolLayout } from '@/components/tools/EnhancedToolLayout';
import MortgageCalculator from '@/components/converters/finance/MortgageCalculator';
import { getFAQsByToolId } from '@/config/tool-faqs';
import { generateOptimizedKeywords } from '@/config/seo-keywords';

// Force static generation
export const dynamic = 'force-static';

const keywords = generateOptimizedKeywords('heloc-calculator', 'finance', 'HELOC Calculator');

export const metadata: Metadata = {
  title: 'HELOC Calculator - Home Equity Line of Credit | InterConverter',
  description: 'Calculate HELOC payments, credit limits, and interest costs. Home Equity Line of Credit calculator with draw and repayment periods.',
  keywords: keywords.join(', '),
  openGraph: {
    title: 'HELOC Calculator - Home Equity Line of Credit',
    description: 'Professional HELOC calculator for home equity lines of credit. Calculate payments, credit limits, and interest costs with draw periods.',
    type: 'website',
    images: [
      {
        url: '/images/og-heloc-calculator.jpg',
        width: 1200,
        height: 630,
        alt: 'HELOC Calculator Tool'
      }
    ]
  },
  alternates: {
    canonical: '/finance/heloc-calculator'
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

export default function HELOCCalculatorPage() {
  const faqs = getFAQsByToolId('heloc-calculator', 'finance');

  return (
    <EnhancedToolLayout
      title="HELOC Calculator"
      description="Calculate Home Equity Line of Credit payments, available credit limits, and total interest costs over draw and repayment periods."
      keywords={keywords}
      toolId="heloc-calculator"
      category="finance"
      emoji="🏠💳"
      customHowToUse={[
        "Enter your home's current market value",
        "Input your existing mortgage balance",
        "Set the HELOC credit limit (typically 80% LTV)",
        "Enter the variable interest rate",
        "Calculate interest-only payments during draw period",
        "Analyze principal + interest payments during repayment period"
      ]}
      customFeatures={[
        "Available credit limit calculation",
        "Interest-only draw period payments",
        "Principal + interest repayment calculations",
        "Variable rate impact analysis",
        "Payment shock assessment",
        "Total interest cost projections"
      ]}
      faqs={faqs}
    >
      <MortgageCalculator />
    </EnhancedToolLayout>
  );
}
