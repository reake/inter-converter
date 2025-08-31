#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// 获取所有finance工具页面
const financeDir = '/Users/reake/data/mywork/inter-converter/src/app/[locale]/(tools)/finance';
const dataDir = '/Users/reake/data/mywork/inter-converter/src/data/tools/finance';

// 已经重构完成的页面
const completedPages = [
  '401k-calculator',
  'budget-calculator', 
  'retirement-calculator',
  'investment-calculator',
  'currency-converter',
  'loan-calculator',
  'mortgage-calculator',
  'tax-calculator',
  'compound-interest-calculator',
  'savings-calculator'
];

// 需要重构的页面模板
const pageTemplate = (toolId, componentName) => `import { Metadata } from 'next';
import { EnhancedToolLayout } from '@/components/tools/EnhancedToolLayout';
import ${componentName} from '@/components/converters/finance/${componentName}';
import { generateOptimizedKeywords } from '@/config/seo-keywords';
import enTool from '@/data/tools/finance/${toolId}-en.json';
import zhTool from '@/data/tools/finance/${toolId}-zh.json';
import financeEn from '@/data/tools/finance.json';
import financeZh from '@/data/tools/finance-zh.json';
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
    en: financeEn as any[],
    zh: (financeZh as any[]) || (financeEn as any[])
  };
  const entry = catalogs[l]?.find((it) => it.id === '${toolId}') || catalogs.en.find((it) => it.id === '${toolId}');

  const toolName: string = entry?.name ?? '${componentName}';
  const description: string = entry?.description ?? 'Professional financial calculator for accurate calculations and planning.';
  const baseKeywords = generateOptimizedKeywords('${toolId}', 'finance', '${componentName}');
  const keywords = Array.isArray(entry?.keywords) && entry.keywords.length
    ? Array.from(new Set([...baseKeywords, ...entry.keywords]))
    : baseKeywords;

  const titleSuffix: string = entry?.titleSuffix ?? '';
  const title = \`\${toolName}\${titleSuffix ? \` - \${titleSuffix}\` : ''} | InterConverter\`;
  const canonicalPath = \`/\${l}/finance/${toolId}\`;

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
        en: '/finance/${toolId}',
        zh: '/zh/finance/${toolId}'
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

  const toolContent: ToolContent = l === 'zh' ? zhTool : enTool;
  const fallbackContent: ToolContent = enTool;

  const about = toolContent.about?.length ? toolContent.about : fallbackContent.about;
  const howToUse = toolContent.howToUse?.length ? toolContent.howToUse : fallbackContent.howToUse;
  const features = toolContent.features?.length ? toolContent.features : fallbackContent.features;
  const faqs = toolContent.faqs?.length ? toolContent.faqs : fallbackContent.faqs;

  const catalogs: Record<string, any[]> = { en: financeEn as any[], zh: (financeZh as any[]) || (financeEn as any[]) };
  const entry = catalogs[l]?.find((it) => it.id === '${toolId}') || catalogs.en.find((it) => it.id === '${toolId}');

  const toolName: string = entry?.name || '${componentName}';
  const descriptionText: string = entry?.description || 'Professional financial calculator for accurate calculations and planning.';
  const baseKeywords = generateOptimizedKeywords('${toolId}', 'finance', '${componentName}');
  const pageKeywords = Array.isArray(entry?.keywords) && entry.keywords.length > 0
    ? Array.from(new Set([...baseKeywords, ...entry.keywords]))
    : baseKeywords;

  return (
    <EnhancedToolLayout
      title={toolName}
      description={descriptionText}
      keywords={pageKeywords}
      toolId="${toolId}"
      category="finance"
      locale={l}
      emoji="💰"
      aboutContent={about}
      customHowToUse={howToUse}
      customFeatures={features}
      faqs={faqs}
    >
      <${componentName} />
    </EnhancedToolLayout>
  );
}
`;

// 基础JSON内容模板
const jsonTemplate = (toolName, isZh = false) => {
  if (isZh) {
    return {
      "about": [
        `${toolName}是一个专业的财务计算工具，帮助您进行准确的财务计算和规划。`,
        "此工具提供直观的界面和精确的计算结果，适用于个人和专业财务规划需求。",
        "使用此计算器可以帮助您做出明智的财务决策，优化您的财务策略。"
      ],
      "howToUse": [
        "输入相关的财务参数",
        "设置计算选项和偏好",
        "查看详细的计算结果",
        "分析不同情景的影响",
        "导出或保存计算结果"
      ],
      "features": [
        "精确的财务计算算法",
        "多种计算模式和选项",
        "实时结果更新",
        "详细的分析报告",
        "用户友好的界面设计"
      ],
      "faqs": [
        {
          "question": "如何使用此计算器？",
          "answer": "输入所需的财务参数，选择适当的计算选项，系统将自动生成详细的计算结果和分析。"
        },
        {
          "question": "计算结果准确吗？",
          "answer": "我们使用行业标准的财务计算公式，确保结果的准确性和可靠性。"
        }
      ]
    };
  } else {
    return {
      "about": [
        `The ${toolName} is a professional financial calculation tool designed to help you with accurate financial calculations and planning.`,
        "This tool provides an intuitive interface and precise calculation results, suitable for both personal and professional financial planning needs.",
        "Use this calculator to make informed financial decisions and optimize your financial strategies."
      ],
      "howToUse": [
        "Enter the relevant financial parameters",
        "Set calculation options and preferences", 
        "Review detailed calculation results",
        "Analyze the impact of different scenarios",
        "Export or save calculation results"
      ],
      "features": [
        "Accurate financial calculation algorithms",
        "Multiple calculation modes and options",
        "Real-time result updates",
        "Detailed analysis reports",
        "User-friendly interface design"
      ],
      "faqs": [
        {
          "question": "How do I use this calculator?",
          "answer": "Enter the required financial parameters, select appropriate calculation options, and the system will automatically generate detailed calculation results and analysis."
        },
        {
          "question": "Are the calculation results accurate?",
          "answer": "We use industry-standard financial calculation formulas to ensure the accuracy and reliability of results."
        }
      ]
    };
  }
};

// 获取组件名称（从工具ID转换）
function getComponentName(toolId) {
  return toolId.split('-').map(word => 
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join('') + 'Calculator';
}

// 获取工具显示名称
function getToolDisplayName(toolId) {
  return toolId.split('-').map(word => 
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join(' ') + ' Calculator';
}

// 主函数
function refactorFinancePages() {
  console.log('开始批量重构finance工具页面...');
  
  // 读取finance目录下的所有工具
  const toolDirs = fs.readdirSync(financeDir, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name)
    .filter(name => !completedPages.includes(name));

  console.log(`发现 ${toolDirs.length} 个需要重构的工具页面`);

  let processedCount = 0;
  let skippedCount = 0;

  toolDirs.forEach(toolId => {
    try {
      const pagePath = path.join(financeDir, toolId, 'page.tsx');
      const enJsonPath = path.join(dataDir, `${toolId}-en.json`);
      const zhJsonPath = path.join(dataDir, `${toolId}-zh.json`);

      // 检查页面文件是否存在
      if (!fs.existsSync(pagePath)) {
        console.log(`跳过 ${toolId}: 页面文件不存在`);
        skippedCount++;
        return;
      }

      // 创建JSON内容文件（如果不存在）
      if (!fs.existsSync(enJsonPath)) {
        const toolDisplayName = getToolDisplayName(toolId);
        fs.writeFileSync(enJsonPath, JSON.stringify(jsonTemplate(toolDisplayName), null, 2));
        console.log(`创建英文JSON: ${toolId}-en.json`);
      }

      if (!fs.existsSync(zhJsonPath)) {
        const toolDisplayName = getToolDisplayName(toolId);
        fs.writeFileSync(zhJsonPath, JSON.stringify(jsonTemplate(toolDisplayName, true), null, 2));
        console.log(`创建中文JSON: ${toolId}-zh.json`);
      }

      // 读取现有页面内容以确定组件名称
      const existingContent = fs.readFileSync(pagePath, 'utf8');
      const componentMatch = existingContent.match(/import\s+(\w+)\s+from\s+['"]@\/components\/converters\/finance\/(\w+)['"]/);
      
      let componentName;
      if (componentMatch) {
        componentName = componentMatch[1];
      } else {
        componentName = getComponentName(toolId);
      }

      // 生成新的页面内容
      const newPageContent = pageTemplate(toolId, componentName);
      
      // 备份原文件
      const backupPath = `${pagePath}.backup`;
      if (!fs.existsSync(backupPath)) {
        fs.copyFileSync(pagePath, backupPath);
      }

      // 写入新内容
      fs.writeFileSync(pagePath, newPageContent);
      console.log(`重构完成: ${toolId}`);
      processedCount++;

    } catch (error) {
      console.error(`处理 ${toolId} 时出错:`, error.message);
      skippedCount++;
    }
  });

  console.log(`\n重构完成统计:`);
  console.log(`- 成功处理: ${processedCount} 个页面`);
  console.log(`- 跳过: ${skippedCount} 个页面`);
  console.log(`- 总计: ${processedCount + skippedCount} 个页面`);
}

// 运行脚本
if (require.main === module) {
  refactorFinancePages();
}

module.exports = { refactorFinancePages };
