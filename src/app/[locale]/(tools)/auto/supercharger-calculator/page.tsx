import { Metadata } from 'next';
import { ToolLayout, generateToolMetadata } from '@/components/tools/ToolLayout';
import { SuperchargerCalculator } from '@/components/converters/automotive/SuperchargerCalculator';




// Force static generation
export const dynamic = 'force-static';
export const metadata: Metadata = generateToolMetadata(
  'Supercharger HP Calculator',
  'Calculate supercharger horsepower gains from boost PSI. Free online tool for turbo, blower & forced induction power calculations. Get instant results.',
  'supercharger-calculator',
  [
    'supercharger calculator',
    'supercharger horsepower calculator',
    'boost psi calculator',
    'turbo hp calculator',
    'forced induction calculator',
    'blower calculator',
    'supercharger cfm calculator',
    'boost horsepower gain',
    'turbocharger calculator',
    'centrifugal supercharger calculator',
    'roots blower calculator',
    'twin screw supercharger calculator',
    'boost pressure calculator',
    'forced induction hp gain',
    'supercharger sizing calculator'
  ],
  'auto'
);

export default function SuperchargerCalculatorPage() {
  return (
    <ToolLayout
      title="Supercharger Calculator"
      description="Calculate horsepower gains from supercharger and forced induction systems"
      toolId="supercharger-calculator"
      category="auto"
      emoji="💨"
      customHowToUse={[
        "Enter base engine horsepower",
        "Input boost pressure in PSI",
        "View calculated horsepower gains",
        "Consider safety warnings for high boost"
      ]}
      customFeatures={[
        "Boost pressure to HP calculations",
        "Forced induction analysis",
        "Ram air effect calculations",
        "Performance optimization guidance"
      ]}
    >
      <SuperchargerCalculator />
    </ToolLayout>
  );
}