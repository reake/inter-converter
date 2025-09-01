# InterConverter 开发规范文档 (dev.md)

本文档整合了项目的SEO规范、UI标准、技术架构和开发流程，为团队提供统一的开发指南。

---

## 1. 项目架构与目录结构

### 1.1 核心目录结构
```
src/
├── app/                    # Next.js App Router
│   ├── [locale]/          # 多语言路由
│   │   ├── layout.tsx     # 全局布局
│   │   ├── page.tsx       # 首页
│   │   └── [category]/    # 工具分类页面
│   ├── sitemap.ts         # 站点地图生成
│   └── robots.ts          # 搜索引擎爬虫规则
├── components/            # 可复用组件
│   ├── seo/              # SEO专用组件
│   ├── ui/               # 基础UI组件
│   ├── blocks/           # 页面区块组件
│   └── common/           # 通用组件
├── config/               # 配置文件
│   ├── design-system.ts  # 设计系统配置
│   ├── keyword-analysis.ts # 关键词策略配置
│   └── content-templates.ts # 内容模板配置
├── data/                 # 数据文件
│   ├── tools/            # 工具配置与内容
│   │   ├── finance.json  # 分类工具索引
│   │   └── finance/      # 具体工具内容
│   │       ├── tool-en.json
│   │       └── tool-zh.json
│   └── categories/       # 分类页面内容
├── lib/                  # 工具函数
│   ├── seo/             # SEO相关工具
│   ├── utils.ts         # 通用工具函数
│   └── i18n.ts          # 国际化工具
├── hooks/               # 自定义React Hooks
├── stores/              # Zustand状态管理
├── types/               # TypeScript类型定义
└── actions/             # Server Actions
```

### 1.2 内容数据结构（方案A）
- **工具索引**: `src/data/tools/{category}.json` - 包含工具基础信息、titleSuffix、搜索量等
- **工具内容**: `src/data/tools/{category}/{tool}-{locale}.json` - 包含About、Features、HowTo、FAQ等多语言内容
- **分类内容**: `src/data/categories/{category}-{locale}.json` - 分类页面的多语言内容

---

## 2. SEO规范与实施

### 2.1 关键词策略
- **主关键词**: 在Title、H1、URL、首屏摘要中出现，严格匹配SERP意图
- **Supporting长尾词**: 与主词高度相近，穿插于小节标题、首段、表格、图片ALT、FAQ
- **Topical长尾词**: 可形成独立信息单元，使用H2/H3小节提供深入答案

### 2.2 页面结构模板
每个工具页面必须包含以下模块（按顺序）：
1. **Title & Meta Description** (≤60字符 / ≤160字符)
2. **H1标题** (唯一，含主词)
3. **首屏工具区** (直接可用，含主词和1-2个supporting长尾)
4. **目录(ToC)** (锚点链接至各H2/H3小节)
5. **About区块** (1-2段介绍，自然覆盖主词)
6. **Features列表** (3-8个要点，含supporting长尾)
7. **HowTo步骤** (3-7步使用指南)
8. **FAQ区块** (5-10组问答，命中PAA查询)
9. **相关链接** (4-12条内链，主题集群互链)

### 2.3 多语言SEO要求
- **URL结构**: `/[locale]/[category]/[tool]`
- **Canonical**: 每语言自指canonical
- **Hreflang**: 各语言互指，设置x-default
- **内容独立性**: 各语言内容独立本地化，非直译
- **Schema标记**: Article/HowTo/FAQ/SoftwareApplication按需注入
- **已实现**: 完整的多语言切换功能，支持中英文切换，包含语言完成度显示
- **已实现**: 语言偏好记忆和浏览器语言自动检测

### 2.4 必需的SEO组件
```typescript
// 必须实现的SEO组件
- HreflangLinks.tsx      // 多语言链接
- CanonicalLink.tsx      // 规范链接
- JsonLd.tsx            // 结构化数据
- TableOfContents.tsx   // 目录导航
- FaqSection.tsx        // FAQ区块
```

---

## 3. UI/UX设计规范

### 3.1 设计系统
- **UI库**: Radix UI + Tailwind CSS
- **图标**: Lucide React + Tabler Icons
- **动画**: Framer Motion
- **表单**: React Hook Form + Zod验证
- **通知**: Sonner
- **主题**: 支持深色模式，使用next-themes

### 3.2 组件开发原则
- 遵循原子设计原则(Atomic Design)
- 所有组件必须支持TypeScript
- 实现完整的无障碍访问(a11y)
- 支持键盘导航和屏幕阅读器
- 处理加载和错误状态
- 保持组件单一职责

### 3.3 样式规范
- 使用Tailwind CSS类名
- 遵循设计系统token
- 实现响应式设计
- 支持深色模式
- 使用合适的颜色对比度
- 实现平滑过渡效果

### 3.4 统一布局要求
- **工具页面**: 统一的工具界面 + 内容区块布局
- **分类页面**: Forbes风格的工具列表展示
- **导航**: 清晰的分类导航和面包屑
- **响应式**: 移动端优先，适配各种屏幕尺寸

---

## 4. 技术开发规范

### 4.1 Next.js最佳实践
- 使用Next.js 15的App Router
- 利用Server Actions提升性能和安全性
- 实现proper error handling (error.tsx, not-found.tsx)
- 使用next-safe-action进行安全的表单提交
- 合理使用'use client'指令优化SSR

### 4.2 TypeScript规范
- 启用strict mode进行严格类型检查
- 使用interface定义对象形状，type定义联合类型
- 充分利用类型推断减少类型注解
- 使用泛型创建可复用组件和函数
- 实现严格的null检查
- 使用类型守卫进行运行时类型检查
- **已优化**: 减少any类型使用，使用unknown替代any，增强类型安全性
- **已实现**: 强类型的JSON内容结构定义和归一化函数

### 4.3 状态管理
- 使用Zustand进行客户端状态管理
- Server Actions处理服务端状态
- 避免不必要的全局状态
- 实现proper error handling

### 4.4 数据管理
- 使用Drizzle ORM进行数据库操作
- 通过migrations管理数据库变更
- 使用环境变量管理配置
- 实现proper validation with Zod

---

## 5. 内容开发流程

### 5.1 工具内容创建流程
1. **关键词研究**: 确定主词+长尾词簇，写入工具JSON
2. **内容规划**: 按SEO模板设计大纲(首屏/主题小节/表格示例/FAQ)
3. **多语言写作**: 本地化写作，非直译，保证内容独立性
4. **元信息生成**: Title/Description/URL/H1按规范生成
5. **质量检查**: 反关键词堆砌、可读性、事实核验、链接检查

### 5.2 JSON数据结构规范
```json
{
  "about": {
    "title": "About This Tool",
    "description": "工具介绍段落，1-2段，自然包含主关键词"
  },
  "features": [
    {
      "title": "功能标题",
      "description": "功能描述，可包含supporting长尾词"
    }
  ],
  "howTo": {
    "title": "How to Use",
    "steps": [
      {
        "title": "步骤标题",
        "description": "步骤描述"
      }
    ],
    "tips": ["使用小贴士"]
  },
  "faq": [
    {
      "q": "常见问题，命中PAA查询",
      "a": "详细回答，2-5行为宜"
    }
  ],
  "relativeLinks": [
    {
      "title": "相关链接标题",
      "url": "/相对路径或绝对URL"
    }
  ]
}
```

### 5.3 内容质量标准
- **E-E-A-T原则**: 体验、专业性、权威性、可信度
- **关键词密度**: 主词8-10次，次要词5-7次，避免堆砌
- **内容长度**: 每个工具页面600-1000词
- **链接策略**: 内链指向相关工具和分类页，外链指向权威来源

---

## 6. 开发工作流程

### 6.1 可用脚本
```bash
pnpm dev          # 启动开发服务器
pnpm build        # 构建生产版本
pnpm lint         # 代码检查
pnpm format       # 代码格式化
pnpm db:generate  # 生成数据库迁移
pnpm db:migrate   # 执行数据库迁移
pnpm db:studio    # 打开数据库管理界面
```

### 6.2 开发流程
1. 使用TypeScript开发所有新代码
2. 遵循Biome格式化规则
3. 在`src/actions/`中编写Server Actions
4. 使用Zustand管理客户端状态
5. 通过Drizzle migrations管理数据库变更
6. 使用Radix UI组件保持UI一致性
7. 遵循既定的目录结构
8. 为新功能编写测试
9. 更新内容集合时同步更新配置

### 6.3 代码质量要求
- 使用函数式组件和Hooks
- 实现proper error handling
- 遵循TypeScript最佳实践
- 使用合适的类型定义
- 为复杂逻辑添加文档注释
- 保持组件小而专注
- 使用合适的命名约定

---

## 7. 性能与技术SEO

### 7.1 Core Web Vitals要求
- **LCP** (Largest Contentful Paint): < 2.5s
- **FID** (First Input Delay): < 100ms
- **CLS** (Cumulative Layout Shift): < 0.1
- 移动端优先优化

### 7.2 技术SEO检查清单
- [ ] 正确的robots.txt和robots meta
- [ ] 自动生成sitemap.xml
- [ ] 实现canonical标签
- [ ] 配置hreflang多语言标记
- [ ] 注入结构化数据(Schema.org)
- [ ] 图片优化(WebP、懒加载、ALT文本)
- [ ] 无4xx/5xx错误
- [ ] Core Web Vitals达标

### 7.3 监测与分析
- 使用Google Search Console监测索引状态
- 通过Google Analytics追踪用户行为
- 监控关键词排名变化
- 定期检查Core Web Vitals指标
- 建立基线并定期对比分析

---

## 8. 质量保证与上线检查

### 8.1 代码审查要求
- 是否遵循TypeScript规范
- 是否实现proper SEO标记
- 是否包含必要的多语言支持
- 是否遵循UI/UX设计规范
- 是否通过accessibility检查

### 8.2 内容审查要求
- 关键词策略是否合理
- 内容是否符合E-E-A-T标准
- 多语言内容是否独立本地化
- 是否避免关键词堆砌
- 链接是否有效且相关

### 8.3 上线前检查清单
- [ ] 关键词与意图映射完善，SERP匹配
- [ ] Title/Description独一无二，含主词，长度合规
- [ ] URL短、含主词、使用连字符
- [ ] H1唯一，H2/H3覆盖topical长尾，ToC可跳转
- [ ] 首屏直答，表格/示例完整，FAQ命中PAA
- [ ] 内链集群互联，外链指向权威来源
- [ ] 图片ALT/压缩/懒加载/WebP优化
- [ ] Schema标记验证通过
- [ ] 多语言hreflang、canonical正确配置
- [ ] 无技术错误，Core Web Vitals达标
- [ ] 监测和转化跟踪就绪

---

## 9. 维护与迭代

### 9.1 定期维护任务
- 每月检查Core Web Vitals指标
- 季度更新关键词策略
- 定期检查链接有效性
- 更新过时的内容和数据
- 监控竞争对手变化

### 9.2 持续优化方向
1. 标题和首屏内容优化
2. H2/H3小节和目录结构调整
3. 内链和FAQ内容完善
4. Schema和媒体内容优化

### 9.3 团队协作
- 使用统一的开发规范
- 定期进行代码和内容审查
- 建立问题反馈和解决机制
- 保持技术栈和依赖的更新

---

## 10. 最近完成的优化 (2024年12月)

### 10.1 代码组织和清理
- **类型安全优化**: 将tools.ts中的any类型替换为unknown，增强类型安全性
- **JSON内容归一化**: 创建强类型的JSON内容结构定义(json-content.ts)
- **归一化函数优化**: 使用类型守卫确保JSON数据安全转换
- **测试文件修复**: 修复conversion-engine.test.ts中的导入路径错误
- **调试代码清理**: 移除not-found.tsx中的console.log调试语句
- **TypeScript检查**: 确保所有代码通过严格类型检查

### 10.2 多语言切换功能
- **语言切换组件**: 启用header中的LanguageToggle组件
- **翻译导航**: 更新导航菜单使用翻译文本而非硬编码
- **语言管理**: 完整的语言偏好存储和浏览器检测
- **UI优化**: 语言完成度显示和自动检测指示器
- **路由处理**: 正确的多语言路由切换逻辑

### 10.3 类型定义增强
- **新增类型文件**: json-content.ts定义富JSON内容结构
- **类型守卫**: 实现运行时类型安全检查函数
- **归一化工具**: normalize-tool-content.ts支持新旧JSON格式
- **向后兼容**: 保持对现有JSON结构的支持
- **错误处理**: 增强JSON解析的错误处理能力

---

## 11. 工具与资源

### 10.1 开发工具
- **包管理器**: pnpm (默认)
- **代码格式化**: Biome
- **类型检查**: TypeScript strict mode
- **数据库**: Drizzle ORM + Studio
- **部署**: 根据项目配置

### 10.2 SEO工具
- Google Search Console
- Google Analytics
- Ahrefs/SEMrush (关键词研究)
- PageSpeed Insights (性能检测)
- Schema.org Validator (结构化数据验证)

### 10.3 设计资源
- Radix UI组件库
- Tailwind CSS文档
- Figma设计系统(如有)
- 无障碍访问指南(WCAG)

---

**注意**: 本规范文档应定期更新，确保与项目发展和最佳实践保持同步。所有团队成员都应熟悉并遵循这些规范。
