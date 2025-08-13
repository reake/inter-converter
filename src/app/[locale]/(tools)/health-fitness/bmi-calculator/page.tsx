import { Metadata } from 'next';
import { generateToolMetadata, generateToolStructuredData } from '@/components/tools/ToolLayout';
import { BMICalculator } from '@/components/converters/BMICalculator';

export const metadata: Metadata = generateToolMetadata(
  'BMI Calculator',
  'Calculate your Body Mass Index (BMI) and get health recommendations. Free BMI calculator with metric and imperial units.',
  'bmi-calculator',
  ['bmi', 'body', 'mass', 'index', 'health', 'calculator', 'weight', 'height', 'fitness'],
  'health-fitness'
);

export default function BMICalculatorPage() {
  const structuredData = generateToolStructuredData(
    'BMI Calculator',
    'Calculate Body Mass Index and get personalized health recommendations based on your height and weight',
    'bmi-calculator',
    'health-fitness'
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
          <div className="mt-12 prose prose-gray max-w-none">
            <h2>About BMI Calculator</h2>
            <p>
              Body Mass Index (BMI) is a simple calculation using a person's height and weight. 
              The BMI is a convenient rule of thumb used to broadly categorize a person as 
              underweight, normal weight, overweight, or obese.
            </p>
            
            <h3>BMI Categories</h3>
            <ul>
              <li><strong>Underweight:</strong> BMI less than 18.5</li>
              <li><strong>Normal weight:</strong> BMI 18.5-24.9</li>
              <li><strong>Overweight:</strong> BMI 25-29.9</li>
              <li><strong>Obese:</strong> BMI 30 or greater</li>
            </ul>

            <h3>How BMI is Calculated</h3>
            <p>BMI is calculated using the following formulas:</p>
            <ul>
              <li><strong>Metric:</strong> BMI = weight (kg) / height (m)²</li>
              <li><strong>Imperial:</strong> BMI = (weight (lbs) / height (in)²) × 703</li>
            </ul>

            <h3>Features</h3>
            <ul>
              <li>Calculate BMI with metric or imperial units</li>
              <li>Instant BMI category classification</li>
              <li>Personalized health recommendations</li>
              <li>Ideal weight range calculator</li>
              <li>BMI chart and visualization</li>
              <li>Age and gender considerations</li>
            </ul>

            <h3>Important Notes</h3>
            <ul>
              <li>BMI is a screening tool, not a diagnostic tool</li>
              <li>It doesn't measure body fat directly</li>
              <li>Athletes may have high BMI due to muscle mass</li>
              <li>Consult healthcare providers for medical advice</li>
              <li>BMI may not be accurate for all populations</li>
            </ul>

            <h3>Healthy Lifestyle Tips</h3>
            <ul>
              <li>Maintain a balanced diet with fruits and vegetables</li>
              <li>Exercise regularly (150 minutes moderate activity per week)</li>
              <li>Stay hydrated and get adequate sleep</li>
              <li>Monitor your weight and BMI regularly</li>
              <li>Consult healthcare professionals for personalized advice</li>
            </ul>

            <h3>BMI Limitations</h3>
            <p>
              While BMI is a useful screening tool, it has limitations. It doesn't distinguish 
              between muscle and fat mass, and may not be accurate for athletes, elderly, or 
              certain ethnic groups. Always consult with healthcare professionals for 
              comprehensive health assessments.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}