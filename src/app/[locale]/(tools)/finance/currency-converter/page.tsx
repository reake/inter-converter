import { Metadata } from 'next';
import { EnhancedToolLayout } from '@/components/tools/EnhancedToolLayout';
import CurrencyConverter from '@/components/converters/finance/CurrencyConverter';
import { getFAQsByToolId } from '@/config/tool-faqs';
import { generateOptimizedKeywords } from '@/config/seo-keywords';

// Force static generation
export const dynamic = 'force-static';

const keywords = generateOptimizedKeywords('currency-converter', 'finance', 'Currency Converter');

export const metadata: Metadata = {
  title: 'Currency Converter - Live Exchange Rates for 150+ Currencies | InterConverter',
  description: 'Convert 150+ currencies with live exchange rates. Free, accurate, instant results. USD, EUR, GBP, JPY & more. No registration required.',
  keywords: keywords.join(', '),
  openGraph: {
    title: 'Currency Converter - Live Exchange Rates for 150+ Currencies',
    description: 'Professional currency converter with real-time exchange rates. Convert between 150+ currencies including USD, EUR, GBP, JPY and cryptocurrencies.',
    type: 'website',
    images: [
      {
        url: '/images/og-currency-converter.jpg',
        width: 1200,
        height: 630,
        alt: 'Currency Converter Tool'
      }
    ]
  },
  alternates: {
    canonical: '/finance/currency-converter'
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

export default function CurrencyConverterPage() {
  const faqs = getFAQsByToolId('currency-converter', 'finance');

  return (
    <EnhancedToolLayout
      title="Currency Converter"
      description="Convert between 150+ currencies with real-time exchange rates. Get accurate currency conversion for travel, business, and trading."
      keywords={keywords}
      toolId="currency-converter"
      category="finance"
      emoji="💱"
      customHowToUse={[
        "Enter the amount you want to convert",
        "Select the source currency (what you have)",
        "Select the target currency (what you want)",
        "View the converted amount instantly with current exchange rates"
      ]}
      customFeatures={[
        "Real-time exchange rates for 150+ currencies",
        "Support for major cryptocurrencies",
        "Historical exchange rate data",
        "Popular currency pairs and trends",
        "Professional trading accuracy"
      ]}
      faqs={faqs}
    >
      <CurrencyConverter />
    </EnhancedToolLayout>
  );
}