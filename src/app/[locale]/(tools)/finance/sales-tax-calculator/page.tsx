import { Metadata } from 'next';
import { ToolLayout, generateToolMetadata } from '@/components/tools/ToolLayout';
import TaxCalculator from '@/components/converters/finance/TaxCalculator';

// Force static generation
export const dynamic = 'force-static';

export const metadata: Metadata = generateToolMetadata(
  'Sales Tax Calculator',
  'Calculate sales tax rates and total costs for purchases. Determine state, local, and combined sales tax rates for any location.',
  'sales-tax-calculator',
  [
    'sales tax calculator',
    'state sales tax calculator',
    'local sales tax calculator',
    'purchase tax calculator',
    'retail tax calculator'
  ],
  'taxes'
);

export default function SalesTaxCalculatorPage() {
  return (
    <ToolLayout
      title="Sales Tax Calculator"
      description="Calculate sales tax rates and total purchase costs including state, local, and special district taxes"
      toolId="sales-tax-calculator"
      category="taxes"
      emoji="🛒"
      customHowToUse={[
        "Enter purchase amount before tax",
        "Select state and local jurisdiction",
        "View applicable sales tax rates",
        "Calculate total tax amount",
        "See final purchase price with tax",
        "Compare rates across locations"
      ]}
      customFeatures={[
        "State sales tax rates",
        "Local tax additions",
        "Special district taxes",
        "Tax-free shopping periods",
        "Online purchase considerations",
        "Business tax exemptions"
      ]}
    >
      <TaxCalculator />
    </ToolLayout>
  );
}
