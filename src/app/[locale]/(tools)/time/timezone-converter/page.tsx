import { Metadata } from 'next';
import { ToolLayout, generateToolMetadata } from '@/components/tools/ToolLayout';
import TimezoneConverter from '@/components/converters/time/TimezoneConverter';

export const metadata: Metadata = generateToolMetadata(
  'Timezone Converter',
  'Convert time between different time zones instantly. Free online timezone converter with support for all world time zones and daylight saving time.',
  'timezone-converter',
  [
    'timezone converter',
    'time zone conversion',
    'world time converter',
    'timezone calculator',
    'time conversion tool',
    'world clock',
    'timezone tool',
    'time zone calculator'
  ],
  'time'
);

export default function TimezoneConverterPage() {
  return (
    <ToolLayout
      title="Timezone Converter"
      description="Convert time between different time zones instantly with support for all world time zones"
      toolId="timezone-converter"
      category="time"
      emoji="🌍"
      customHowToUse={[
        'Select the source timezone from the dropdown',
        'Enter the time you want to convert',
        'Select the target timezone',
        'View the converted time instantly',
        'Add multiple timezones for comparison'
      ]}
      customFeatures={[
        'Support for all world time zones',
        'Automatic daylight saving time handling',
        'Multiple timezone comparison',
        'Current time display',
        'Popular timezone shortcuts',
        'Mobile-friendly interface'
      ]}
    >
      <TimezoneConverter />
    </ToolLayout>
  );
}
