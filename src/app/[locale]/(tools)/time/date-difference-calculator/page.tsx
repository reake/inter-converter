import { Metadata } from 'next';
import { ToolLayout } from '@/components/tools/ToolLayout';
import { DateDifferenceCalculator } from '@/components/converters/time/DateDifferenceCalculator';
import { ToolSEOContent } from '@/components/seo/ToolSEOContent';




// Force static generation
export const dynamic = 'force-static';
const title = 'Date Difference Calculator';
const description = 'Calculate the difference between two dates in days, months, years, hours, and minutes. Free online date calculator.';
const keywordsArr = ['date', 'difference', 'calculator', 'days', 'between', 'duration', 'time', 'period'];

export const metadata: Metadata = {
  title: `${title} | InterConverter`,
  description,
  keywords: keywordsArr.join(', '),
  openGraph: {
    title: `${title} | InterConverter`,
    description,
    type: 'website',
  },
  alternates: { canonical: '/time/date-difference-calculator' }
};

export default function DateDifferenceCalculatorPage() {
  return (
    <ToolLayout
      title={title}
      description={description}
      keywords={keywordsArr}
      toolId="date-difference-calculator"
      category="time"
      emoji="📅"
    >
      <DateDifferenceCalculator />
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
    </ToolLayout>
  );
}