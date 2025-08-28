import { Metadata } from 'next';
import ToolLayout from '@/components/layout/ToolLayout';
import { TemperatureConverter } from '@/components/converters/unit/TemperatureConverter';
import { getSEOConfigByToolId } from '@/config/seo-tools';

const seoConfig = getSEOConfigByToolId('temperature-converter');

export const metadata: Metadata = {
  title: seoConfig?.title || 'Temperature Converter - Celsius, Fahrenheit & Kelvin | InterConverter',
  description: seoConfig?.description || 'Convert temperatures between Celsius, Fahrenheit, and Kelvin. Free online temperature conversion calculator with weather references and formulas.',
  keywords: seoConfig?.keywords?.join(', ') || 'temperature converter, celsius to fahrenheit, fahrenheit to celsius, kelvin converter',
  openGraph: {
    title: seoConfig?.title || 'Temperature Converter | InterConverter',
    description: seoConfig?.description || 'Convert between different temperature scales',
    type: 'website',
  },
  alternates: {
    canonical: seoConfig?.canonicalPath || '/unit/temperature-converter'
  }
};

export default function TemperatureConverterPage() {
  return (
    <ToolLayout
      title={metadata.title as string}
      description={metadata.description as string}
      keywords={seoConfig?.keywords || []}
      canonicalUrl={`https://interconverter.com${seoConfig?.canonicalPath}`}
      structuredData={seoConfig?.structuredData}
    >
      <TemperatureConverter />
    </ToolLayout>
  );
}
