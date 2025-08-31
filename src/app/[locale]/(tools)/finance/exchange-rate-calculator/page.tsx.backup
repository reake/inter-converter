import { Metadata } from 'next';
import { EnhancedToolLayout } from '@/components/tools/EnhancedToolLayout';
import CurrencyConverter from '@/components/converters/finance/CurrencyConverter';
import { getFAQsByToolId } from '@/config/tool-faqs';
import { generateOptimizedKeywords } from '@/config/seo-keywords';

// Force static generation
export const dynamic = 'force-static';

const keywords = generateOptimizedKeywords('exchange-rate-calculator', 'finance', 'Exchange Rate Calculator');

export const metadata: Metadata = {
  title: 'Exchange Rate Calculator - Currency Converter | InterConverter',
  description: 'Calculate exchange rates between any two currencies with real-time data. Universal currency converter for all major world currencies.',
  keywords: keywords.join(', '),
  openGraph: {
    title: 'Exchange Rate Calculator - Currency Converter',
    description: 'Professional exchange rate calculator with real-time data. Convert between 200+ world currencies with live rates and historical trends.',
    type: 'website',
    images: [
      {
        url: '/images/og-exchange-rate-calculator.jpg',
        width: 1200,
        height: 630,
        alt: 'Exchange Rate Calculator Tool'
      }
    ]
  },
  alternates: {
    canonical: '/finance/exchange-rate-calculator'
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

export default function ExchangeRateCalculatorPage() {
  const faqs = getFAQsByToolId('exchange-rate-calculator', 'finance');

  return (
    <EnhancedToolLayout
      title="Exchange Rate Calculator"
      description="Calculate exchange rates between any two currencies with real-time data and historical trends."
      keywords={keywords}
      toolId="exchange-rate-calculator"
      category="finance"
      emoji="🌍"
      customHowToUse={[
        "Select source and target currencies",
        "Enter amount to convert",
        "View current exchange rate",
        "Calculate converted amount",
        "Check historical rate trends",
        "Compare multiple currency pairs"
      ]}
      customFeatures={[
        "200+ world currencies support",
        "Real-time exchange rates",
        "Historical rate charts",
        "Cross-rate calculations",
        "Central bank rate tracking",
        "Travel and business planning"
      ]}
      faqs={faqs}
    >
      <CurrencyConverter />
    </EnhancedToolLayout>
  );
}
