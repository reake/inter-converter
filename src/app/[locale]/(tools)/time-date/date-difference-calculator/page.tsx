import { Metadata } from 'next';
import { generateToolMetadata, generateToolStructuredData } from '@/components/tools/ToolLayout';
import { DateDifferenceCalculator } from '@/components/converters/DateDifferenceCalculator';

export const metadata: Metadata = generateToolMetadata(
  'Date Difference Calculator',
  'Calculate the difference between two dates in days, months, years, hours, and minutes. Free online date calculator.',
  'date-difference-calculator',
  ['date', 'difference', 'calculator', 'days', 'between', 'duration', 'time', 'period'],
  'time-date'
);

export default function DateDifferenceCalculatorPage() {
  const structuredData = generateToolStructuredData(
    'Date Difference Calculator',
    'Calculate the exact difference between two dates in various units including days, months, years, hours, and minutes',
    'date-difference-calculator',
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
              📅 Date Difference Calculator
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Calculate the exact difference between two dates in days, months, years, 
              hours, and minutes. Perfect for project planning and age calculations.
            </p>
          </div>

          {/* Tool Component */}
          <DateDifferenceCalculator />

          {/* SEO Content */}
          <div className="mt-12 prose prose-gray max-w-none">
            <h2>About Date Difference Calculator</h2>
            <p>
              This date difference calculator helps you find the exact time duration between 
              two dates. Whether you need to calculate someone's age, project duration, or 
              time until an event, this tool provides precise results in multiple formats.
            </p>
            
            <h3>Features</h3>
            <ul>
              <li>Calculate difference in years, months, and days</li>
              <li>Show total days, hours, and minutes</li>
              <li>Include or exclude the end date</li>
              <li>Business days calculation</li>
              <li>Age calculation mode</li>
              <li>Copy results to clipboard</li>
            </ul>

            <h3>Common Use Cases</h3>
            <ul>
              <li>Age calculation</li>
              <li>Project duration planning</li>
              <li>Event countdown</li>
              <li>Employment duration</li>
              <li>Relationship milestones</li>
              <li>Historical date analysis</li>
            </ul>

            <h3>How to Use</h3>
            <ol>
              <li>Select or enter the start date</li>
              <li>Select or enter the end date</li>
              <li>Choose calculation options (include end date, business days only)</li>
              <li>View the results in multiple formats</li>
              <li>Copy the results you need</li>
            </ol>

            <h3>Calculation Methods</h3>
            <p>
              The calculator uses precise date arithmetic to ensure accurate results. 
              It accounts for leap years, different month lengths, and provides both 
              exact and approximate calculations.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}