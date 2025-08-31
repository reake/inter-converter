import { Metadata } from 'next';
import { EnhancedToolLayout } from '@/components/tools/EnhancedToolLayout';
import TaxCalculator from '@/components/converters/finance/TaxCalculator';
import { getFAQsByToolId } from '@/config/tool-faqs';
import { generateOptimizedKeywords } from '@/config/seo-keywords';

// Force static generation
export const dynamic = 'force-static';

const keywords = generateOptimizedKeywords('sales-tax-calculator', 'finance', 'Sales Tax Calculator');

export const metadata: Metadata = {
  title: 'Sales Tax Calculator - State & Local Tax Calculator | InterConverter',
  description: 'Calculate sales tax amounts and total costs. Determine tax rates for different states and localities with instant calculations.',
  keywords: keywords.join(', '),
  openGraph: {
    title: 'Sales Tax Calculator - State & Local Tax Calculator',
    description: 'Professional sales tax calculator for purchases. Calculate tax amounts and total costs by state and locality.',
    type: 'website',
    images: [
      {
        url: '/images/og-sales-tax-calculator.jpg',
        width: 1200,
        height: 630,
        alt: 'Sales Tax Calculator Tool'
      }
    ]
  },
  alternates: {
    canonical: '/finance/sales-tax-calculator'
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

export default function SalesTaxCalculatorPage() {
  const faqs = getFAQsByToolId('sales-tax-calculator', 'finance');

  return (
    <EnhancedToolLayout
      title="Sales Tax Calculator"
      description="Calculate sales tax amounts and total costs with instant calculations."
      keywords={keywords}
      toolId="sales-tax-calculator"
      category="finance"
      emoji="💰"
      customHowToUse={[
        "Enter purchase amount before tax",
        "Select state and location",
        "Input applicable tax rate",
        "Calculate tax amount instantly",
        "View total cost with tax",
        "Compare different tax rates"
      ]}
      customFeatures={[
        "Accurate sales tax calculation",
        "Comprehensive state tax rate database",
        "Local tax rate inclusion",
        "Tax-inclusive pricing options",
        "Multi-item purchase calculations",
        "Tax rate comparison tools"
      ]}
      faqs={faqs}
    >
      <TaxCalculator />
    </EnhancedToolLayout>
  );
}
