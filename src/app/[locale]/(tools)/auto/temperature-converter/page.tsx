import { Metadata } from 'next';
import { ToolLayout } from '@/components/tools/ToolLayout';
import { AutomotiveTemperatureConverter } from '@/components/converters/automotive/AutomotiveTemperatureConverter';




// Force static generation
export const dynamic = 'force-static';
const keywords = [
  'temperature converter',
  'fahrenheit to celsius',
  'automotive temperature',
  'engine temperature',
  'coolant temperature',
];

export const metadata: Metadata = {
  title: 'Automotive Temperature Converter',
  description:
    'Convert between Fahrenheit and Celsius for automotive applications. Engine temperature, coolant, oil temperature converter.',
  keywords: keywords.join(', '),
  openGraph: {
    title: 'Automotive Temperature Converter',
    description:
      'Convert between Fahrenheit and Celsius for automotive applications. Engine temperature, coolant, oil temperature converter.',
    type: 'website',
  },
  alternates: {
    canonical: '/auto/temperature-converter',
  },
};

export default function AutomotiveTemperatureConverterPage() {
  return (
    <ToolLayout
      title="Automotive Temperature Converter"
      description="Convert between Fahrenheit and Celsius for automotive use"
      keywords={keywords}
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
