import { Metadata } from 'next';
import { ToolLayout } from '@/components/tools/ToolLayout';
import { EngineSizeConverter } from '@/components/converters/automotive/EngineSizeConverter';




// Force static generation
export const dynamic = 'force-static';
const keywords = [
  'engine size converter',
  'cubic inches to liters',
  'engine displacement',
  'automotive conversion',
  'ci to l',
  'liter to cubic inch',
];

export const metadata: Metadata = {
  title: 'Engine Size Converter',
  description:
    'Convert engine displacement between cubic inches and liters. Free online engine size converter for automotive applications.',
  keywords: keywords.join(', '),
  openGraph: {
    title: 'Engine Size Converter',
    description:
      'Convert engine displacement between cubic inches and liters. Free online engine size converter for automotive applications.',
    type: 'website',
  },
  alternates: {
    canonical: '/auto/engine-size-converter',
  },
};

export default function EngineSizeConverterPage() {
  return (
    <ToolLayout
      title="Engine Size Converter"
      description="Convert engine displacement between cubic inches and liters"
      keywords={keywords}
      toolId="engine-size-converter"
      category="auto"
      emoji="🔧"
      customHowToUse={[
        "Enter engine displacement in cubic inches or liters",
        "The conversion will be calculated automatically",
        "View the result in both measurement systems",
        "Use the converted value for engine specifications"
      ]}
      customFeatures={[
        "Accurate cubic inch to liter conversion",
        "Bidirectional conversion support",
        "Common engine size references",
        "Instant calculation results"
      ]}
    >
      <EngineSizeConverter />
    </ToolLayout>
  );
}
