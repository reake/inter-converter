import { Metadata } from 'next';
import { generateToolMetadata, generateToolStructuredData } from '@/components/tools/ToolLayout';
import { DateDifferenceCalculator } from '@/components/converters/DateDifferenceCalculator';
import { ToolSEOContent } from '@/components/seo/ToolSEOContent';

export const metadata: Metadata = generateToolMetadata(
  'Date Difference Calculator',
  'Calculate the difference between two dates in days, months, years, hours, and minutes. Free online date calculator.',
  'date-difference-calculator',
  ['date', 'difference', 'calculator', 'days', 'between', 'duration', 'time', 'period'],
  'time'
);

export default function DateDifferenceCalculatorPage() {
  const structuredData = generateToolStructuredData(
    'Date Difference Calculator',
    'Calculate the exact difference between two dates in various units including days, months, years, hours, and minutes',
    'date-difference-calculator',
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
          <ToolSEOContent
            title="Date Difference Calculator"
            description="This date difference calculator helps you find the exact time duration between two dates. Whether you need to calculate someone's age, project duration, or time until an event, this tool provides precise results in multiple formats."
            features={[
              'Calculate difference in years, months, and days',
              'Show total days, hours, and minutes',
              'Include or exclude the end date',
              'Business days calculation',
              'Age calculation mode',
              'Copy results to clipboard'
            ]}
            useCases={[
              { icon: '🎂', text: 'Age calculation' },
              { icon: '📊', text: 'Project duration planning' },
              { icon: '⏰', text: 'Event countdown' },
              { icon: '💼', text: 'Employment duration' },
              { icon: '💕', text: 'Relationship milestones' },
              { icon: '📚', text: 'Historical date analysis' }
            ]}
            instructions={[
              'Select or enter the start date',
              'Select or enter the end date',
              'Choose calculation options',
              'View results in multiple formats',
              'Copy the results you need'
            ]}
            additionalInfo="The calculator uses precise date arithmetic to ensure accurate results. It accounts for leap years, different month lengths, and provides both exact and approximate calculations for maximum flexibility."
          />
        </div>
      </div>
    </>
  );
}