import { Metadata } from 'next';
import { ToolLayout, generateToolMetadata } from '@/components/tools/ToolLayout';
import { LoanCalculator } from '@/components/converters/finance/LoanCalculator';

// Force static generation
export const dynamic = 'force-static';

export const metadata: Metadata = generateToolMetadata(
  'Credit Card Interest Calculator',
  'Calculate daily and monthly credit card interest charges. Understand how APR affects your balance and minimum payments.',
  'credit-card-interest-calculator',
  [
    'credit card interest calculator',
    'APR calculator',
    'daily interest calculator',
    'credit card APR calculator',
    'monthly interest calculator',
    'credit card finance charge calculator',
    'interest charge calculator'
  ],
  'credit-cards'
);

export default function CreditCardInterestCalculatorPage() {
  return (
    <ToolLayout
      title="Credit Card Interest Calculator"
      description="Calculate daily and monthly interest charges on your credit card balance based on APR and payment timing"
      toolId="credit-card-interest-calculator"
      category="credit-cards"
      emoji="📊"
      customHowToUse={[
        "Enter your credit card balance",
        "Input the annual percentage rate (APR)",
        "Set your average daily balance",
        "Calculate daily interest charges",
        "View monthly finance charges",
        "Understand compound interest impact"
      ]}
      customFeatures={[
        "Daily interest rate calculation",
        "Monthly finance charge estimation",
        "Average daily balance method",
        "Compound interest visualization",
        "APR to daily rate conversion",
        "Interest cost projections"
      ]}
    >
      <LoanCalculator />
    </ToolLayout>
  );
}
