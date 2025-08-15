import { Metadata } from 'next';
import { ToolLayout, generateToolMetadata } from '@/components/tools/ToolLayout';
import { CurrencyConverter } from '@/components/converters/CurrencyConverter';




// Force static generation
export const dynamic = 'force-static';
export const metadata: Metadata = generateToolMetadata(
  'Currency Converter',
  'Convert 150+ currencies with live exchange rates. Free, accurate, instant results. USD, EUR, GBP, JPY & more. No registration required.',
  'currency-converter',
  [
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
  ],
  'finance'
);

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