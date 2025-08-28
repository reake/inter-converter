import { Metadata } from 'next';
import { TOOLS_CONFIG, TOOL_CATEGORIES } from '@/config/tools';
import { ToolsPageClient } from '@/components/tools/ToolsPageClient';

// Force static generation
export const dynamic = 'force-static';

interface Props {
  params: {
    locale: string;
  };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = params;
  
  const titles = {
    en: 'All Free Online Converters & Calculators | InterConverter',
    zh: '所有免费在线转换器和计算器 | InterConverter'
  };
  
  const descriptions = {
    en: 'Browse all free online converters and calculators at InterConverter. Find tools for currency, units, colors, health, time, finance, and more – fast and easy.',
    zh: '浏览InterConverter上的所有免费在线转换器和计算器。查找货币、单位、颜色、健康、时间、金融等工具 - 快速简便。'
  };

  return {
    title: titles[locale as keyof typeof titles] || titles.en,
    description: descriptions[locale as keyof typeof descriptions] || descriptions.en,
    keywords: locale === 'zh' 
      ? ['转换器', '计算器', '单位转换', '货币转换', '颜色转换', '在线工具', '免费工具']
      : ['converter', 'calculator', 'unit conversion', 'currency converter', 'color converter', 'online tools', 'free tools'],
    openGraph: {
      title: titles[locale as keyof typeof titles] || titles.en,
      description: descriptions[locale as keyof typeof descriptions] || descriptions.en,
      type: 'website',
    },
    alternates: {
      canonical: `/${locale}/tools`,
      languages: {
        'en': '/en/tools',
        'zh': '/zh/tools'
      }
    }
  };
}

export default function ToolsPage({ params }: Props) {
  return <ToolsPageClient locale={params.locale} />;
}
