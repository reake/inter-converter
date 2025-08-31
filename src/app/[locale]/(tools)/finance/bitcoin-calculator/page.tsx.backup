import { Metadata } from 'next';
import { EnhancedToolLayout } from '@/components/tools/EnhancedToolLayout';
import CurrencyConverter from '@/components/converters/finance/CurrencyConverter';
import { getFAQsByToolId } from '@/config/tool-faqs';
import { generateOptimizedKeywords } from '@/config/seo-keywords';

// Force static generation
export const dynamic = 'force-static';

const keywords = generateOptimizedKeywords('bitcoin-calculator', 'finance', 'Bitcoin Calculator');

export const metadata: Metadata = {
  title: 'Bitcoin Calculator - BTC to USD Converter | InterConverter',
  description: 'Convert Bitcoin to USD, EUR and other currencies with real-time BTC exchange rates. Calculate Bitcoin value and cryptocurrency conversions.',
  keywords: keywords.join(', '),
  openGraph: {
    title: 'Bitcoin Calculator - BTC to USD Converter',
    description: 'Professional Bitcoin calculator with real-time exchange rates. Convert BTC to major currencies and track cryptocurrency values.',
    type: 'website',
    images: [
      {
        url: '/images/og-bitcoin-calculator.jpg',
        width: 1200,
        height: 630,
        alt: 'Bitcoin Calculator Tool'
      }
    ]
  },
  alternates: {
    canonical: '/finance/bitcoin-calculator'
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

export default function BitcoinCalculatorPage() {
  const faqs = getFAQsByToolId('bitcoin-calculator', 'finance');

  return (
    <EnhancedToolLayout
      title="Bitcoin Calculator"
      description="Convert Bitcoin to major currencies with live exchange rates and track cryptocurrency value fluctuations."
      keywords={keywords}
      toolId="bitcoin-calculator"
      category="finance"
      emoji="₿"
      customHowToUse={[
        "Enter Bitcoin amount to convert",
        "View current BTC exchange rates",
        "Calculate value in USD, EUR, GBP",
        "Track price volatility",
        "Compare with other cryptocurrencies",
        "Monitor investment portfolio value"
      ]}
      customFeatures={[
        "Real-time Bitcoin prices",
        "Multiple fiat currency support",
        "Price volatility tracking",
        "Historical price charts",
        "Market cap information",
        "Portfolio value calculations"
      ]}
      faqs={faqs}
    >
      <CurrencyConverter />
    </EnhancedToolLayout>
  );
}
