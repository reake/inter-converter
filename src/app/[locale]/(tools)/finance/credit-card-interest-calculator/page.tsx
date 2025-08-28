import { Metadata } from 'next';
import { ToolLayout } from '@/components/tools/ToolLayout';
import CreditCardPayoffCalculator from '@/components/converters/finance/CreditCardPayoffCalculator';

// Force static generation
export const dynamic = 'force-static';
const title = 'Credit Card Interest Calculator';
const description = 'Calculate daily and monthly credit card interest charges. Understand how APR affects your balance and minimum payments.';
const keywordsArr = [
  'credit card interest calculator',
  'APR calculator',
  'daily interest calculator',
  'credit card APR calculator',
  'monthly interest calculator',
  'credit card finance charge calculator',
  'interest charge calculator'
];

export const metadata: Metadata = {
  title: `${title} | InterConverter`,
  description,
  keywords: keywordsArr.join(', '),
  openGraph: {
    title: `${title} | InterConverter`,
    description,
    type: 'website',
  },
  alternates: { canonical: '/finance/credit-card-interest-calculator' }
};

export default function CreditCardInterestCalculatorPage() {
  return (
    <ToolLayout
      title="Credit Card Interest Calculator"
      description="Calculate daily and monthly interest charges on your credit card balance based on APR and payment timing"
      toolId="credit-card-interest-calculator"
      category="credit-cards"
      emoji="📊"
      customHowToUse={[
        "Enter your credit card balance",
        "Input the annual percentage rate (APR)",
        "Set your average daily balance",
        "Calculate daily interest charges",
        "View monthly finance charges",
        "Understand compound interest impact"
      ]}
      customFeatures={[
        "Daily interest rate calculation",
        "Monthly finance charge estimation",
        "Average daily balance method",
        "Compound interest visualization",
        "APR to daily rate conversion",
        "Interest cost projections"
      ]}
    >
      <CreditCardPayoffCalculator />
    </ToolLayout>
  );
}
