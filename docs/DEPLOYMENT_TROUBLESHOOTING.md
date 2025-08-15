# 🔧 Cloudflare Workers 部署故障排除指南

## 问题：404 错误 - 找不到网页

### 🎯 **问题描述**
访问 Worker URL 时出现 HTTP ERROR 404，显示"找不到与以下网址对应的网页"。

### ✅ **已解决的问题**

#### **根本原因**
Next.js 国际化路由结构导致根路径 `/` 没有对应的 `index.html` 文件，静态文件都在 `/en/` 和 `/zh/` 子目录下。

#### **解决方案**
在 Worker 脚本中添加根路径重定向：

```javascript
// 根路径重定向到默认语言
if (url.pathname === '/') {
  return Response.redirect(`${url.origin}/en/`, 302);
}
```

### 🧪 **验证修复**

#### **1. 健康检查**
```bash
curl https://your-worker.workers.dev/health
```
**期望结果**:
```json
{"status":"healthy","timestamp":"2025-08-14T16:25:31.714Z","service":"InterConverter"}
```

#### **2. 根路径重定向**
```bash
curl -I https://your-worker.workers.dev/
```
**期望结果**:
```
HTTP/2 302
location: https://your-worker.workers.dev/en/
```

#### **3. API 端点测试**
```bash
curl "https://your-worker.workers.dev/api/currency?from=USD&to=EUR&amount=100"
```
**期望结果**:
```json
{"from":"USD","to":"EUR","amount":100,"result":85,"rate":0.85,"timestamp":"..."}
```

## 常见问题和解决方案

### 🔍 **问题 1: 静态资源 404**

#### **症状**
- CSS/JS 文件加载失败
- 图片无法显示
- 页面样式丢失

#### **诊断**
```bash
# 检查静态资源
curl -I https://your-worker.workers.dev/_next/static/css/app.css
```

#### **解决方案**
1. 确认 `out` 目录包含所有静态文件
2. 检查 `wrangler.toml` 中的 assets 配置：
   ```toml
   [assets]
   directory = "out"
   binding = "ASSETS"
   ```

### 🔍 **问题 2: API 端点不工作**

#### **症状**
- `/api/*` 路径返回 404
- API 响应格式错误

#### **诊断**
```bash
# 测试 API 端点
curl https://your-worker.workers.dev/api/health
```

#### **解决方案**
1. 检查 Worker 脚本中的 API 路由处理
2. 确认 `run_worker_first = true` 配置

### 🔍 **问题 3: 环境变量问题**

#### **症状**
- 配置值不正确
- 功能异常

#### **诊断**
检查 Wrangler 部署输出中的绑定信息：
```
Your Worker has access to the following bindings:
env.NODE_ENV ("production")
env.NEXT_PUBLIC_SITE_URL ("...")
```

#### **解决方案**
1. 更新 `wrangler.toml` 中的环境变量
2. 重新部署：`wrangler deploy`

### 🔍 **问题 4: CORS 错误**

#### **症状**
- 浏览器控制台显示 CORS 错误
- 跨域请求失败

#### **解决方案**
Worker 脚本已包含 CORS 处理，确认以下代码存在：
```javascript
function getCORSHeaders(contentType = null) {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  };
  return headers;
}
```

## 部署检查清单

### ✅ **部署前检查**
- [ ] 静态文件构建成功 (`npm run build:static`)
- [ ] `out` 目录包含所有必要文件
- [ ] `wrangler.toml` 配置正确
- [ ] Worker 脚本语法正确

### ✅ **部署后验证**
- [ ] 根路径重定向正常 (`curl -I https://your-worker.workers.dev/`)
- [ ] 健康检查端点响应 (`/health`)
- [ ] API 端点正常工作 (`/api/*`)
- [ ] 静态页面可访问 (`/en/`, `/zh/`)
- [ ] 静态资源加载正常 (CSS, JS, 图片)

## 调试工具

### 🛠️ **Wrangler 调试**
```bash
# 查看部署日志
wrangler tail

# 本地开发模式
wrangler dev

# 查看 Worker 信息
wrangler whoami
```

### 🛠️ **浏览器调试**
1. 打开开发者工具
2. 检查网络标签页
3. 查看控制台错误
4. 检查响应头

### 🛠️ **命令行测试**
```bash
# 测试根路径
curl -v https://your-worker.workers.dev/

# 测试 API
curl -v https://your-worker.workers.dev/api/health

# 测试静态页面
curl -v https://your-worker.workers.dev/en/

# 测试静态资源
curl -I https://your-worker.workers.dev/_next/static/css/app.css
```

## 性能优化建议

### 🚀 **缓存优化**
Worker 脚本已包含智能缓存策略：
- 静态资源：1年缓存
- HTML 文件：1小时缓存
- API 响应：无缓存

### 🚀 **监控建议**
1. 使用 Cloudflare Analytics 监控流量
2. 设置 Wrangler tail 监控错误
3. 定期检查 Worker 性能指标

## 联系支持

如果问题仍然存在：
1. 检查 Cloudflare Status 页面
2. 查看 Wrangler 文档
3. 在 Cloudflare Community 寻求帮助

## 成功部署确认

当以下所有测试都通过时，您的部署就成功了：

✅ **基本功能**
- 根路径重定向到 `/en/`
- 健康检查返回 JSON 响应
- 静态页面正常加载

✅ **API 功能**
- 货币转换 API 正常工作
- 温度转换 API 正常工作
- CORS 头部正确设置

✅ **性能**
- 页面加载速度快
- 静态资源缓存正常
- 全球 CDN 分发正常

**🎉 恭喜！您的 InterConverter 项目已成功部署到 Cloudflare Workers！**
