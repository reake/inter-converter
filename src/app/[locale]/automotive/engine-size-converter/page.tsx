import { Metadata } from 'next';
import { AutomotiveToolLayout } from '@/components/automotive/AutomotiveToolLayout';
import { EngineSizeConverter } from '@/components/automotive/EngineSizeConverter';

export const metadata: Metadata = {
  title: 'Engine Size Converter - Cubic Inches to Liters | InterConverter',
  description: 'Convert engine displacement between cubic inches and liters. Free online engine size converter for automotive applications.',
  keywords: 'engine size converter, cubic inches to liters, engine displacement, automotive conversion',
};

export default function EngineSizeConverterPage() {
  return (
    <AutomotiveToolLayout
      title="Engine Size Converter"
      description="Convert engine displacement between cubic inches and liters"
      toolId="engine-size-converter"
    >
      <EngineSizeConverter />
    </AutomotiveToolLayout>
  );
}
