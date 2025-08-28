import { Metadata } from 'next';
import { ToolLayout, generateToolMetadata } from '@/components/tools/ToolLayout';
import { AutoWeightConverter } from '@/components/converters/automotive/AutoWeightConverter';
import { getSEOConfigByToolId } from '@/config/seo-tools';

const seoConfig = getSEOConfigByToolId('weight-converter');

export const metadata: Metadata = {
  title: seoConfig?.title || 'Weight Converter - Convert Kg, Pounds, Grams & More | InterConverter',
  description: seoConfig?.description || 'Free weight converter tool. Convert between kilograms, pounds, grams, ounces, stones and more. Accurate mass conversion calculator for all units.',
  keywords: seoConfig?.keywords?.join(', ') || 'weight converter, mass converter, kg to lbs, pounds to kg, gram to ounce, weight conversion calculator',
  openGraph: {
    title: seoConfig?.title || 'Weight Converter | InterConverter',
    description: seoConfig?.description || 'Convert between different units of weight and mass',
    type: 'website',
  },
  alternates: {
    canonical: seoConfig?.canonicalPath || '/unit/weight-converter'
  }
};

export default function AutoWeightConverterPage() {
  return (
    <ToolLayout
      title={metadata.title as string}
      description={metadata.description as string}
      keywords={seoConfig?.keywords || []}
      canonicalUrl={`https://interconverter.com${seoConfig?.canonicalPath}`}
      structuredData={seoConfig?.structuredData}
    >
      <AutoWeightConverter />
    </ToolLayout>
  );
}
