import { Metadata } from 'next';
import { ToolLayout, generateToolMetadata } from '@/components/tools/ToolLayout';
import InvestmentCalculator from '@/components/converters/finance/InvestmentCalculator';

// Force static generation
export const dynamic = 'force-static';

export const metadata: Metadata = generateToolMetadata(
  'Retirement Calculator',
  'Calculate retirement savings needs and timeline. Plan your retirement contributions and estimate required savings for financial independence.',
  'retirement-calculator',
  [
    'retirement calculator',
    'retirement planning calculator',
    'retirement savings calculator',
    'pension calculator',
    'retirement income calculator'
  ],
  'investing'
);

export default function RetirementCalculatorPage() {
  return (
    <ToolLayout
      title="Retirement Calculator"
      description="Calculate how much you need to save for retirement and create a comprehensive retirement savings plan"
      toolId="retirement-calculator"
      category="investing"
      emoji="🏖️"
      customHowToUse={[
        "Enter current age and desired retirement age",
        "Input current retirement savings",
        "Set monthly contribution amount",
        "Enter expected rate of return",
        "Calculate retirement savings growth",
        "Analyze retirement income needs"
      ]}
      customFeatures={[
        "Retirement timeline planning",
        "Savings goal calculations",
        "Income replacement analysis",
        "Social Security integration",
        "Inflation adjustment tools",
        "Retirement readiness assessment"
      ]}
    >
      <InvestmentCalculator />
    </ToolLayout>
  );
}
