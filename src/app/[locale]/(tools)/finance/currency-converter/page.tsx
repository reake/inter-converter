import { Metadata } from 'next';
import { ToolLayout } from '@/components/tools/ToolLayout';
import CurrencyConverter from '@/components/converters/finance/CurrencyConverter';




// Force static generation
export const dynamic = 'force-static';
const title = 'Currency Converter';
const description = 'Convert 150+ currencies with live exchange rates. Free, accurate, instant results. USD, EUR, GBP, JPY & more. No registration required.';
const keywordsArr = [
  'currency converter',
  'live exchange rates',
  'usd to eur converter',
  'gbp to usd converter',
  'real time currency converter',
  'forex converter',
  'money converter',
  'currency exchange calculator',
  'international currency converter',
  'free currency converter'
];

export const metadata: Metadata = {
  title: `${title} | InterConverter`,
  description,
  keywords: keywordsArr.join(', '),
  openGraph: {
    title: `${title} | InterConverter`,
    description,
    type: 'website',
  },
  alternates: { canonical: '/finance/currency-converter' }
};

export default function CurrencyConverterPage() {
  return (
    <ToolLayout
      title="Currency Converter"
      description="Convert between 150+ currencies with real-time exchange rates. Get accurate currency conversion for travel, business, and trading."
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
        "Popular currency pairs and trends"
      ]}
    >
      <CurrencyConverter />
    </ToolLayout>
  );
}