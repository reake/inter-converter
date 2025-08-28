import { Metadata } from 'next';
import { ToolLayout, generateToolMetadata } from '@/components/tools/ToolLayout';
import TaxCalculator from '@/components/converters/finance/TaxCalculator';

// Force static generation
export const dynamic = 'force-static';

export const metadata: Metadata = generateToolMetadata(
  'Property Tax Calculator',
  'Calculate property taxes based on home value, tax rates, and exemptions. Estimate annual property tax liability for homeowners.',
  'property-tax-calculator',
  [
    'property tax calculator',
    'real estate tax calculator',
    'home tax calculator',
    'property tax estimator',
    'municipal tax calculator'
  ],
  'taxes'
);

export default function PropertyTaxCalculatorPage() {
  return (
    <ToolLayout
      title="Property Tax Calculator"
      description="Calculate annual property taxes based on home value, local tax rates, and available exemptions"
      toolId="property-tax-calculator"
      category="taxes"
      emoji="🏠"
      customHowToUse={[
        "Enter your property's assessed value",
        "Input local property tax rate (mill rate)",
        "Add any applicable exemptions",
        "Calculate annual property tax",
        "Compare with neighboring areas",
        "Plan for property tax payments"
      ]}
      customFeatures={[
        "Assessed value calculations",
        "Mill rate applications",
        "Homestead exemptions",
        "Senior citizen discounts",
        "Tax appeal considerations",
        "Escrow payment planning"
      ]}
    >
      <TaxCalculator />
    </ToolLayout>
  );
}
