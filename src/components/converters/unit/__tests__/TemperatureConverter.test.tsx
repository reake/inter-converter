import { render, screen } from '@testing-library/react';

import { TemperatureConverter } from '@/components/converters/unit/TemperatureConverter';

describe('TemperatureConverter', () => {
  it('labels the main controls and swap action accessibly', () => {
    render(<TemperatureConverter />);

    expect(screen.getByLabelText(/temperature value/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/from unit/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/to unit/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /swap temperature units/i })).toBeInTheDocument();
  });
});
