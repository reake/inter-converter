const fs = require('fs');
const path = require('path');

// Time tools that need refactoring
const timeTools = [
  'age-calculator',
  'countdown-timer', 
  'date-calculator',
  'date-difference-calculator',
  'online-stopwatch',
  'timestamp-converter',
  'timezone-converter',
  'unix-timestamp-converter',
  'working-days-calculator'
  // world-clock already done
];

// Unit tools that need refactoring
const unitTools = [
  'area-converter',
  'celsius-to-fahrenheit-converter',
  'cm-to-inches-converter',
  'data-converter',
  'energy-converter',
  'fahrenheit-to-celsius-converter',
  'feet-to-meters-converter',
  'inches-to-cm-converter',
  'kg-to-pounds-converter',
  'length-converter',
  'meters-to-feet-converter',
  'pounds-to-kg-converter',
  'power-converter',
  'pressure-converter',
  'speed-converter',
  'temperature-converter',
  'unit-converter',
  'volume-converter',
  'weight-converter'
];

function generatePageTemplate(toolId, category) {
  const categoryCapitalized = category.charAt(0).toUpperCase() + category.slice(1);
  const componentName = toolId.split('-').map(word => 
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join('');

  return `import { Metadata } from 'next';
import { EnhancedToolLayout } from '@/components/tools/EnhancedToolLayout';
import { ${componentName} } from '@/components/converters/${category}/${componentName}';
import { generateOptimizedKeywords } from '@/config/seo-keywords';
import enTool from '@/data/tools/${category}/${toolId}-en.json';
import zhTool from '@/data/tools/${category}/${toolId}-zh.json';
import ${category}En from '@/data/tools/${category}.json';
import ${category}Zh from '@/data/tools/${category}-zh.json';
import { ToolContent } from '@/types/tool-content';

// Force static generation
export const dynamic = 'force-static';

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params;
  const l = (locale || 'en').toLowerCase();

  const catalogs: Record<string, any[]> = {
    en: ${category}En as any[],
    zh: (${category}Zh as any[]) || (${category}En as any[])
  };
  const entry = catalogs[l]?.find((it) => it.id === '${toolId}') || catalogs.en.find((it) => it.id === '${toolId}');

  const toolName: string = entry?.name ?? '${componentName}';
  const description: string = entry?.description ?? '';
  const baseKeywords = generateOptimizedKeywords('${toolId}', '${category}', '${componentName}');
  const keywords = Array.isArray(entry?.keywords) && entry.keywords.length
    ? Array.from(new Set([...baseKeywords, ...entry.keywords]))
    : baseKeywords;

  const titleSuffix: string = entry?.titleSuffix ?? '';
  const title = \`\${toolName}\${titleSuffix ? \` - \${titleSuffix}\` : ''} | InterConverter\`;
  const canonicalPath = \`/\${l}/${category}/${toolId}\`;

  return {
    title,
    description,
    keywords: keywords.join(', '),
    openGraph: {
      title,
      description,
      type: 'website',
      locale: l === 'zh' ? 'zh_CN' : 'en_US',
      images: [
        {
          url: '/images/og-${toolId}.jpg',
          width: 1200,
          height: 630,
          alt: toolName
        }
      ]
    },
    alternates: {
      canonical: canonicalPath,
      languages: {
        en: '/${category}/${toolId}',
        zh: '/zh/${category}/${toolId}'
      }
    },
    authors: [{ name: 'InterConverter Team' }],
    creator: 'InterConverter',
    publisher: 'InterConverter',
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1
      }
    }
  };
}

export default async function ${componentName}Page({
  params
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params;
  const l = (locale || 'en').toLowerCase();

  // Load JSON content based on locale
  const toolContent: ToolContent = l === 'zh' ? zhTool : enTool;
  const catalogs: Record<string, any[]> = {
    en: ${category}En as any[],
    zh: (${category}Zh as any[]) || (${category}En as any[])
  };
  const entry = catalogs[l]?.find((it) => it.id === '${toolId}') || catalogs.en.find((it) => it.id === '${toolId}');

  const toolName: string = entry?.name ?? '${componentName}';
  const description: string = entry?.description ?? '';
  const baseKeywords = generateOptimizedKeywords('${toolId}', '${category}', '${componentName}');
  const keywords = Array.isArray(entry?.keywords) && entry.keywords.length
    ? Array.from(new Set([...baseKeywords, ...entry.keywords]))
    : baseKeywords;

  return (
    <EnhancedToolLayout
      title={toolName}
      description={description}
      keywords={keywords}
      toolId="${toolId}"
      category="${category}"
      aboutContent={toolContent.about}
      customHowToUse={toolContent.howToUse}
      customFeatures={toolContent.features}
      faqs={toolContent.faqs}
    >
      <${componentName} />
    </EnhancedToolLayout>
  );
}
`;
}

function refactorTool(toolId, category) {
  const pagePath = path.join(__dirname, '..', 'src', 'app', '[locale]', '(tools)', category, toolId, 'page.tsx');
  
  if (!fs.existsSync(pagePath)) {
    console.log(`⚠️  Page not found: ${pagePath}`);
    return;
  }

  const newContent = generatePageTemplate(toolId, category);
  
  try {
    fs.writeFileSync(pagePath, newContent, 'utf8');
    console.log(`✅ Refactored: ${category}/${toolId}`);
  } catch (error) {
    console.error(`❌ Error refactoring ${category}/${toolId}:`, error.message);
  }
}

function main() {
  console.log('🚀 Starting time and unit tools refactoring...\n');
  
  // Refactor time tools
  console.log('📅 Refactoring time tools:');
  timeTools.forEach(toolId => {
    refactorTool(toolId, 'time');
  });
  
  console.log('\n📏 Refactoring unit tools:');
  unitTools.forEach(toolId => {
    refactorTool(toolId, 'unit');
  });
  
  console.log('\n✨ Refactoring completed!');
  console.log(`📊 Total tools refactored: ${timeTools.length + unitTools.length}`);
}

main();
