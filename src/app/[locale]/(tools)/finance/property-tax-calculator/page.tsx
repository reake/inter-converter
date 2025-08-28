import { Metadata } from 'next';
import { EnhancedToolLayout } from '@/components/tools/EnhancedToolLayout';
import TaxCalculator from '@/components/converters/finance/TaxCalculator';
import { getFAQsByToolId } from '@/config/tool-faqs';
import { generateOptimizedKeywords } from '@/config/seo-keywords';

// Force static generation
export const dynamic = 'force-static';

const keywords = generateOptimizedKeywords('property-tax-calculator', 'finance', 'Property Tax Calculator');

export const metadata: Metadata = {
  title: 'Property Tax Calculator - Real Estate Tax Estimator | InterConverter',
  description: 'Calculate property tax amounts and rates. Estimate annual property taxes based on home value and location with instant calculations.',
  keywords: keywords.join(', '),
  openGraph: {
    title: 'Property Tax Calculator - Real Estate Tax Estimator',
    description: 'Professional property tax calculator for real estate. Calculate annual taxes based on home value and location.',
    type: 'website',
    images: [
      {
        url: '/images/og-property-tax-calculator.jpg',
        width: 1200,
        height: 630,
        alt: 'Property Tax Calculator Tool'
      }
    ]
  },
  alternates: {
    canonical: '/finance/property-tax-calculator'
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

export default function PropertyTaxCalculatorPage() {
  const faqs = getFAQsByToolId('property-tax-calculator', 'finance');

  return (
    <EnhancedToolLayout
      title="Property Tax Calculator"
      description="Calculate property tax amounts and rates with instant calculations."
      keywords={keywords}
      toolId="property-tax-calculator"
      category="finance"
      emoji="🏠"
      customHowToUse={[
        "Enter property assessed value",
        "Select state and locality",
        "Input local tax rate",
        "Calculate annual tax amount",
        "View monthly payment breakdown",
        "Compare different locations"
      ]}
      customFeatures={[
        "Accurate property tax calculation",
        "Location-based tax rates",
        "Annual and monthly breakdown",
        "Tax rate comparison tools",
        "Assessment value calculators",
        "Exemption and deduction calculations"
      ]}
      faqs={faqs}
    >
      <TaxCalculator />
    </EnhancedToolLayout>
  );
}
