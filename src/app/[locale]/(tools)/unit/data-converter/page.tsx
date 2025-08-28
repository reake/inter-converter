import { Metadata } from 'next';
import ToolLayout from '@/components/layout/ToolLayout';
import DataConverter from '@/components/converters/unit/DataConverter';
import { getSEOConfigByToolId } from '@/config/seo-tools';

const seoConfig = getSEOConfigByToolId('data-converter');

export const metadata: Metadata = {
  title: 'Data Storage Converter - KB, MB, GB, TB & More | InterConverter',
  description: 'Convert between KB, MB, GB, TB and other data storage units. Free file size conversion calculator for digital storage.',
  keywords: 'data converter, storage converter, kb to mb, mb to gb, gb to tb, file size converter',
  openGraph: {
    title: 'Data Storage Converter | InterConverter',
    description: 'Convert between different units of data storage',
    type: 'website',
  },
  alternates: {
    canonical: '/unit/data-converter'
  }
};

export default function DataConverterPage() {
  return (
    <ToolLayout
      title={metadata.title as string}
      description={metadata.description as string}
      keywords={['data converter', 'storage converter', 'kb to mb', 'mb to gb', 'file size converter']}
      canonicalUrl="https://interconverter.com/unit/data-converter"
    >
      <DataConverter />
    </ToolLayout>
  );
}
