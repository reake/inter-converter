import { Metadata } from 'next';
import { ToolLayout, generateToolMetadata } from '@/components/tools/ToolLayout';
import { LoanCalculator } from '@/components/converters/finance/LoanCalculator';

// Force static generation
export const dynamic = 'force-static';

export const metadata: Metadata = generateToolMetadata(
  'Cost of Living Calculator',
  'Compare cost of living between cities for home buying decisions. Calculate salary adjustments and housing affordability by location.',
  'cost-of-living-calculator',
  [
    'cost of living calculator',
    'cost of living comparison',
    'city cost comparison calculator',
    'relocation cost calculator',
    'salary adjustment calculator',
    'housing cost comparison',
    'moving cost of living'
  ],
  'mortgages'
);

export default function CostOfLivingCalculatorPage() {
  return (
    <ToolLayout
      title="Cost of Living Calculator"
      description="Compare cost of living between different cities to make informed home buying and relocation decisions"
      toolId="cost-of-living-calculator"
      category="mortgages"
      emoji="🏙️"
      customHowToUse={[
        "Select your current city and target city",
        "Enter your current salary and expenses",
        "Compare housing costs between locations",
        "Calculate required salary adjustment",
        "Analyze total cost differences",
        "Make informed relocation decisions"
      ]}
      customFeatures={[
        "City-to-city cost comparison",
        "Housing affordability analysis",
        "Salary adjustment calculations",
        "Living expense breakdowns",
        "Quality of life factors",
        "Relocation decision support"
      ]}
    >
      <LoanCalculator />
    </ToolLayout>
  );
}
