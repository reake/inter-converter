import React from "react";
import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { Button } from "@/components/ui/button";
import { SearchInput } from "@/components/ui/SearchInput";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Link } from "@/i18n/routing";
import {
  getReviewApprovedPopularTools,
  getReviewApprovedToolsByAllCategories,
  getToolCategories,
} from "@/config/tools";
import { EnhancedToolCard } from "@/components/tools/EnhancedToolCard";
import { generateMetadata as generateSEOMetadata } from "@/lib/seo/metadata";
import { StructuredData } from "@/components/tools/StructuredData";
import { JsonLd, generateWebsiteSchema } from "@/components/seo/JsonLd";
import { FaqSection } from "@/components/seo/FaqSection";



// Force static generation
export const dynamic = 'force-static';
export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'homepage' });

  const title = locale === 'zh'
    ? '免费在线转换器和计算器 | InterConverter'
    : 'Free Online Converters and Calculators | InterConverter';

  const description = t('hero.description');

  return generateSEOMetadata({
    title,
    description,
    locale,
    pathname: '/',
    keywords: [
      locale === 'zh' ? '在线转换器' : 'online converter',
      locale === 'zh' ? '在线计算器' : 'online calculator',
      locale === 'zh' ? '单位转换' : 'unit conversion',
      locale === 'zh' ? '时间转换' : 'time converter',
      locale === 'zh' ? '时间戳转换器' : 'timestamp converter',
      locale === 'zh' ? '颜色转换' : 'color converter',
      locale === 'zh' ? '对比度检查' : 'contrast checker',
      locale === 'zh' ? '免费在线工具' : 'free online tools',
      locale === 'zh' ? '浏览器工具' : 'browser-based tools',
      locale === 'zh' ? '转换工具' : 'conversion tools'
    ]
  });
}


export default async function HomePage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'homepage' });
  const tCommon = await getTranslations({ locale, namespace: 'common' });
  const popularTools = getReviewApprovedPopularTools(6, locale);
  const toolsByCategory = getReviewApprovedToolsByAllCategories(4, locale);
  const toolCategories = getToolCategories(locale);
  
  const faqItems = t.raw('faq') as Array<{question: string, answer: string}>;
  const professionals = t.raw('professionals') as string[];
  const heroHighlights = locale === 'zh'
    ? ['免费使用', '浏览器在线工具', '无需注册']
    : ['Free to use', 'Browser-based tools', 'No account required'];

  return (
    <>
      <JsonLd data={generateWebsiteSchema(locale)} />
      <StructuredData tools={popularTools} locale={locale}/>
     
      {/* Hero Section */}
      <section className="relative overflow-visible bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/90 via-purple-600/90 to-indigo-700/90"></div>
        <div className="relative container mx-auto px-4 py-20 text-center text-white max-w-7xl">
          <h1 className="text-5xl md:text-7xl font-bold mb-4 text-white">
            {t('hero.title')}
          </h1>
          <h2 className="text-2xl md:text-3xl font-semibold mb-6 text-blue-100">
            {t('hero.subtitle')}
          </h2>
          <p className="text-lg md:text-xl text-blue-100 mb-12 max-w-5xl mx-auto leading-relaxed">
            {t('hero.description')}
          </p>

          {/* Search */}
          <div className="max-w-2xl mx-auto mb-8 relative z-50">
            <SearchInput
              placeholder={tCommon('searchPlaceholder')}
              redirectTo="/tools"
              locale={locale}
              showSuggestions={true}
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button asChild size="lg" className="bg-white text-blue-600 hover:bg-gray-100 font-semibold shadow-lg">
              <Link href="/tools">{tCommon('startConverting')}</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="bg-transparent border-2 border-white text-white hover:bg-white/10 font-semibold">
              <Link href="/tools">{tCommon('viewAllTools')}</Link>
            </Button>
          </div>
          
          <div className="mt-8 flex flex-wrap justify-center gap-6 text-sm text-blue-100">
            {heroHighlights.map((item) => (
              <div key={item} className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

       <div className="container mx-auto px-4 py-8">

      {/* Popular Tools Section */}
      <section className="py-12">
        <h2 className="text-3xl font-bold text-center mb-12">
          {t('sections.popularTools')}
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {popularTools.map((tool, index) => (
            <EnhancedToolCard
              key={tool.id}
              tool={tool}
              featured={index < 3}
              showStats={true}
              locale={locale}
            />
          ))}
        </div>
        <div className="text-center">
          <Button asChild variant="outline">
            <Link href="/tools">{tCommon('viewAllTools')}</Link>
          </Button>
        </div>
      </section>

      {/* Tools by Category Section */}
      <section className="py-12">
        <h2 className="text-3xl font-bold text-center mb-12">
          {t('sections.browseByCategory')}
        </h2>
        <div className="space-y-12">
          {Object.entries(toolsByCategory).map(([categoryKey, tools]) => {
            const category = toolCategories[categoryKey as keyof typeof toolCategories];
            return (
              <div key={categoryKey} className="">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">{category.name}</h3>
                    <p className="text-gray-600 mt-1">{category.description}</p>
                  </div>
                  <Button asChild variant="outline" size="sm">
                    <Link href={`/${categoryKey}`}>{tCommon('viewMore')}</Link>
                  </Button>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {tools.map((tool) => (
                    <EnhancedToolCard
                      key={tool.id}
                      tool={tool}
                      featured={false}
                      showStats={false}
                      locale={locale}
                    />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* FAQ Section */}
      <FaqSection 
        title={t('sections.faq')}
        subtitle={t('sections.faqSubtitle')}
        faqItems={faqItems}
      />

      {/* About InterConverter Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50 rounded-3xl mx-4">
        <div className="max-w-6xl mx-auto px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              {t('sections.aboutTitle')}
            </h2>
            <p className="text-xl text-gray-700 max-w-4xl mx-auto leading-relaxed">
              {t('sections.aboutDescription')}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow bg-white">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center mb-4">
                  <span className="text-2xl">🎯</span>
                </div>
                <CardTitle className="text-xl">{t('features.professionalQuality.title')}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base leading-relaxed">
                  {t('features.professionalQuality.description')}
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow bg-white">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center mb-4">
                  <span className="text-2xl">🚀</span>
                </div>
                <CardTitle className="text-xl">{t('features.lightningFast.title')}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base leading-relaxed">
                  {t('features.lightningFast.description')}
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow bg-white">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mb-4">
                  <span className="text-2xl">🔒</span>
                </div>
                <CardTitle className="text-xl">{t('features.privacyFirst.title')}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base leading-relaxed">
                  {t('features.privacyFirst.description')}
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow bg-white">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl flex items-center justify-center mb-4">
                  <span className="text-2xl">📱</span>
                </div>
                <CardTitle className="text-xl">{t('features.mobileOptimized.title')}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base leading-relaxed">
                  {t('features.mobileOptimized.description')}
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow bg-white">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl flex items-center justify-center mb-4">
                  <span className="text-2xl">🌍</span>
                </div>
                <CardTitle className="text-xl">{t('features.globalStandards.title')}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base leading-relaxed">
                  {t('features.globalStandards.description')}
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow bg-white">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-r from-amber-500 to-yellow-500 rounded-xl flex items-center justify-center mb-4">
                  <span className="text-2xl">⚡</span>
                </div>
                <CardTitle className="text-xl">{t('features.alwaysUpdated.title')}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base leading-relaxed">
                  {t('features.alwaysUpdated.description')}
                </CardDescription>
              </CardContent>
            </Card>
          </div>

          <div className="text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              {t('sections.trustedBy')}
            </h3>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto mb-8">
              {t('sections.trustedByDescription')}
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-600">
              {professionals.map((professional, index) => (
                <span key={index} className="bg-white px-4 py-2 rounded-full shadow-sm">
                  {professional}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <h2 className="text-3xl font-bold text-center mb-12">
          {t('sections.whyChoose')}
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader>
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center mb-4">
                <span className="text-2xl">⚡</span>
              </div>
              <CardTitle>{t('features.instantResults.title')}</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                {t('features.instantResults.description')}
              </CardDescription>
            </CardContent>
          </Card>
          
          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader>
              <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center mb-4">
                <span className="text-2xl">🆓</span>
              </div>
              <CardTitle>{t('features.completelyFree.title')}</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                {t('features.completelyFree.description')}
              </CardDescription>
            </CardContent>
          </Card>
          
          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader>
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mb-4">
                <span className="text-2xl">🔒</span>
              </div>
              <CardTitle>{t('features.privacyProtected.title')}</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                {t('features.privacyProtected.description')}
              </CardDescription>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
    </>
  );
}
