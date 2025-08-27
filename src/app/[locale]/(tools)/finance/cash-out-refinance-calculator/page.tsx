import { Metadata } from 'next';
import { ToolLayout, generateToolMetadata } from '@/components/tools/ToolLayout';
import { LoanCalculator } from '@/components/converters/finance/LoanCalculator';

// Force static generation
export const dynamic = 'force-static';

export const metadata: Metadata = generateToolMetadata(
  'Cash-Out Refinance Calculator',
  'Calculate cash-out refinance payments and available cash. Analyze new loan terms and cash proceeds from home equity.',
  'cash-out-refinance-calculator',
  [
    'cash out refinance calculator',
    'cash out refi calculator',
    'home equity cash out calculator',
    'refinance cash calculator',
    'equity cash out calculator',
    'cash out mortgage calculator'
  ],
  'mortgages'
);

export default function CashOutRefinanceCalculatorPage() {
  return (
    <ToolLayout
      title="Cash-Out Refinance Calculator"
      description="Calculate available cash and new payments from a cash-out refinance based on your home's current value"
      toolId="cash-out-refinance-calculator"
      category="mortgages"
      emoji="💵"
      customHowToUse={[
        "Enter current home value and mortgage balance",
        "Set desired loan-to-value ratio",
        "Input new loan terms and interest rate",
        "Calculate available cash proceeds",
        "Review new monthly payment",
        "Compare costs vs benefits"
      ]}
      customFeatures={[
        "Available cash calculation",
        "New payment analysis",
        "LTV ratio optimization",
        "Closing cost estimation",
        "Break-even analysis",
        "Cash flow impact assessment"
      ]}
    >
      <LoanCalculator />
    </ToolLayout>
  );
}
