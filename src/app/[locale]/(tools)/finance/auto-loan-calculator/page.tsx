import { Metadata } from 'next';
import AutoLoanCalculator from '@/components/converters/finance/AutoLoanCalculator';

// Force static generation
export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: 'Auto Loan Calculator | Car Payment Calculator',
  description: 'Calculate car loan payments, interest costs, and total vehicle financing costs. Compare auto loan terms and rates with our professional calculator.',
  keywords: [
    'auto loan calculator',
    'car loan calculator',
    'vehicle loan calculator',
    'auto financing calculator',
    'car payment calculator',
    'vehicle financing calculator',
    'automobile loan calculator'
  ].join(', '),
};

export default function AutoLoanCalculatorPage() {
  return <AutoLoanCalculator />;
}
