import { Metadata } from 'next';
import { ToolLayout, generateToolMetadata } from '@/components/tools/ToolLayout';
import { LoanCalculator } from '@/components/converters/finance/LoanCalculator';

// Force static generation
export const dynamic = 'force-static';

export const metadata: Metadata = generateToolMetadata(
  'Mutual Fund Calculator',
  'Calculate mutual fund returns and growth with expense ratios. Plan systematic investment plans (SIP) and lump sum investments.',
  'mutual-fund-calculator',
  [
    'mutual fund calculator',
    'SIP calculator',
    'systematic investment plan calculator',
    'mutual fund return calculator',
    'expense ratio calculator'
  ],
  'investing'
);

export default function MutualFundCalculatorPage() {
  return (
    <ToolLayout
      title="Mutual Fund Calculator"
      description="Calculate mutual fund returns, SIP investments, and analyze the impact of expense ratios on long-term growth"
      toolId="mutual-fund-calculator"
      category="investing"
      emoji="📊"
      customHowToUse={[
        "Choose SIP or lump sum investment",
        "Enter investment amount and frequency",
        "Input expected annual return rate",
        "Add expense ratio and fees",
        "Calculate net returns after fees",
        "Compare different fund options"
      ]}
      customFeatures={[
        "SIP vs lump sum comparison",
        "Expense ratio impact analysis",
        "Net return calculations",
        "Fund performance tracking",
        "Cost-benefit analysis",
        "Investment goal planning"
      ]}
    >
      <LoanCalculator />
    </ToolLayout>
  );
}
