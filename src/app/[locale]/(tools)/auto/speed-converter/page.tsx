import { Metadata } from 'next';
import { ToolLayout } from '@/components/tools/ToolLayout';
import { SpeedConverter } from '@/components/converters/automotive/SpeedConverter';




// Force static generation
export const dynamic = 'force-static';
const keywords = [
  'speed converter',
  'mph to kph',
  'kph to mph',
  'automotive speed conversion',
  'miles per hour',
  'kilometers per hour',
];

export const metadata: Metadata = {
  title: 'Speed Converter',
  description:
    'Convert between MPH and KPH for automotive applications. Free speed converter with common speed references.',
  keywords: keywords.join(', '),
  openGraph: {
    title: 'Speed Converter',
    description:
      'Convert between MPH and KPH for automotive applications. Free speed converter with common speed references.',
    type: 'website',
  },
  alternates: {
    canonical: '/auto/speed-converter',
  },
};

export default function SpeedConverterPage() {
  return (
    <ToolLayout
      title="Speed Converter"
      description="Convert between MPH and KPH for automotive applications"
      keywords={keywords}
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
