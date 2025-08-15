# 🚀 Cloudflare Workers Static Assets 部署指南

## 概述

基于您学习的 [Cloudflare Workers Static Assets 文档](https://developers.cloudflare.com/workers/static-assets/)，我们可以使用 Static Assets 功能来部署您的 InterConverter 项目。这种方法比 Cloudflare Pages 更灵活，可以避免 Node.js 兼容性问题。

## Static Assets vs Pages 对比

### ✅ **Static Assets 优势**
- **更好的兼容性**: 避免 Node.js 兼容性警告
- **更灵活的路由**: 可以自定义路由逻辑
- **统一部署**: Worker 代码和静态资源一起部署
- **更好的控制**: 可以在 Worker 中处理请求逻辑

### ⚠️ **Pages 限制**
- Node.js 兼容性警告
- 路由配置相对固定
- Edge Runtime 配置复杂

## 配置 Static Assets

### 1. 更新 wrangler.toml

```toml
name = "inter-converter"
compatibility_date = "2024-08-14"
compatibility_flags = ["nodejs_compat"]

# Static Assets 配置
[assets]
directory = "out"  # Next.js 静态导出目录
binding = "ASSETS"
not_found_handling = "single-page-application"
run_worker_first = ["/api/*"]  # API 路由优先使用 Worker

# 环境变量
[vars]
NODE_ENV = "production"
NEXT_PUBLIC_SITE_URL = "https://inter-converter.your-domain.workers.dev"
NEXT_PUBLIC_APP_NAME = "InterConverter"
NEXT_PUBLIC_DEFAULT_LOCALE = "en"
```

### 2. 创建 Worker 脚本

创建 `src/worker.js`:

```javascript
export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    
    // API 路由处理
    if (url.pathname.startsWith('/api/')) {
      return new Response(
        JSON.stringify({ 
          message: 'API endpoint',
          path: url.pathname 
        }), 
        {
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }
    
    // 静态资源处理
    return env.ASSETS.fetch(request);
  },
};
```

### 3. 更新 Next.js 配置

更新 `next.config.mjs` 以支持静态导出：

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  
  // 静态导出配置
  output: 'export',
  trailingSlash: true,
  skipTrailingSlashRedirect: true,
  images: {
    unoptimized: true,
  },
  
  // 性能优化
  experimental: {
    optimizePackageImports: ['lucide-react', '@radix-ui/react-icons'],
  },
  
  // 其他配置...
};

export default nextConfig;
```

### 4. 更新 package.json 脚本

```json
{
  "scripts": {
    "build:static": "next build",
    "deploy:workers": "npm run build:static && wrangler deploy",
    "preview:workers": "npm run build:static && wrangler dev"
  }
}
```

## 部署步骤

### 方法一：直接部署

```bash
# 1. 构建静态文件
npm run build:static

# 2. 部署到 Cloudflare Workers
wrangler deploy
```

### 方法二：预览测试

```bash
# 本地预览
npm run preview:workers
```

## 高级配置

### 1. 自定义路由处理

```javascript
// src/worker.js
export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    
    // 自定义重定向
    if (url.pathname === '/old-path') {
      return Response.redirect(`${url.origin}/new-path`, 301);
    }
    
    // API 路由
    if (url.pathname.startsWith('/api/')) {
      return handleAPI(request, env);
    }
    
    // 静态资源
    const response = await env.ASSETS.fetch(request);
    
    // 添加自定义头部
    const newResponse = new Response(response.body, response);
    newResponse.headers.set('X-Custom-Header', 'InterConverter');
    
    return newResponse;
  },
};

async function handleAPI(request, env) {
  const url = new URL(request.url);
  
  // 示例：货币转换 API
  if (url.pathname === '/api/currency') {
    return new Response(
      JSON.stringify({
        rates: { USD: 1, EUR: 0.85, GBP: 0.73 }
      }),
      { headers: { 'Content-Type': 'application/json' } }
    );
  }
  
  return new Response('API Not Found', { status: 404 });
}
```

### 2. 环境变量配置

```toml
# wrangler.toml
[vars]
NODE_ENV = "production"
NEXT_PUBLIC_SITE_URL = "https://inter-converter.your-domain.workers.dev"
NEXT_PUBLIC_APP_NAME = "InterConverter"
NEXT_PUBLIC_DEFAULT_LOCALE = "en"

# 生产环境
[env.production.vars]
NEXT_PUBLIC_SITE_URL = "https://interconverter.com"

# 预览环境
[env.preview.vars]
NEXT_PUBLIC_SITE_URL = "https://preview.inter-converter.workers.dev"
```

### 3. 缓存优化

```javascript
export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    
    // 静态资源缓存
    if (url.pathname.match(/\.(css|js|png|jpg|jpeg|gif|ico|svg)$/)) {
      const response = await env.ASSETS.fetch(request);
      const newResponse = new Response(response.body, response);
      
      // 设置长期缓存
      newResponse.headers.set('Cache-Control', 'public, max-age=31536000');
      
      return newResponse;
    }
    
    return env.ASSETS.fetch(request);
  },
};
```

## 迁移步骤

### 从 Pages 迁移到 Static Assets

1. **备份当前配置**
   ```bash
   cp wrangler.toml wrangler.toml.backup
   cp next.config.mjs next.config.mjs.backup
   ```

2. **更新配置文件**
   - 按照上述配置更新 `wrangler.toml`
   - 更新 `next.config.mjs` 启用静态导出

3. **创建 Worker 脚本**
   - 创建 `src/worker.js`
   - 实现基本的静态资源服务

4. **测试部署**
   ```bash
   npm run preview:workers
   ```

5. **生产部署**
   ```bash
   npm run deploy:workers
   ```

## 优势总结

### ✅ **解决的问题**
- **Node.js 兼容性**: 不再有兼容性警告
- **部署简化**: 单一命令部署
- **路由灵活**: 完全控制路由逻辑
- **性能优化**: 自定义缓存策略

### 🚀 **新增功能**
- **API 端点**: 可以添加服务端 API
- **自定义逻辑**: 请求处理逻辑
- **中间件**: 请求/响应中间件
- **A/B 测试**: 动态内容分发

## 推荐使用场景

**推荐使用 Static Assets 如果：**
- ✅ 需要避免 Node.js 兼容性问题
- ✅ 想要更灵活的路由控制
- ✅ 需要添加服务端 API 功能
- ✅ 希望统一管理静态资源和动态逻辑

**继续使用 Pages 如果：**
- ✅ 当前部署正常工作
- ✅ 不需要复杂的服务端逻辑
- ✅ 主要是静态网站

## 下一步

1. **选择部署方式**: Static Assets 或继续使用 Pages
2. **配置环境**: 按照上述步骤配置
3. **测试部署**: 使用预览功能测试
4. **生产部署**: 部署到生产环境
5. **监控优化**: 监控性能并优化配置

这种方法为您的 InterConverter 项目提供了更大的灵活性和控制力！
