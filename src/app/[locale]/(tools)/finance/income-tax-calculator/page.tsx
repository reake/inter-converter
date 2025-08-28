import { Metadata } from 'next';
import { EnhancedToolLayout } from '@/components/tools/EnhancedToolLayout';
import TaxCalculator from '@/components/converters/finance/TaxCalculator';
import { getFAQsByToolId } from '@/config/tool-faqs';
import { generateOptimizedKeywords } from '@/config/seo-keywords';

// Force static generation
export const dynamic = 'force-static';

const keywords = generateOptimizedKeywords('income-tax-calculator', 'finance', 'Income Tax Calculator');

export const metadata: Metadata = {
  title: 'Income Tax Calculator - Federal & State Tax Calculator | InterConverter',
  description: 'Calculate federal and state income tax liability. Estimate tax refunds and plan tax withholdings with instant calculations.',
  keywords: keywords.join(', '),
  openGraph: {
    title: 'Income Tax Calculator - Federal & State Tax Calculator',
    description: 'Professional income tax calculator for federal and state taxes. Calculate liability, refunds, and plan withholdings.',
    type: 'website',
    images: [
      {
        url: '/images/og-income-tax-calculator.jpg',
        width: 1200,
        height: 630,
        alt: 'Income Tax Calculator Tool'
      }
    ]
  },
  alternates: {
    canonical: '/finance/income-tax-calculator'
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

export default function IncomeTaxCalculatorPage() {
  const faqs = getFAQsByToolId('income-tax-calculator', 'finance');

  return (
    <EnhancedToolLayout
      title="Income Tax Calculator"
      description="Calculate federal and state income tax liability with instant calculations."
      keywords={keywords}
      toolId="income-tax-calculator"
      category="finance"
      emoji="💰"
      customHowToUse={[
        "Enter total annual income amount",
        "Select appropriate filing status",
        "Input standard or itemized deductions",
        "Choose current tax year",
        "Calculate total tax liability",
        "Review detailed tax breakdown"
      ]}
      customFeatures={[
        "Federal income tax calculation",
        "State tax estimation by location",
        "Tax bracket analysis and optimization",
        "Deduction comparison and planning",
        "Tax refund estimation tools",
        "Withholding adjustment planning"
      ]}
      faqs={faqs}
    >
      <TaxCalculator />
    </EnhancedToolLayout>
  );
}
