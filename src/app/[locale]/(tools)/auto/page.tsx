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
    title: isZh ? '汽车工具参考页 | InterConverter' : 'Automotive Tools Reference | InterConverter',
    description: isZh
      ? '汽车类工具仍保留在代码库中，但当前不属于公开精选维护范围。'
      : 'Automotive tools remain implemented in the codebase, but this category is not currently part of the featured public tool set.',
    locale,
    pathname: '/auto',
    keywords: isZh
      ? ['汽车工具', '分类参考', 'InterConverter']
      : ['automotive tools', 'category reference', 'InterConverter'],
    index: false,
  });
}

export default async function AutoPage({
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
        title={isZh ? '汽车工具参考页' : 'Automotive tools reference'}
        description={
          isZh
            ? '汽车类工具仍保留在代码库中，但这个分类当前不属于公开精选维护范围。'
            : 'Automotive tools still exist in the codebase, but this category is not currently part of the featured public surface.'
        }
        note={
          isZh
            ? '这个路由仍然可访问，但不再作为公开分类中心推广，也不会出现在当前站点地图的精选范围中。'
            : 'This route stays available, but it is no longer promoted as a public category hub and is not part of the current featured sitemap surface.'
        }
        reason={
          isZh
            ? '当前公开面优先收紧到更容易解释、验证和维护的测量、时间、颜色与文件转换工具。'
            : 'The public review surface is currently narrowed to measurement, time, color, and file conversion tools that are easier to explain, verify, and maintain.'
        }
      />
    </>
  );
}
