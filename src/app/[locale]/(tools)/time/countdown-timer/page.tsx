import { Metadata } from 'next';
import { generateToolMetadata, generateToolStructuredData } from '@/components/tools/ToolLayout';
import { CountdownTimer } from '@/components/converters/CountdownTimer';
import { ModernSEOContent } from '@/components/tools/ModernSEOContent';

export const metadata: Metadata = generateToolMetadata(
  'Countdown Timer',
  'Create countdown timers for events, deadlines, and special occasions. Free online countdown timer with notifications.',
  'countdown-timer',
  ['countdown', 'timer', 'event', 'deadline', 'clock', 'time', 'notification', 'alarm'],
  'time'
);

export default function CountdownTimerPage() {
  const structuredData = generateToolStructuredData(
    'Countdown Timer',
    'Create and manage countdown timers for events, deadlines, and important dates',
    'countdown-timer',
    'time'
  );

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* SEO Header */}
          <div className="mb-8 text-center">
            <h1 className="text-4xl font-bold mb-4">
              ⏰ Countdown Timer
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Create countdown timers for events, deadlines, and special occasions. 
              Get notifications when time is up and track multiple timers.
            </p>
          </div>

          {/* Tool Component */}
          <CountdownTimer />

          {/* SEO Content */}
          <ModernSEOContent
            title="Countdown Timer"
            description="Our countdown timer helps you track time until important events, deadlines, or special occasions. Set multiple timers, get notifications, and never miss an important moment again."
            features={[
              "Create multiple countdown timers",
              "Real-time countdown display",
              "Browser notifications when time expires",
              "Custom event names and descriptions",
              "Share countdown timers with others",
              "Responsive design for all devices"
            ]}
            useCases={[
              {
                category: "Events",
                examples: ["Weddings", "Birthdays", "Holidays", "Concerts", "Conferences"]
              },
              {
                category: "Deadlines",
                examples: ["Project due dates", "Exam dates", "Applications", "Tax deadlines"]
              },
              {
                category: "Launches",
                examples: ["Product releases", "Website launches", "Sales events", "Marketing campaigns"]
              },
              {
                category: "Travel",
                examples: ["Vacation countdowns", "Flight departures", "Hotel check-ins", "Trip planning"]
              }
            ]}
            howToUse={[
              "Enter a name for your countdown event",
              "Select the target date and time",
              "Choose your timezone if needed",
              "Click 'Start Countdown' to begin",
              "Watch the real-time countdown",
              "Get notified when time expires"
            ]}
            tips={[
              "Set multiple milestones for large projects",
              "Use descriptive names for your timers",
              "Enable notifications to stay on track",
              "Share important countdowns with team members",
              "Plan buffer time for important deadlines",
              "Test notifications before important events"
            ]}
            technicalDetails={[
              {
                term: "Real-time Updates",
                definition: "Countdown updates every second with precise time calculations"
              },
              {
                term: "Browser Notifications",
                definition: "Uses the Notification API to alert you when timers expire"
              },
              {
                term: "Timezone Support",
                definition: "Automatically handles timezone Converterss and daylight saving time"
              }
            ]}
            faqs={[
              {
                question: "How accurate is the countdown timer?",
                answer: "Our countdown timer updates every second and uses precise JavaScript timing functions. It accounts for timezone differences and daylight saving time changes automatically for maximum accuracy."
              },
              {
                question: "Can I set multiple countdown timers at once?",
                answer: "Yes! You can create and manage multiple countdown timers simultaneously. Each timer can have its own custom name, target date, and notification settings."
              },
              {
                question: "Will I get notified when the countdown reaches zero?",
                answer: "Yes, the timer will send a browser notification when it reaches zero (if you've granted permission). You'll also see a visual alert on the page itself."
              },
              {
                question: "Does the timer work if I close the browser tab?",
                answer: "The timer continues running in the background if the tab remains open. However, if you close the tab completely, you'll need to reopen it to see the current status and receive notifications."
              },
              {
                question: "Can I share my countdown timer with others?",
                answer: "While the timer itself runs locally in your browser, you can share the countdown details with others by copying the URL or manually sharing the event name and target date."
              },
              {
                question: "What time zones are supported?",
                answer: "The timer automatically detects your local timezone and handles all calculations accordingly. It also accounts for daylight saving time changes automatically."
              }
            ]}
            currentToolId="countdown-timer"
            category="time"
            relatedToolIds={["timestamp-converter", "date-difference-calculator"]}
            relatedTopics={[
              {
                title: "Time Zone Converter",
                description: "Convert times between different time zones for global events"
              },
              {
                title: "Date Calculator",
                description: "Calculate differences between dates and add/subtract time periods"
              }
            ]}
          />
        </div>
      </div>
    </>
  );
}