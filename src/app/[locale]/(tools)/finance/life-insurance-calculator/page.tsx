import { Metadata } from 'next';
import { ToolLayout, generateToolMetadata } from '@/components/tools/ToolLayout';
import { LoanCalculator } from '@/components/converters/finance/LoanCalculator';

// Force static generation
export const dynamic = 'force-static';

export const metadata: Metadata = generateToolMetadata(
  'Life Insurance Calculator',
  'Calculate life insurance coverage needs based on income, debts, and family expenses. Determine optimal coverage amounts.',
  'life-insurance-calculator',
  [
    'life insurance calculator',
    'life insurance coverage calculator',
    'life insurance needs calculator',
    'term life insurance calculator',
    'insurance coverage calculator'
  ],
  'insurance'
);

export default function LifeInsuranceCalculatorPage() {
  return (
    <ToolLayout
      title="Life Insurance Calculator"
      description="Calculate your life insurance coverage needs based on income replacement, debts, and family financial goals"
      toolId="life-insurance-calculator"
      category="insurance"
      emoji="🛡️"
      customHowToUse={[
        "Enter your annual income and age",
        "Input outstanding debts and mortgages",
        "Set family expense requirements",
        "Include education and retirement goals",
        "Calculate recommended coverage amount",
        "Compare term vs whole life options"
      ]}
      customFeatures={[
        "Income replacement calculations",
        "Debt coverage analysis",
        "Family expense planning",
        "Education funding considerations",
        "Term vs whole life comparison",
        "Premium estimation tools"
      ]}
    >
      <LoanCalculator />
    </ToolLayout>
  );
}
