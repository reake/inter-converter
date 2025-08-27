import { Metadata } from 'next';
import { ToolLayout, generateToolMetadata } from '@/components/tools/ToolLayout';
import { LoanCalculator } from '@/components/converters/finance/LoanCalculator';

// Force static generation
export const dynamic = 'force-static';

export const metadata: Metadata = generateToolMetadata(
  'Emergency Fund Calculator',
  'Calculate emergency fund savings goals based on monthly expenses. Plan your financial safety net and savings timeline.',
  'emergency-fund-calculator',
  [
    'emergency fund calculator',
    'emergency savings calculator',
    'financial safety net calculator',
    'rainy day fund calculator',
    'emergency expense calculator'
  ],
  'banking'
);

export default function EmergencyFundCalculatorPage() {
  return (
    <ToolLayout
      title="Emergency Fund Calculator"
      description="Calculate your emergency fund savings goal and create a plan to build your financial safety net"
      toolId="emergency-fund-calculator"
      category="banking"
      emoji="🛡️"
      customHowToUse={[
        "Enter your monthly essential expenses",
        "Set emergency fund goal (3-6 months typical)",
        "Input current emergency savings",
        "Set monthly savings contribution",
        "Calculate time to reach goal",
        "Track progress toward financial security"
      ]}
      customFeatures={[
        "Monthly expense analysis",
        "3-6 month fund recommendations",
        "Savings timeline calculations",
        "Progress tracking tools",
        "Financial security assessment",
        "Goal achievement planning"
      ]}
    >
      <LoanCalculator />
    </ToolLayout>
  );
}
