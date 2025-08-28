import { Metadata } from 'next';
import { ToolLayout, generateToolMetadata } from '@/components/tools/ToolLayout';
import { DateCalculator } from '@/components/converters/time/DateCalculator';
import { getSEOConfigByToolId } from '@/config/seo-tools';

const seoConfig = getSEOConfigByToolId('date-calculator');

export const metadata: Metadata = {
  title: seoConfig?.title || 'Date Calculator - Calculate Date Differences & Add Time | InterConverter',
  description: seoConfig?.description || 'Calculate differences between dates, add or subtract time from dates. Free date calculator with years, months, days breakdown.',
  keywords: seoConfig?.keywords?.join(', ') || 'date calculator, date difference calculator, add days to date, subtract days from date',
  openGraph: {
    title: seoConfig?.title || 'Date Calculator | InterConverter',
    description: seoConfig?.description || 'Calculate date differences and add/subtract time',
    type: 'website',
  },
  alternates: {
    canonical: seoConfig?.canonicalPath || '/time/date-calculator'
  }
};

export default function DateCalculatorPage() {
  return (
    <ToolLayout
      title={metadata.title as string}
      description={metadata.description as string}
      keywords={seoConfig?.keywords || []}
      canonicalUrl={`https://interconverter.com${seoConfig?.canonicalPath}`}
      structuredData={seoConfig?.structuredData}
    >
      <DateCalculator />
    </ToolLayout>
  );
}
