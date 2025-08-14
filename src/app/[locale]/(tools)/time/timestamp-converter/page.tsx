import { Metadata } from 'next';
import { TimestampConverter } from '@/components/converters/TimestampConverter';
import { ModernSEOContent } from '@/components/tools/ModernSEOContent';
import { generateToolMetadata } from '@/config/seo';
import { TOOLS_CONFIG } from '@/config/tools';
import { generateToolStructuredData } from '@/components/seo/StructuredData';

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  return {
    title: 'Timestamp Converter | Unix Time Converter Free Tool',
    description: 'Convert Unix timestamps to human readable dates. Free timestamp converter for epoch time, milliseconds, and date formats. Instant conversion.',
    keywords: [
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
    openGraph: {
      title: 'Timestamp Converter | Unix Time Converter Free Tool',
      description: 'Convert Unix timestamps to human readable dates. Free timestamp converter for epoch time, milliseconds, and date formats.',
      type: 'website',
      url: 'https://interconverter.com/time/timestamp-converter',
      siteName: 'InterConverter',
      images: [
        {
          url: '/images/timestamp-converter-og.jpg',
          width: 1200,
          height: 630,
          alt: 'Unix Timestamp Converter Tool'
        }
      ]
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Timestamp Converter | Unix Time Converter Free Tool',
      description: 'Convert Unix timestamps to human readable dates. Free timestamp converter for epoch time and milliseconds.',
      images: ['/images/timestamp-converter-twitter.jpg']
    },
    alternates: {
      canonical: 'https://interconverter.com/time/timestamp-converter'
    },
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
}

export default async function TimestampConverterPage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const tool = TOOLS_CONFIG.find(t => t.id === 'timestamp-converter');

  if (!tool) {
    return <div>Tool not found</div>;
  }

  const structuredDataArray = generateToolStructuredData(tool, locale);

  return (
    <>
      {structuredDataArray.map((data, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
        />
      ))}
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
          <ModernSEOContent
            title="Timestamp Converter"
            description="A Unix timestamp is the number of seconds that have elapsed since January 1, 1970, at 00:00:00 UTC. This timestamp converter helps you convert between Unix timestamps and human-readable date formats."
            features={[
              "Convert Unix timestamps to readable dates",
              "Convert dates to Unix timestamps",
              "Support for different timezones",
              "Millisecond precision support",
              "Real-time conversion as you type",
              "Copy results to clipboard"
            ]}
            useCases={[
              {
                category: "Development",
                examples: ["API debugging", "Database queries", "Log analysis", "Code testing"]
              },
              {
                category: "System Administration",
                examples: ["Server logs", "Backup timestamps", "Cron job scheduling", "System monitoring"]
              },
              {
                category: "Data Analysis",
                examples: ["Time series data", "Event tracking", "Performance metrics", "User activity logs"]
              },
              {
                category: "Web Development",
                examples: ["JavaScript timestamps", "Session management", "Cache expiration", "Event scheduling"]
              }
            ]}
            howToUse={[
              "Enter a Unix timestamp in the timestamp field",
              "Or enter a date in the date field",
              "Select your preferred timezone",
              "The conversion happens automatically",
              "Click copy to copy the result"
            ]}
            tips={[
              "Unix timestamps are always in UTC by default",
              "Use millisecond timestamps for higher precision",
              "Consider timezone differences when working with dates",
              "Validate timestamps to ensure they're in the correct format",
              "Use epoch time for consistent cross-platform compatibility"
            ]}
            technicalDetails={[
              {
                term: "Unix Epoch",
                definition: "January 1, 1970, 00:00:00 UTC - the starting point for Unix time"
              },
              {
                term: "Unix Timestamp",
                definition: "Number of seconds elapsed since the Unix epoch"
              },
              {
                term: "Millisecond Timestamp",
                definition: "Unix timestamp multiplied by 1000 to include millisecond precision"
              },
              {
                term: "UTC",
                definition: "Coordinated Universal Time - the primary time standard used globally"
              }
            ]}
            faqs={[
              {
                question: "What is the difference between seconds and milliseconds timestamps?",
                answer: "Standard Unix timestamps count seconds since 1970. Millisecond timestamps multiply this by 1000 for higher precision. JavaScript typically uses millisecond timestamps, while many server systems use seconds."
              },
              {
                question: "Why do timestamps start from 1970?",
                answer: "January 1, 1970, was chosen as the Unix epoch because it was a convenient round number close to the time when Unix was being developed. It's early enough to represent most computer-relevant dates."
              },
              {
                question: "How do I handle timezone conversions?",
                answer: "Unix timestamps are always in UTC. To display in local time, you need to apply timezone offset. Our converter handles this automatically when you select different timezones."
              },
              {
                question: "What's the maximum timestamp value?",
                answer: "32-bit systems have a limit (Year 2038 problem), but 64-bit systems can handle timestamps far into the future. Most modern systems use 64-bit timestamps to avoid this limitation."
              }
            ]}
            currentToolId="timestamp-converter"
            category="time"
          />
        </div>
      </div>
    </>
  );
}