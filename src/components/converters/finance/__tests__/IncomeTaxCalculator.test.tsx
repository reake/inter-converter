import { render, screen } from '@testing-library/react';

import IncomeTaxCalculator from '@/components/converters/finance/IncomeTaxCalculator';

describe('IncomeTaxCalculator', () => {
  it('renders the standard deduction summary for the default filing status', () => {
    render(<IncomeTaxCalculator />);

    expect(screen.getByText('Standard Deduction: $14,600')).toBeInTheDocument();
  });
});
