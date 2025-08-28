import { Metadata } from 'next';
import { EnhancedToolLayout } from '@/components/tools/EnhancedToolLayout';
import { WorldClock } from '@/components/converters/time/WorldClock';
import { getFAQsByToolId } from '@/config/tool-faqs';
import { generateOptimizedKeywords } from '@/config/seo-keywords';

// Force static generation
export const dynamic = 'force-static';

const keywords = generateOptimizedKeywords('world-clock', 'time', 'World Clock');

export const metadata: Metadata = {
  title: 'World Clock - Time Zones Around the World | InterConverter',
  description: 'Track time across multiple time zones worldwide. Live world clock with popular cities and UTC reference time.',
  keywords: keywords.join(', '),
  openGraph: {
    title: 'World Clock - Time Zones Around the World',
    description: 'Professional world clock for global time tracking. Monitor time across multiple zones with live updates and popular city times.',
    type: 'website',
    images: [
      {
        url: '/images/og-world-clock.jpg',
        width: 1200,
        height: 630,
        alt: 'World Clock Tool'
      }
    ]
  },
  alternates: {
    canonical: '/time/world-clock'
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

export default function WorldClockPage() {
  const faqs = getFAQsByToolId('world-clock', 'time');

  return (
    <EnhancedToolLayout
      title="World Clock"
      description="Track time across multiple time zones worldwide with live updates and popular city times."
      keywords={keywords}
      toolId="world-clock"
      category="time"
      emoji="🌍"
      customHowToUse={[
        "View current time in major world cities",
        "Add custom cities to your clock list",
        "Compare times across different zones",
        "Monitor UTC reference time",
        "Track daylight saving changes"
      ]}
      customFeatures={[
        "Live time updates for global cities",
        "Customizable city selection",
        "UTC and local time display",
        "Daylight saving time tracking",
        "Time zone abbreviations",
        "Business hours indicators"
      ]}
      faqs={faqs}
    >
      <WorldClock />
    </EnhancedToolLayout>
  );
}
