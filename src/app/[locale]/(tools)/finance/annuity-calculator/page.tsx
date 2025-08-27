import { Metadata } from 'next';
import { ToolLayout, generateToolMetadata } from '@/components/tools/ToolLayout';
import { LoanCalculator } from '@/components/converters/finance/LoanCalculator';

// Force static generation
export const dynamic = 'force-static';

export const metadata: Metadata = generateToolMetadata(
  'Annuity Calculator',
  'Calculate annuity payments and retirement income streams. Compare immediate and deferred annuity options for guaranteed income.',
  'annuity-calculator',
  [
    'annuity calculator',
    'retirement annuity calculator',
    'immediate annuity calculator',
    'deferred annuity calculator',
    'annuity payment calculator'
  ],
  'investing'
);

export default function AnnuityCalculatorPage() {
  return (
    <ToolLayout
      title="Annuity Calculator"
      description="Calculate annuity payments and analyze guaranteed retirement income options with immediate and deferred annuities"
      toolId="annuity-calculator"
      category="investing"
      emoji="🏛️"
      customHowToUse={[
        "Choose immediate or deferred annuity type",
        "Enter premium payment amount",
        "Set payout period and frequency",
        "Input interest rate and fees",
        "Calculate guaranteed income payments",
        "Compare with other retirement options"
      ]}
      customFeatures={[
        "Immediate vs deferred comparison",
        "Guaranteed income calculations",
        "Fee impact analysis",
        "Inflation protection options",
        "Beneficiary considerations",
        "Retirement income planning"
      ]}
    >
      <LoanCalculator />
    </ToolLayout>
  );
}
