import { Metadata } from 'next';
import ToolLayout from '@/components/layout/ToolLayout';
import { RgbToHexConverter } from '@/components/converters/color/RgbToHexConverter';
import { getSEOConfigByToolId } from '@/config/seo-tools';

const seoConfig = getSEOConfigByToolId('rgb-to-hex');

export const metadata: Metadata = {
  title: seoConfig?.title || 'RGB to HEX Converter - Convert Colors Online | InterConverter',
  description: seoConfig?.description || 'Convert RGB color values to HEX codes instantly. Free online color converter with live preview and copy functionality.',
  keywords: seoConfig?.keywords?.join(', ') || 'rgb to hex, color converter, hex converter, rgb converter, color code converter',
  openGraph: {
    title: seoConfig?.title || 'RGB to HEX Converter | InterConverter',
    description: seoConfig?.description || 'Convert RGB color values to HEX codes',
    type: 'website',
  },
  alternates: {
    canonical: seoConfig?.canonicalPath || '/color/rgb-to-hex'
  }
};

export default function RgbToHexPage() {
  return (
    <ToolLayout
      title={metadata.title as string}
      description={metadata.description as string}
      keywords={seoConfig?.keywords || []}
      canonicalUrl={`https://interconverter.com${seoConfig?.canonicalPath}`}
      structuredData={seoConfig?.structuredData}
    >
      <RgbToHexConverter />
    </ToolLayout>
  );
}
