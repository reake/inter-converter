import { Metadata } from 'next';
import { AutomotiveToolLayout } from '@/components/automotive/AutomotiveToolLayout';
import { SpeedConverter } from '@/components/automotive/SpeedConverter';

export const metadata: Metadata = {
  title: 'Speed Converter - MPH to KPH Calculator | InterConverter',
  description: 'Convert between MPH and KPH for automotive applications. Free speed converter with common speed references.',
  keywords: 'speed converter, mph to kph, kph to mph, automotive speed conversion, miles per hour',
};

export default function SpeedConverterPage() {
  return (
    <AutomotiveToolLayout
      title="Speed Converter"
      description="Convert between MPH and KPH for automotive applications"
      toolId="speed-converter"
    >
      <SpeedConverter />
    </AutomotiveToolLayout>
  );
}
