import { Metadata } from 'next';
import { ToolLayout, generateToolMetadata } from '@/components/tools/ToolLayout';
import { LoanCalculator } from '@/components/converters/finance/LoanCalculator';

// Force static generation
export const dynamic = 'force-static';

export const metadata: Metadata = generateToolMetadata(
  'Auto Insurance Calculator',
  'Calculate auto insurance premiums and coverage costs. Compare liability, collision, and comprehensive coverage options.',
  'auto-insurance-calculator',
  [
    'auto insurance calculator',
    'car insurance calculator',
    'vehicle insurance calculator',
    'auto insurance premium calculator',
    'car insurance cost calculator'
  ],
  'insurance'
);

export default function AutoInsuranceCalculatorPage() {
  return (
    <ToolLayout
      title="Auto Insurance Calculator"
      description="Calculate auto insurance premiums and compare coverage options for liability, collision, and comprehensive protection"
      toolId="auto-insurance-calculator"
      category="insurance"
      emoji="🚗"
      customHowToUse={[
        "Enter vehicle information and value",
        "Input driver age and driving record",
        "Select coverage types and limits",
        "Set deductible amounts",
        "Calculate premium estimates",
        "Compare coverage options and costs"
      ]}
      customFeatures={[
        "Multiple coverage type calculations",
        "Deductible impact analysis",
        "Driver profile risk assessment",
        "Vehicle value considerations",
        "State requirement compliance",
        "Premium comparison tools"
      ]}
    >
      <LoanCalculator />
    </ToolLayout>
  );
}
