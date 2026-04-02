import {
  getReviewApprovedToolPaths,
  getReviewApprovedTools,
  getReviewApprovedToolsByCategory,
  getReviewApprovedCategories,
} from '@/config/tools-loader';

describe('review-approved tool surface', () => {
  test('returns only the approved public tools', () => {
    const tools = getReviewApprovedTools('en');

    expect(tools).toHaveLength(12);
    expect(tools.map((tool) => tool.path).sort()).toEqual(
      [...getReviewApprovedToolPaths()].sort(),
    );
  });

  test('keeps review-approved tools within the intended categories', () => {
    expect(getReviewApprovedToolsByCategory('unit', 'en').map((tool) => tool.id)).toEqual([
      'temperature-converter',
      'length-converter',
      'weight-converter',
      'volume-converter',
    ]);

    expect(getReviewApprovedToolsByCategory('time', 'en').map((tool) => tool.id)).toEqual([
      'timestamp-converter',
      'timezone-converter',
      'date-difference-calculator',
    ]);

    expect(getReviewApprovedToolsByCategory('color', 'en').map((tool) => tool.id)).toEqual([
      'rgb-to-hex-converter',
      'color-picker-tool',
      'hex-to-rgb-converter',
      'contrast-checker',
    ]);

    expect(getReviewApprovedToolsByCategory('media', 'en').map((tool) => tool.id)).toEqual([
      'jpg-to-png-converter',
    ]);

    expect(getReviewApprovedToolsByCategory('finance', 'en')).toEqual([]);
    expect(getReviewApprovedToolsByCategory('health', 'en')).toEqual([]);
    expect(getReviewApprovedToolsByCategory('auto', 'en')).toEqual([]);
  });

  test('reports only categories with review-approved public tools', () => {
    expect(getReviewApprovedCategories()).toEqual(['unit', 'time', 'color', 'media']);
  });

  test('matches the review-approved surface across localized paths', () => {
    const zhTools = getReviewApprovedTools('zh');

    expect(zhTools.map((tool) => tool.path)).toContain('/zh/unit/temperature-converter');
    expect(zhTools.map((tool) => tool.path)).toContain('/zh/color/contrast-checker');
    expect(zhTools).toHaveLength(12);
  });
});
