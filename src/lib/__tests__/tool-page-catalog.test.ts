import { getLocalizedToolEntry, type ToolCatalogEntry } from '@/lib/tool-page-catalog';

describe('getLocalizedToolEntry', () => {
  const enCatalog: ToolCatalogEntry[] = [
    {
      id: 'loan-calculator',
      name: 'Loan Calculator',
      description: 'Estimate loan payments.',
      keywords: ['loan calculator'],
    },
  ];

  const zhCatalog: ToolCatalogEntry[] = [];

  test('returns the localized entry when it exists', () => {
    const localized: ToolCatalogEntry[] = [
      {
        id: 'loan-calculator',
        name: '贷款计算器',
        description: '估算贷款还款。',
        keywords: ['贷款计算器'],
      },
    ];

    expect(getLocalizedToolEntry('zh', 'loan-calculator', enCatalog, localized)?.name).toBe('贷款计算器');
  });

  test('falls back to the english catalog when the localized entry is missing', () => {
    expect(getLocalizedToolEntry('zh', 'loan-calculator', enCatalog, zhCatalog)?.name).toBe(
      'Loan Calculator',
    );
  });
});
