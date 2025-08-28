import { Metadata } from 'next';
import { EnhancedToolLayout } from '@/components/tools/EnhancedToolLayout';
import { ContrastChecker } from '@/components/converters/color/ContrastChecker';
import { getFAQsByToolId } from '@/config/tool-faqs';
import { generateOptimizedKeywords } from '@/config/seo-keywords';

// Force static generation
export const dynamic = 'force-static';

const keywords = generateOptimizedKeywords('contrast-checker', 'color', 'Color Contrast Checker');

export const metadata: Metadata = {
  title: 'Color Contrast Checker - WCAG Accessibility Tool | InterConverter',
  description: 'Check color contrast ratios for WCAG AA and AAA compliance. Ensure your designs meet accessibility standards with our contrast analyzer.',
  keywords: keywords.join(', '),
  openGraph: {
    title: 'Color Contrast Checker - WCAG Accessibility Tool',
    description: 'Professional contrast checker for WCAG AA and AAA compliance. Ensure your designs meet accessibility standards.',
    type: 'website',
    images: [
      {
        url: '/images/og-contrast-checker.jpg',
        width: 1200,
        height: 630,
        alt: 'Color Contrast Checker Tool'
      }
    ]
  },
  alternates: {
    canonical: '/color/contrast-checker'
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

export default function ContrastCheckerPage() {
  const faqs = getFAQsByToolId('contrast-checker', 'color');

  return (
    <EnhancedToolLayout
      title="Color Contrast Checker"
      description="Check color contrast ratios for WCAG AA and AAA compliance with instant calculations and accessibility analysis."
      keywords={keywords}
      toolId="contrast-checker"
      category="color"
      emoji="♿"
      customHowToUse={[
        "Select or enter foreground and background colors",
        "View the contrast ratio calculation instantly",
        "Check WCAG AA and AAA compliance status",
        "Test with different text sizes and weights",
        "Adjust colors to meet accessibility standards"
      ]}
      customFeatures={[
        "WCAG 2.1 AA and AAA compliance checking",
        "Real-time contrast ratio calculation",
        "Text size and weight considerations",
        "Color accessibility recommendations",
        "Visual preview of text on background",
        "Pass/fail indicators for compliance levels"
      ]}
      faqs={faqs}
    >
      <ContrastChecker />
    </EnhancedToolLayout>
  );
}
