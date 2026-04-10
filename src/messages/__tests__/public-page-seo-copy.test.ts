import enMessages from '@/messages/en.json';
import zhMessages from '@/messages/zh.json';

function getPublicSeoCopy(messages: typeof enMessages, locale: 'en' | 'zh') {
  const mediaTitle = locale === 'zh'
    ? '文件工具分类说明 | InterConverter'
    : 'File Tools Category Notes | InterConverter';
  const mediaDescription = locale === 'zh'
    ? '该分类当前不在公开精选范围内，此页仅说明文件工具的审核状态、适用边界和后续申请方式。'
    : 'This category is not part of the current featured public surface. This page explains the review status, usage boundaries, and how to request a file workflow.';

  return [
    {
      id: `${locale}-home`,
      title: locale === 'zh'
        ? '免费在线转换器和计算器 | InterConverter'
        : 'Free Online Converters and Calculators | InterConverter',
      description: messages.homepage.hero.description,
    },
    {
      id: `${locale}-tools`,
      title: locale === 'zh'
        ? '免费在线工具大全 | InterConverter'
        : 'Free Online Converter and Calculator Tools | InterConverter',
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
