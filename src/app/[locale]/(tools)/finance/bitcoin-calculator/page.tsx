import { Metadata } from 'next';
import { ToolLayout, generateToolMetadata } from '@/components/tools/ToolLayout';
import { CurrencyConverter } from '@/components/converters/finance/CurrencyConverter';

// Force static generation
export const dynamic = 'force-static';

export const metadata: Metadata = generateToolMetadata(
  'Bitcoin Calculator',
  'Convert Bitcoin to USD, EUR and other currencies with real-time BTC exchange rates. Calculate Bitcoin value and cryptocurrency conversions.',
  'bitcoin-calculator',
  [
    'bitcoin calculator',
    'BTC calculator',
    'bitcoin to USD calculator',
    'cryptocurrency calculator',
    'bitcoin converter'
  ],
  'currency'
);

export default function BitcoinCalculatorPage() {
  return (
    <ToolLayout
      title="Bitcoin Calculator"
      description="Convert Bitcoin to major currencies with live exchange rates and track cryptocurrency value fluctuations"
      toolId="bitcoin-calculator"
      category="currency"
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
    >
      <CurrencyConverter />
    </ToolLayout>
  );
}
