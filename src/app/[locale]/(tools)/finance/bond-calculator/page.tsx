import { Metadata } from 'next';
import { ToolLayout, generateToolMetadata } from '@/components/tools/ToolLayout';
import { LoanCalculator } from '@/components/converters/finance/LoanCalculator';

// Force static generation
export const dynamic = 'force-static';

export const metadata: Metadata = generateToolMetadata(
  'Bond Calculator',
  'Calculate bond yields, prices, and returns. Analyze government and corporate bond investments with maturity calculations.',
  'bond-calculator',
  [
    'bond calculator',
    'bond yield calculator',
    'bond price calculator',
    'treasury bond calculator',
    'corporate bond calculator'
  ],
  'investing'
);

export default function BondCalculatorPage() {
  return (
    <ToolLayout
      title="Bond Calculator"
      description="Calculate bond yields, prices, and total returns for government and corporate bond investments"
      toolId="bond-calculator"
      category="investing"
      emoji="📜"
      customHowToUse={[
        "Enter bond face value and coupon rate",
        "Input current market price",
        "Set maturity date and years to maturity",
        "Calculate yield to maturity",
        "Analyze current yield and total return",
        "Compare different bond investments"
      ]}
      customFeatures={[
        "Yield to maturity calculations",
        "Current yield analysis",
        "Bond price sensitivity",
        "Interest rate risk assessment",
        "Duration and convexity metrics",
        "Fixed income portfolio planning"
      ]}
    >
      <LoanCalculator />
    </ToolLayout>
  );
}
