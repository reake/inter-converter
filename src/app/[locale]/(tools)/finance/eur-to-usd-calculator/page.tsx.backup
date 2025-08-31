import { Metadata } from 'next';
import { EnhancedToolLayout } from '@/components/tools/EnhancedToolLayout';
import CurrencyConverter from '@/components/converters/finance/CurrencyConverter';
import { getFAQsByToolId } from '@/config/tool-faqs';
import { generateOptimizedKeywords } from '@/config/seo-keywords';

// Force static generation
export const dynamic = 'force-static';

const keywords = generateOptimizedKeywords('eur-to-usd-calculator', 'finance', 'EUR to USD Calculator');

export const metadata: Metadata = {
  title: 'EUR to USD Calculator - Euro to Dollar Converter | InterConverter',
  description: 'Convert Euros to US Dollars with real-time exchange rates. Calculate EUR to USD currency conversion for travel and international transactions.',
  keywords: keywords.join(', '),
  openGraph: {
    title: 'EUR to USD Calculator - Euro to Dollar Converter',
    description: 'Professional EUR to USD calculator with live exchange rates. Convert Euros to US Dollars for travel, business, and international transactions.',
    type: 'website',
    images: [
      {
        url: '/images/og-eur-to-usd-calculator.jpg',
        width: 1200,
        height: 630,
        alt: 'EUR to USD Calculator Tool'
      }
    ]
  },
  alternates: {
    canonical: '/finance/eur-to-usd-calculator'
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

export default function EURToUSDCalculatorPage() {
  const faqs = getFAQsByToolId('eur-to-usd-calculator', 'finance');

  return (
    <EnhancedToolLayout
      title="EUR to USD Calculator"
      description="Convert Euros to US Dollars with live exchange rates and historical data for accurate currency conversion."
      keywords={keywords}
      toolId="eur-to-usd-calculator"
      category="finance"
      emoji="💶"
      customHowToUse={[
        "Enter the EUR amount to convert",
        "View current EUR to USD exchange rate",
        "Calculate equivalent USD amount",
        "Check historical rate trends",
        "Compare with other major currencies",
        "Get conversion for US travel or business"
      ]}
      customFeatures={[
        "Live EUR/USD exchange rates",
        "ECB policy impact tracking",
        "Historical rate analysis",
        "Cross-border fee calculations",
        "US travel budget planning",
        "International trade support"
      ]}
      faqs={faqs}
    >
      <CurrencyConverter />
    </EnhancedToolLayout>
  );
}
