import { Metadata } from 'next';
import { ToolLayout, generateToolMetadata } from '@/components/tools/ToolLayout';
import { AgeCalculator } from '@/components/converters/time/AgeCalculator';
import { getSEOConfigByToolId } from '@/config/seo-tools';

const seoConfig = getSEOConfigByToolId('age-calculator');

export const metadata: Metadata = {
  title: seoConfig?.title || 'Age Calculator - Calculate Your Exact Age | InterConverter',
  description: seoConfig?.description || 'Calculate your exact age in years, months, days, hours and minutes. Find your next birthday, zodiac sign, and fun age statistics.',
  keywords: seoConfig?.keywords?.join(', ') || 'age calculator, calculate age, exact age, birthday calculator, zodiac sign calculator',
  openGraph: {
    title: seoConfig?.title || 'Age Calculator | InterConverter',
    description: seoConfig?.description || 'Calculate your exact age and birthday information',
    type: 'website',
  },
  alternates: {
    canonical: seoConfig?.canonicalPath || '/time/age-calculator'
  }
};

export default function AgeCalculatorPage() {
  return (
    <ToolLayout
      title={metadata.title as string}
      description={metadata.description as string}
      keywords={seoConfig?.keywords || []}
      canonicalUrl={`https://interconverter.com${seoConfig?.canonicalPath}`}
      structuredData={seoConfig?.structuredData}
    >
      <AgeCalculator />
    </ToolLayout>
  );
}
