import { Metadata } from 'next';
import { ToolLayout, generateToolMetadata } from '@/components/tools/ToolLayout';
import CurrencyConverter from '@/components/converters/finance/CurrencyConverter';

// Force static generation
export const dynamic = 'force-static';

export const metadata: Metadata = generateToolMetadata(
  'USD to GBP Calculator',
  'Convert US Dollars to British Pounds with real-time exchange rates. Calculate USD to GBP currency conversion accurately.',
  'usd-to-gbp-calculator',
  [
    'USD to GBP calculator',
    'dollar to pound calculator',
    'USD GBP converter',
    'US dollar British pound exchange rate',
    'currency converter USD GBP'
  ],
  'currency'
);

export default function USDToGBPCalculatorPage() {
  return (
    <ToolLayout
      title="USD to GBP Calculator"
      description="Convert US Dollars to British Pounds with live exchange rates and historical data for accurate currency conversion"
      toolId="usd-to-gbp-calculator"
      category="currency"
      emoji="💷"
      customHowToUse={[
        "Enter the USD amount to convert",
        "View current USD to GBP exchange rate",
        "Calculate equivalent GBP amount",
        "Check historical rate trends",
        "Compare with other major currencies",
        "Get conversion for UK travel or business"
      ]}
      customFeatures={[
        "Live USD/GBP exchange rates",
        "Historical rate analysis",
        "Brexit impact tracking",
        "Bank fee calculations",
        "UK travel budget planning",
        "International business support"
      ]}
    >
      <CurrencyConverter />
    </ToolLayout>
  );
}
