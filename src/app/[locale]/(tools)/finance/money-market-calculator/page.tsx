import { Metadata } from 'next';
import { ToolLayout, generateToolMetadata } from '@/components/tools/ToolLayout';
import SavingsCalculator from '@/components/converters/finance/SavingsCalculator';

// Force static generation
export const dynamic = 'force-static';

export const metadata: Metadata = generateToolMetadata(
  'Money Market Calculator',
  'Calculate money market account returns and compare rates. Plan high-yield savings with money market accounts.',
  'money-market-calculator',
  [
    'money market calculator',
    'money market account calculator',
    'MMA calculator',
    'high yield savings calculator',
    'money market return calculator'
  ],
  'banking'
);

export default function MoneyMarketCalculatorPage() {
  return (
    <ToolLayout
      title="Money Market Calculator"
      description="Calculate returns and growth for money market accounts with higher interest rates and limited transactions"
      toolId="money-market-calculator"
      category="banking"
      emoji="💹"
      customHowToUse={[
        "Enter initial deposit amount",
        "Input money market interest rate (APY)",
        "Set monthly contribution amount",
        "Choose compounding frequency",
        "Calculate account growth over time",
        "Compare with regular savings accounts"
      ]}
      customFeatures={[
        "Higher yield calculations",
        "Transaction limit considerations",
        "Minimum balance requirements",
        "APY comparison tools",
        "Growth projections",
        "Savings vs money market analysis"
      ]}
    >
      <SavingsCalculator />
    </ToolLayout>
  );
}
