import { Metadata } from 'next';
import { generateMetadata as generateSEOMetadata } from '@/lib/seo/metadata';
import { JsonLd, generateWebsiteSchema } from '@/components/seo/JsonLd';
import { CategoryMaintenanceNotice } from '@/components/tools/CategoryMaintenanceNotice';

export const dynamic = 'force-static';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isZh = locale === 'zh';

  return generateSEOMetadata({
    title: isZh ? '金融工具参考页 | InterConverter' : 'Finance Tools Reference | InterConverter',
    description: isZh
      ? '金融类工具仍保留在代码库中，但当前不作为公开精选分类展示。'
      : 'Finance tools remain implemented in the codebase, but this category is not currently promoted as part of the featured public surface.',
    locale,
    pathname: '/finance',
    keywords: isZh
      ? ['金融工具', '分类参考', 'InterConverter']
      : ['finance tools', 'category reference', 'InterConverter'],
    index: false,
  });
}

export default async function FinancePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const isZh = locale === 'zh';

  return (
    <>
      <JsonLd data={generateWebsiteSchema(locale)} />
      <CategoryMaintenanceNotice
        locale={locale}
        title={isZh ? '金融工具参考页' : 'Finance tools reference'}
        description={
          isZh
            ? '金融类工具仍保留在代码库中，但当前不作为公开精选分类展示。'
            : 'Finance tools still exist in the codebase, but this category is not currently promoted as part of the featured public surface.'
        }
        note={
          isZh
            ? '该分类页已降为低调参考页，不再承载完整的公开分类目录角色。'
            : 'This category has been reduced to a low-profile reference page and no longer acts as a full public directory hub.'
        }
        reason={
          isZh
            ? '当前公开面优先展示更容易提供清晰说明、示例和校验边界的工具页面。'
            : 'The current public review surface prioritizes pages where explanations, examples, and verification boundaries are easier to present clearly.'
        }
      />
    </>
  );
}
