import { Metadata } from 'next';
import { EnhancedToolLayout } from '@/components/tools/EnhancedToolLayout';
import CurrencyConverter from '@/components/converters/finance/CurrencyConverter';
import { getFAQsByToolId } from '@/config/tool-faqs';
import { generateOptimizedKeywords } from '@/config/seo-keywords';

// Force static generation
export const dynamic = 'force-static';

const keywords = generateOptimizedKeywords('usd-to-jpy-calculator', 'finance', 'USD to JPY Calculator');

export const metadata: Metadata = {
  title: 'USD to JPY Calculator - Dollar to Yen Converter | InterConverter',
  description: 'Convert US Dollars to Japanese Yen with real-time exchange rates. Get accurate USD to JPY conversion with instant calculations.',
  keywords: keywords.join(', '),
  openGraph: {
    title: 'USD to JPY Calculator - Dollar to Yen Converter',
    description: 'Professional USD to JPY currency converter with real-time exchange rates. Convert dollars to yen instantly.',
    type: 'website',
    images: [
      {
        url: '/images/og-usd-to-jpy-calculator.jpg',
        width: 1200,
        height: 630,
        alt: 'USD to JPY Calculator Tool'
      }
    ]
  },
  alternates: {
    canonical: '/finance/usd-to-jpy-calculator'
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

export default function USDToJPYCalculatorPage() {
  const faqs = getFAQsByToolId('usd-to-jpy-calculator', 'finance');

  return (
    <EnhancedToolLayout
      title="USD to JPY Calculator"
      description="Convert US Dollars to Japanese Yen with real-time exchange rates and instant calculations."
      keywords={keywords}
      toolId="usd-to-jpy-calculator"
      category="finance"
      emoji="💱"
      customHowToUse={[
        "Enter USD amount to convert",
        "View current USD/JPY exchange rate",
        "Get instant JPY conversion result",
        "Check historical rate trends",
        "Compare with other currency pairs",
        "Set up rate change alerts"
      ]}
      customFeatures={[
        "Real-time USD to JPY exchange rates",
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
