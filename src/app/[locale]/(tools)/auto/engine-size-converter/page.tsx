import { Metadata } from 'next';
import { ToolLayout, generateToolMetadata } from '@/components/tools/ToolLayout';
import { EngineSizeConverter } from '@/components/automotive/EngineSizeConverter';



// Cloudflare Pages Edge Runtime 配置
export const runtime = 'edge';
export const metadata: Metadata = generateToolMetadata(
  'Engine Size Converter',
  'Convert engine displacement between cubic inches and liters. Free online engine size converter for automotive applications.',
  'engine-size-converter',
  ['engine size converter', 'cubic inches to liters', 'engine displacement', 'automotive conversion', 'ci to l', 'liter to cubic inch'],
  'auto'
);

export default function EngineSizeConverterPage() {
  return (
    <ToolLayout
      title="Engine Size Converter"
      description="Convert engine displacement between cubic inches and liters"
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
