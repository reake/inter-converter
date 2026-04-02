import { render, screen } from '@testing-library/react';

import { ContrastChecker } from '@/components/converters/color/ContrastChecker';

describe('ContrastChecker', () => {
  it('does not render a duplicate h1 inside the tool body', () => {
    render(<ContrastChecker />);

    expect(screen.queryByRole('heading', { level: 1 })).not.toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 2, name: /color contrast checker/i })).toBeInTheDocument();
  });
});
