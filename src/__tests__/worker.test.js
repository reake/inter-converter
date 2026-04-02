class MockHeaders {
  constructor(init = {}) {
    this.map = new Map();

    if (init instanceof MockHeaders) {
      init.forEach((value, key) => this.set(key, value));
      return;
    }

    Object.entries(init).forEach(([key, value]) => {
      this.set(key, value);
    });
  }

  set(key, value) {
    this.map.set(key.toLowerCase(), String(value));
  }

  get(key) {
    return this.map.get(key.toLowerCase()) ?? null;
  }

  forEach(callback) {
    this.map.forEach((value, key) => callback(value, key));
  }
}

class MockResponse {
  constructor(body, init = {}) {
    this.body = body;
    this.status = init.status ?? 200;
    const sourceHeaders = init.headers instanceof MockHeaders
      ? init.headers
      : init.headers || {};
    this.headers = new MockHeaders(sourceHeaders);
  }
}

global.Headers = MockHeaders;
global.Response = MockResponse;

import { addSecurityHeaders } from '../worker.js';

describe('worker response headers', () => {
  it('treats extensionless HTML routes as revalidating documents', () => {
    const response = new Response('<html></html>', {
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
      },
    });

    const secured = addSecurityHeaders(response, new URL('https://interconverter.com/color'));

    expect(secured.headers.get('Cache-Control')).toBe('public, max-age=0, s-maxage=0, must-revalidate');
    expect(secured.headers.get('Content-Security-Policy')).toContain("default-src 'self'");
    expect(secured.headers.get('Strict-Transport-Security')).toBe('max-age=31536000; includeSubDomains; preload');
  });

  it('keeps static assets on long immutable caching', () => {
    const response = new Response('body', {
      headers: {
        'Content-Type': 'text/css; charset=utf-8',
      },
    });

    const secured = addSecurityHeaders(response, new URL('https://interconverter.com/_next/static/app.css'));

    expect(secured.headers.get('Cache-Control')).toBe('public, max-age=31536000, immutable');
  });
});
