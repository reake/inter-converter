import { Metadata } from 'next';
import { EnhancedToolLayout } from '@/components/tools/EnhancedToolLayout';
import ColorPickerTool from '@/components/converters/color/ColorPickerTool';
import { getFAQsByToolId } from '@/config/tool-faqs';
import { generateOptimizedKeywords } from '@/config/seo-keywords';

// Force static generation
export const dynamic = 'force-static';

const keywords = generateOptimizedKeywords('color-picker-tool', 'color', 'Online Color Picker Tool');

export const metadata: Metadata = {
  title: 'Online Color Picker Tool - Professional Color Selector | InterConverter',
  description: 'Professional color picker with HSL controls, color palettes, and history. Generate RGB, HEX, and HSL color codes for web design, graphic design, and development projects.',
  keywords: keywords.join(', '),
  openGraph: {
    title: 'Online Color Picker Tool - Professional Color Selector',
    description: 'Professional color picker with HSL sliders, preset palettes, and color history for web designers and developers.',
    type: 'website',
    images: [
      {
        url: '/images/og-color-picker-tool.jpg',
        width: 1200,
        height: 630,
        alt: 'Online Color Picker Tool'
      }
    ]
  },
  alternates: {
    canonical: '/color/color-picker-tool'
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

export default function ColorPickerToolPage() {
  const faqs = getFAQsByToolId('color-picker-tool', 'color');

  return (
    <EnhancedToolLayout
      title="Online Color Picker Tool"
      description="Professional color picker with HSL sliders, preset palettes, and color history with instant calculations."
      keywords={keywords}
      toolId="color-picker-tool"
      category="color"
      emoji="🌈"
      customHowToUse={[
        "Use HSL sliders to adjust Hue, Saturation, and Lightness",
        "Select from preset color palettes for inspiration",
        "View real-time color preview and multiple format outputs",
        "Save colors to history and copy codes for your project",
        "Use the color wheel for intuitive color selection"
      ]}
      customFeatures={[
        "HSL slider controls for precise color selection",
        "Preset color palettes (warm, cool, neutral)",
        "Color history for recently used colors",
        "Multiple format output (RGB, HEX, HSL)",
        "Real-time color preview",
        "Interactive color wheel interface"
      ]}
      faqs={faqs}
    >
      <ColorPickerTool />
    </EnhancedToolLayout>
  );
}
