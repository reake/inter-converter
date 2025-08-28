import { Metadata } from 'next';
import { ToolLayout, generateToolMetadata } from '@/components/tools/ToolLayout';
import { CountdownTimer } from '@/components/converters/time/CountdownTimer';
import { getSEOConfigByToolId } from '@/config/seo-tools';

const seoConfig = getSEOConfigByToolId('countdown-timer');

export const metadata: Metadata = {
  title: seoConfig?.title || 'Countdown Timer - Online Timer Tool | InterConverter',
  description: seoConfig?.description || 'Free online countdown timer with custom time settings. Perfect for events, meetings, cooking, and productivity sessions.',
  keywords: seoConfig?.keywords?.join(', ') || 'countdown timer, online timer, event timer, meeting timer, productivity timer',
  openGraph: {
    title: seoConfig?.title || 'Countdown Timer | InterConverter',
    description: seoConfig?.description || 'Online countdown timer for events and productivity',
    type: 'website',
  },
  alternates: {
    canonical: seoConfig?.canonicalPath || '/time/countdown-timer'
  }
};

export default function CountdownTimerPage() {
  return (
    <ToolLayout
      title={metadata.title as string}
      description={metadata.description as string}
      keywords={seoConfig?.keywords || []}
      toolId="countdown-timer"
      category="time"
    >
      <div className="space-y-6">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Countdown Timer</h1>
          <p className="text-gray-600">Set custom countdown timers for events, meetings, and productivity sessions</p>
        </div>
        <CountdownTimer />
      </div>
    </ToolLayout>
  );
}
