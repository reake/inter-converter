import { Metadata } from 'next';
import { ToolLayout, generateToolMetadata } from '@/components/tools/ToolLayout';
import TaxCalculator from '@/components/converters/finance/TaxCalculator';

// Force static generation
export const dynamic = 'force-static';

export const metadata: Metadata = generateToolMetadata(
  'Income Tax Calculator',
  'Calculate federal and state income taxes based on your income, filing status, and deductions. Estimate tax liability and refunds.',
  'income-tax-calculator',
  [
    'income tax calculator',
    'federal tax calculator',
    'state tax calculator',
    'tax liability calculator',
    'tax refund calculator'
  ],
  'taxes'
);

export default function IncomeTaxCalculatorPage() {
  return (
    <ToolLayout
      title="Income Tax Calculator"
      description="Calculate your federal and state income tax liability based on income, filing status, and deductions"
      toolId="income-tax-calculator"
      category="taxes"
      emoji="🧾"
      customHowToUse={[
        "Enter your annual gross income",
        "Select filing status (single, married, etc.)",
        "Input deductions and credits",
        "Choose your state for state tax calculation",
        "Calculate total tax liability",
        "Estimate refund or amount owed"
      ]}
      customFeatures={[
        "Federal tax bracket calculations",
        "State tax estimations",
        "Standard vs itemized deductions",
        "Tax credit applications",
        "Withholding analysis",
        "Tax planning strategies"
      ]}
    >
      <TaxCalculator />
    </ToolLayout>
  );
}
