import { Metadata } from 'next';
import { ToolLayout, generateToolMetadata } from '@/components/tools/ToolLayout';
import BMICalculator from '@/components/converters/health/BMICalculator';

// Force static generation
export const dynamic = 'force-static';

export const metadata: Metadata = generateToolMetadata(
  'Calorie Calculator',
  'Calculate daily calorie needs based on age, gender, weight, height, and activity level. Plan your nutrition and weight management goals.',
  'calorie-calculator',
  [
    'calorie calculator',
    'daily calorie calculator',
    'calorie needs calculator',
    'TDEE calculator',
    'metabolism calculator',
    'calorie requirement calculator'
  ],
  'health'
);

export default function CalorieCalculatorPage() {
  return (
    <ToolLayout
      title="Calorie Calculator"
      description="Calculate your daily calorie needs based on personal factors and activity level for optimal health and weight management"
      toolId="calorie-calculator"
      category="health"
      emoji="🍎"
      customHowToUse={[
        "Enter your age, gender, weight, and height",
        "Select your activity level",
        "Choose your weight goal (maintain, lose, gain)",
        "Calculate daily calorie needs",
        "Get personalized nutrition recommendations",
        "Track your calorie intake goals"
      ]}
      customFeatures={[
        "BMR and TDEE calculations",
        "Activity level adjustments",
        "Weight goal customization",
        "Macronutrient recommendations",
        "Calorie deficit/surplus planning",
        "Personalized nutrition guidance"
      ]}
    >
      <BMICalculator />
    </ToolLayout>
  );
}
