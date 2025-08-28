import { Metadata } from 'next';
import ToolLayout from '@/components/layout/ToolLayout';
import HexToHslConverter from '@/components/converters/color/HexToHslConverter';
import { getSEOConfigByToolId } from '@/config/seo-tools';

const seoConfig = getSEOConfigByToolId('hex-to-hsl');

export const metadata: Metadata = {
  title: seoConfig?.title || 'HEX to HSL Converter - Convert Colors Online | InterConverter',
  description: seoConfig?.description || 'Convert HEX color codes to HSL values instantly. Free online color converter with live preview and HSL breakdown.',
  keywords: seoConfig?.keywords?.join(', ') || 'hex to hsl, color converter, hsl converter, color code converter',
  openGraph: {
    title: seoConfig?.title || 'HEX to HSL Converter | InterConverter',
    description: seoConfig?.description || 'Convert HEX color codes to HSL values',
    type: 'website',
  },
  alternates: {
    canonical: seoConfig?.canonicalPath || '/color/hex-to-hsl'
  }
};

export default function HexToHslPage() {
  return (
    <ToolLayout
      title={metadata.title as string}
      description={metadata.description as string}
      keywords={seoConfig?.keywords || []}
      canonicalUrl={`https://interconverter.com${seoConfig?.canonicalPath}`}
      structuredData={seoConfig?.structuredData}
    >
      <HexToHslConverter />
    </ToolLayout>
  );
}
