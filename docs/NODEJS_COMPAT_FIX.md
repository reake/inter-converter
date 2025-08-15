# 🔧 Node.js 兼容性错误修复指南

## 错误信息

```
Node.JS Compatibility Error
no nodejs_compat compatibility flag set
```

## 问题原因

当通过 Cloudflare Dashboard 部署时，`wrangler.toml` 中的兼容性标志可能不会自动应用到 Pages 项目。需要在 Dashboard 中手动设置。

## 解决方案

### 方法一：在 Cloudflare Dashboard 中设置兼容性标志

#### 步骤 1：访问项目设置
1. 登录 [Cloudflare Dashboard](https://dash.cloudflare.com)
2. 进入 **Pages** 部分
3. 选择您的 `inter-converter` 项目
4. 点击 **Settings** 标签

#### 步骤 2：设置兼容性标志
1. 在左侧菜单中找到 **Functions**
2. 点击 **Compatibility Flags**
3. 添加以下标志：
   ```
   nodejs_compat
   ```
4. 设置兼容性日期：
   ```
   2024-08-14
   ```

#### 步骤 3：重新部署
1. 返回 **Deployments** 标签
2. 点击 **Retry deployment** 或触发新的部署

### 方法二：使用 Wrangler CLI 部署（推荐）

这种方法会自动应用 `wrangler.toml` 中的设置：

```bash
# 确保已登录
wrangler login

# 构建项目
npm run build:cloudflare

# 部署到 Cloudflare Pages
wrangler pages deploy .vercel/output/static --project-name=inter-converter --compatibility-date=2024-08-14 --compatibility-flags=nodejs_compat
```

### 方法三：创建 Pages 项目时设置

如果是新项目，可以在创建时设置：

```bash
# 创建新的 Pages 项目并设置兼容性
wrangler pages project create inter-converter --compatibility-date=2024-08-14 --compatibility-flags=nodejs_compat

# 然后部署
wrangler pages deploy .vercel/output/static --project-name=inter-converter
```

## 验证修复

### 1. 检查兼容性设置

在 Cloudflare Dashboard 中：
1. 进入项目 → Settings → Functions
2. 确认看到：
   - **Compatibility Date**: `2024-08-14`
   - **Compatibility Flags**: `nodejs_compat`

### 2. 测试部署

重新部署后，访问您的网站应该不再看到兼容性错误。

## 环境变量设置

同时确保在 Cloudflare Pages 中设置了正确的环境变量：

### 生产环境变量
```
NODE_ENV=production
NEXT_PUBLIC_SITE_URL=https://your-domain.pages.dev
NEXT_PUBLIC_APP_NAME=InterConverter
NEXT_PUBLIC_DEFAULT_LOCALE=en
NEXT_PUBLIC_WEB_URL=https://your-domain.pages.dev
```

### 设置步骤
1. 在项目 Settings 中找到 **Environment variables**
2. 分别为 **Production** 和 **Preview** 环境添加上述变量

## 常见问题

### Q: 为什么 wrangler.toml 中的设置没有生效？
**A**: Cloudflare Pages Dashboard 部署和 Wrangler CLI 部署使用不同的配置方式。Dashboard 部署需要在界面中手动设置。

### Q: 兼容性日期应该设置为什么？
**A**: 建议使用 `2024-08-14`，这是一个稳定的兼容性日期。

### Q: 还有其他需要的兼容性标志吗？
**A**: 对于 Next.js 项目，通常只需要 `nodejs_compat`。如果遇到其他问题，可以考虑添加：
- `streams_enable_constructors`
- `transformstream_enable_standard_constructor`

## 推荐的部署流程

为了避免兼容性问题，建议使用以下流程：

### 1. 使用 Wrangler CLI 部署
```bash
# 一次性设置，包含所有必要的兼容性标志
wrangler pages deploy .vercel/output/static \
  --project-name=inter-converter \
  --compatibility-date=2024-08-14 \
  --compatibility-flags=nodejs_compat
```

### 2. 设置自动部署
如果您想使用 Git 集成自动部署：
1. 先用 Wrangler CLI 创建项目并设置兼容性
2. 然后在 Dashboard 中连接 Git 仓库
3. 兼容性设置会保留

## 验证清单

部署后检查以下项目：

- [ ] 网站可以正常访问
- [ ] 没有 Node.js 兼容性错误
- [ ] 所有工具页面正常工作
- [ ] 导航功能正常
- [ ] 搜索功能正常
- [ ] 404 页面正常显示

## 总结

Node.js 兼容性错误主要是由于 Cloudflare Pages 没有正确应用兼容性标志导致的。通过在 Dashboard 中手动设置或使用 Wrangler CLI 部署可以解决这个问题。

推荐使用 **Wrangler CLI 部署**，因为它会自动应用 `wrangler.toml` 中的所有设置。
