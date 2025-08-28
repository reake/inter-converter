import { Metadata } from 'next';
import { ToolLayout, generateToolMetadata } from '@/components/tools/ToolLayout';
import TipCalculator from '@/components/converters/finance/TipCalculator';

// Force static generation
export const dynamic = 'force-static';

export const metadata: Metadata = generateToolMetadata(
  'Tip Calculator',
  'Calculate tips and split bills for restaurants and services. Easy tip calculator with bill splitting and custom tip percentages.',
  'tip-calculator',
  [
    'tip calculator',
    'gratuity calculator',
    'bill split calculator',
    'restaurant tip',
    'tip percentage',
    'bill splitting',
    'service tip',
    'dining calculator'
  ],
  'finance'
);

export default function TipCalculatorPage() {
  return (
    <ToolLayout
      title="Tip Calculator"
      description="Calculate tips and split bills easily for restaurants, services, and dining experiences"
      toolId="tip-calculator"
      category="finance"
      emoji="💰"
      customHowToUse={[
        "Enter your total bill amount",
        "Select or enter a custom tip percentage",
        "Choose number of people to split the bill",
        "View tip amount and total per person",
        "Adjust tip percentage for service quality"
      ]}
    >
      <TipCalculator />
    </ToolLayout>
  );
}
