'use client';

import { useEffect, useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { SearchInput } from '@/components/ui/SearchInput';
import { getReviewApprovedPopularTools } from '@/config/tools';

export default function NotFound() {
  const locale = useLocale();
  const isZh = locale === 'zh';
  const popularTools = getReviewApprovedPopularTools(6, locale);
  const [seconds, setSeconds] = useState(5);
  const t = useTranslations();

  useEffect(() => {
    let mounted = true;
    const timer = setInterval(() => {
      setSeconds((s) => {
        if (s <= 1) {
          if (mounted && typeof window !== 'undefined') {
            window.location.assign(locale === 'zh' ? '/zh' : '/');
          }
          clearInterval(timer);
          return 0;
        }
        return s - 1;
      });
    }, 1000);
    return () => {
      mounted = false;
      clearInterval(timer);
    };
  }, [locale]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/90 via-purple-600/90 to-indigo-700/90"></div>

        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-white/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="relative container mx-auto px-4 py-20 text-center text-white max-w-4xl">
          <div className="mb-8">
            <div className="inline-flex items-center justify-center w-32 h-32 bg-white/20 rounded-full backdrop-blur-sm border border-white/30 mb-6">
              <span className="text-6xl">🔍</span>
            </div>
          </div>

          <h1 className="text-6xl md:text-8xl font-bold mb-4 text-white">
            404
          </h1>
          <h2 className="text-2xl md:text-3xl font-semibold mb-6 text-blue-100">
            {isZh ? '未找到对应页面' : 'Page Not Found'}
          </h2>
          <p className="text-lg md:text-xl text-blue-100 mb-4 max-w-3xl mx-auto leading-relaxed">
            {isZh
              ? '你访问的页面可能已移动、已删除，或当前链接有误。你可以搜索工具，或从下方入口继续浏览。'
              : 'The page you are looking for may have moved, been removed, or the link may be incorrect. Search for a tool or continue with the links below.'}
          </p>
          <p className="text-base md:text-lg text-white/95 font-medium drop-shadow mb-8">
            {t.rich('notFound.countdown', {
              b: (chunks) => (
                <span className="inline-block px-2 py-0.5 mx-1 rounded bg-white/20 text-white font-semibold">{chunks}</span>
              ),
              seconds
            })}
          </p>

          <div className="max-w-2xl mx-auto mb-8">
            <SearchInput
              placeholder={isZh ? '搜索转换器和计算器...' : 'Search converters and calculators...'}
              redirectTo="/tools"
              locale={locale}
              showSuggestions={true}
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button asChild size="lg" className="bg-white text-blue-600 hover:bg-gray-100 font-semibold shadow-lg">
              <Link href="/">{isZh ? '返回首页' : 'Return to Home'}</Link>
            </Button>
            <Button asChild size="lg" className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-semibold shadow-lg border-0">
              <Link href="/tools">{isZh ? '浏览所有工具' : 'Browse All Tools'}</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              {isZh ? '你也可以试试这些热门工具' : 'You can also try these popular tools'}
            </h3>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {isZh
                ? '这里列出了一些常用转换器和计算器，方便你继续查找需要的功能。'
                : 'Here are some commonly used converters and calculators to help you continue quickly.'}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {popularTools.map((tool) => (
              <Link key={tool.id} href={tool.path} className="block group">
                <Card className="h-full transition-all duration-300 group-hover:scale-[1.02] border-0 shadow-lg hover:shadow-xl bg-gradient-to-br from-white to-gray-50">
                  <CardHeader className="pb-3">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-3xl">{tool.icon}</span>
                      <CardTitle className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                        {tool.name}
                      </CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 text-sm leading-relaxed line-clamp-2">
                      {tool.description}
                    </p>
                    <div className="mt-4 flex items-center justify-between">
                      <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                        {tool.category}
                      </span>
                      <span className="text-blue-600 text-sm font-medium group-hover:text-blue-700">
                        {isZh ? '立即使用 →' : 'Try it →'}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 text-center max-w-4xl">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">
            {isZh ? '还在找其他内容？' : 'Still looking for something else?'}
          </h3>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🏠</span>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">{isZh ? '返回首页' : 'Go Home'}</h4>
              <p className="text-gray-600 text-sm mb-4">
                {isZh ? '从首页重新开始，查看站点入口和常用内容。' : 'Start again from the homepage and browse the main site entry points.'}
              </p>
              <Button asChild variant="outline" size="sm">
                <Link href="/">{isZh ? '首页' : 'Home Page'}</Link>
              </Button>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🔧</span>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">{isZh ? '浏览工具' : 'Browse Tools'}</h4>
              <p className="text-gray-600 text-sm mb-4">
                {isZh ? '按分类查看所有公开工具。' : 'Explore all public tools by category.'}
              </p>
              <Button asChild variant="outline" size="sm">
                <Link href="/tools">{isZh ? '所有工具' : 'All Tools'}</Link>
              </Button>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">💬</span>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">{isZh ? '联系支持' : 'Contact Us'}</h4>
              <p className="text-gray-600 text-sm mb-4">
                {isZh ? '如果你没找到需要的内容，可以告诉我们。' : 'If you cannot find what you need, let us know.'}
              </p>
              <Button asChild variant="outline" size="sm">
                <Link href="/contact">{isZh ? '获取帮助' : 'Get Help'}</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
