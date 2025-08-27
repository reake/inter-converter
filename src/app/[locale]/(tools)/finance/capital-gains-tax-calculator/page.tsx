import { Metadata } from 'next';
import { ToolLayout, generateToolMetadata } from '@/components/tools/ToolLayout';
import { TaxCalculator } from '@/components/converters/finance/TaxCalculator';

// Force static generation
export const dynamic = 'force-static';

export const metadata: Metadata = generateToolMetadata(
  'Capital Gains Tax Calculator',
  'Calculate capital gains tax on investment sales. Determine short-term vs long-term capital gains tax rates and liability.',
  'capital-gains-tax-calculator',
  [
    'capital gains tax calculator',
    'investment tax calculator',
    'stock tax calculator',
    'capital gains calculator',
    'investment gains tax'
  ],
  'taxes'
);

export default function CapitalGainsTaxCalculatorPage() {
  return (
    <ToolLayout
      title="Capital Gains Tax Calculator"
      description="Calculate capital gains tax on investment sales with short-term and long-term rate distinctions"
      toolId="capital-gains-tax-calculator"
      category="taxes"
      emoji="📈"
      customHowToUse={[
        "Enter purchase price and sale price",
        "Input holding period (short vs long-term)",
        "Select your income tax bracket",
        "Calculate capital gains amount",
        "Determine applicable tax rate",
        "Estimate total tax liability"
      ]}
      customFeatures={[
        "Short-term vs long-term rates",
        "Income bracket considerations",
        "Net investment income tax",
        "Tax loss harvesting analysis",
        "State capital gains taxes",
        "Tax planning strategies"
      ]}
    >
      <TaxCalculator />
    </ToolLayout>
  );
}
