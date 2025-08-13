import { Metadata } from 'next';
import { AutomotiveToolLayout } from '@/components/automotive/AutomotiveToolLayout';
import { AutomotiveTemperatureConverter } from '@/components/automotive/AutomotiveTemperatureConverter';

export const metadata: Metadata = {
  title: 'Automotive Temperature Converter - Fahrenheit to Celsius | InterConverter',
  description: 'Convert between Fahrenheit and Celsius for automotive applications. Engine temperature, coolant, oil temperature converter.',
  keywords: 'temperature converter, fahrenheit to celsius, automotive temperature, engine temperature',
};

export default function AutomotiveTemperatureConverterPage() {
  return (
    <AutomotiveToolLayout
      title="Automotive Temperature Converter"
      description="Convert between Fahrenheit and Celsius for automotive use"
      toolId="automotive-temperature-converter"
    >
      <AutomotiveTemperatureConverter />
    </AutomotiveToolLayout>
  );
}
