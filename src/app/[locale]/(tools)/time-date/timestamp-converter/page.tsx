import { Metadata } from 'next';
import { generateToolMetadata, generateToolStructuredData } from '@/components/tools/ToolLayout';
import { TimestampConverter } from '@/components/converters/TimestampConverter';

export const metadata: Metadata = generateToolMetadata(
  'Timestamp Converter',
  'Convert Unix timestamps to human-readable dates and vice versa. Free online tool with timezone support.',
  'timestamp-converter',
  ['timestamp', 'unix', 'date', 'time', 'converter', 'epoch', 'milliseconds'],
  'time-date'
);

export default function TimestampConverterPage() {
  const structuredData = generateToolStructuredData(
    'Timestamp Converter',
    'Convert Unix timestamps to human-readable dates and vice versa with timezone support',
    'timestamp-converter',
    'time-date'
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
              🕐 Timestamp Converter
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Convert Unix timestamps to human-readable dates and vice versa. 
              Support for different timezones and millisecond precision.
            </p>
          </div>

          {/* Tool Component */}
          <TimestampConverter />

          {/* SEO Content */}
          <div className="mt-12 prose prose-gray max-w-none">
            <h2>About Timestamp Converter</h2>
            <p>
              A Unix timestamp is the number of seconds that have elapsed since January 1, 1970, 
              at 00:00:00 UTC. This timestamp converter helps you convert between Unix timestamps 
              and human-readable date formats.
            </p>
            
            <h3>Features</h3>
            <ul>
              <li>Convert Unix timestamps to readable dates</li>
              <li>Convert dates to Unix timestamps</li>
              <li>Support for different timezones</li>
              <li>Millisecond precision support</li>
              <li>Real-time conversion as you type</li>
              <li>Copy results to clipboard</li>
            </ul>

            <h3>Common Use Cases</h3>
            <ul>
              <li>Database timestamp conversion</li>
              <li>API response debugging</li>
              <li>Log file analysis</li>
              <li>Programming and development</li>
              <li>System administration</li>
            </ul>

            <h3>How to Use</h3>
            <ol>
              <li>Enter a Unix timestamp in the timestamp field</li>
              <li>Or enter a date in the date field</li>
              <li>Select your preferred timezone</li>
              <li>The conversion happens automatically</li>
              <li>Click copy to copy the result</li>
            </ol>
          </div>
        </div>
      </div>
    </>
  );
}