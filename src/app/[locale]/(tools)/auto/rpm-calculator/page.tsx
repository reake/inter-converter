import { Metadata } from 'next';
import { EnhancedToolLayout } from '@/components/tools/EnhancedToolLayout';
import { RPMCalculator } from '@/components/converters/automotive/RPMCalculator';
import { getFAQsByToolId } from '@/config/tool-faqs';
import { generateOptimizedKeywords } from '@/config/seo-keywords';

// Force static generation
export const dynamic = 'force-static';

const keywords = generateOptimizedKeywords('rpm-calculator', 'auto', 'RPM Calculator');

export const metadata: Metadata = {
  title: 'RPM Calculator - Engine Speed from Vehicle Speed | InterConverter',
  description: 'Calculate engine RPM based on vehicle speed, gear ratio, and tire diameter. Free automotive RPM calculator with professional accuracy.',
  keywords: keywords.join(', '),
  openGraph: {
    title: 'RPM Calculator - Engine Speed from Vehicle Speed',
    description: 'Professional RPM calculator for automotive applications. Calculate engine speed from vehicle speed, gear ratio, and tire diameter.',
    type: 'website',
    images: [
      {
        url: '/images/og-rpm-calculator.jpg',
        width: 1200,
        height: 630,
        alt: 'RPM Calculator Tool'
      }
    ]
  },
  alternates: {
    canonical: '/auto/rpm-calculator'
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

export default function RPMCalculatorPage() {
  const faqs = getFAQsByToolId('rpm-calculator', 'auto');

  return (
    <EnhancedToolLayout
      title="RPM Calculator"
      description="Calculate engine RPM based on vehicle speed, gear ratio, and tire diameter. Essential for performance tuning and drivetrain analysis."
      keywords={keywords}
      toolId="rpm-calculator"
      category="auto"
      emoji="🏎️"
      customHowToUse={[
        "Enter vehicle speed in MPH or KPH",
        "Input tire diameter in inches",
        "Enter gear ratio for current gear",
        "View calculated engine RPM instantly"
      ]}
      customFeatures={[
        "Speed to RPM conversion",
        "Gear ratio calculations",
        "Tire size considerations",
        "Multiple unit support",
        "Performance tuning analysis"
      ]}
      faqs={faqs}
    >
      <RPMCalculator />
    </EnhancedToolLayout>
  );
}
