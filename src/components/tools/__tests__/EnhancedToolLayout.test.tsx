import { render } from '@testing-library/react';

import { EnhancedToolLayout } from '@/components/tools/EnhancedToolLayout';

describe('EnhancedToolLayout', () => {
  it('emits locale-aware structured data for localized tool pages', () => {
    const { container } = render(
      <EnhancedToolLayout
        locale="zh"
        title="长度转换器"
        description="在常见长度单位之间转换。"
        keywords={['长度转换器']}
        toolId="length-converter"
        category="unit"
        aboutContent={['说明']}
      >
        <div>tool</div>
      </EnhancedToolLayout>,
    );

    const jsonLdEntries = Array.from(
      container.querySelectorAll('script[type="application/ld+json"]'),
    ).map((node) => JSON.parse(node.textContent ?? '{}'));

    const applicationEntry = jsonLdEntries.find((entry) => entry['@type'] === 'WebApplication');
    expect(applicationEntry.url).toBe('https://interconverter.com/zh/unit/length-converter');
    expect(applicationEntry.inLanguage).toBe('zh');
  });
});
