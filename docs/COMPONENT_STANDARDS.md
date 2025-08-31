# 工具组件标准化指南

## 概述

本指南定义了 interconverter.com 项目中所有工具组件的统一标准，确保多语言支持、布局规范和SEO优化的一致性。

## 1. 多语言支持标准

### 1.1 组件接口规范
```typescript
interface ToolConverterProps {
  lang?: string;
}

export default function ToolConverter({ lang = 'en' }: ToolConverterProps) {
  const { t } = useTranslation(lang);
  // ...
}
```

### 1.2 翻译系统使用
- **统一使用** `useTranslation` hook，避免混用 `useTranslations`
- **默认语言**: 英文 (`'en'`)
- **支持语言**: 英文、中文，后续扩展更多语言
- **翻译键命名**: 使用驼峰命名法，结构化组织

### 1.3 翻译内容结构
```typescript
// 在 translations.ts 中定义
toolName: {
  title: string;
  description: string;
  enterValue: string;
  conversionNote: string;
  // ... 其他特定字段
}
```

## 2. 布局规范标准

### 2.1 页面结构
```tsx
<div className="max-w-4xl mx-auto p-6">
  {/* 页面标题和描述 */}
  <div className="text-center mb-8">
    <h1 className="text-3xl font-bold mb-4">{t.toolName.title}</h1>
    <p className="text-gray-600 max-w-2xl mx-auto">
      {t.toolName.description}
    </p>
  </div>

  {/* 主要内容区域 */}
  <Tabs defaultValue="converter" className="space-y-6">
    <TabsList className="grid w-full grid-cols-4">
      <TabsTrigger value="converter">{t.converter}</TabsTrigger>
      <TabsTrigger value="common">{t.commonValues}</TabsTrigger>
      <TabsTrigger value="formula">{t.formula}</TabsTrigger>
      <TabsTrigger value="guide">{t.guide}</TabsTrigger>
    </TabsList>
    
    {/* 转换器内容 */}
    <TabsContent value="converter">
      <div className="grid md:grid-cols-2 gap-6">
        {/* 输入和输出卡片 */}
      </div>
    </TabsContent>
  </Tabs>
</div>
```

### 2.2 卡片组件规范
```tsx
<Card>
  <CardHeader>
    <CardTitle className="flex items-center gap-2">
      {emoji} {t.unitName}
    </CardTitle>
  </CardHeader>
  <CardContent>
    <div className="space-y-4">
      <div>
        <Label htmlFor="input">{t.unitLabel}</Label>
        <Input
          id="input"
          type="number"
          value={value}
          onChange={handleChange}
          placeholder={t.enterValue}
          className="text-lg"
        />
      </div>
      <div className="text-center p-4 bg-blue-50 rounded-lg">
        <div className="text-3xl font-bold text-blue-600">
          {value} {unit}
        </div>
        <div className="text-sm text-gray-600">{t.unitName}</div>
      </div>
    </div>
  </CardContent>
</Card>
```

### 2.3 转换说明
- 在转换器下方添加转换公式说明
- 使用灰色小字体显示
- 居中对齐

```tsx
<div className="text-center text-sm text-gray-500 mt-4">
  {t.toolName.conversionNote}
</div>
```

## 3. SEO优化标准

### 3.1 页面元数据
- 每个工具页面必须有独立的SEO元数据
- 支持多语言的标题、描述和关键词
- 使用 `ToolLayout` 组件统一管理SEO

### 3.2 结构化数据
- 使用 JSON-LD 格式
- 包含工具名称、描述、类别等信息
- 符合 Google 结构化数据规范

### 3.3 语义化HTML
- 正确使用 `<h1>`, `<h2>` 等标题标签
- 使用语义化的 `<label>` 和 `<input>` 关联
- 合理的页面结构层次

## 4. 用户体验标准

### 4.1 交互设计
- 实时转换，无需点击按钮
- 输入验证和错误处理
- 清晰的视觉反馈

### 4.2 响应式设计
- 移动端友好的布局
- 使用 Tailwind CSS 响应式类
- `md:grid-cols-2` 等断点设计

### 4.3 可访问性
- 正确的 ARIA 标签
- 键盘导航支持
- 颜色对比度符合标准

## 5. 代码质量标准

### 5.1 TypeScript 类型安全
- 所有组件必须有类型定义
- Props 接口明确定义
- 避免 `any` 类型

### 5.2 性能优化
- 使用 `useCallback` 和 `useMemo` 优化渲染
- 避免不必要的重渲染
- 合理的状态管理

### 5.3 代码组织
- 统一的导入顺序
- 清晰的函数命名
- 适当的注释说明

## 6. 测试标准

### 6.1 单元测试
- 转换函数的准确性测试
- 边界值测试
- 错误处理测试

### 6.2 集成测试
- 多语言切换测试
- 用户交互流程测试
- SEO元数据验证

## 7. 部署和维护

### 7.1 版本控制
- 遵循语义化版本控制
- 清晰的提交信息
- 功能分支开发

### 7.2 文档维护
- 及时更新组件文档
- API 变更记录
- 使用示例更新

## 8. 最佳实践示例

参考已完成的组件：
- `PoundsToKgConverter`
- `CelsiusToFahrenheitConverter`
- `FeetToMetersConverter`
- `InchesToCmConverter`
- `RgbToHexConverter`

这些组件已按照本标准实现，可作为开发新组件的参考模板。

## 9. 常见问题解决

### 9.1 TypeScript 错误
- 确保翻译接口定义完整
- 检查组件 Props 类型定义
- 验证导入路径正确性

### 9.2 多语言问题
- 确认翻译键存在于所有语言中
- 检查 `useTranslation` hook 使用正确
- 验证默认语言回退机制

### 9.3 布局问题
- 使用统一的 Tailwind CSS 类
- 确保响应式设计正确
- 测试不同屏幕尺寸

---

遵循本标准可确保所有工具组件的一致性、可维护性和用户体验质量。
