import { Metadata } from 'next';
import { EnhancedToolLayout } from '@/components/tools/EnhancedToolLayout';
import InsuranceCalculator from '@/components/converters/finance/InsuranceCalculator';
import { getFAQsByToolId } from '@/config/tool-faqs';
import { generateOptimizedKeywords } from '@/config/seo-keywords';

// Force static generation
export const dynamic = 'force-static';

const keywords = generateOptimizedKeywords('auto-insurance-calculator', 'finance', 'Auto Insurance Calculator');

export const metadata: Metadata = {
  title: 'Auto Insurance Calculator - Car Insurance Premium Calculator | InterConverter',
  description: 'Calculate auto insurance premiums and coverage costs. Compare liability, collision, and comprehensive coverage options with instant calculations.',
  keywords: keywords.join(', '),
  openGraph: {
    title: 'Auto Insurance Calculator - Car Insurance Premium Calculator',
    description: 'Professional auto insurance calculator for premium estimation. Compare coverage options and calculate insurance costs.',
    type: 'website',
    images: [
      {
        url: '/images/og-auto-insurance-calculator.jpg',
        width: 1200,
        height: 630,
        alt: 'Auto Insurance Calculator Tool'
      }
    ]
  },
  alternates: {
    canonical: '/finance/auto-insurance-calculator'
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

export default function AutoInsuranceCalculatorPage() {
  const faqs = getFAQsByToolId('auto-insurance-calculator', 'finance');

  return (
    <EnhancedToolLayout
      title="Auto Insurance Calculator"
      description="Calculate auto insurance premiums and coverage costs with instant calculations."
      keywords={keywords}
      toolId="auto-insurance-calculator"
      category="finance"
      emoji="🚗"
      customHowToUse={[
        "Enter vehicle make, model, and year",
        "Select desired coverage types and limits",
        "Set deductible amounts for each coverage",
        "Input driver details and history",
        "Calculate estimated premium costs",
        "Compare different coverage options"
      ]}
      customFeatures={[
        "Auto insurance premium calculation",
        "Coverage comparison and analysis tools",
        "Deductible impact on premium costs",
        "Multi-vehicle and multi-driver discounts",
        "Driver profile risk assessment",
        "State-specific insurance requirements"
      ]}
      faqs={faqs}
    >
      <InsuranceCalculator />
    </EnhancedToolLayout>
  );
}
