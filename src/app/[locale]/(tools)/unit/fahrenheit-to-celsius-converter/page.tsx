import { Metadata } from 'next';
import { ToolLayout, generateToolMetadata } from '@/components/tools/ToolLayout';
import FahrenheitToCelsiusConverter from '@/components/converters/unit/FahrenheitToCelsiusConverter';

// Force static generation
export const dynamic = 'force-static';
export const metadata: Metadata = generateToolMetadata(
  'Fahrenheit to Celsius Converter',
  'Convert Fahrenheit to Celsius instantly. Free online temperature converter with formula, common values, and usage guide. Perfect for weather, cooking, and science.',
  'fahrenheit-to-celsius-converter',
  [
    'fahrenheit to celsius converter',
    'f to c converter',
    'temperature converter',
    'fahrenheit celsius calculator',
    'degrees fahrenheit to celsius',
    'f to c conversion',
    'temperature conversion tool',
    'celsius fahrenheit converter',
    'weather temperature converter',
    'cooking temperature converter',
    'fahrenheit celsius formula',
    'temperature conversion calculator',
    'f to c conversion chart',
    'fahrenheit to celsius chart',
    'temperature unit converter'
  ],
  'unit'
);

export default function FahrenheitToCelsiusConverterPage() {
  return (
    <ToolLayout
      title="Fahrenheit to Celsius Converter"
      description="Convert temperatures from Fahrenheit to Celsius with precision. Includes conversion formula, common temperature references, and instant calculations."
      toolId="fahrenheit-to-celsius-converter"
      category="unit"
      emoji="🌡️"
      customHowToUse={[
        "Enter temperature in Fahrenheit in the input field",
        "View the instant Celsius conversion result",
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
      <FahrenheitToCelsiusConverter />
    </ToolLayout>
  );
}
