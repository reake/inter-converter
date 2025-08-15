/**
 * InterConverter Cloudflare Worker
 * 处理静态资源和 API 请求
 */

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    
    try {
      // API 路由处理
      if (url.pathname.startsWith('/api/')) {
        return await handleAPI(request, env);
      }
      
      // 健康检查端点
      if (url.pathname === '/health') {
        return new Response(
          JSON.stringify({
            status: 'healthy',
            timestamp: new Date().toISOString(),
            service: 'InterConverter'
          }),
          {
            headers: { 'Content-Type': 'application/json' },
          }
        );
      }

      // 静态资源处理
      const response = await env.ASSETS.fetch(request);
      
      // 添加安全头部和缓存控制
      return addSecurityHeaders(response, url);
      
    } catch (error) {
      console.error('Worker error:', error);
      
      // 错误处理 - 返回静态资源或错误页面
      try {
        return await env.ASSETS.fetch(request);
      } catch {
        return new Response('Internal Server Error', { 
          status: 500,
          headers: { 'Content-Type': 'text/plain' }
        });
      }
    }
  },
};

/**
 * 处理 API 请求
 */
async function handleAPI(request, env) {
  const url = new URL(request.url);
  const path = url.pathname;
  
  // CORS 处理
  if (request.method === 'OPTIONS') {
    return handleCORS();
  }
  
  // API 路由
  switch (true) {
    case path === '/api/health':
      return handleHealthAPI();
      
    case path === '/api/currency':
      return handleCurrencyAPI(request);
      
    case path.startsWith('/api/convert/'):
      return handleConvertAPI(request);
      
    default:
      return new Response(
        JSON.stringify({ 
          error: 'API endpoint not found',
          path: path 
        }), 
        { 
          status: 404,
          headers: getCORSHeaders('application/json')
        }
      );
  }
}

/**
 * 健康检查 API
 */
function handleHealthAPI() {
  return new Response(
    JSON.stringify({
      status: 'healthy',
      timestamp: new Date().toISOString(),
      service: 'InterConverter API',
      version: '1.0.0'
    }),
    {
      headers: getCORSHeaders('application/json'),
    }
  );
}

/**
 * 货币转换 API 示例
 */
async function handleCurrencyAPI(request) {
  const url = new URL(request.url);
  const from = url.searchParams.get('from') || 'USD';
  const to = url.searchParams.get('to') || 'EUR';
  const amount = parseFloat(url.searchParams.get('amount') || '1');
  
  // 模拟汇率数据（实际应用中应该从外部 API 获取）
  const rates = {
    USD: 1,
    EUR: 0.85,
    GBP: 0.73,
    JPY: 110,
    CNY: 6.45,
    CAD: 1.25,
    AUD: 1.35
  };
  
  if (!rates[from] || !rates[to]) {
    return new Response(
      JSON.stringify({ 
        error: 'Unsupported currency',
        supported: Object.keys(rates)
      }),
      { 
        status: 400,
        headers: getCORSHeaders('application/json')
      }
    );
  }
  
  const result = (amount / rates[from]) * rates[to];
  
  return new Response(
    JSON.stringify({
      from,
      to,
      amount,
      result: Math.round(result * 100) / 100,
      rate: rates[to] / rates[from],
      timestamp: new Date().toISOString()
    }),
    {
      headers: getCORSHeaders('application/json'),
    }
  );
}

/**
 * 通用转换 API
 */
async function handleConvertAPI(request) {
  const url = new URL(request.url);
  const type = url.pathname.split('/')[3]; // /api/convert/{type}
  
  switch (type) {
    case 'temperature':
      return handleTemperatureConvert(request);
    case 'length':
      return handleLengthConvert(request);
    default:
      return new Response(
        JSON.stringify({ 
          error: 'Conversion type not supported',
          type: type
        }),
        { 
          status: 400,
          headers: getCORSHeaders('application/json')
        }
      );
  }
}

/**
 * 温度转换
 */
function handleTemperatureConvert(request) {
  const url = new URL(request.url);
  const value = parseFloat(url.searchParams.get('value') || '0');
  const from = url.searchParams.get('from') || 'celsius';
  const to = url.searchParams.get('to') || 'fahrenheit';
  
  let result;
  
  // 转换逻辑
  if (from === 'celsius' && to === 'fahrenheit') {
    result = (value * 9/5) + 32;
  } else if (from === 'fahrenheit' && to === 'celsius') {
    result = (value - 32) * 5/9;
  } else if (from === 'celsius' && to === 'kelvin') {
    result = value + 273.15;
  } else if (from === 'kelvin' && to === 'celsius') {
    result = value - 273.15;
  } else if (from === to) {
    result = value;
  } else {
    return new Response(
      JSON.stringify({ 
        error: 'Unsupported temperature conversion',
        from,
        to
      }),
      { 
        status: 400,
        headers: getCORSHeaders('application/json')
      }
    );
  }
  
  return new Response(
    JSON.stringify({
      value,
      from,
      to,
      result: Math.round(result * 100) / 100,
      timestamp: new Date().toISOString()
    }),
    {
      headers: getCORSHeaders('application/json'),
    }
  );
}

/**
 * 长度转换
 */
function handleLengthConvert(request) {
  const url = new URL(request.url);
  const value = parseFloat(url.searchParams.get('value') || '0');
  const from = url.searchParams.get('from') || 'meter';
  const to = url.searchParams.get('to') || 'feet';
  
  // 转换为米的系数
  const toMeter = {
    meter: 1,
    kilometer: 1000,
    centimeter: 0.01,
    millimeter: 0.001,
    inch: 0.0254,
    feet: 0.3048,
    yard: 0.9144,
    mile: 1609.34
  };
  
  if (!toMeter[from] || !toMeter[to]) {
    return new Response(
      JSON.stringify({ 
        error: 'Unsupported length unit',
        supported: Object.keys(toMeter)
      }),
      { 
        status: 400,
        headers: getCORSHeaders('application/json')
      }
    );
  }
  
  const result = (value * toMeter[from]) / toMeter[to];
  
  return new Response(
    JSON.stringify({
      value,
      from,
      to,
      result: Math.round(result * 1000000) / 1000000, // 6位小数精度
      timestamp: new Date().toISOString()
    }),
    {
      headers: getCORSHeaders('application/json'),
    }
  );
}

/**
 * CORS 处理
 */
function handleCORS() {
  return new Response(null, {
    status: 204,
    headers: getCORSHeaders()
  });
}

/**
 * 获取 CORS 头部
 */
function getCORSHeaders(contentType = null) {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Max-Age': '86400',
  };
  
  if (contentType) {
    headers['Content-Type'] = contentType;
  }
  
  return headers;
}

/**
 * 添加安全头部和缓存控制
 */
function addSecurityHeaders(response, url) {
  const newResponse = new Response(response.body, response);
  
  // 安全头部
  newResponse.headers.set('X-Content-Type-Options', 'nosniff');
  newResponse.headers.set('X-Frame-Options', 'DENY');
  newResponse.headers.set('X-XSS-Protection', '1; mode=block');
  newResponse.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  
  // 缓存控制
  const pathname = url.pathname;
  
  if (pathname.match(/\.(css|js|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$/)) {
    // 静态资源长期缓存
    newResponse.headers.set('Cache-Control', 'public, max-age=31536000, immutable');
  } else if (pathname.match(/\.(html|htm)$/)) {
    // HTML 文件短期缓存
    newResponse.headers.set('Cache-Control', 'public, max-age=3600, must-revalidate');
  } else {
    // 其他文件默认缓存
    newResponse.headers.set('Cache-Control', 'public, max-age=86400');
  }
  
  // 添加自定义头部
  newResponse.headers.set('X-Powered-By', 'InterConverter on Cloudflare Workers');

  return newResponse;
}


