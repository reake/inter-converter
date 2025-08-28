import { Metadata } from 'next';
import { EnhancedToolLayout } from '@/components/tools/EnhancedToolLayout';
import { CountdownTimer } from '@/components/converters/time/CountdownTimer';
import { getFAQsByToolId } from '@/config/tool-faqs';
import { generateOptimizedKeywords } from '@/config/seo-keywords';

// Force static generation
export const dynamic = 'force-static';

const keywords = generateOptimizedKeywords('countdown-timer', 'time', 'Countdown Timer');

export const metadata: Metadata = {
  title: 'Countdown Timer - Online Timer Tool | InterConverter',
  description: 'Free online countdown timer with custom time settings. Perfect for events, meetings, cooking, and productivity sessions.',
  keywords: keywords.join(', '),
  openGraph: {
    title: 'Countdown Timer - Online Timer Tool',
    description: 'Professional countdown timer for events and productivity. Set custom timers for meetings, cooking, workouts, and time management.',
    type: 'website',
    images: [
      {
        url: '/images/og-countdown-timer.jpg',
        width: 1200,
        height: 630,
        alt: 'Countdown Timer Tool'
      }
    ]
  },
  alternates: {
    canonical: '/time/countdown-timer'
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

export default function CountdownTimerPage() {
  const faqs = getFAQsByToolId('countdown-timer', 'time');

  return (
    <EnhancedToolLayout
      title="Countdown Timer"
      description="Free online countdown timer with custom time settings for events, meetings, and productivity sessions."
      keywords={keywords}
      toolId="countdown-timer"
      category="time"
      emoji="⏰"
      customHowToUse={[
        "Set hours, minutes, and seconds",
        "Click start to begin countdown",
        "Use pause/resume controls as needed",
        "Get audio/visual alerts when time expires",
        "Reset timer for repeated use"
      ]}
      customFeatures={[
        "Custom time duration setting",
        "Audio notification alerts",
        "Visual countdown display",
        "Pause and resume functionality",
        "Full-screen timer mode",
        "Multiple timer presets"
      ]}
      faqs={faqs}
    >
      <CountdownTimer />
    </EnhancedToolLayout>
  );
}
