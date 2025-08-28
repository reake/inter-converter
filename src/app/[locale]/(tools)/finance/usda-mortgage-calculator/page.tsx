import { Metadata } from 'next';
import { ToolLayout, generateToolMetadata } from '@/components/tools/ToolLayout';
import MortgageCalculator from '@/components/converters/finance/MortgageCalculator';

// Force static generation
export const dynamic = 'force-static';

export const metadata: Metadata = generateToolMetadata(
  'USDA Mortgage Calculator',
  'Calculate USDA rural development loan payments with no down payment. USDA loan calculator for eligible rural and suburban areas.',
  'usda-mortgage-calculator',
  [
    'USDA loan calculator',
    'USDA mortgage calculator',
    'rural development loan calculator',
    'USDA home loan calculator',
    'no down payment mortgage calculator',
    'USDA guarantee fee calculator',
    'rural housing loan calculator'
  ],
  'mortgages'
);

export default function USDAMortgageCalculatorPage() {
  return (
    <ToolLayout
      title="USDA Mortgage Calculator"
      description="Calculate USDA rural development loan payments with no down payment required for eligible properties"
      toolId="usda-mortgage-calculator"
      category="mortgages"
      emoji="🌾"
      customHowToUse={[
        "Enter the home purchase price",
        "Verify property is in USDA eligible area",
        "Calculate with no down payment required",
        "Include USDA guarantee fee",
        "Review income and credit requirements",
        "Compare with other loan programs"
      ]}
      customFeatures={[
        "No down payment calculations",
        "USDA guarantee fee inclusion",
        "Rural area eligibility check",
        "Income limit verification",
        "Competitive interest rates",
        "Government backing benefits"
      ]}
    >
      <MortgageCalculator />
    </ToolLayout>
  );
}
