import { Metadata } from 'next';
import { ToolLayout, generateToolMetadata } from '@/components/tools/ToolLayout';
import SavingsCalculator from '@/components/converters/finance/SavingsCalculator';

// Force static generation
export const dynamic = 'force-static';

export const metadata: Metadata = generateToolMetadata(
  'Savings Calculator',
  'Calculate savings growth with compound interest. Plan your savings goals and track progress over time.',
  'savings-calculator',
  [
    'savings calculator',
    'compound interest calculator',
    'savings growth calculator',
    'savings goal calculator',
    'interest calculator',
    'savings plan calculator'
  ],
  'banking'
);

export default function SavingsCalculatorPage() {
  return (
    <ToolLayout
      title="Savings Calculator"
      description="Calculate how your savings will grow over time with compound interest and regular contributions"
      toolId="savings-calculator"
      category="banking"
      emoji="💰"
      customHowToUse={[
        "Enter your initial savings amount",
        "Set monthly contribution amount",
        "Input annual interest rate",
        "Choose compounding frequency",
        "Set your savings timeline",
        "View growth projections and milestones"
      ]}
      customFeatures={[
        "Compound interest calculations",
        "Regular contribution tracking",
        "Savings goal planning",
        "Growth timeline visualization",
        "Interest earning projections",
        "Milestone achievement tracking"
      ]}
    >
      <SavingsCalculator />
    </ToolLayout>
  );
}
