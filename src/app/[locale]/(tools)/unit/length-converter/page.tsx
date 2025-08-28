import { Metadata } from 'next';
import { ToolLayout } from '@/components/tools/ToolLayout';
import { LengthConverter } from '@/components/converters/unit/LengthConverter';
import { getSEOConfigByToolId } from '@/config/seo-tools';

const seoConfig = getSEOConfigByToolId('length-converter');

export const metadata: Metadata = {
  title: seoConfig?.title || 'Length Converter - Convert Meters, Feet, Inches & More | InterConverter',
  description: seoConfig?.description || 'Free online length converter. Convert between meters, feet, inches, centimeters, miles, kilometers and more. Accurate metric to imperial conversion calculator.',
  keywords: seoConfig?.keywords?.join(', ') || 'length converter, distance converter, meter to feet, feet to meter, inch to cm, cm to inch, mile to km',
  openGraph: {
    title: seoConfig?.title || 'Length Converter | InterConverter',
    description: seoConfig?.description || 'Convert between different units of length and distance',
    type: 'website',
  },
  alternates: {
    canonical: seoConfig?.canonicalPath || '/unit/length-converter'
  }
};

export default function LengthConverterPage() {
  return (
    <ToolLayout
      title={metadata.title as string}
      description={metadata.description as string}
      keywords={seoConfig?.keywords || []}
      toolId="length-converter"
      category="unit"
    >
      <LengthConverter />
    </ToolLayout>
  );
}
