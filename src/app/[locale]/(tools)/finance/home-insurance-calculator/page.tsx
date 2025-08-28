import { Metadata } from 'next';
import { ToolLayout, generateToolMetadata } from '@/components/tools/ToolLayout';
import InsuranceCalculator from '@/components/converters/finance/InsuranceCalculator';

// Force static generation
export const dynamic = 'force-static';

export const metadata: Metadata = generateToolMetadata(
  'Home Insurance Calculator',
  'Calculate home insurance premiums and coverage needs. Estimate dwelling, personal property, and liability coverage costs.',
  'home-insurance-calculator',
  [
    'home insurance calculator',
    'homeowners insurance calculator',
    'property insurance calculator',
    'house insurance calculator',
    'dwelling coverage calculator'
  ],
  'insurance'
);

export default function HomeInsuranceCalculatorPage() {
  return (
    <ToolLayout
      title="Home Insurance Calculator"
      description="Calculate homeowners insurance premiums and determine appropriate coverage amounts for dwelling, personal property, and liability"
      toolId="home-insurance-calculator"
      category="insurance"
      emoji="🏠"
      customHowToUse={[
        "Enter home value and replacement cost",
        "Input personal property value",
        "Set liability coverage limits",
        "Choose deductible amounts",
        "Calculate premium estimates",
        "Compare coverage options and costs"
      ]}
      customFeatures={[
        "Dwelling coverage calculations",
        "Personal property valuation",
        "Liability limit recommendations",
        "Deductible impact analysis",
        "Natural disaster coverage options",
        "Premium optimization tools"
      ]}
    >
      <InsuranceCalculator />
    </ToolLayout>
  );
}
