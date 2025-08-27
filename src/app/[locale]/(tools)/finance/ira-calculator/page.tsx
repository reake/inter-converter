import { Metadata } from 'next';
import { ToolLayout, generateToolMetadata } from '@/components/tools/ToolLayout';
import { LoanCalculator } from '@/components/converters/finance/LoanCalculator';

// Force static generation
export const dynamic = 'force-static';

export const metadata: Metadata = generateToolMetadata(
  'IRA Calculator',
  'Calculate IRA retirement savings growth for Traditional and Roth IRAs. Plan your retirement contributions and tax advantages.',
  'ira-calculator',
  [
    'IRA calculator',
    'traditional IRA calculator',
    'Roth IRA calculator',
    'retirement IRA calculator',
    'IRA contribution calculator'
  ],
  'banking'
);

export default function IRACalculatorPage() {
  return (
    <ToolLayout
      title="IRA Calculator"
      description="Calculate Traditional and Roth IRA growth potential with tax advantages and contribution limits"
      toolId="ira-calculator"
      category="banking"
      emoji="🏦"
      customHowToUse={[
        "Choose Traditional or Roth IRA type",
        "Enter current age and retirement age",
        "Set annual contribution amount",
        "Input expected rate of return",
        "Calculate retirement savings growth",
        "Compare tax advantages"
      ]}
      customFeatures={[
        "Traditional vs Roth IRA comparison",
        "Tax deduction calculations",
        "Contribution limit tracking",
        "Required minimum distribution planning",
        "Tax-free growth projections",
        "Retirement income planning"
      ]}
    >
      <LoanCalculator />
    </ToolLayout>
  );
}
