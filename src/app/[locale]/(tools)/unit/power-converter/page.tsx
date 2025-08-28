import { Metadata } from 'next';
import { ToolLayout, generateToolMetadata } from '@/components/tools/ToolLayout';
import { PowerConverter } from '@/components/converters/unit/PowerConverter';
import { getSEOConfigByToolId } from '@/config/seo-tools';

const seoConfig = getSEOConfigByToolId('power-converter');

export const metadata: Metadata = {
  title: 'Power Converter - Watts, Kilowatts, Horsepower | InterConverter',
  description: 'Convert between watts, kilowatts, horsepower and other power units. Professional power conversion calculator for electrical and mechanical applications.',
  keywords: 'power converter, watt converter, kilowatt converter, horsepower converter, hp to kw',
  openGraph: {
    title: 'Power Converter | InterConverter',
    description: 'Convert between different units of power',
    type: 'website',
  },
  alternates: {
    canonical: '/unit/power-converter'
  }
};

export default function PowerConverterPage() {
  return (
    <ToolLayout
      title={metadata.title as string}
      description={metadata.description as string}
      keywords={['power converter', 'watt converter', 'horsepower converter', 'hp to kw']}
      canonicalUrl="https://interconverter.com/unit/power-converter"
    >
      <PowerConverter />
    </ToolLayout>
  );
}
