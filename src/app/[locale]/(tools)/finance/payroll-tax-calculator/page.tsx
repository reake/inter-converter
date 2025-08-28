import { Metadata } from 'next';
import { ToolLayout, generateToolMetadata } from '@/components/tools/ToolLayout';
import TaxCalculator from '@/components/converters/finance/TaxCalculator';

// Force static generation
export const dynamic = 'force-static';

export const metadata: Metadata = generateToolMetadata(
  'Payroll Tax Calculator',
  'Calculate payroll taxes including Social Security, Medicare, and unemployment taxes. Estimate employer and employee tax contributions.',
  'payroll-tax-calculator',
  [
    'payroll tax calculator',
    'Social Security tax calculator',
    'Medicare tax calculator',
    'FICA tax calculator',
    'unemployment tax calculator'
  ],
  'taxes'
);

export default function PayrollTaxCalculatorPage() {
  return (
    <ToolLayout
      title="Payroll Tax Calculator"
      description="Calculate payroll taxes including Social Security, Medicare, and unemployment taxes for employees and employers"
      toolId="payroll-tax-calculator"
      category="taxes"
      emoji="💼"
      customHowToUse={[
        "Enter gross salary or hourly wage",
        "Select pay frequency (weekly, monthly, etc.)",
        "Calculate Social Security tax (6.2%)",
        "Calculate Medicare tax (1.45%)",
        "Include additional Medicare tax if applicable",
        "View total payroll tax burden"
      ]}
      customFeatures={[
        "FICA tax calculations",
        "Social Security wage base limits",
        "Additional Medicare tax (0.9%)",
        "Employer matching contributions",
        "State unemployment tax (SUTA)",
        "Federal unemployment tax (FUTA)"
      ]}
    >
      <TaxCalculator />
    </ToolLayout>
  );
}
