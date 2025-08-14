import { Metadata } from 'next';
import { ToolLayout, generateToolMetadata } from '@/components/tools/ToolLayout';
import { BMICalculator } from '@/components/converters/BMICalculator';

export const metadata: Metadata = generateToolMetadata(
  'BMI Calculator',
  'Calculate your BMI (Body Mass Index) instantly. Free BMI calculator with health categories, ideal weight ranges & personalized recommendations.',
  'bmi-calculator',
  [
    'bmi calculator',
    'body mass index calculator',
    'healthy weight calculator',
    'bmi chart calculator',
    'weight calculator online',
    'obesity calculator',
    'ideal weight calculator',
    'health calculator bmi',
    'fitness calculator online',
    'body weight calculator'
  ],
  'health'
);

export default function BMICalculatorPage() {
  return (
    <ToolLayout
      title="BMI Calculator"
      description="Calculate your Body Mass Index (BMI) and get personalized health recommendations. Support for both metric and imperial units."
      toolId="bmi-calculator"
      category="health"
      emoji="⚖️"
      customHowToUse={[
        "Enter your height in feet/inches or centimeters",
        "Enter your weight in pounds or kilograms",
        "View your BMI result and health category",
        "Get personalized recommendations for your BMI range"
      ]}
      customFeatures={[
        "Instant BMI calculation with health categories",
        "Support for metric and imperial units",
        "Ideal weight range recommendations",
        "Personalized health insights and tips"
      ]}
    >
      <BMICalculator />
    </ToolLayout>
  );
}