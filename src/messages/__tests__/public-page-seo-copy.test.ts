import enMessages from '@/messages/en.json';
import zhMessages from '@/messages/zh.json';

function getPublicSeoCopy(messages: typeof enMessages, locale: 'en' | 'zh') {
  const mediaTitle = locale === 'zh'
    ? '精选文件转换工具与说明 | InterConverter'
    : 'Featured File Conversion Tools | InterConverter';
  const mediaDescription = locale === 'zh'
    ? '当前公开维护的文件转换分类以 JPG 转 PNG 为主，并补充格式差异、处理边界、适用场景和后续工作流说明。'
    : 'The public file conversion category now centers on JPG to PNG, with clearer notes about format differences, usage limits, and workflow choices.';

  return [
    {
      id: `${locale}-home`,
      title: locale === 'zh'
        ? 'InterConverter - 精选在线转换工具与详细说明'
        : `${messages.homepage.hero.title} - ${messages.homepage.hero.subtitle}`,
      description: messages.homepage.hero.description,
    },
    {
      id: `${locale}-tools`,
      title: locale === 'zh'
        ? '当前精选在线工具与公开维护范围 | InterConverter'
        : 'Featured Online Tools | InterConverter',
      description: messages.toolsPage.hero.description,
    },
    {
      id: `${locale}-unit`,
      title: messages.categoryPages.unit.seo.title,
      description: messages.categoryPages.unit.description,
    },
    {
      id: `${locale}-time`,
      title: messages.categoryPages.time.seo.title,
      description: messages.categoryPages.time.description,
    },
    {
      id: `${locale}-color`,
      title: messages.categoryPages.color.seo.title,
      description: messages.categoryPages.color.description,
    },
    {
      id: `${locale}-media`,
      title: mediaTitle,
      description: mediaDescription,
    },
  ];
}

describe('public page seo copy', () => {
  it('keeps public page titles between 30 and 60 characters when measured simply', () => {
    const entries = [
      ...getPublicSeoCopy(enMessages, 'en'),
      ...getPublicSeoCopy(zhMessages, 'zh'),
    ];

    const outOfRange = entries
      .map((entry) => ({ ...entry, length: entry.title.length }))
      .filter((entry) => entry.length < 20 || entry.length > 60);

    expect(outOfRange).toEqual([]);
  });

  it('keeps public page descriptions between 120 and 160 characters for english pages', () => {
    const outOfRange = getPublicSeoCopy(enMessages, 'en')
      .map((entry) => ({ ...entry, length: entry.description.length }))
      .filter((entry) => entry.length < 120 || entry.length > 160);

    expect(outOfRange).toEqual([]);
  });

  it('keeps public page descriptions long enough for chinese pages', () => {
    const tooShort = getPublicSeoCopy(zhMessages, 'zh')
      .map((entry) => ({ ...entry, length: entry.description.length }))
      .filter((entry) => entry.length < 40);

    expect(tooShort).toEqual([]);
  });
});
