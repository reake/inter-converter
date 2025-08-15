import { Metadata } from 'next';
import { ToolLayout, generateToolMetadata } from '@/components/tools/ToolLayout';
import { AutomotiveTemperatureConverter } from '@/components/automotive/AutomotiveTemperatureConverter';




// Force static generation
export const dynamic = 'force-static';
export const metadata: Metadata = generateToolMetadata(
  'Automotive Temperature Converter',
  'Convert between Fahrenheit and Celsius for automotive applications. Engine temperature, coolant, oil temperature converter.',
  'temperature-converter',
  ['temperature converter', 'fahrenheit to celsius', 'automotive temperature', 'engine temperature', 'coolant temperature'],
  'auto'
);

export default function AutomotiveTemperatureConverterPage() {
  return (
    <ToolLayout
      title="Automotive Temperature Converter"
      description="Convert between Fahrenheit and Celsius for automotive use"
      toolId="temperature-converter"
      category="auto"
      emoji="🌡️"
      customHowToUse={[
        "Enter temperature in Fahrenheit or Celsius",
        "View instant conversion to other scale",
        "Reference common automotive temperatures",
        "Use for engine diagnostics and maintenance"
      ]}
      customFeatures={[
        "Fahrenheit to Celsius conversion",
        "Automotive temperature references",
        "Engine operating temperatures",
        "Coolant and oil temperature ranges"
      ]}
    >
      <AutomotiveTemperatureConverter />
    </ToolLayout>
  );
}
