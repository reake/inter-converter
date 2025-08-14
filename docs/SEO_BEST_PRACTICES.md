# InterConverter SEO 最佳实践指南

## 概述
本指南为InterConverter网站的SEO优化提供标准化规范，确保所有页面都符合Google SEO最佳实践。

## 核心SEO原则

### 1. Title标签规范
- **长度限制**: 60个字符以内（包含品牌名）
- **格式**: `[工具名称] | InterConverter` 或 `[工具名称] - Free Online Tool | InterConverter`
- **品牌一致性**: 所有页面必须包含 "InterConverter" 品牌名
- **关键词优化**: 主要关键词放在标题前部
- **术语策略**: 首页和分类页使用"Converters"，功能描述使用"conversion"

**示例**:
```
✅ Currency Converter | InterConverter (29字符)
✅ BMI Calculator - Free Online Tool | InterConverter (50字符)
❌ Free Online Currency Converter Tool with Live Exchange Rates | InterConverter (75字符 - 太长)
```

### 2. Description标签规范
- **长度限制**: 160个字符以内
- **内容要求**: 包含主要功能、价值主张、行动召唤
- **关键词**: 自然融入2-3个主要关键词
- **独特性**: 每个页面的描述必须独特

**示例**:
```
✅ Convert 150+ currencies with live exchange rates. Free, accurate, instant results. USD, EUR, GBP, JPY & more. No registration required. (156字符)
```

### 3. 关键词策略
- **主关键词**: 每页面1-2个主要关键词
- **长尾关键词**: 3-5个相关长尾词
- **关键词密度**: 自然分布，避免堆砌
- **语义相关**: 包含同义词和相关术语

### 4. 术语使用策略 (Converter vs Conversion)
**使用"Converter"的场景**:
- 首页标题: "Free Online Converters & Calculators"
- 分类页面标题: "Currency Converters", "Unit Converters"
- 工具名称: "Currency Converter", "Unit Converter"
- 主要关键词: 针对用户搜索习惯

**使用"Conversion"的场景**:
- 功能描述: "Real-time conversion", "Accurate conversion"
- 技术特性: "Bidirectional conversion support"
- 过程描述: "The conversion happens automatically"
- 概括性描述: "Conversion Tools & Calculators"

**SEO原理**:
- "Converter" = 用户搜索词，更高搜索量
- "Conversion" = 功能描述，更自然语法

## 页面类型SEO规范

### 工具页面 (Tool Pages)
使用 `generateToolMetadata()` 函数，确保：

```typescript
export const metadata: Metadata = generateToolMetadata(
  'Tool Name',                    // 简洁的工具名称
  'Description under 160 chars', // 精确描述功能和价值
  'tool-id',                     // URL友好的ID
  [                              // 10个以内的关键词
    'primary keyword',
    'secondary keyword',
    'long tail keyword',
    // ...
  ],
  'category'                     // 工具分类
);
```

### 分类页面 (Category Pages)
- **Title**: `Free [Category] Tools & Calculators | InterConverter`
- **Description**: 概述分类下的主要工具和价值
- **关键词**: 分类相关的核心关键词

### 主页 (Homepage)
- **Title**: `Free Online Conversion Tools & Calculators | InterConverter`
- **Description**: 网站整体价值主张和主要功能
- **关键词**: 品牌词和核心业务关键词

## 技术SEO要求

### 1. 结构化数据
- 所有工具页面必须包含 JSON-LD 结构化数据
- 使用 `generateToolStructuredData()` 函数
- 包含 WebApplication 和 SoftwareApplication 类型

### 2. Open Graph 标签
- 所有页面必须包含完整的 OG 标签
- 图片尺寸: 1200x630px
- 图片命名: `og-[tool-id].jpg`

### 3. Twitter Cards
- 使用 `summary_large_image` 卡片类型
- 包含 `@interconverter` 创建者标识
- 图片命名: `twitter-[tool-id].jpg`

### 4. Canonical URLs
- 所有页面必须设置正确的 canonical URL
- 格式: `https://interconverter.com/[category]/[tool-id]`

## 内容SEO指南

### 1. 标题层级 (H1-H6)
- **H1**: 每页面只有一个，与页面title一致
- **H2**: 主要章节标题
- **H3**: 子章节标题
- 保持逻辑层级结构

### 2. 内容质量
- **原创性**: 所有内容必须原创
- **价值性**: 为用户提供实际价值
- **可读性**: 使用简洁明了的语言
- **更新性**: 定期更新内容保持新鲜度

### 3. 内部链接
- 相关工具之间建立链接
- 使用描述性锚文本
- 避免过度链接

## 长尾关键词策略

### 高价值长尾词模式
1. **功能 + 免费**: "free [tool] calculator"
2. **功能 + 在线**: "[tool] online free"
3. **功能 + 特性**: "[tool] with [feature]"
4. **问题解决**: "how to calculate [metric]"
5. **比较型**: "[tool] vs [alternative]"

### 分类特定长尾词
- **Finance**: "real time currency converter", "loan payment calculator monthly"
- **Auto**: "carburetor cfm calculator engine", "compression ratio calculator horsepower"
- **Health**: "bmi calculator body mass index accurate"
- **Unit**: "metric to imperial converter accurate"

## 性能SEO

### 1. 页面速度
- Core Web Vitals 优化
- 图片压缩和优化
- 代码分割和懒加载

### 2. 移动优化
- 响应式设计
- 移动友好的交互
- 快速加载时间

### 3. 用户体验
- 清晰的导航结构
- 直观的工具界面
- 快速的计算响应

## 监控和分析

### 1. 关键指标
- 有机搜索流量
- 关键词排名
- 页面停留时间
- 跳出率

### 2. 工具推荐
- Google Search Console
- Google Analytics 4
- SEMrush/Ahrefs
- PageSpeed Insights

## 新页面检查清单

创建新页面时，确保：

- [ ] Title标签 ≤ 60字符，包含品牌名
- [ ] Description ≤ 160字符，包含价值主张
- [ ] 使用 `generateToolMetadata()` 函数
- [ ] 包含结构化数据
- [ ] 设置正确的 canonical URL
- [ ] 添加相关的内部链接
- [ ] 优化图片 alt 标签
- [ ] 测试移动端体验
- [ ] 验证页面速度

## 更新日志
- 2024-08-14: 初始版本创建
- 包含完整的SEO规范和最佳实践
