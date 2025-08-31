# 多语言SEO重构标准化文档

## 概述

本文档定义了InterConverter项目中工具类别的多语言SEO优化重构标准流程，确保所有工具页面具备统一的SEO规范、多语言支持和用户体验。

## 重构目标

### SEO优化要求
- **页面字数**: 600-800词最佳
- **关键词密度**: 主要关键词1.5%-2%（8-10次出现）
- **次要关键词**: 1%左右（5-7次出现）
- **同义词密度**: 约1%
- **内容模块**: About、HowToUse、Features、FAQ四大核心模块

### 技术架构要求
- 动态metadata生成支持多语言(en,zh,jp,fr)
- JSON驱动的内容管理
- 统一的页面布局和用户体验
- SEO标签优化（canonical、hreflang、OpenGraph）

## 实施流程

### 第一步：分析现状
1. 检查目标类别的工具页面当前实现
2. 确认工具数量和页面结构
3. 评估现有SEO配置

### 第二步：创建JSON内容文件

#### 目录结构
```
src/data/tools/
├── {category}/
│   ├── {tool-id}-en.json     # 英文内容
│   ├── {tool-id}-zh.json     # 中文内容
│   └── ...
├── {category}.json           # 英文目录
└── {category}-zh.json        # 中文目录
```

#### 工具内容文件格式 (`{tool-id}-en.json`)
```json
{
  "about": [
    "第一段：工具介绍和核心功能（包含主要关键词2-3次）",
    "第二段：使用场景和价值说明（包含次要关键词1-2次）"
  ],
  "howToUse": [
    "步骤1：具体操作说明",
    "步骤2：功能使用指导",
    "步骤3：结果获取方式",
    "步骤4：高级功能说明"
  ],
  "features": [
    "核心功能1（包含关键词）",
    "核心功能2（包含同义词）",
    "核心功能3（技术特性）",
    "核心功能4（用户体验）",
    "核心功能5（安全隐私）"
  ],
  "faqs": [
    {
      "question": "常见问题1（包含长尾关键词）",
      "answer": "详细回答，包含主要关键词和相关术语"
    },
    {
      "question": "常见问题2（技术相关）",
      "answer": "专业解答，覆盖用户关心的技术细节"
    }
  ]
}
```

#### 目录文件格式 (`{category}.json`)
```json
[
  {
    "id": "tool-id",
    "name": "Tool Name",
    "description": "SEO优化的工具描述（包含主要关键词）",
    "keywords": ["主要关键词", "次要关键词", "长尾关键词"],
    "titleSuffix": "SEO标题后缀"
  }
]
```

### 第三步：重构页面组件

#### 页面结构模板
```typescript
import { Metadata } from 'next';
import { EnhancedToolLayout } from '@/components/tools/EnhancedToolLayout';
import { generateOptimizedKeywords } from '@/config/seo-keywords';
import enTool from '@/data/tools/{category}/{tool-id}-en.json';
import zhTool from '@/data/tools/{category}/{tool-id}-zh.json';
import {category}En from '@/data/tools/{category}.json';
import {category}Zh from '@/data/tools/{category}-zh.json';
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
    en: {category}En as any[],
    zh: ({category}Zh as any[]) || ({category}En as any[])
  };
  const entry = catalogs[l]?.find((it) => it.id === '{tool-id}') || catalogs.en.find((it) => it.id === '{tool-id}');

  const toolName: string = entry?.name ?? 'Default Tool Name';
  const description: string = entry?.description ?? 'Default description';
  const baseKeywords = generateOptimizedKeywords('{tool-id}', '{category}', 'Tool Name');
  const keywords = Array.isArray(entry?.keywords) && entry.keywords.length
    ? Array.from(new Set([...baseKeywords, ...entry.keywords]))
    : baseKeywords;

  const titleSuffix: string = entry?.titleSuffix ?? '';
  const title = `${toolName}${titleSuffix ? ` - ${titleSuffix}` : ''} | InterConverter`;
  const canonicalPath = `/${l}/{category}/{tool-id}`;

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
          url: `/images/og-{tool-id}.jpg`,
          width: 1200,
          height: 630,
          alt: toolName
        }
      ]
    },
    alternates: {
      canonical: canonicalPath,
      languages: {
        en: '/{category}/{tool-id}',
        zh: '/zh/{category}/{tool-id}'
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

export default async function ToolPage({
  params
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params;
  const l = (locale || 'en').toLowerCase();

  // Load JSON content based on locale
  const toolContent: ToolContent = l === 'zh' ? zhTool : enTool;
  const catalogs: Record<string, any[]> = {
    en: {category}En as any[],
    zh: ({category}Zh as any[]) || ({category}En as any[])
  };
  const entry = catalogs[l]?.find((it) => it.id === '{tool-id}') || catalogs.en.find((it) => it.id === '{tool-id}');

  const toolName: string = entry?.name ?? 'Default Tool Name';
  const description: string = entry?.description ?? 'Default description';
  const baseKeywords = generateOptimizedKeywords('{tool-id}', '{category}', 'Tool Name');
  const keywords = Array.isArray(entry?.keywords) && entry.keywords.length
    ? Array.from(new Set([...baseKeywords, ...entry.keywords]))
    : baseKeywords;

  return (
    <EnhancedToolLayout
      title={toolName}
      description={description}
      keywords={keywords}
      toolId="{tool-id}"
      category="{category}"
      emoji="🔧"
      aboutContent={toolContent.about}
      customHowToUse={toolContent.howToUse}
      customFeatures={toolContent.features}
      faqs={toolContent.faqs}
    >
      {/* 工具组件内容 */}
    </EnhancedToolLayout>
  );
}
```

### 第四步：批量重构脚本

创建自动化脚本处理多个工具页面的重构：

```javascript
// scripts/refactor-category-pages.js
const fs = require('fs');
const path = require('path');

function generatePageTemplate(toolId, category) {
  // 返回标准化的页面模板
}

function refactorTool(toolId, category) {
  const pagePath = path.join(__dirname, '..', 'src', 'app', '[locale]', '(tools)', category, toolId, 'page.tsx');
  const newContent = generatePageTemplate(toolId, category);
  fs.writeFileSync(pagePath, newContent, 'utf8');
}
```

### 第五步：组件导入修复

处理组件导入问题的脚本：

```javascript
// scripts/fix-component-imports.js
function checkComponentExport(componentPath) {
  const content = fs.readFileSync(componentPath, 'utf8');
  return content.includes('export default function');
}

function fixImportInPage(pagePath, componentName) {
  // 修复命名导入vs默认导入问题
}
```

## 已完成的类别重构

### ✅ Finance类别 (6个工具)
- currency-converter, loan-calculator, mortgage-calculator
- tax-calculator, compound-interest-calculator, savings-calculator
- 状态：完成，构建成功

### ✅ Time类别 (10个工具)  
- world-clock, age-calculator, countdown-timer, date-calculator
- date-difference-calculator, online-stopwatch, timestamp-converter
- timezone-converter, unix-timestamp-converter, working-days-calculator
- 状态：完成，构建成功

### ✅ Unit类别 (19个工具)
- area-converter, celsius-to-fahrenheit-converter, cm-to-inches-converter
- data-converter, energy-converter, fahrenheit-to-celsius-converter
- feet-to-meters-converter, inches-to-cm-converter, kg-to-pounds-converter
- length-converter, meters-to-feet-converter, pounds-to-kg-converter
- power-converter, pressure-converter, speed-converter, temperature-converter
- unit-converter, volume-converter, weight-converter
- 状态：完成，构建成功

### ✅ Media类别 (2个工具)
- jpg-to-png-converter, pdf-to-word-converter
- 状态：完成，构建成功

## 待重构类别

### 🔄 Health类别 (预计6个工具)
- bmi-calculator, calorie-calculator, body-fat-calculator
- ideal-weight-calculator, pregnancy-calculator, water-intake-calculator

### 🔄 Color类别 (预计8个工具)
- hex-to-rgb-converter, color-palette-generator等

### 🔄 Science类别 (预计10个工具)
- 各种科学计算工具

## 质量检查清单

### 内容质量
- [ ] About部分包含2段，总计150-200词
- [ ] HowToUse包含4-6个步骤
- [ ] Features包含5-8个核心功能点
- [ ] FAQ包含4-5个常见问题
- [ ] 主要关键词出现8-10次
- [ ] 次要关键词出现5-7次

### 技术实现
- [ ] 动态metadata生成正常
- [ ] 多语言内容加载正确
- [ ] SEO标签完整（canonical、hreflang、OpenGraph）
- [ ] 组件导入无错误
- [ ] 构建成功无警告

### SEO优化
- [ ] 页面标题包含titleSuffix
- [ ] Meta描述包含主要关键词
- [ ] 关键词密度在合理范围
- [ ] 内容结构化良好
- [ ] 多语言URL结构正确

## 工具和脚本

### 批量重构脚本
- `scripts/refactor-{category}-pages.js` - 类别页面重构
- `scripts/fix-component-imports.js` - 组件导入修复
- `scripts/validate-json-content.js` - JSON内容验证

### 验证命令
```bash
# 构建验证
npm run build

# 开发服务器测试
pnpm dev

# JSON格式验证
node scripts/validate-json-content.js {category}
```

## 注意事项

1. **组件导入**: 注意区分默认导出和命名导出
2. **JSON格式**: 确保所有JSON文件格式正确
3. **关键词密度**: 避免关键词堆砌，保持自然
4. **多语言一致性**: 确保中英文内容质量对等
5. **构建验证**: 每次重构后必须验证构建成功

## 后续维护

1. 定期更新JSON内容以提升SEO效果
2. 监控页面性能和用户体验指标
3. 根据搜索数据优化关键词策略
4. 持续完善FAQ内容覆盖长尾词

---

**文档版本**: v1.0  
**最后更新**: 2025-08-31  
**适用范围**: InterConverter项目所有工具类别重构
