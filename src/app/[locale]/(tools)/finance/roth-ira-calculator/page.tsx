import { Metadata } from 'next';
import { ToolLayout, generateToolMetadata } from '@/components/tools/ToolLayout';
import InvestmentCalculator from '@/components/converters/finance/InvestmentCalculator';

// Force static generation
export const dynamic = 'force-static';

export const metadata: Metadata = generateToolMetadata(
  'Roth IRA Calculator',
  'Calculate Roth IRA growth with tax-free withdrawals in retirement. Plan your after-tax retirement contributions and benefits.',
  'roth-ira-calculator',
  [
    'Roth IRA calculator',
    'Roth IRA contribution calculator',
    'tax free retirement calculator',
    'Roth IRA growth calculator',
    'after tax retirement calculator'
  ],
  'investing'
);

export default function RothIRACalculatorPage() {
  return (
    <ToolLayout
      title="Roth IRA Calculator"
      description="Calculate Roth IRA growth potential with tax-free withdrawals and after-tax contribution benefits"
      toolId="roth-ira-calculator"
      category="investing"
      emoji="🎯"
      customHowToUse={[
        "Enter current age and retirement age",
        "Input annual Roth IRA contribution",
        "Set expected rate of return",
        "Calculate tax-free growth",
        "Compare with Traditional IRA",
        "Plan withdrawal strategies"
      ]}
      customFeatures={[
        "Tax-free growth calculations",
        "Contribution limit tracking",
        "Traditional vs Roth comparison",
        "Early withdrawal rules",
        "Tax benefit analysis",
        "Retirement income planning"
      ]}
    >
      <InvestmentCalculator />
    </ToolLayout>
  );
}
