import { Metadata } from 'next';
import InterestOnlyMortgageCalculator from '@/components/converters/finance/InterestOnlyMortgageCalculator';

// Force static generation
export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: 'Interest-Only Mortgage Calculator | Free Online Tool',
  description: 'Calculate interest-only mortgage payments and total costs. Analyze payment shock and balloon payment scenarios with our professional calculator.',
  keywords: [
    'interest only mortgage calculator',
    'interest only payment calculator',
    'IO mortgage calculator',
    'interest only loan calculator',
    'balloon payment calculator',
    'payment shock calculator',
    'interest only period calculator'
  ].join(', '),
};

export default function InterestOnlyMortgageCalculatorPage() {
  return <InterestOnlyMortgageCalculator />;
}
