import { Metadata } from 'next';
import { ToolLayout, generateToolMetadata } from '@/components/tools/ToolLayout';
import { LoanCalculator } from '@/components/converters/finance/LoanCalculator';

// Force static generation
export const dynamic = 'force-static';

export const metadata: Metadata = generateToolMetadata(
  'ETF Calculator',
  'Calculate ETF investment returns and analyze expense ratios. Compare exchange-traded funds and plan portfolio diversification.',
  'etf-calculator',
  [
    'ETF calculator',
    'exchange traded fund calculator',
    'ETF return calculator',
    'index fund calculator',
    'passive investment calculator'
  ],
  'investing'
);

export default function ETFCalculatorPage() {
  return (
    <ToolLayout
      title="ETF Calculator"
      description="Calculate ETF investment returns and analyze the impact of low expense ratios on long-term portfolio growth"
      toolId="etf-calculator"
      category="investing"
      emoji="📈"
      customHowToUse={[
        "Enter ETF investment amount",
        "Input expected annual return",
        "Set expense ratio (typically 0.03-0.75%)",
        "Choose investment timeline",
        "Calculate net returns after fees",
        "Compare with mutual funds and individual stocks"
      ]}
      customFeatures={[
        "Low expense ratio benefits",
        "Diversification analysis",
        "Index tracking performance",
        "Tax efficiency calculations",
        "Liquidity considerations",
        "Portfolio allocation tools"
      ]}
    >
      <LoanCalculator />
    </ToolLayout>
  );
}
