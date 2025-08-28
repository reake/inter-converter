import { Metadata } from 'next';
import { ToolLayout, generateToolMetadata } from '@/components/tools/ToolLayout';
import SavingsCalculator from '@/components/converters/finance/SavingsCalculator';

// Force static generation
export const dynamic = 'force-static';

export const metadata: Metadata = generateToolMetadata(
  'CD Calculator',
  'Calculate Certificate of Deposit returns and compare CD rates. Plan fixed-term savings with guaranteed returns.',
  'cd-calculator',
  [
    'CD calculator',
    'certificate of deposit calculator',
    'CD interest calculator',
    'CD return calculator',
    'time deposit calculator',
    'fixed deposit calculator'
  ],
  'banking'
);

export default function CDCalculatorPage() {
  return (
    <ToolLayout
      title="CD Calculator"
      description="Calculate Certificate of Deposit returns and earnings with different terms and interest rates"
      toolId="cd-calculator"
      category="banking"
      emoji="📜"
      customHowToUse={[
        "Enter your CD deposit amount",
        "Input the annual interest rate (APY)",
        "Set the CD term length",
        "Choose compounding frequency",
        "Calculate total returns",
        "Compare different CD options"
      ]}
      customFeatures={[
        "CD maturity value calculation",
        "Interest earning projections",
        "APY vs APR comparison",
        "Term length optimization",
        "Early withdrawal penalty analysis",
        "CD ladder strategy planning"
      ]}
    >
      <SavingsCalculator />
    </ToolLayout>
  );
}
