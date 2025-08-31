# InterConverter 多语言 SEO 重构总纲（seo.md）

本纲要基于 Ahrefs 权威实践与项目现状，指导你对全站执行“多语言 + 单页主词/长尾策略 + 技术 SEO”的系统性重构。

参考来源：
- Ahrefs SEO Guide: https://ahrefs.com/seo
- SEO Basics: https://ahrefs.com/blog/seo-basics/
- On-Page SEO: https://ahrefs.com/blog/on-page-seo/
- Technical SEO: https://ahrefs.com/blog/technical-seo/
- Link Building: https://ahrefs.com/blog/link-building/
- Keyword Research: https://ahrefs.com/blog/keyword-research/
- What Are Keywords?: https://ahrefs.com/blog/what-are-keywords/
- Long-tail Keywords: https://ahrefs.com/blog/long-tail-keywords/

---

## 1. 目标（Objectives）
- 提升主关键词与长尾关键词的整体可见度与转化。
- 建立标准化的多语言内容生产、上架与监测流程。
- 用技术 SEO 确保可抓取、可索引、可理解，并适配 AI/LLM 抓取。

关键结果（建议量化）
- 90 天内：目标工具类关键词 Top10 覆盖率 ≥ 40%；核心工具页 CTR 提升 ≥ 15%。
- 180 天内：核心类目落地页自然流量翻倍，目标查询的 SOV 提升 ≥ 30%。

---

## 2. 信息架构与数据来源
- 单页模型：每个工具一个落地页，统一覆盖“主关键词 + 长尾关键词簇（Supporting/Topical）”。
- 多语言内容来源：遵循“方案A”——每个工具维护独立 JSON（`src/data/tools/<category>/<tool>-en.json` 与 `-zh.json`）。
- 页面优先从工具 JSON 读取 About/HowToUse/Features/FAQ，缺失时回退全局配置。

目录/路由约定（Next.js App Router）
- 页面路径：`src/app/[locale]/<tool>/page.tsx`
- 全局布局：`src/app/[locale]/layout.tsx`
- 站点级配置：`src/config/*`（设计系统、模板、关键词策略等）

---

## 3. 关键词策略（Primary + Long-tail Cluster）
- 主关键词（Primary KW）：在标题、H1、URL、首屏摘要中出现；严格匹配 SERP 意图。
- 长尾关键词两类（Ahrefs）：
  - Supporting long‑tail：与主词高度相近，穿插于小节标题、首段、表格、图片 ALT、FAQ。
  - Topical long‑tail：可形成独立信息单元，使用 H2/H3 小节提供深入答案。
- 选词衡量：Search Volume、Traffic Potential、Keyword Difficulty、CPC、意图、趋势、Business Potential；结合竞争页对比。
- 产出物：`keyword-map.json`（可放入每工具 JSON 中），字段包含：primary、matchingTerms、relatedTerms、supportingLongtails[]、topicalLongtails[]、intent、targetSections[]。

---

## 4. 单页内容模板（适配所有工具）
建议模块顺序（均需多语言）：
1) Title（含主词 + 卖点或自然语言，≤ 60–65 字符）
2) Meta Description（≤ 150–160 字符，含主词与关键卖点）
3) H1（仅 1 个，含主词）
4) 首屏 Answer/使用区：
   - 工具即用/核心结论；自然出现主词与 1–2 个 supporting 长尾。
   - 提供清晰 CTA（如“开始转换”）。
5) 目录（ToC）：锚点链接至下列 H2/H3 小节。
6) H2/H3 小节（覆盖 topical 长尾）：
   - 使用步骤/示例/边界/注意事项/常见错误
   - 对比表格与结构化要点（自然覆盖 supporting 长尾）
7) FAQ（覆盖 PAA/零点击查询）：每问命中一个长尾或变体。
8) 相关工具/类目内链：主题集群互链。
9) 权威外链：引用标准/说明文档。
10) 结构化数据（Schema）：`Article/HowTo/FAQ/SoftwareApplication` 等类型按需注入。

---

### 4.1 模块规范（About / Features / HowTo / FAQ / RelativeLink）

- __About（关于/简介）__
  - 作用：首屏下的简要介绍，强化意图匹配与独特卖点，可自然覆盖主词与 1–2 个 supporting 长尾。
  - 内容：1–2 段精炼文字，允许插入要点列表与示例链接。
  - SEO：首段尽量含主词；避免堆砌。

- __Features（功能/亮点）__
  - 作用：以要点列出核心功能、优势及差异化价值。
  - 内容：3–8 个要点，每点 1–2 句，可包含 supporting 长尾或相关术语。
  - SEO：结构化要点利于可读性与 LLM 摘要；避免重复同义堆叠。

- __HowTo（使用方法/步骤）__
  - 作用：以步骤形式指导使用工具，适合映射为 `HowTo` schema。
  - 内容：3–7 步，每步包含简述与可选截图/图标；可加入“注意/小贴士”。
  - SEO：步骤标题可自然融入支撑型长尾；首步覆盖主意图。

- __FAQ（常见问题）__
  - 作用：命中 PAA/零点击问题与主题型长尾的补充意图。
  - 内容：5–10 组问答；每答 2–5 行为宜，必要时链接到相关小节。
  - SEO：映射 `FAQPage` schema；问句清晰直接，避免多问题合并成一问。

- __RelativeLink（相关链接/相对内链）__
  - 作用：引导用户探索同类工具、热门转换对、上级类目页；承接/分发权重。
  - 内容：4–12 条；每条含标题、描述（可选）、URL（站内为相对路径）。
  - SEO：优先同主题集群页；锚文本描述性、自然。

### 4.2 JSON 字段与数据结构（方案A）

建议在每工具 JSON 中新增以下字段（各语言各自维护）：

```json
{
  "about": {
    "title": "About This Tool",
    "description": "One or two paragraphs introducing what the tool does and who it's for."
  },
  "features": [
    { "title": "Accurate Conversion", "description": "High-precision engine with up-to-date datasets." },
    { "title": "Multi‑Language", "description": "Fully localized UI and content for EN/ZH." }
  ],
  "howTo": {
    "title": "How to Use",
    "steps": [
      { "title": "Select units", "description": "Choose source and target units from the dropdowns." },
      { "title": "Enter value", "description": "Type the number you want to convert." },
      { "title": "Get result", "description": "Result updates instantly with precision options." }
    ],
    "tips": [
      "You can copy the output in one click.",
      "Use keyboard to switch focus quickly."
    ]
  },
  "faq": [
    { "q": "Is this converter accurate?", "a": "Yes, we validate formulas and sync reference datasets regularly." },
    { "q": "Do you support offline?", "a": "Core conversion works client‑side; some datasets require network." }
  ],
  "relativeLinks": [
    { "title": "Category Page", "url": "/en/finance" },
    { "title": "Related Tool: Loan Calculator", "url": "/en/finance/loan-calculator" }
  ]
}
```

命名注意：
- `about.title/description`、`features[].title/description`、`howTo.title/steps[].title/description/tips[]`、`faq[].q/a`、`relativeLinks[].title/url`
- 各语言 JSON（`-en.json` / `-zh.json`）数目可不同，但结构尽量一致；缺失字段允许回退到全局默认。

### 4.3 组件接入约定（Next.js）

- __数据读取__：在 `page.tsx` 以工具标识加载对应语言 JSON，透传至 UI 组件。
- __组件建议__：
  - `AboutSection` → 渲染 `about`（标题可选）。
  - `FeaturesSection` → 列表渲染 `features[]`。
  - `HowToSection` → 渲染 `howTo.title/steps/tips`，并输出 `HowTo` JSON‑LD。
  - `FaqSection` → 渲染 `faq[]`，并输出 `FAQPage` JSON‑LD。
  - `RelativeLinks` → 渲染 `relativeLinks[]`，优先相对路径；对外部链接加 `rel`。
- __Schema 注入__：通过 `JsonLd` 组件集中输出，避免多处重复；与 `generateMetadata()` 一并考虑。
- __内链策略__：`relativeLinks` 默认包含：同类热门工具、互补工具、上级类目页、首页。


## 5. 页面 SEO 规范（On‑Page）
- 标题/描述：唯一、含主词、具点击吸引力；避免堆砌。
- URL：短、小写、连字符、含主词；避免冗余参数。
- 标题层级：1 个 H1；H2/H3 清晰分层；长尾合理入题。
- 内链：将权重导向核心与转化页；锚文本描述性。
- 外链：指向权威来源；必要时设置 `rel` 属性。
- 图片：语义化文件名；ALT 文本覆盖 supporting 长尾；压缩/懒加载/WebP。
- 零点击优化：简明“直接回答”区块 + 细化说明，争取特色摘要/PAA。

---

## 6. 技术 SEO（Technical）
- 可抓取/索引：
  - 正确的 `robots.txt` 与 robots meta；关键 JS/CSS 不屏蔽。
  - Sitemap：自动生成并在 GSC 提交；多语言版本带 `hreflang` 注释。
- 规范化（Canonical）：
  - 每语言页面的 canonical 指向本语言权威 URL；避免跨语言误指。
  - 重复/参数/分页场景设置规范。
- 国际化（多语言）
  - URL：`/[locale]/...` 唯一语言路径。
  - `hreflang`：各语言互指；设置 `x-default`（全局英文或默认语言）。
  - 各语言的 Title/Description/H1/FAQ/Schema 独立本地化（非直译堆砌）。
- 结构化数据与 AI/LLM 可见性：
  - 使用 `Article/HowTo/FAQ/SoftwareApplication` 视内容类型注入。
  - 语义化 HTML、清晰层级、可读锚文本；避免关键内容仅由前端注入导致不可抓取。
- 性能与体验：
  - Core Web Vitals：LCP/TBT/CLS 过线；移动端优先。
  - 懒加载、分包、缓存；可访问性（a11y）达标。

---

## 7. Next.js 实施要点（结合本仓库）
- 动态元数据：在 `src/app/[locale]/<tool>/page.tsx` 通过 `generateMetadata()` 读取该工具 JSON，生成 Title/Description/canonical/hreflang。
- hreflang：在根 `layout.tsx` 或工具页面统一注入 `<link rel="alternate" hreflang="..." href="..." />`；含 `x-default`。
- canonical：每语言自指 canonical；多语言彼此通过 `hreflang` 互联。
- Schema：封装组件注入 JSON‑LD（按 Article/HowTo/FAQ/SoftwareApplication）。
- Sitemap：统一在 `src/app/sitemap.ts`/`robots.ts` 生成；构建多语言 URL 与 `hreflang` 注释。
- ToC/FAQ 组件：
  - ToC 自动根据 H2/H3 生成锚点（或从 JSON 明确列出）。
  - FAQ 从 JSON 读取，映射到页面与 FAQPage schema。

---

## 8. 内容生产流程（多语言 JSON 驱动）
1) 关键词研究：输出主词 + 长尾簇与意图映射；写入工具 JSON。
2) 大纲设计：按 4 节模板（首屏答复/主题小节/表格与示例/FAQ）。
3) 写作：E‑E‑A‑T 明示（作者/来源/资质），自然覆盖关键词簇。
4) 元信息：Title/Description/URL/H1 按规范生成。
5) 多语言：本地化写作，非直译；保证不同语言内容的独立性与可读性。
6) 校对：反堆砌、可读性、事实核验、引用链接。

---

## 9. 内链与外链（Authority）
- 内链：主题集群（pillar/cluster）互链；相关工具互链；类目页汇总。
- 外链：权威数据/标准；客座/合作/可链资产（工具、数据研究、模板）。
- 风险控制：谨慎购买链接，拒绝低质网络。

---

## 10. 监测与评估（Measurement）
- 指标：
  - 流量：自然点击/展现（GSC）、会话与转化（Analytics）。
  - 排名：核心主词与长尾 SOV/排名分布。
  - 行为：滚动、停留、点击热图、交互率。
  - 技术：索引覆盖、抓取错误、Core Web Vitals。
  - AI 可见度（可选）：被 AI/LLM 摘要/引用的覆盖。
- 基线：每次发布前记录页面基线；对比 2/4/8 周周期变化。
- 迭代：
  1) 标题/首屏
  2) H2/H3 小节与 ToC
  3) 内链/FAQ
  4) Schema/媒体优化

---

## 11. 上线检查清单（Launch Checklist）
- 关键词与意图：主词 + 长尾映射完善；SERP 匹配。
- 元数据：Title/Description 独一无二，含主词，长度合规。
- URL：短、含主词、连字符。
- 结构：H1 唯一；H2/H3 覆盖 topical 长尾；ToC 可跳转。
- 内容：首屏直答；表格/示例/边界；FAQ 命中 PAA。
- 内/外链：集群互链；权威外链；可追踪。
- 图片：ALT/压缩/懒加载/WebP；尺寸合理。
- Schema：Article/FAQ/HowTo/SoftwareApplication 校验通过。
- 国际化：`hreflang`、`x-default`、canonical 正确；各语言内容独立。
- 技术：无 4xx/5xx、重定向链；Core Web Vitals 过线；Sitemap/GSC 提交。
- 监测：基线记录、事件与转化跟踪就绪。

---