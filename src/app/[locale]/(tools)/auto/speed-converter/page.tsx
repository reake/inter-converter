import { Metadata } from 'next';
import { ToolLayout, generateToolMetadata } from '@/components/tools/ToolLayout';
import { SpeedConverter } from '@/components/automotive/SpeedConverter';




// Force static generation
export const dynamic = 'force-static';
export const metadata: Metadata = generateToolMetadata(
  'Speed Converter',
  'Convert between MPH and KPH for automotive applications. Free speed converter with common speed references.',
  'speed-converter',
  ['speed converter', 'mph to kph', 'kph to mph', 'automotive speed conversion', 'miles per hour', 'kilometers per hour'],
  'auto'
);

export default function SpeedConverterPage() {
  return (
    <ToolLayout
      title="Speed Converter"
      description="Convert between MPH and KPH for automotive applications"
      toolId="speed-converter"
      category="auto"
      emoji="🏁"
      customHowToUse={[
        "Enter speed in MPH or KPH",
        "View instant conversion to other unit",
        "Reference common speed limits",
        "Use for automotive calculations"
      ]}
      customFeatures={[
        "MPH to KPH conversion",
        "Bidirectional speed conversion",
        "Common speed references",
        "Automotive applications"
      ]}
    >
      <SpeedConverter />
    </ToolLayout>
  );
}
