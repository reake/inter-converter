import { Metadata } from 'next';
import { ToolLayout, generateToolMetadata } from '@/components/tools/ToolLayout';
import SavingsCalculator from '@/components/converters/finance/SavingsCalculator';

// Force static generation
export const dynamic = 'force-static';

export const metadata: Metadata = generateToolMetadata(
  'High-Yield Savings Calculator',
  'Calculate high-yield savings account growth and compare rates. Maximize your savings with the best APY rates available.',
  'high-yield-savings-calculator',
  [
    'high yield savings calculator',
    'high interest savings calculator',
    'best savings rate calculator',
    'APY calculator',
    'online savings calculator'
  ],
  'banking'
);

export default function HighYieldSavingsCalculatorPage() {
  return (
    <ToolLayout
      title="High-Yield Savings Calculator"
      description="Calculate growth potential with high-yield savings accounts and compare the best APY rates available"
      toolId="high-yield-savings-calculator"
      category="banking"
      emoji="📈"
      customHowToUse={[
        "Enter initial savings amount",
        "Input high-yield APY rate",
        "Set monthly contribution amount",
        "Calculate compound growth",
        "Compare with traditional savings",
        "Find optimal savings strategy"
      ]}
      customFeatures={[
        "High APY rate calculations",
        "Online vs traditional bank comparison",
        "Compound interest optimization",
        "Rate change impact analysis",
        "FDIC insurance considerations",
        "Savings goal achievement tracking"
      ]}
    >
      <SavingsCalculator />
    </ToolLayout>
  );
}
