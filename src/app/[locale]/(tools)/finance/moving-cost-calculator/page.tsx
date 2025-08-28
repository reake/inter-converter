import { Metadata } from 'next';
import { EnhancedToolLayout } from '@/components/tools/EnhancedToolLayout';
import MovingCostCalculator from '@/components/converters/finance/MovingCostCalculator';
import { getFAQsByToolId } from '@/config/tool-faqs';
import { generateOptimizedKeywords } from '@/config/seo-keywords';

// Force static generation
export const dynamic = 'force-static';

const keywords = generateOptimizedKeywords('moving-cost-calculator', 'finance', 'Moving Cost Calculator');

export const metadata: Metadata = {
  title: 'Moving Cost Calculator - Relocation Expense Calculator | InterConverter',
  description: 'Calculate moving costs and relocation expenses. Estimate costs for local and long-distance moves with instant calculations.',
  keywords: keywords.join(', '),
  openGraph: {
    title: 'Moving Cost Calculator - Relocation Expense Calculator',
    description: 'Professional moving cost calculator for relocation planning. Calculate expenses for local and long-distance moves.',
    type: 'website',
    images: [
      {
        url: '/images/og-moving-cost-calculator.jpg',
        width: 1200,
        height: 630,
        alt: 'Moving Cost Calculator Tool'
      }
    ]
  },
  alternates: {
    canonical: '/finance/moving-cost-calculator'
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

export default function MovingCostCalculatorPage() {
  const faqs = getFAQsByToolId('moving-cost-calculator', 'finance');

  return (
    <EnhancedToolLayout
      title="Moving Cost Calculator"
      description="Calculate moving costs and relocation expenses with instant calculations."
      keywords={keywords}
      toolId="moving-cost-calculator"
      category="finance"
      emoji="📦"
      customHowToUse={[
        "Enter total move distance in miles",
        "Set home size and room count",
        "Choose required moving services",
        "Input additional moving costs",
        "Calculate total moving expense",
        "Compare different moving options"
      ]}
      customFeatures={[
        "Moving cost estimation by distance",
        "Detailed service cost breakdown",
        "Distance-based pricing calculations",
        "Additional expense tracking tools",
        "Comprehensive moving budget planning",
        "Moving company cost comparison"
      ]}
      faqs={faqs}
    >
      <MovingCostCalculator />
    </EnhancedToolLayout>
  );
}
