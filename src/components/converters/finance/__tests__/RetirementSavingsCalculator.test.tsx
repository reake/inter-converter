import { render, screen } from '@testing-library/react';

import RetirementSavingsCalculator from '@/components/converters/finance/RetirementSavingsCalculator';

describe('RetirementSavingsCalculator', () => {
  it('renders the default retirement projection summary', () => {
    render(<RetirementSavingsCalculator />);

    expect(screen.getByText('Final Balance:')).toBeInTheDocument();
  });
});
