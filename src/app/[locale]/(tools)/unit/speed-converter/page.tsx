import { Metadata } from 'next';
import { ToolLayout, generateToolMetadata } from '@/components/tools/ToolLayout';
import { SpeedConverter } from '@/components/converters/unit/SpeedConverter';
import { getSEOConfigByToolId } from '@/config/seo-tools';

const seoConfig = getSEOConfigByToolId('speed-converter');

export const metadata: Metadata = {
  title: seoConfig?.title || 'Speed Converter - Convert km/h, mph, knots & more | InterConverter',
  description: seoConfig?.description || 'Convert between km/h, mph, knots, m/s, and other speed units. Professional speed conversion calculator for all velocities.',
  keywords: seoConfig?.keywords?.join(', ') || 'speed converter, velocity converter, mph to kmh, kmh to mph, knots converter',
  openGraph: {
    title: seoConfig?.title || 'Speed Converter | InterConverter',
    description: seoConfig?.description || 'Convert between different units of speed',
    type: 'website',
  },
  alternates: {
    canonical: seoConfig?.canonicalPath || '/unit/speed-converter'
  }
};

export default function SpeedConverterPage() {
  return (
    <ToolLayout
      title={metadata.title as string}
      description={metadata.description as string}
      keywords={seoConfig?.keywords || []}
      canonicalUrl={`https://interconverter.com${seoConfig?.canonicalPath}`}
      structuredData={seoConfig?.structuredData}
    >
      <SpeedConverter />
    </ToolLayout>
  );
}
