import { Metadata } from 'next';
import { EnhancedToolLayout } from '@/components/tools/EnhancedToolLayout';
import { GradientGenerator } from '@/components/converters/color/GradientGenerator';
import { getFAQsByToolId } from '@/config/tool-faqs';
import { generateOptimizedKeywords } from '@/config/seo-keywords';

// Force static generation
export const dynamic = 'force-static';

const keywords = generateOptimizedKeywords('gradient-generator', 'color', 'CSS Gradient Generator');

export const metadata: Metadata = {
  title: 'CSS Gradient Generator - Create Beautiful Gradients | InterConverter',
  description: 'Generate CSS gradients with live preview. Create linear and radial gradients with custom colors and directions. Copy CSS code instantly for web design.',
  keywords: keywords.join(', '),
  openGraph: {
    title: 'CSS Gradient Generator - Create Beautiful Gradients',
    description: 'Professional CSS gradient generator with live preview. Create linear and radial gradients with custom colors for web design.',
    type: 'website',
    images: [
      {
        url: '/images/og-gradient-generator.jpg',
        width: 1200,
        height: 630,
        alt: 'CSS Gradient Generator Tool'
      }
    ]
  },
  alternates: {
    canonical: '/color/gradient-generator'
  },
  authors: [{ name: 'InterConverter Team' }],
  creator: 'InterConverter',
  publisher: 'InterConverter',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  }
};

export default function GradientGeneratorPage() {
  const faqs = getFAQsByToolId('gradient-generator', 'color');

  return (
    <EnhancedToolLayout
      title="CSS Gradient Generator"
      description="Generate CSS gradients with live preview and create beautiful linear and radial gradients with instant calculations."
      keywords={keywords}
      toolId="gradient-generator"
      category="color"
      emoji="🌈"
      customHowToUse={[
        "Choose gradient type (linear or radial)",
        "Add and adjust color stops with the color picker",
        "Set gradient direction and angle",
        "Preview the gradient in real-time",
        "Copy the generated CSS code to clipboard",
        "Use the gradient in your web projects"
      ]}
      customFeatures={[
        "Linear and radial gradient support",
        "Multiple color stops with opacity control",
        "Custom gradient directions and angles",
        "Live preview with real-time updates",
        "CSS code generation and copy functionality",
        "Preset gradient templates"
      ]}
      faqs={faqs}
    >
      <GradientGenerator />
    </EnhancedToolLayout>
  );
}
