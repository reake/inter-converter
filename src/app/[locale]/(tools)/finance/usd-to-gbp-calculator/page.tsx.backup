import { Metadata } from 'next';
import { EnhancedToolLayout } from '@/components/tools/EnhancedToolLayout';
import CurrencyConverter from '@/components/converters/finance/CurrencyConverter';
import { getFAQsByToolId } from '@/config/tool-faqs';
import { generateOptimizedKeywords } from '@/config/seo-keywords';

// Force static generation
export const dynamic = 'force-static';

const keywords = generateOptimizedKeywords('usd-to-gbp-calculator', 'finance', 'USD to GBP Calculator');

export const metadata: Metadata = {
  title: 'USD to GBP Calculator - Dollar to Pound Converter | InterConverter',
  description: 'Convert US Dollars to British Pounds with real-time exchange rates. Get accurate USD to GBP conversion with instant calculations.',
  keywords: keywords.join(', '),
  openGraph: {
    title: 'USD to GBP Calculator - Dollar to Pound Converter',
    description: 'Professional USD to GBP currency converter with real-time exchange rates. Convert dollars to pounds instantly.',
    type: 'website',
    images: [
      {
        url: '/images/og-usd-to-gbp-calculator.jpg',
        width: 1200,
        height: 630,
        alt: 'USD to GBP Calculator Tool'
      }
    ]
  },
  alternates: {
    canonical: '/finance/usd-to-gbp-calculator'
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

export default function USDToGBPCalculatorPage() {
  const faqs = getFAQsByToolId('usd-to-gbp-calculator', 'finance');

  return (
    <EnhancedToolLayout
      title="USD to GBP Calculator"
      description="Convert US Dollars to British Pounds with real-time exchange rates and instant calculations."
      keywords={keywords}
      toolId="usd-to-gbp-calculator"
      category="finance"
      emoji="💱"
      customHowToUse={[
        "Enter USD amount to convert",
        "View current USD/GBP exchange rate",
        "Get instant GBP conversion result",
        "Check historical rate trends",
        "Compare with other currency pairs",
        "Set up rate change alerts"
      ]}
      customFeatures={[
        "Real-time USD to GBP exchange rates",
        "Historical exchange rate charts",
        "Rate change notifications and alerts",
        "Multiple currency pair support",
        "Conversion history tracking",
        "Market analysis and trend tools"
      ]}
      faqs={faqs}
    >
      <CurrencyConverter />
    </EnhancedToolLayout>
  );
}
