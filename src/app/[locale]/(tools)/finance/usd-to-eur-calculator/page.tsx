import { Metadata } from 'next';
import { EnhancedToolLayout } from '@/components/tools/EnhancedToolLayout';
import CurrencyConverter from '@/components/converters/finance/CurrencyConverter';
import { getFAQsByToolId } from '@/config/tool-faqs';
import { generateOptimizedKeywords } from '@/config/seo-keywords';

// Force static generation
export const dynamic = 'force-static';

const keywords = generateOptimizedKeywords('usd-to-eur-calculator', 'finance', 'USD to EUR Calculator');

export const metadata: Metadata = {
  title: 'USD to EUR Calculator - Dollar to Euro Converter | InterConverter',
  description: 'Convert US Dollars to Euros with real-time exchange rates. Get accurate USD to EUR conversion with instant calculations.',
  keywords: keywords.join(', '),
  openGraph: {
    title: 'USD to EUR Calculator - Dollar to Euro Converter',
    description: 'Professional USD to EUR currency converter with real-time exchange rates. Convert dollars to euros instantly.',
    type: 'website',
    images: [
      {
        url: '/images/og-usd-to-eur-calculator.jpg',
        width: 1200,
        height: 630,
        alt: 'USD to EUR Calculator Tool'
      }
    ]
  },
  alternates: {
    canonical: '/finance/usd-to-eur-calculator'
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

export default function USDToEURCalculatorPage() {
  const faqs = getFAQsByToolId('usd-to-eur-calculator', 'finance');

  return (
    <EnhancedToolLayout
      title="USD to EUR Calculator"
      description="Convert US Dollars to Euros with real-time exchange rates and instant calculations."
      keywords={keywords}
      toolId="usd-to-eur-calculator"
      category="finance"
      emoji="💱"
      customHowToUse={[
        "Enter USD amount to convert",
        "View current USD/EUR exchange rate",
        "Get instant EUR conversion result",
        "Check historical rate trends",
        "Compare with other currency pairs",
        "Set up rate change alerts"
      ]}
      customFeatures={[
        "Real-time USD to EUR exchange rates",
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
