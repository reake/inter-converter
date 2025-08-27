import { Metadata } from 'next';
import { ToolLayout, generateToolMetadata } from '@/components/tools/ToolLayout';
import { LoanCalculator } from '@/components/converters/finance/LoanCalculator';

// Force static generation
export const dynamic = 'force-static';

export const metadata: Metadata = generateToolMetadata(
  'Equipment Loan Calculator',
  'Calculate equipment financing payments for business machinery, tools, and equipment purchases. Compare lease vs buy options.',
  'equipment-loan-calculator',
  [
    'equipment loan calculator',
    'equipment financing calculator',
    'machinery loan calculator',
    'business equipment calculator',
    'equipment lease calculator'
  ],
  'loans'
);

export default function EquipmentLoanCalculatorPage() {
  return (
    <ToolLayout
      title="Equipment Loan Calculator"
      description="Calculate financing payments for business equipment, machinery, and tools with various loan and lease options"
      toolId="equipment-loan-calculator"
      category="loans"
      emoji="🔧"
      customHowToUse={[
        "Enter equipment purchase price",
        "Input down payment amount",
        "Set loan term and interest rate",
        "Compare loan vs lease options",
        "Calculate monthly payments",
        "Analyze tax benefits and depreciation"
      ]}
      customFeatures={[
        "Loan vs lease comparison",
        "Tax benefit calculations",
        "Depreciation considerations",
        "Seasonal payment options",
        "Equipment value tracking",
        "ROI analysis tools"
      ]}
    >
      <LoanCalculator />
    </ToolLayout>
  );
}
