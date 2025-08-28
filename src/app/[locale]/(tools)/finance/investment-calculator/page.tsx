import { Metadata } from 'next';
import { ToolLayout, generateToolMetadata } from '@/components/tools/ToolLayout';
import InvestmentCalculator from '@/components/converters/finance/InvestmentCalculator';

// Force static generation
export const dynamic = 'force-static';

export const metadata: Metadata = generateToolMetadata(
  'Investment Calculator',
  'Calculate investment returns and growth over time. Plan your investment strategy with compound returns and regular contributions.',
  'investment-calculator',
  [
    'investment calculator',
    'investment return calculator',
    'portfolio growth calculator',
    'stock investment calculator',
    'mutual fund calculator'
  ],
  'investing'
);

export default function InvestmentCalculatorPage() {
  return (
    <ToolLayout
      title="Investment Calculator"
      description="Calculate investment growth and returns with compound interest and regular contribution strategies"
      toolId="investment-calculator"
      category="investing"
      emoji="📈"
      customHowToUse={[
        "Enter initial investment amount",
        "Input expected annual return rate",
        "Set regular contribution amount",
        "Choose investment timeline",
        "Calculate portfolio growth",
        "Analyze different investment scenarios"
      ]}
      customFeatures={[
        "Compound return calculations",
        "Regular contribution tracking",
        "Portfolio growth projections",
        "Risk-return analysis",
        "Investment timeline planning",
        "Scenario comparison tools"
      ]}
    >
      <InvestmentCalculator />
    </ToolLayout>
  );
}
