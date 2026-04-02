import { render } from '@testing-library/react';

import { StructuredData } from '@/components/tools/StructuredData';

describe('StructuredData', () => {
  it('does not emit a duplicate WebSite schema block', () => {
    const { container } = render(
      <StructuredData
        locale="en"
        tools={[
          {
            id: 'temperature-converter',
            name: 'Temperature Converter',
            description: 'Convert temperatures between common scales.',
            category: 'unit',
            keywords: ['temperature converter'],
            path: '/unit/temperature-converter',
            isActive: true,
            searchVolume: 1000,
            difficulty: 1,
            icon: '🌡️',
          },
        ]}
      />,
    );

    const jsonLdEntries = Array.from(
      container.querySelectorAll('script[type="application/ld+json"]'),
    ).map((node) => JSON.parse(node.textContent ?? '{}'));

    expect(jsonLdEntries.some((entry) => entry['@type'] === 'WebSite')).toBe(false);
  });

  it('uses locale-aware tool URLs without duplicating the locale prefix', () => {
    const { container } = render(
      <StructuredData
        locale="zh"
        tools={[
          {
            id: 'temperature-converter',
            name: '温度转换器',
            description: '在常见温标之间进行转换。',
            category: 'unit',
            keywords: ['温度转换器'],
            path: '/zh/unit/temperature-converter',
            isActive: true,
            searchVolume: 1000,
            difficulty: 1,
            icon: '🌡️',
          },
        ]}
      />,
    );

    const jsonLdEntries = Array.from(
      container.querySelectorAll('script[type="application/ld+json"]'),
    ).map((node) => JSON.parse(node.textContent ?? '{}'));

    const itemList = jsonLdEntries.find((entry) => entry['@type'] === 'ItemList');
    expect(itemList.itemListElement[0].url).toBe('https://interconverter.com/zh/unit/temperature-converter');
  });
});
