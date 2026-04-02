import { buildToolPageMetadata, resolveToolPageDescription } from '@/lib/seo/tool-page-metadata';

describe('buildToolPageMetadata', () => {
  test('keeps review-approved tools indexable', () => {
    const metadata = buildToolPageMetadata({
      locale: 'en',
      category: 'unit',
      toolId: 'temperature-converter',
      title: 'Temperature Converter',
      description: 'Convert temperatures between Celsius, Fahrenheit, and Kelvin.',
      keywords: ['temperature converter'],
      path: '/unit/temperature-converter',
    });

    expect(metadata.robots).toMatchObject({
      index: true,
      follow: true,
    });
  });

  test('marks non-review-approved tools as noindex but follow', () => {
    const metadata = buildToolPageMetadata({
      locale: 'en',
      category: 'finance',
      toolId: 'mortgage-calculator',
      title: 'Mortgage Calculator',
      description: 'Estimate mortgage payments.',
      keywords: ['mortgage calculator'],
      path: '/finance/mortgage-calculator',
    });

    expect(metadata.robots).toMatchObject({
      index: false,
      follow: true,
    });
  });
});

describe('resolveToolPageDescription', () => {
  test('returns a neutral finance fallback when catalog description is missing', () => {
    expect(resolveToolPageDescription(undefined, 'finance')).toBe(
      'Financial planning and reference tool with formula-based estimates and result review guidance.',
    );
  });

  test('keeps the provided catalog description when it exists', () => {
    expect(resolveToolPageDescription('Estimate mortgage payments.', 'finance')).toBe(
      'Estimate mortgage payments.',
    );
  });
});
