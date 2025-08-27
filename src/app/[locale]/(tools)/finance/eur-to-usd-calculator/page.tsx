import { Metadata } from 'next';
import { ToolLayout, generateToolMetadata } from '@/components/tools/ToolLayout';
import { CurrencyConverter } from '@/components/converters/finance/CurrencyConverter';

// Force static generation
export const dynamic = 'force-static';

export const metadata: Metadata = generateToolMetadata(
  'EUR to USD Calculator',
  'Convert Euros to US Dollars with real-time exchange rates. Calculate EUR to USD currency conversion for travel and international transactions.',
  'eur-to-usd-calculator',
  [
    'EUR to USD calculator',
    'euro to dollar calculator',
    'EUR USD converter',
    'euro US dollar exchange rate',
    'currency converter EUR USD'
  ],
  'currency'
);

export default function EURToUSDCalculatorPage() {
  return (
    <ToolLayout
      title="EUR to USD Calculator"
      description="Convert Euros to US Dollars with live exchange rates and historical data for accurate currency conversion"
      toolId="eur-to-usd-calculator"
      category="currency"
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
    >
      <CurrencyConverter />
    </ToolLayout>
  );
}
