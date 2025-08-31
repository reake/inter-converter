import { Metadata } from 'next';
import { EnhancedToolLayout } from '@/components/tools/EnhancedToolLayout';
import InvestmentCalculator from '@/components/converters/finance/InvestmentCalculator';
import { getFAQsByToolId } from '@/config/tool-faqs';
import { generateOptimizedKeywords } from '@/config/seo-keywords';

// Force static generation
export const dynamic = 'force-static';

const keywords = generateOptimizedKeywords('bond-calculator', 'finance', 'Bond Calculator');

export const metadata: Metadata = {
  title: 'Bond Calculator - Yield & Price Analysis | InterConverter',
  description: 'Calculate bond yields, prices, and returns. Analyze government and corporate bond investments with maturity calculations.',
  keywords: keywords.join(', '),
  openGraph: {
    title: 'Bond Calculator - Yield & Price Analysis',
    type: 'website',
    images: [
      {
        url: '/images/og-bond-calculator.jpg',
        width: 1200,
        height: 630,
        alt: 'Bond Calculator Tool'
      }
    ]
  },
  alternates: {
    canonical: '/finance/bond-calculator'
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

export default function BondCalculatorPage() {
  const faqs = getFAQsByToolId('bond-calculator', 'finance');

  return (
    <EnhancedToolLayout
      title="Bond Calculator"
      description="Calculate bond yield, price, and investment returns with instant calculations."
      keywords={keywords}
      toolId="bond-calculator"
      category="finance"
      emoji="💸"
      customHowToUse={[
        "Enter bond face value and par amount",
        "Set coupon rate and payment frequency",
        "Input current market price or yield",
        "Specify maturity date and time to maturity",
        "Calculate yield to maturity instantly",
        "Analyze bond investment returns and risks"
      ]}
      customFeatures={[
        "Bond yield to maturity calculation",
        "Current yield and capital gains analysis",
        "Bond price valuation and fair value",
        "Duration and convexity risk metrics",
        "Interest rate sensitivity analysis",
        "Investment return and income projections"
      ]}
      faqs={faqs}
    >
      <InvestmentCalculator />
    </EnhancedToolLayout>
  );
}
