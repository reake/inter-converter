import { Metadata } from 'next';
import { EnhancedToolLayout } from '@/components/tools/EnhancedToolLayout';
import InvestmentCalculator from '@/components/converters/finance/InvestmentCalculator';
import { getFAQsByToolId } from '@/config/tool-faqs';
import { generateOptimizedKeywords } from '@/config/seo-keywords';

// Force static generation
export const dynamic = 'force-static';

const keywords = generateOptimizedKeywords('dividend-calculator', 'finance', 'Dividend Calculator');

export const metadata: Metadata = {
  title: 'Dividend Calculator - Income & Yield Analysis | InterConverter',
  description: 'Calculate dividend income and yields from dividend-paying stocks. Plan dividend investment strategies and income projections with professional accuracy.',
  keywords: keywords.join(', '),
  openGraph: {
    title: 'Dividend Calculator - Income & Yield Analysis',
    description: 'Professional dividend calculator for investment planning. Calculate dividend income, yields, and growth potential from dividend-paying stocks.',
    type: 'website',
    images: [
      {
        url: '/images/og-dividend-calculator.jpg',
        width: 1200,
        height: 630,
        alt: 'Dividend Calculator Tool'
      }
    ]
  },
  alternates: {
    canonical: '/finance/dividend-calculator'
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

export default function DividendCalculatorPage() {
  const faqs = getFAQsByToolId('dividend-calculator', 'finance');

  return (
    <EnhancedToolLayout
      title="Dividend Calculator"
      description="Calculate dividend income, yields, and growth potential from dividend-paying stock investments."
      keywords={keywords}
      toolId="dividend-calculator"
      category="finance"
      emoji="💰"
      customHowToUse={[
        "Enter stock price and dividend per share",
        "Input number of shares owned",
        "Set dividend payment frequency",
        "Calculate annual dividend income",
        "Analyze dividend yield percentage",
        "Project dividend growth scenarios"
      ]}
      customFeatures={[
        "Dividend yield calculations",
        "Annual income projections",
        "Dividend growth modeling",
        "Reinvestment scenarios",
        "Tax implications analysis",
        "Dividend aristocrat tracking"
      ]}
      faqs={faqs}
    >
      <InvestmentCalculator />
    </EnhancedToolLayout>
  );
}
