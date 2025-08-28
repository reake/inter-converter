import { Metadata } from 'next';
import { EnhancedToolLayout } from '@/components/tools/EnhancedToolLayout';
import OnlineStopwatch from '@/components/converters/time/OnlineStopwatch';
import { getFAQsByToolId } from '@/config/tool-faqs';
import { generateOptimizedKeywords } from '@/config/seo-keywords';

// Force static generation
export const dynamic = 'force-static';

const keywords = generateOptimizedKeywords('online-stopwatch', 'time', 'Online Stopwatch');

export const metadata: Metadata = {
  title: 'Online Stopwatch - Precision Timer with Lap Times | InterConverter',
  description: 'Accurate online stopwatch with lap timing. Perfect for sports, workouts, and precise time measurement with centisecond accuracy.',
  keywords: keywords.join(', '),
  openGraph: {
    title: 'Online Stopwatch - Precision Timer with Lap Times',
    description: 'Professional online stopwatch for precise timing. Perfect for sports, workouts, and activities requiring accurate time measurement.',
    type: 'website',
    images: [
      {
        url: '/images/og-online-stopwatch.jpg',
        width: 1200,
        height: 630,
        alt: 'Online Stopwatch Tool'
      }
    ]
  },
  alternates: {
    canonical: '/time/online-stopwatch'
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

export default function StopwatchPage() {
  const faqs = getFAQsByToolId('online-stopwatch', 'time');

  return (
    <EnhancedToolLayout
      title="Online Stopwatch"
      description="Accurate online stopwatch with lap timing and centisecond precision for sports and workouts."
      keywords={keywords}
      toolId="online-stopwatch"
      category="time"
      emoji="⏱️"
      customHowToUse={[
        "Click 'Start' to begin timing",
        "Click 'Lap' to record lap times",
        "Click 'Stop' to pause the timer",
        "Click 'Reset' to clear all times",
        "Use keyboard shortcuts for quick control"
      ]}
      customFeatures={[
        "Centisecond precision timing",
        "Lap time recording and tracking",
        "Clean, easy-to-read display",
        "Keyboard shortcuts support",
        "Full-screen timer mode",
        "Export lap times data"
      ]}
      faqs={faqs}
    >
      <OnlineStopwatch />
    </EnhancedToolLayout>
  );
}
