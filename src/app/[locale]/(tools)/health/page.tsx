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
    title: isZh ? '健康工具参考页 | InterConverter' : 'Health Tools Reference | InterConverter',
    description: isZh
      ? '健康类工具仍保留在代码库中，但当前不作为公开精选分类展示。'
      : 'Health tools remain implemented in the codebase, but this category is not currently promoted as part of the featured public surface.',
    locale,
    pathname: '/health',
    keywords: isZh
      ? ['健康工具', '分类参考', 'InterConverter']
      : ['health tools', 'category reference', 'InterConverter'],
    index: false,
  });
}

export default async function HealthPage({
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
        title={isZh ? '健康工具参考页' : 'Health tools reference'}
        description={
          isZh
            ? '健康类工具仍保留在代码库中，但当前不作为公开精选分类展示。'
            : 'Health tools still exist in the codebase, but this category is not currently promoted as part of the featured public surface.'
        }
        note={
          isZh
            ? '该分类页目前仅保留为参考入口，不再作为对外推广的完整公开栏目。'
            : 'This route currently remains as a reference entry only and is no longer presented as a full promoted category.'
        }
        reason={
          isZh
            ? '在当前这轮公开面收口中，站点优先维护更容易提供清晰解释和校验边界的工具页。'
            : 'For this review pass, the site is prioritizing pages where usage guidance and verification limits can be explained more clearly.'
        }
      />
    </>
  );
}
