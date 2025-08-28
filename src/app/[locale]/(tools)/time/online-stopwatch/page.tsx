import { Metadata } from 'next';
import { ToolLayout, generateToolMetadata } from '@/components/tools/ToolLayout';
import OnlineStopwatch from '@/components/converters/time/OnlineStopwatch';

// Force static generation
export const dynamic = 'force-static';

export const metadata: Metadata = generateToolMetadata(
  'Online Stopwatch',
  'Accurate online stopwatch with lap timing. Perfect for sports, workouts, and precise time measurement with centisecond accuracy.',
  'online-stopwatch',
  ['stopwatch', 'online stopwatch', 'lap timer', 'precision timer', 'sports timer'],
  'time'
);

export default function StopwatchPage() {
  return (
    <ToolLayout
      title="Online Stopwatch"
      description="Accurate online stopwatch with lap timing. Perfect for sports, workouts, and precise time measurement with centisecond accuracy."
      toolId="online-stopwatch"
      category="time"
      emoji="⏱️"
      customHowToUse={[
        "Click 'Start' to begin timing",
        "Click 'Lap' to record lap times",
        "Click 'Stop' to pause the timer",
        "Click 'Reset' to clear all times"
      ]}
      customFeatures={[
        "Centisecond precision timing",
        "Lap time recording",
        "Clean, easy-to-read display",
        "Keyboard shortcuts support"
      ]}
    >
      <OnlineStopwatch />
    </ToolLayout>
  );
}
