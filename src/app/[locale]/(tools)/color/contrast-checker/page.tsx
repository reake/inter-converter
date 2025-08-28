import { Metadata } from 'next';
import { ToolLayout } from '@/components/tools/ToolLayout';
import { ContrastChecker } from '@/components/converters/color/ContrastChecker';
import { getSEOConfigByToolId } from '@/config/seo-tools';

const seoConfig = getSEOConfigByToolId('contrast-checker');

export const metadata: Metadata = {
  title: seoConfig?.title || 'Color Contrast Checker - WCAG Accessibility Tool | InterConverter',
  description: seoConfig?.description || 'Check color contrast ratios for WCAG AA and AAA compliance. Ensure your designs meet accessibility standards with our contrast analyzer.',
  keywords: seoConfig?.keywords?.join(', ') || 'contrast checker, wcag compliance, accessibility, color contrast, aa aaa standards',
  openGraph: {
    title: seoConfig?.title || 'Contrast Checker | InterConverter',
    description: seoConfig?.description || 'Check color contrast for WCAG accessibility compliance',
    type: 'website',
  },
  alternates: {
    canonical: seoConfig?.canonicalPath || '/color/contrast-checker'
  }
};

export default function ContrastCheckerPage() {
  return (
    <ToolLayout
      title={metadata.title as string}
      description={metadata.description as string}
      keywords={seoConfig?.keywords || []}
      toolId="contrast-checker"
      category="color"
    >
      <ContrastChecker />
    </ToolLayout>
  );
}
