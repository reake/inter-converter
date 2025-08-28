import { Metadata } from 'next';
import { ToolLayout, generateToolMetadata } from '@/components/tools/ToolLayout';
import CurrencyConverter from '@/components/converters/finance/CurrencyConverter';

// Force static generation
export const dynamic = 'force-static';

export const metadata: Metadata = generateToolMetadata(
  'Exchange Rate Calculator',
  'Calculate exchange rates between any two currencies with real-time data. Universal currency converter for all major world currencies.',
  'exchange-rate-calculator',
  [
    'exchange rate calculator',
    'currency exchange calculator',
    'universal currency converter',
    'foreign exchange calculator',
    'FX calculator'
  ],
  'currency'
);

export default function ExchangeRateCalculatorPage() {
  return (
    <ToolLayout
      title="Exchange Rate Calculator"
      description="Calculate exchange rates between any two currencies with real-time data and historical trends"
      toolId="exchange-rate-calculator"
      category="currency"
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
    >
      <CurrencyConverter />
    </ToolLayout>
  );
}
