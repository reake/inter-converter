import { Metadata } from 'next';
import { ToolLayout, generateToolMetadata } from '@/components/tools/ToolLayout';
import { TimestampConverter } from '@/components/converters/TimestampConverter';

export const metadata: Metadata = generateToolMetadata(
  'Timestamp Converter',
  'Convert Unix timestamps to human readable dates. Free timestamp converter for epoch time, milliseconds, and date formats. Instant conversion.',
  'timestamp-converter',
  [
    'timestamp converter',
    'unix timestamp converter',
    'epoch time converter',
    'unix time converter',
    'timestamp to date converter',
    'date to timestamp converter',
    'epoch converter',
    'unix epoch converter',
    'milliseconds timestamp converter',
    'timestamp calculator',
    'unix time calculator',
    'epoch time calculator',
    'timestamp decoder',
    'unix timestamp decoder',
    'time converter online'
  ],
  'time'
);

export default function TimestampConverterPage() {
  return (
    <ToolLayout
      title="Timestamp Converter"
      description="Convert Unix timestamps to human-readable dates and vice versa. Support for different timezones and millisecond precision."
      toolId="timestamp-converter"
      category="time"
      emoji="🕐"
      customHowToUse={[
        "Enter a Unix timestamp in the timestamp field",
        "Or enter a date in the date field",
        "Select your preferred timezone",
        "The conversion happens automatically"
      ]}
      customFeatures={[
        "Convert Unix timestamps to readable dates",
        "Convert dates to Unix timestamps",
        "Support for different timezones",
        "Millisecond precision support"
      ]}
    >
      <TimestampConverter />
    </ToolLayout>
  );
}