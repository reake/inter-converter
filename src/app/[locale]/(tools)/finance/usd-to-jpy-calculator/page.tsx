import { Metadata } from 'next';
import { ToolLayout, generateToolMetadata } from '@/components/tools/ToolLayout';
import { CurrencyConverter } from '@/components/converters/finance/CurrencyConverter';

// Force static generation
export const dynamic = 'force-static';

export const metadata: Metadata = generateToolMetadata(
  'USD to JPY Calculator',
  'Convert US Dollars to Japanese Yen with real-time exchange rates. Calculate USD to JPY currency conversion for Japan travel and business.',
  'usd-to-jpy-calculator',
  [
    'USD to JPY calculator',
    'dollar to yen calculator',
    'USD JPY converter',
    'US dollar Japanese yen exchange rate',
    'currency converter USD JPY'
  ],
  'currency'
);

export default function USDToJPYCalculatorPage() {
  return (
    <ToolLayout
      title="USD to JPY Calculator"
      description="Convert US Dollars to Japanese Yen with live exchange rates and historical data for accurate currency conversion"
      toolId="usd-to-jpy-calculator"
      category="currency"
      emoji="💴"
      customHowToUse={[
        "Enter the USD amount to convert",
        "View current USD to JPY exchange rate",
        "Calculate equivalent JPY amount",
        "Check historical rate trends",
        "Compare with other Asian currencies",
        "Get conversion for Japan travel or business"
      ]}
      customFeatures={[
        "Live USD/JPY exchange rates",
        "Historical rate charts",
        "Bank of Japan policy impact",
        "Travel expense calculations",
        "Japan business transaction support",
        "Cross-rate comparisons"
      ]}
    >
      <CurrencyConverter />
    </ToolLayout>
  );
}
