import { render, screen } from '@testing-library/react';

import TimezoneConverter from '@/components/converters/time/TimezoneConverter';

describe('TimezoneConverter', () => {
  it('exposes the source timezone control through its visible label', () => {
    render(<TimezoneConverter />);

    expect(screen.getByLabelText(/timezone/i)).toBeInTheDocument();
  });
});
