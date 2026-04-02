import { render, screen } from '@testing-library/react';

import { SearchInput } from '@/components/ui/SearchInput';
import { SearchProvider } from '@/lib/search-context';

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
  useSearchParams: () => ({
    get: () => null,
  }),
}));

describe('SearchInput', () => {
  it('exposes an accessible name for the search textbox', () => {
    render(
      <SearchProvider>
        <SearchInput locale="en" />
      </SearchProvider>,
    );

    expect(screen.getByRole('textbox', { name: /search converter tools/i })).toBeInTheDocument();
  });
});
