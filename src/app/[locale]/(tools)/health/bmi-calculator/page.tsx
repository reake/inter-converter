import { Metadata } from 'next';
import { generateToolMetadata, generateToolStructuredData } from '@/components/tools/ToolLayout';
import { BMICalculator } from '@/components/converters/BMICalculator';
import { ModernSEOContent } from '@/components/tools/ModernSEOContent';

export const metadata: Metadata = {
  title: 'BMI Calculator | Body Mass Index Calculator Free',
  description: 'Calculate your BMI (Body Mass Index) instantly. Free BMI calculator with health categories and recommendations. Track your healthy weight range.',
  keywords: [
    'bmi calculator',
    'body mass index calculator',
    'bmi chart calculator',
    'weight calculator',
    'healthy weight calculator',
    'obesity calculator',
    'bmi index calculator',
    'body fat calculator',
    'ideal weight calculator',
    'weight loss calculator',
    'health calculator',
    'fitness calculator',
    'bmi scale calculator',
    'weight status calculator',
    'body weight calculator'
  ],
  openGraph: {
    title: 'BMI Calculator | Body Mass Index Calculator Free',
    description: 'Calculate your BMI (Body Mass Index) instantly. Free BMI calculator with health categories and recommendations.',
    type: 'website',
    url: 'https://interconverter.com/health/bmi-calculator',
    siteName: 'InterConverter',
    images: [
      {
        url: '/images/bmi-calculator-og.jpg',
        width: 1200,
        height: 630,
        alt: 'BMI Calculator Tool - Body Mass Index'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BMI Calculator | Body Mass Index Calculator Free',
    description: 'Calculate your BMI (Body Mass Index) instantly. Free BMI calculator with health categories and recommendations.',
    images: ['/images/bmi-calculator-twitter.jpg']
  },
  alternates: {
    canonical: 'https://interconverter.com/health/bmi-calculator'
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

export default function BMICalculatorPage() {
  const structuredData = generateToolStructuredData(
    'BMI Calculator',
    'Calculate Body Mass Index and get personalized health recommendations based on your height and weight',
    'bmi-calculator',
    'health'
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
              ⚖️ BMI Calculator
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Calculate your Body Mass Index (BMI) and get personalized health recommendations. 
              Support for both metric and imperial units.
            </p>
          </div>

          {/* Tool Component */}
          <BMICalculator />

          {/* SEO Content */}
          <ModernSEOContent
            title="BMI Calculator"
            description="Body Mass Index (BMI) is a simple calculation using a person's height and weight. The BMI is a convenient rule of thumb used to broadly categorize a person as underweight, normal weight, overweight, or obese."
            features={[
              "Calculate BMI with metric or imperial units",
              "Instant BMI category classification",
              "Personalized health recommendations",
              "Ideal weight range calculator",
              "BMI chart and visualization",
              "Age and gender considerations"
            ]}
            useCases={[
              {
                category: "Health Monitoring",
                examples: ["Regular health checkups", "Weight management tracking", "Fitness goal setting", "Health screening"]
              },
              {
                category: "Medical Use",
                examples: ["Patient assessment", "Health risk evaluation", "Treatment planning", "Population health studies"]
              },
              {
                category: "Fitness & Wellness",
                examples: ["Personal training", "Nutrition planning", "Wellness programs", "Health coaching"]
              },
              {
                category: "Research",
                examples: ["Health studies", "Population analysis", "Epidemiological research", "Public health initiatives"]
              }
            ]}
            howToUse={[
              "Enter your height in feet/inches or centimeters",
              "Enter your weight in pounds or kilograms",
              "Select your preferred unit system",
              "View your BMI result and category",
              "Check your ideal weight range",
              "Review personalized health recommendations"
            ]}
            tips={[
              "Measure weight at the same time of day for consistency",
              "Use BMI as one of many health indicators",
              "Consider body composition, not just BMI",
              "Consult healthcare providers for medical advice",
              "Track trends over time rather than single measurements",
              "Combine BMI with other health metrics for complete picture"
            ]}
            technicalDetails={[
              {
                term: "BMI Formula (Metric)",
                definition: "BMI = weight (kg) / height (m)² - Standard international calculation"
              },
              {
                term: "BMI Formula (Imperial)",
                definition: "BMI = (weight (lbs) / height (in)²) × 703 - US customary units"
              },
              {
                term: "BMI Categories",
                definition: "Underweight (<18.5), Normal (18.5-24.9), Overweight (25-29.9), Obese (≥30)"
              },
              {
                term: "Body Composition",
                definition: "The proportion of fat, muscle, bone, and other tissues in the body"
              }
            ]}
            faqs={[
              {
                question: "Is BMI accurate for everyone?",
                answer: "BMI is a useful screening tool but has limitations. It doesn't distinguish between muscle and fat mass, so athletes or very muscular individuals may have high BMI despite being healthy. It may also be less accurate for elderly people or certain ethnic groups."
              },
              {
                question: "What's a healthy BMI range?",
                answer: "A BMI between 18.5 and 24.9 is generally considered normal weight. However, optimal BMI can vary based on age, ethnicity, muscle mass, and overall health. Consult healthcare providers for personalized recommendations."
              },
              {
                question: "How often should I check my BMI?",
                answer: "For general health monitoring, checking BMI monthly or quarterly is sufficient. If you're actively trying to lose or gain weight, weekly measurements can help track progress, but focus on trends rather than daily fluctuations."
              },
              {
                question: "Can children use this BMI calculator?",
                answer: "This calculator is designed for adults. Children and teens need age and gender-specific BMI percentiles. Consult pediatric growth charts or healthcare providers for accurate BMI assessment in children."
              },
              {
                question: "What should I do if my BMI is outside the normal range?",
                answer: "If your BMI indicates underweight or overweight status, consult with healthcare professionals. They can assess your overall health, body composition, and provide personalized recommendations for diet, exercise, or medical interventions if needed."
              }
            ]}
            currentToolId="bmi-calculator"
            category="health"
          />
        </div>
      </div>
    </>
  );
}