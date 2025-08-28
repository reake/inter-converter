import { Metadata } from 'next';
import { ToolLayout, generateToolMetadata } from '@/components/tools/ToolLayout';
import { PressureConverter } from '@/components/converters/unit/PressureConverter';
import { getSEOConfigByToolId } from '@/config/seo-tools';

const seoConfig = getSEOConfigByToolId('pressure-converter');

export const metadata: Metadata = {
  title: 'Pressure Converter - Pascal, Bar, PSI & More | InterConverter',
  description: 'Convert between Pascal, Bar, PSI, atm, and other pressure units. Professional pressure conversion calculator for engineering applications.',
  keywords: 'pressure converter, psi converter, bar to psi converter, pascal converter, atmospheric pressure converter',
  openGraph: {
    title: 'Pressure Converter | InterConverter',
    description: 'Convert between different units of pressure',
    type: 'website',
  },
  alternates: {
    canonical: '/unit/pressure-converter'
  }
};

export default function PressureConverterPage() {
  return (
    <ToolLayout
      title={metadata.title as string}
      description={metadata.description as string}
      keywords={['pressure converter', 'psi converter', 'bar to psi', 'pascal converter']}
      canonicalUrl="https://interconverter.com/unit/pressure-converter"
    >
      <PressureConverter />
    </ToolLayout>
  );
}
