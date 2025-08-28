import { Metadata } from 'next';
import { ToolLayout, generateToolMetadata } from '@/components/tools/ToolLayout';
import { VolumeConverter } from '@/components/converters/unit/VolumeConverter';
import { getSEOConfigByToolId } from '@/config/seo-tools';

const seoConfig = getSEOConfigByToolId('volume-converter');

export const metadata: Metadata = {
  title: seoConfig?.title || 'Volume Converter - Liters, Gallons, Cubic Meters | InterConverter',
  description: seoConfig?.description || 'Convert volume units between liters, gallons, cubic meters, milliliters and more. Accurate liquid volume conversion calculator.',
  keywords: seoConfig?.keywords?.join(', ') || 'volume converter, liter to gallon, gallon to liter, cubic meter converter',
  openGraph: {
    title: seoConfig?.title || 'Volume Converter | InterConverter',
    description: seoConfig?.description || 'Convert between different units of volume',
    type: 'website',
  },
  alternates: {
    canonical: seoConfig?.canonicalPath || '/unit/volume-converter'
  }
};

export default function VolumeConverterPage() {
  return (
    <ToolLayout
      title={metadata.title as string}
      description={metadata.description as string}
      keywords={seoConfig?.keywords || []}
      canonicalUrl={`https://interconverter.com${seoConfig?.canonicalPath}`}
      structuredData={seoConfig?.structuredData}
    >
      <VolumeConverter />
    </ToolLayout>
  );
}
