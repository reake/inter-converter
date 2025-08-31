import { Metadata } from 'next';
import { EnhancedToolLayout } from '@/components/tools/EnhancedToolLayout';
import SavingsCalculator from '@/components/converters/finance/SavingsCalculator';
import { getFAQsByToolId } from '@/config/tool-faqs';
import { generateOptimizedKeywords } from '@/config/seo-keywords';

// Force static generation
export const dynamic = 'force-static';

const keywords = generateOptimizedKeywords('annuity-calculator', 'finance', 'Annuity Calculator');

export const metadata: Metadata = {
  title: 'Annuity Calculator - Retirement Income Planning | InterConverter',
  description: 'Calculate annuity payments and retirement income streams. Compare immediate and deferred annuity options for guaranteed income.',
  keywords: keywords.join(', '),
  openGraph: {
    title: 'Annuity Calculator - Retirement Income Calculator',
    description: 'Professional annuity calculator for retirement income planning. Calculate immediate and deferred annuity payments and values.',
    type: 'website',
    images: [
      {
        url: '/images/og-annuity-calculator.jpg',
        width: 1200,
        height: 630,
        alt: 'Annuity Calculator Tool'
      }
    ]
  },
  alternates: {
    canonical: '/finance/annuity-calculator'
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

export default function AnnuityCalculatorPage() {
  const faqs = getFAQsByToolId('annuity-calculator', 'finance');

  return (
    <EnhancedToolLayout
      title="Annuity Calculator"
      description="Calculate annuity payments and values for retirement income planning with instant calculations."
      keywords={keywords}
      toolId="annuity-calculator"
      category="finance"
      emoji="📊"
      customHowToUse={[
        "Choose annuity type (immediate or deferred)",
        "Enter principal amount or premium payment",
        "Set interest rate and payment frequency",
        "Specify payment period or annuity term",
        "Calculate annuity payments or present value",
        "Compare different annuity options and scenarios"
      ]}
      customFeatures={[
        "Immediate and deferred annuity calculations",
        "Present value and future value analysis",
        "Multiple payment frequency options",
        "Interest rate sensitivity analysis",
        "Retirement income planning tools",
        "Annuity comparison and optimization"
      ]}
      faqs={faqs}
    >
      <SavingsCalculator />
    </EnhancedToolLayout>
  );
}
