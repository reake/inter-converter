import { Metadata } from 'next';
import { generateToolMetadata, generateToolStructuredData } from '@/components/tools/ToolLayout';
import { UnitConverter } from '@/components/converters/UnitConverter';

export const metadata: Metadata = generateToolMetadata(
  'Unit Converter',
  'Convert between different units of length, weight, temperature, area, volume, and more. Free online unit conversion tool.',
  'unit-converter',
  ['unit', 'converter', 'metric', 'imperial', 'measurement', 'length', 'weight', 'temperature'],
  'unit-measurement'
);

export default function UnitConverterPage() {
  const structuredData = generateToolStructuredData(
    'Unit Converter',
    'Convert between different units of measurement including length, weight, temperature, area, and volume',
    'unit-converter',
    'unit-measurement'
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
              📏 Unit Converter
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Convert between different units of measurement including length, weight, 
              temperature, area, volume, and more. Support for metric and imperial systems.
            </p>
          </div>

          {/* Tool Component */}
          <UnitConverter />

          {/* SEO Content */}
          <div className="mt-12 prose prose-gray max-w-none">
            <h2>About Unit Converter</h2>
            <p>
              Our comprehensive unit converter supports conversion between various measurement 
              systems including metric, imperial, and other international units. Perfect for 
              students, engineers, scientists, and anyone working with measurements.
            </p>
            
            <h3>Supported Unit Categories</h3>
            <ul>
              <li><strong>Length:</strong> Meters, feet, inches, kilometers, miles, yards</li>
              <li><strong>Weight:</strong> Kilograms, pounds, ounces, grams, tons</li>
              <li><strong>Temperature:</strong> Celsius, Fahrenheit, Kelvin</li>
              <li><strong>Area:</strong> Square meters, acres, hectares, square feet</li>
              <li><strong>Volume:</strong> Liters, gallons, cubic meters, fluid ounces</li>
              <li><strong>Speed:</strong> Kilometers per hour, miles per hour, meters per second</li>
            </ul>

            <h3>Features</h3>
            <ul>
              <li>Convert between metric and imperial units</li>
              <li>Real-time conversion as you type</li>
              <li>High precision calculations</li>
              <li>Support for scientific notation</li>
              <li>Common unit presets and examples</li>
              <li>Copy results to clipboard</li>
            </ul>

            <h3>Common Conversions</h3>
            <ul>
              <li><strong>Length:</strong> 1 meter = 3.28084 feet = 39.3701 inches</li>
              <li><strong>Weight:</strong> 1 kilogram = 2.20462 pounds = 35.274 ounces</li>
              <li><strong>Temperature:</strong> 0°C = 32°F = 273.15K</li>
              <li><strong>Volume:</strong> 1 liter = 0.264172 gallons = 33.814 fluid ounces</li>
            </ul>

            <h3>How to Use</h3>
            <ol>
              <li>Select the category of units you want to convert</li>
              <li>Choose the source unit (what you have)</li>
              <li>Choose the target unit (what you want)</li>
              <li>Enter the value to convert</li>
              <li>View the converted result instantly</li>
              <li>Copy the result or try different units</li>
            </ol>

            <h3>Unit Systems</h3>
            <ul>
              <li><strong>Metric System:</strong> Based on powers of 10, used worldwide</li>
              <li><strong>Imperial System:</strong> Traditional units used in US and UK</li>
              <li><strong>SI Units:</strong> International System of Units for science</li>
              <li><strong>US Customary:</strong> Units commonly used in the United States</li>
            </ul>

            <h3>Accuracy and Precision</h3>
            <p>
              Our unit converter uses precise conversion factors and handles calculations 
              with high accuracy. Results are rounded to appropriate decimal places for 
              practical use while maintaining precision for scientific applications.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}