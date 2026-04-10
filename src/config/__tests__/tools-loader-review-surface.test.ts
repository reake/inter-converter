import {
  getReviewApprovedToolPaths,
  getReviewApprovedTools,
  getReviewApprovedToolsByCategory,
  getReviewApprovedCategories,
} from '@/config/tools-loader';

describe('review-approved tool surface', () => {
  test('returns only the approved public tools', () => {
    const tools = getReviewApprovedTools('en');

    expect(tools).toHaveLength(31);
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

    expect(getReviewApprovedToolsByCategory('auto', 'en').map((tool) => tool.id)).toEqual([
      'carburetor-cfm-calculator',
      'compression-ratio-calculator',
      'engine-size-converter',
      'gear-ratio-calculator',
      'power-to-weight-ratio',
      'ram-air-calculator',
      'rpm-calculator',
      'speed-converter',
      'supercharger-calculator',
      'temperature-converter',
      'temperature-converter-enhanced',
      'tire-calculator',
      'torque-horsepower-calculator',
      'volumetric-efficiency-calculator',
      'engine-volume-calculator',
      'fluid-weight-calculator',
      'auto-weight-converter',
      'engine-displacement-calculator',
      'power-to-weight-calculator',
      'tire-speed-calculator',
    ]);

    expect(getReviewApprovedToolsByCategory('media', 'en')).toEqual([]);
    expect(getReviewApprovedToolsByCategory('finance', 'en')).toEqual([]);
    expect(getReviewApprovedToolsByCategory('health', 'en')).toEqual([]);
  });

  test('reports only categories with review-approved public tools', () => {
    expect(getReviewApprovedCategories()).toEqual(['unit', 'time', 'color', 'auto']);
  });

  test('matches the review-approved surface across localized paths', () => {
    const zhTools = getReviewApprovedTools('zh');

    expect(zhTools.map((tool) => tool.path)).toContain('/zh/unit/temperature-converter');
    expect(zhTools.map((tool) => tool.path)).toContain('/zh/color/contrast-checker');
    expect(zhTools.map((tool) => tool.path)).toContain('/zh/auto/rpm-calculator');
    expect(zhTools).toHaveLength(31);
  });
});
