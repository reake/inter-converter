import { Metadata } from 'next';
import ToolLayout from '@/components/layout/ToolLayout';
import { EnergyConverter } from '@/components/converters/unit/EnergyConverter';
import { getSEOConfigByToolId } from '@/config/seo-tools';

const seoConfig = getSEOConfigByToolId('energy-converter');

export const metadata: Metadata = {
  title: 'Energy Converter - Calories, Kilojoules, kWh & More | InterConverter',
  description: 'Convert between calories, kilojoules, kilowatt-hours, BTU and other energy units. Professional energy conversion calculator.',
  keywords: 'energy converter, calorie converter, kilojoule converter, kwh converter, btu converter',
  openGraph: {
    title: 'Energy Converter | InterConverter',
    description: 'Convert between different units of energy',
    type: 'website',
  },
  alternates: {
    canonical: '/unit/energy-converter'
  }
};

export default function EnergyConverterPage() {
  return (
    <ToolLayout
      title={metadata.title as string}
      description={metadata.description as string}
      keywords={['energy converter', 'calorie converter', 'kilojoule converter', 'kwh converter']}
      canonicalUrl="https://interconverter.com/unit/energy-converter"
    >
      <EnergyConverter />
    </ToolLayout>
  );
}
