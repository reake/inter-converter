import { Metadata } from 'next';
import { ToolLayout, generateToolMetadata } from '@/components/tools/ToolLayout';
import InvestmentCalculator from '@/components/converters/finance/InvestmentCalculator';

// Force static generation
export const dynamic = 'force-static';

export const metadata: Metadata = generateToolMetadata(
  'Dividend Calculator',
  'Calculate dividend income and yields from dividend-paying stocks. Plan dividend investment strategies and income projections.',
  'dividend-calculator',
  [
    'dividend calculator',
    'dividend yield calculator',
    'dividend income calculator',
    'dividend growth calculator',
    'dividend reinvestment calculator'
  ],
  'investing'
);

export default function DividendCalculatorPage() {
  return (
    <ToolLayout
      title="Dividend Calculator"
      description="Calculate dividend income, yields, and growth potential from dividend-paying stock investments"
      toolId="dividend-calculator"
      category="investing"
      emoji="💰"
      customHowToUse={[
        "Enter stock price and dividend per share",
        "Input number of shares owned",
        "Set dividend payment frequency",
        "Calculate annual dividend income",
        "Analyze dividend yield percentage",
        "Project dividend growth scenarios"
      ]}
      customFeatures={[
        "Dividend yield calculations",
        "Annual income projections",
        "Dividend growth modeling",
        "Reinvestment scenarios",
        "Tax implications analysis",
        "Dividend aristocrat tracking"
      ]}
    >
      <InvestmentCalculator />
    </ToolLayout>
  );
}
