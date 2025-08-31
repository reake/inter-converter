# 多语言SEO重构执行清单

## 快速执行流程

### 1. 准备阶段 (5分钟)
- [ ] 确认目标类别和工具列表
- [ ] 检查现有页面结构
- [ ] 创建类别目录：`mkdir -p src/data/tools/{category}`

### 2. JSON内容创建 (每个工具15分钟)
- [ ] 创建 `{tool-id}-en.json` (英文内容)
- [ ] 创建 `{tool-id}-zh.json` (中文内容)  
- [ ] 更新 `{category}.json` (英文目录)
- [ ] 更新 `{category}-zh.json` (中文目录)

### 3. 页面重构 (批量处理)
- [ ] 使用批量重构脚本：`node scripts/refactor-{category}-pages.js`
- [ ] 修复组件导入：`node scripts/fix-component-imports.js`
- [ ] 验证构建：`npm run build`

### 4. 质量检查
- [ ] 内容字数：600-1000词
- [ ] 关键词密度：主要1.5%-2%，次要1%
- [ ] SEO标签：canonical、hreflang、OpenGraph
- [ ] 多语言测试：`pnpm dev` 检查中英文页面

## JSON内容模板

### 工具内容文件
```json
{
  "about": ["段落1(150词)", "段落2(100词)"],
  "howToUse": ["步骤1", "步骤2", "步骤3", "步骤4"],
  "features": ["功能1", "功能2", "功能3", "功能4", "功能5"],
  "faqs": [
    {"question": "问题1", "answer": "回答1"},
    {"question": "问题2", "answer": "回答2"}
  ]
}
```

### 目录文件
```json
[
  {
    "id": "tool-id",
    "name": "工具名称",
    "description": "SEO描述(包含关键词)",
    "keywords": ["主要关键词", "次要关键词"],
    "titleSuffix": "SEO标题后缀"
  }
]
```

## 已完成类别参考

✅ **Finance** (6工具) - currency-converter, loan-calculator...  
✅ **Time** (10工具) - world-clock, age-calculator...  
✅ **Unit** (19工具) - area-converter, temperature-converter...  
✅ **Media** (2工具) - jpg-to-png-converter, pdf-to-word-converter...  

## 验证命令

```bash
# 构建验证
npm run build

# 开发测试  
pnpm dev

# 访问测试页面
http://localhost:3000/{category}/{tool-id}
http://localhost:3000/zh/{category}/{tool-id}
```

## 常见问题解决

**组件导入错误**: 运行 `scripts/fix-component-imports.js`  
**JSON格式错误**: 检查逗号和引号  
**构建失败**: 检查组件路径和导入方式  
**SEO标签缺失**: 确认titleSuffix字段存在  

---
**预计时间**: 每个类别2-4小时（取决于工具数量）
