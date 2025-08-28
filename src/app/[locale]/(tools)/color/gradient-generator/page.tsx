import { Metadata } from 'next';
import { ToolLayout } from '@/components/tools/ToolLayout';
import { GradientGenerator } from '@/components/converters/color/GradientGenerator';
import { getSEOConfigByToolId } from '@/config/seo-tools';

const seoConfig = getSEOConfigByToolId('gradient-generator');

export const metadata: Metadata = {
  title: seoConfig?.title || 'CSS Gradient Generator - Create Beautiful Gradients | InterConverter',
  description: seoConfig?.description || 'Generate CSS gradients with live preview. Create linear gradients with custom colors and directions. Copy CSS code instantly.',
  keywords: seoConfig?.keywords?.join(', ') || 'gradient generator, css gradient, linear gradient, gradient maker, css background',
  openGraph: {
    title: seoConfig?.title || 'Gradient Generator | InterConverter',
    description: seoConfig?.description || 'Create beautiful CSS gradients with live preview',
    type: 'website',
  },
  alternates: {
    canonical: seoConfig?.canonicalPath || '/color/gradient-generator'
  }
};

export default function GradientGeneratorPage() {
  return (
    <ToolLayout
      title={metadata.title as string}
      description={metadata.description as string}
      keywords={seoConfig?.keywords || []}
      toolId="gradient-generator"
      category="color"
    >
      <GradientGenerator />
    </ToolLayout>
  );
}
