import { Metadata } from 'next';
import ToolLayout from '@/components/layout/ToolLayout';
import { WorkingDaysCalculator } from '@/components/converters/time/WorkingDaysCalculator';
import { getSEOConfigByToolId } from '@/config/seo-tools';

const seoConfig = getSEOConfigByToolId('working-days-calculator');

export const metadata: Metadata = {
  title: seoConfig?.title || 'Working Days Calculator - Business Days Between Dates | InterConverter',
  description: seoConfig?.description || 'Calculate working days between dates excluding weekends and holidays. Free business days calculator with custom holiday support.',
  keywords: seoConfig?.keywords?.join(', ') || 'working days calculator, business days calculator, weekdays calculator, exclude weekends',
  openGraph: {
    title: seoConfig?.title || 'Working Days Calculator | InterConverter',
    description: seoConfig?.description || 'Calculate business days between dates',
    type: 'website',
  },
  alternates: {
    canonical: seoConfig?.canonicalPath || '/time/working-days-calculator'
  }
};

export default function WorkingDaysCalculatorPage() {
  return (
    <ToolLayout
      title={metadata.title as string}
      description={metadata.description as string}
      keywords={seoConfig?.keywords || []}
      canonicalUrl={`https://interconverter.com${seoConfig?.canonicalPath}`}
      structuredData={seoConfig?.structuredData}
    >
      <WorkingDaysCalculator />
    </ToolLayout>
  );
}
