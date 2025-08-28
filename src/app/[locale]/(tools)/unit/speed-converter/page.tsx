import { Metadata } from 'next';
import { ToolLayout, generateToolMetadata } from '@/components/tools/ToolLayout';
import { SpeedConverter } from '@/components/converters/unit/SpeedConverter';

// Force static generation
export const dynamic = 'force-static';
export const metadata: Metadata = generateToolMetadata(
  'Speed Converter',
  'Convert between different speed units including km/h, mph, m/s, knots, and more. Accurate speed conversion tool.',
  'speed-converter',
  [
    'speed converter',
    'km/h to mph',
    'mph to km/h',
    'meters per second',
    'speed conversion',
    'velocity converter',
    'unit conversion',
    'knots converter'
  ],
  'unit'
);

export default function SpeedConverterPage() {
  return (
    <ToolLayout
      title="Speed Converter"
      description="Convert between different speed units with precision"
      toolId="speed-converter"
      category="unit"
      emoji="🏃"
      customHowToUse={[
        "Enter the speed value to convert",
        "Select the source unit (km/h, mph, m/s, etc.)",
        "Choose the target speed unit",
        "View the converted speed instantly"
      ]}
      customFeatures={[
        "Meters per second (m/s)",
        "Kilometers per hour (km/h)",
        "Miles per hour (mph)",
        "Feet per second (fps) and knots",
        "Real-time conversion updates",
        "Copy result to clipboard"
      ]}
    >
      <SpeedConverter />
    </ToolLayout>
  );
}
