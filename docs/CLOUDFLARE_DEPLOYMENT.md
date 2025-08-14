# Cloudflare Pages 部署指南

## 项目概述

InterConverter 项目已经配置好了 Cloudflare Pages 部署所需的所有文件和配置。

## 当前配置状态

### ✅ 已配置的文件

1. **package.json** - 包含 Cloudflare 构建脚本
2. **wrangler.toml** - Cloudflare Pages 配置
3. **next.config.mjs** - Next.js 优化配置
4. **.env.local** - 环境变量示例

### 📦 依赖项

项目已安装必要的 Cloudflare 依赖：
- `@cloudflare/next-on-pages`: ^1.13.5
- `wrangler`: ^3.78.12

### ⚠️ 重要说明

由于项目使用了一些与 Edge Runtime 不兼容的组件，建议使用以下两种部署方式之一：

1. **推荐方式**: 通过 Cloudflare Dashboard 部署（自动处理兼容性）
2. **备选方式**: 使用静态导出（需要额外配置）

## 部署方法

### 方法一：通过 Cloudflare Dashboard（推荐）

#### 1. 准备代码仓库
```bash
# 确保代码已推送到 Git 仓库（GitHub/GitLab）
git add .
git commit -m "Ready for Cloudflare deployment"
git push origin main
```

#### 2. 在 Cloudflare Dashboard 创建项目
1. 登录 [Cloudflare Dashboard](https://dash.cloudflare.com)
2. 进入 **Pages** 部分
3. 点击 **Create a project**
4. 选择 **Connect to Git**
5. 选择您的 Git 仓库

#### 3. 配置构建设置
```
Framework preset: Next.js (Static HTML Export)
Build command: npm run build:cloudflare
Build output directory: out
Root directory: (留空)
Node.js version: 18
```

#### 4. 设置环境变量
在 Cloudflare Pages 项目设置中添加：
```
NODE_ENV=production
NEXT_PUBLIC_SITE_URL=https://your-domain.pages.dev
NEXT_PUBLIC_APP_NAME=InterConverter
NEXT_PUBLIC_DEFAULT_LOCALE=en
NEXT_PUBLIC_WEB_URL=https://your-domain.pages.dev
```

### 方法二：通过 Wrangler CLI

#### 1. 安装 Wrangler CLI
```bash
npm install -g wrangler
```

#### 2. 登录 Cloudflare
```bash
wrangler login
```

#### 3. 构建项目
```bash
npm run build:cloudflare
```

#### 4. 部署到 Pages
```bash
wrangler pages deploy .vercel/output/static --project-name=interConverter
```

## 构建脚本说明

### `npm run build:cloudflare`
```bash
next build && npx @cloudflare/next-on-pages
```

这个脚本会：
1. 运行 Next.js 构建
2. 使用 `@cloudflare/next-on-pages` 转换输出为 Cloudflare Pages 兼容格式

### `npm run preview`
```bash
npm run build:cloudflare && wrangler pages dev .vercel/output/static
```

本地预览 Cloudflare Pages 环境。

## 配置文件详解

### wrangler.toml 配置

```toml
name = "inter-converter"
compatibility_date = "2024-08-14"
compatibility_flags = ["nodejs_compat"]

[env.production]
name = "inter-converter"

[env.preview]
name = "inter-converter-preview"

pages_build_output_dir = ".next"
```

**关键配置说明：**
- `nodejs_compat`: 启用 Node.js 兼容性
- `pages_build_output_dir`: 构建输出目录
- 环境配置：生产和预览环境

### 安全头配置

项目已配置安全头：
- `X-Frame-Options: DENY`
- `X-Content-Type-Options: nosniff`
- `X-XSS-Protection: 1; mode=block`
- `Referrer-Policy: strict-origin-when-cross-origin`

### 缓存配置

- 静态资源：1年缓存
- 图标文件：1年缓存
- Manifest：1天缓存

## 域名配置

### 自定义域名设置

1. 在 Cloudflare Pages 项目中点击 **Custom domains**
2. 添加您的域名（如：interconverter.com）
3. 按照提示配置 DNS 记录

### DNS 配置示例
```
Type: CNAME
Name: @
Target: inter-converter.pages.dev
```

## 环境变量

### 生产环境变量
在 Cloudflare Pages 设置中配置：

```
NODE_ENV=production
NEXT_PUBLIC_SITE_URL=https://interconverter.com
NEXT_PUBLIC_APP_NAME=InterConverter
NEXT_PUBLIC_DEFAULT_LOCALE=en
NEXT_PUBLIC_WEB_URL=https://interconverter.com
```

## 性能优化

### 已启用的优化

1. **图片优化**: WebP/AVIF 格式
2. **包优化**: Lucide React 和 Radix UI 优化导入
3. **压缩**: Gzip 压缩启用
4. **缓存**: 静态资源长期缓存
5. **Bundle 分析**: 可通过 `npm run analyze` 分析

### Cloudflare 特有优化

- **Edge 缓存**: 全球 CDN 加速
- **Brotli 压缩**: 自动启用
- **HTTP/3**: 自动支持
- **图片优化**: Cloudflare Polish

## 监控和分析

### 可用的监控工具

1. **Cloudflare Analytics**: 访问统计
2. **Web Vitals**: 性能监控
3. **Real User Monitoring**: 用户体验监控

### 日志查看
```bash
wrangler pages deployment tail --project-name=inter-converter
```

## 故障排除

### 常见问题

1. **构建失败**
   - 检查 Node.js 版本（推荐 18+）
   - 确保所有依赖已安装

2. **路由问题**
   - 检查 `next.config.mjs` 中的路由配置
   - 确认 i18n 路由设置正确

3. **环境变量问题**
   - 确保所有必需的环境变量已设置
   - 检查变量名拼写

### 调试命令
```bash
# 本地预览
npm run preview

# 检查构建输出
npm run build:cloudflare

# 查看部署日志
wrangler pages deployment list --project-name=inter-converter
```

## 部署检查清单

- [ ] 代码已推送到 Git 仓库
- [ ] 环境变量已配置
- [ ] 构建脚本测试通过
- [ ] 域名 DNS 已配置
- [ ] SSL 证书已生效
- [ ] 404 页面正常工作
- [ ] SEO 元标签正确
- [ ] 性能测试通过

## 下一步

部署完成后：
1. 测试所有功能
2. 配置监控和分析
3. 设置自动部署
4. 优化性能指标
5. 配置备份策略

您的 InterConverter 项目已经完全准备好部署到 Cloudflare Pages！
