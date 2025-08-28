import { Metadata } from 'next';
import { ToolLayout, generateToolMetadata } from '@/components/tools/ToolLayout';
import CelsiusToFahrenheitConverter from '@/components/converters/unit/CelsiusToFahrenheitConverter';

// Force static generation
export const dynamic = 'force-static';
export const metadata: Metadata = generateToolMetadata(
  'Celsius to Fahrenheit Converter',
  'Convert Celsius to Fahrenheit instantly. Free online temperature converter with formula, common values, and usage guide. Perfect for weather, cooking, and science.',
  'celsius-to-fahrenheit-converter',
  [
    'celsius to fahrenheit converter',
    'c to f converter',
    'temperature converter',
    'celsius fahrenheit calculator',
    'degrees celsius to fahrenheit',
    'c to f conversion',
    'temperature conversion tool',
    'fahrenheit celsius converter',
    'weather temperature converter',
    'cooking temperature converter',
    'celsius fahrenheit formula',
    'temperature conversion calculator',
    'c to f conversion chart',
    'celsius to fahrenheit chart',
    'temperature unit converter'
  ],
  'unit'
);

export default function CelsiusToFahrenheitConverterPage() {
  return (
    <ToolLayout
      title="Celsius to Fahrenheit Converter"
      description="Convert temperatures from Celsius to Fahrenheit with precision. Includes conversion formula, common temperature references, and instant calculations."
      toolId="celsius-to-fahrenheit-converter"
      category="unit"
      emoji="🌡️"
      customHowToUse={[
        "Enter temperature in Celsius in the input field",
        "View the instant Fahrenheit conversion result",
        "Use the common temperatures tab for quick reference",
        "Copy results or use the conversion formula"
      ]}
      customFeatures={[
        "Bidirectional temperature conversion",
        "Common temperature reference table",
        "Precise conversion formulas",
        "Weather and cooking applications",
        "Scientific accuracy"
      ]}
    >
      <CelsiusToFahrenheitConverter />
    </ToolLayout>
  );
}
