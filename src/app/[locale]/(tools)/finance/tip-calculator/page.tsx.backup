import { Metadata } from 'next';
import { EnhancedToolLayout } from '@/components/tools/EnhancedToolLayout';
import TipCalculator from '@/components/converters/finance/TipCalculator';
import { getFAQsByToolId } from '@/config/tool-faqs';
import { generateOptimizedKeywords } from '@/config/seo-keywords';

// Force static generation
export const dynamic = 'force-static';

const keywords = generateOptimizedKeywords('tip-calculator', 'finance', 'Tip Calculator');

export const metadata: Metadata = {
  title: 'Tip Calculator - Gratuity & Bill Split Calculator | InterConverter',
  description: 'Calculate tips and split bills easily. Determine appropriate tip amounts for restaurants and services with instant calculations.',
  keywords: keywords.join(', '),
  openGraph: {
    title: 'Tip Calculator - Gratuity & Bill Split Calculator',
    description: 'Professional tip calculator for restaurants and services. Calculate gratuity and split bills instantly.',
    type: 'website',
    images: [
      {
        url: '/images/og-tip-calculator.jpg',
        width: 1200,
        height: 630,
        alt: 'Tip Calculator Tool'
      }
    ]
  },
  alternates: {
    canonical: '/finance/tip-calculator'
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

export default function TipCalculatorPage() {
  const faqs = getFAQsByToolId('tip-calculator', 'finance');

  return (
    <EnhancedToolLayout
      title="Tip Calculator"
      description="Calculate tips and split bills easily with instant calculations."
      keywords={keywords}
      toolId="tip-calculator"
      category="finance"
      emoji="🧾"
      customHowToUse={[
        "Enter total bill amount",
        "Select tip percentage rate",
        "Set number of people sharing",
        "Calculate tip amount instantly",
        "Split bill evenly among group",
        "View total cost per person"
      ]}
      customFeatures={[
        "Accurate tip percentage calculation",
        "Smart bill splitting functionality",
        "Custom tip percentage options",
        "Detailed per-person cost breakdown",
        "Service quality tipping guidelines",
        "Multiple currency format support"
      ]}
      faqs={faqs}
    >
      <TipCalculator />
    </EnhancedToolLayout>
  );
}
