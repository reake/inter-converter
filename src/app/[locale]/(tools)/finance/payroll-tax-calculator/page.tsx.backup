import { Metadata } from 'next';
import { EnhancedToolLayout } from '@/components/tools/EnhancedToolLayout';
import TaxCalculator from '@/components/converters/finance/TaxCalculator';
import { getFAQsByToolId } from '@/config/tool-faqs';
import { generateOptimizedKeywords } from '@/config/seo-keywords';

// Force static generation
export const dynamic = 'force-static';

const keywords = generateOptimizedKeywords('payroll-tax-calculator', 'finance', 'Payroll Tax Calculator');

export const metadata: Metadata = {
  title: 'Payroll Tax Calculator - Salary Tax & Withholding Calculator | InterConverter',
  description: 'Calculate payroll taxes and deductions. Estimate federal, state, and local tax withholdings from salary with instant calculations.',
  keywords: keywords.join(', '),
  openGraph: {
    title: 'Payroll Tax Calculator - Salary Tax & Withholding Calculator',
    description: 'Professional payroll tax calculator for salary planning. Calculate taxes, deductions, and net pay.',
    type: 'website',
    images: [
      {
        url: '/images/og-payroll-tax-calculator.jpg',
        width: 1200,
        height: 630,
        alt: 'Payroll Tax Calculator Tool'
      }
    ]
  },
  alternates: {
    canonical: '/finance/payroll-tax-calculator'
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

export default function PayrollTaxCalculatorPage() {
  const faqs = getFAQsByToolId('payroll-tax-calculator', 'finance');

  return (
    <EnhancedToolLayout
      title="Payroll Tax Calculator"
      description="Calculate payroll taxes and deductions with instant calculations."
      keywords={keywords}
      toolId="payroll-tax-calculator"
      category="finance"
      emoji="💵"
      customHowToUse={[
        "Enter gross salary amount",
        "Select pay frequency (weekly/monthly)",
        "Input pre-tax deductions",
        "Calculate net take-home pay",
        "View detailed tax breakdown",
        "Compare different scenarios"
      ]}
      customFeatures={[
        "Comprehensive payroll tax calculation",
        "Federal tax withholding estimation",
        "State and local tax calculation",
        "FICA tax computation (Social Security/Medicare)",
        "Accurate net pay estimation",
        "Detailed tax breakdown analysis"
      ]}
      faqs={faqs}
    >
      <TaxCalculator />
    </EnhancedToolLayout>
  );
}
