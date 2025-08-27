import { Metadata } from 'next';
import { ToolLayout, generateToolMetadata } from '@/components/tools/ToolLayout';
import { LoanCalculator } from '@/components/converters/finance/LoanCalculator';

// Force static generation
export const dynamic = 'force-static';

export const metadata: Metadata = generateToolMetadata(
  'Stock Calculator',
  'Calculate stock investment returns, dividends, and capital gains. Analyze stock performance and investment strategies.',
  'stock-calculator',
  [
    'stock calculator',
    'stock return calculator',
    'dividend calculator',
    'capital gains calculator',
    'stock investment calculator'
  ],
  'investing'
);

export default function StockCalculatorPage() {
  return (
    <ToolLayout
      title="Stock Calculator"
      description="Calculate stock investment returns including dividends, capital gains, and total return on investment"
      toolId="stock-calculator"
      category="investing"
      emoji="📊"
      customHowToUse={[
        "Enter stock purchase price and quantity",
        "Input current or selling price",
        "Add dividend payments received",
        "Calculate total return and gains",
        "Analyze annualized returns",
        "Compare with market benchmarks"
      ]}
      customFeatures={[
        "Capital gains calculations",
        "Dividend yield analysis",
        "Total return calculations",
        "Annualized return metrics",
        "Tax implications analysis",
        "Performance benchmarking"
      ]}
    >
      <LoanCalculator />
    </ToolLayout>
  );
}
