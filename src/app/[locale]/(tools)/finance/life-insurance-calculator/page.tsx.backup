import { Metadata } from 'next';
import { EnhancedToolLayout } from '@/components/tools/EnhancedToolLayout';
import InsuranceCalculator from '@/components/converters/finance/InsuranceCalculator';
import { getFAQsByToolId } from '@/config/tool-faqs';
import { generateOptimizedKeywords } from '@/config/seo-keywords';

// Force static generation
export const dynamic = 'force-static';

const keywords = generateOptimizedKeywords('life-insurance-calculator', 'finance', 'Life Insurance Calculator');

export const metadata: Metadata = {
  title: 'Life Insurance Calculator - Coverage Needs Analysis | InterConverter',
  description: 'Calculate life insurance coverage needs and premium costs. Determine adequate protection for your family with instant calculations.',
  keywords: keywords.join(', '),
  openGraph: {
    title: 'Life Insurance Calculator - Coverage Needs Analysis',
    description: 'Professional life insurance calculator for coverage planning. Calculate needs and compare premium options.',
    type: 'website',
    images: [
      {
        url: '/images/og-life-insurance-calculator.jpg',
        width: 1200,
        height: 630,
        alt: 'Life Insurance Calculator Tool'
      }
    ]
  },
  alternates: {
    canonical: '/finance/life-insurance-calculator'
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

export default function LifeInsuranceCalculatorPage() {
  const faqs = getFAQsByToolId('life-insurance-calculator', 'finance');

  return (
    <EnhancedToolLayout
      title="Life Insurance Calculator"
      description="Calculate life insurance coverage needs and premium costs with instant calculations."
      keywords={keywords}
      toolId="life-insurance-calculator"
      category="finance"
      emoji="🛡️"
      customHowToUse={[
        "Enter annual household income",
        "Set monthly family expenses",
        "Input existing life insurance coverage",
        "Choose desired coverage period",
        "Calculate total coverage needed",
        "Compare term vs whole life premiums"
      ]}
      customFeatures={[
        "Life insurance needs calculation",
        "Coverage gap analysis and planning",
        "Premium cost estimation by age",
        "Term vs whole life comparison",
        "Family financial protection planning",
        "Income replacement calculation tools"
      ]}
      faqs={faqs}
    >
      <InsuranceCalculator />
    </EnhancedToolLayout>
  );
}
