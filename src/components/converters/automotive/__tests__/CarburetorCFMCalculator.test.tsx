import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { CarburetorCFMCalculator } from '../CarburetorCFMCalculator';

// Mock the AutoTermTooltip component
jest.mock('@/components/automotive/EducationalTooltip', () => ({
  AutoTermTooltip: ({ triggerText }: { triggerText: string }) => <span>{triggerText}</span>
}));

describe('CarburetorCFMCalculator', () => {
  test('renders calculator form', () => {
    render(<CarburetorCFMCalculator />);
    
    expect(screen.getByLabelText(/engine displacement/i)).toBeInTheDocument();
    expect(screen.getByText(/calculate cfm requirements/i)).toBeInTheDocument();
  });

  test('calculates CFM for stock engine correctly', async () => {
    render(<CarburetorCFMCalculator />);
    
    const displacementInput = screen.getByLabelText(/engine displacement/i);
    const calculateButton = screen.getByText(/calculate cfm requirements/i);
    
    fireEvent.change(displacementInput, { target: { value: '350' } });
    fireEvent.click(calculateButton);
    
    await waitFor(() => {
      expect(screen.getByText(/566.3/)).toBeInTheDocument();
    });
  });

  test('shows validation error for invalid input', async () => {
    render(<CarburetorCFMCalculator />);
    
    const calculateButton = screen.getByText(/calculate cfm requirements/i);
    fireEvent.click(calculateButton);
    
    await waitFor(() => {
      expect(screen.getByText(/please enter a valid displacement value/i)).toBeInTheDocument();
    });
  });

  test('switches between CI and liters units', () => {
    render(<CarburetorCFMCalculator />);
    
    const unitSelect = screen.getByDisplayValue(/cubic inches/i);
    fireEvent.click(unitSelect);
    
    const litersOption = screen.getByText(/liters/i);
    fireEvent.click(litersOption);
    
    const displacementInput = screen.getByLabelText(/engine displacement/i);
    expect(displacementInput).toHaveAttribute('placeholder', 'e.g., 5.7');
  });

  test('uses engine presets correctly', async () => {
    render(<CarburetorCFMCalculator />);
    
    const chevy350Button = screen.getByText(/chevy 350 sbc/i);
    fireEvent.click(chevy350Button);
    
    const displacementInput = screen.getByLabelText(/engine displacement/i);
    expect(displacementInput).toHaveValue('350');
  });
});