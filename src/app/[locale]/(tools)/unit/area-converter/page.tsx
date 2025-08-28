import { Metadata } from 'next';
import { ToolLayout } from '@/components/tools/ToolLayout';
import { AreaConverter } from '@/components/converters/unit/AreaConverter';
import { getSEOConfigByToolId } from '@/config/seo-tools';

const seoConfig = getSEOConfigByToolId('area-converter');

export const metadata: Metadata = {
  title: seoConfig?.title || 'Area Converter - Square Meters, Feet, Acres & More | InterConverter',
  description: seoConfig?.description || 'Convert area units including square meters, square feet, acres, hectares. Professional area conversion calculator for land and property measurements.',
  keywords: seoConfig?.keywords?.join(', ') || 'area converter, square meter converter, square feet converter, acre to hectare',
  openGraph: {
    title: seoConfig?.title || 'Area Converter | InterConverter',
    description: seoConfig?.description || 'Convert between different units of area',
    type: 'website',
  },
  alternates: {
    canonical: seoConfig?.canonicalPath || '/unit/area-converter'
  }
};

export default function AreaConverterPage() {
  return (
    <ToolLayout
      title={metadata.title as string}
      description={metadata.description as string}
      keywords={seoConfig?.keywords || []}
      toolId="area-converter"
      category="unit"
    >
      <AreaConverter />
    </ToolLayout>
  );
}
