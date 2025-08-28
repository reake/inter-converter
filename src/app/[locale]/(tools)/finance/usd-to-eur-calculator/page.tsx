import { Metadata } from 'next';
import { ToolLayout, generateToolMetadata } from '@/components/tools/ToolLayout';
import CurrencyConverter from '@/components/converters/finance/CurrencyConverter';

// Force static generation
export const dynamic = 'force-static';

export const metadata: Metadata = generateToolMetadata(
  'USD to EUR Calculator',
  'Convert US Dollars to Euros with real-time exchange rates. Calculate USD to EUR currency conversion for travel and business.',
  'usd-to-eur-calculator',
  [
    'USD to EUR calculator',
    'dollar to euro calculator',
    'USD EUR converter',
    'US dollar euro exchange rate',
    'currency converter USD EUR'
  ],
  'currency'
);

export default function USDToEURCalculatorPage() {
  return (
    <ToolLayout
      title="USD to EUR Calculator"
      description="Convert US Dollars to Euros with live exchange rates and historical data for accurate currency conversion"
      toolId="usd-to-eur-calculator"
      category="currency"
      emoji="💱"
      customHowToUse={[
        "Enter the USD amount to convert",
        "View current USD to EUR exchange rate",
        "Calculate equivalent EUR amount",
        "Check historical rate trends",
        "Compare with other currency pairs",
        "Get conversion for travel or business"
      ]}
      customFeatures={[
        "Real-time exchange rates",
        "Historical rate charts",
        "Rate change notifications",
        "Conversion fee calculations",
        "Travel budget planning",
        "Business transaction support"
      ]}
    >
      <CurrencyConverter />
    </ToolLayout>
  );
}
