import { Metadata } from 'next';
import { ToolLayout, generateToolMetadata } from '@/components/tools/ToolLayout';
import InvestmentCalculator from '@/components/converters/finance/InvestmentCalculator';

// Force static generation
export const dynamic = 'force-static';

export const metadata: Metadata = generateToolMetadata(
  '401k Calculator',
  'Calculate 401k retirement savings growth with employer matching. Plan your retirement contributions and track long-term growth.',
  '401k-calculator',
  [
    '401k calculator',
    '401k retirement calculator',
    '401k contribution calculator',
    'retirement savings calculator',
    'employer match calculator',
    '401k planning calculator'
  ],
  'investing'
);

export default function FourOhOneKCalculatorPage() {
  return (
    <ToolLayout
      title="401k Calculator"
      description="Calculate 401k retirement savings growth with employer matching contributions and tax advantages"
      toolId="401k-calculator"
      category="investing"
      emoji="🏦"
      customHowToUse={[
        "Enter your current salary",
        "Set your contribution percentage",
        "Input employer match details",
        "Set expected annual return",
        "Calculate retirement savings growth",
        "Optimize contribution strategy"
      ]}
      customFeatures={[
        "Employer matching calculations",
        "Tax-deferred growth projections",
        "Contribution limit tracking",
        "Retirement timeline planning",
        "Catch-up contribution analysis",
        "Withdrawal strategy planning"
      ]}
    >
      <InvestmentCalculator />
    </ToolLayout>
  );
}
