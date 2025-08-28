import { Metadata } from 'next';
import { EnhancedToolLayout } from '@/components/tools/EnhancedToolLayout';
import CostOfLivingCalculator from '@/components/converters/finance/CostOfLivingCalculator';
import { getFAQsByToolId } from '@/config/tool-faqs';
import { generateOptimizedKeywords } from '@/config/seo-keywords';

// Force static generation
export const dynamic = 'force-static';

const keywords = generateOptimizedKeywords('cost-of-living-calculator', 'finance', 'Cost of Living Calculator');

export const metadata: Metadata = {
  title: 'Cost of Living Calculator - City Comparison | InterConverter',
  description: 'Compare cost of living between cities for home buying decisions. Calculate salary adjustments and housing affordability by location.',
  keywords: keywords.join(', '),
  openGraph: {
    title: 'Cost of Living Calculator - City Comparison',
    description: 'Professional cost of living calculator for relocation planning. Compare cities, calculate salary adjustments, and make informed decisions.',
    type: 'website',
    images: [
      {
        url: '/images/og-cost-of-living-calculator.jpg',
        width: 1200,
        height: 630,
        alt: 'Cost of Living Calculator Tool'
      }
    ]
  },
  alternates: {
    canonical: '/finance/cost-of-living-calculator'
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

export default function CostOfLivingCalculatorPage() {
  const faqs = getFAQsByToolId('cost-of-living-calculator', 'finance');

  return (
    <EnhancedToolLayout
      title="Cost of Living Calculator"
      description="Compare cost of living between different cities to make informed home buying and relocation decisions."
      keywords={keywords}
      toolId="cost-of-living-calculator"
      category="finance"
      emoji="🏙️"
      customHowToUse={[
        "Select your current city and target city",
        "Enter your current salary and expenses",
        "Compare housing costs between locations",
        "Calculate required salary adjustment",
        "Analyze total cost differences",
        "Make informed relocation decisions"
      ]}
      customFeatures={[
        "City-to-city cost comparison",
        "Housing affordability analysis",
        "Salary adjustment calculations",
        "Living expense breakdowns",
        "Quality of life factors",
        "Relocation decision support"
      ]}
      faqs={faqs}
    >
      <CostOfLivingCalculator />
    </EnhancedToolLayout>
  );
}
