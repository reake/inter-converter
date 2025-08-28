import { Metadata } from 'next';
import { ToolLayout, generateToolMetadata } from '@/components/tools/ToolLayout';
import { TemperatureConverter } from '@/components/converters/unit/TemperatureConverter';

// Force static generation
export const dynamic = 'force-static';
export const metadata: Metadata = generateToolMetadata(
  'Temperature Converter',
  'Convert between Celsius, Fahrenheit, and Kelvin temperature units. Fast and accurate temperature conversion tool.',
  'temperature-converter',
  [
    'temperature converter',
    'celsius to fahrenheit',
    'fahrenheit to celsius',
    'kelvin converter',
    'temperature conversion',
    'celsius fahrenheit',
    'unit conversion',
    'temperature calculator'
  ],
  'unit'
);

export default function TemperatureConverterPage() {
  return (
    <ToolLayout
      title="Temperature Converter"
      description="Convert between Celsius, Fahrenheit, and Kelvin temperature units"
      toolId="temperature-converter"
      category="unit"
      emoji="🌡️"
      customHowToUse={[
        "Enter the temperature value to convert",
        "Select the source unit (Celsius, Fahrenheit, or Kelvin)",
        "Choose the target temperature unit",
        "View the converted temperature instantly"
      ]}
      customFeatures={[
        "Celsius (°C) conversion",
        "Fahrenheit (°F) conversion",
        "Kelvin (K) conversion",
        "Real-time conversion updates",
        "Copy result to clipboard"
      ]}
    >
      <TemperatureConverter />
    </ToolLayout>
  );
}
