import { Metadata } from 'next';
import { EnhancedToolLayout } from '@/components/tools/EnhancedToolLayout';
import { TireSpeedCalculator } from '@/components/converters/automotive/TireSpeedCalculator';
import { getFAQsByToolId } from '@/config/tool-faqs';
import { generateOptimizedKeywords } from '@/config/seo-keywords';

// Force static generation
export const dynamic = 'force-static';

const keywords = generateOptimizedKeywords('tire-speed-calculator', 'auto', 'Tire Speed Calculator');

export const metadata: Metadata = {
  title: 'Tire Speed Calculator - RPM, Gear Ratio & Tire Size | InterConverter',
  description: 'Calculate vehicle speed based on tire diameter, gear ratio, and RPM. Essential tool for performance tuning and gear selection with professional accuracy.',
  keywords: keywords.join(', '),
  openGraph: {
    title: 'Tire Speed Calculator - RPM, Gear Ratio & Tire Size',
    description: 'Professional tire speed calculator for automotive performance. Calculate vehicle speed from tire diameter, gear ratio, and engine RPM.',
    type: 'website',
    images: [
      {
        url: '/images/og-tire-speed-calculator.jpg',
        width: 1200,
        height: 630,
        alt: 'Tire Speed Calculator Tool'
      }
    ]
  },
  alternates: {
    canonical: '/auto/tire-speed-calculator'
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

export default function TireSpeedCalculatorPage() {
  const faqs = getFAQsByToolId('tire-speed-calculator', 'auto');

  return (
    <EnhancedToolLayout
      title="Tire Speed Calculator"
      description="Calculate vehicle speed based on tire diameter, gear ratio, and RPM. Essential tool for performance tuning and optimal gear selection."
      keywords={keywords}
      toolId="tire-speed-calculator"
      category="auto"
      emoji="🏎️"
      customHowToUse={[
        "Enter tire diameter in inches",
        "Input gear ratio (e.g., 3.73)",
        "Enter engine RPM",
        "View calculated speed in MPH",
        "Compare different tire sizes and ratios for optimization"
      ]}
      customFeatures={[
        "Larger tire diameter increases speed at same RPM",
        "Lower gear ratio increases speed but reduces acceleration",
        "Use for selecting optimal tire and gear combinations",
        "Consider transmission ratio for final calculations",
        "Account for tire wear affecting actual diameter"
      ]}
      faqs={faqs}
    >
      <TireSpeedCalculator />
    </EnhancedToolLayout>
  );
}
