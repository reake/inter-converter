'use client';

import { useState, useMemo } from 'react';
import { getToolsByCategory, getToolCategories } from '@/config/tools';
import { ModernToolCard } from '@/components/tools/ModernToolCard';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ToolCategory } from '@/types/tools';
import { ArrowLeft, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Link } from '@/i18n/routing';

interface CategoryPageClientProps {
  category: ToolCategory;
  locale: string;
}

export function CategoryPageClient({ category, locale }: CategoryPageClientProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'popularity' | 'name'>('popularity');
  const isZh = locale === 'zh';
  const toolCategories = useMemo(() => getToolCategories(locale), [locale]);

  // Get all tools for this category
  const categoryTools = useMemo(() => {
    return getToolsByCategory(category, undefined, locale);
  }, [category, locale]);

  // Filter and sort tools
  const displayTools = useMemo(() => {
    let filtered = categoryTools;

    // Apply search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(tool =>
        tool.name.toLowerCase().includes(query) ||
        tool.description.toLowerCase().includes(query) ||
        tool.keywords.some(keyword => keyword.toLowerCase().includes(query))
      );
    }

    // Sort tools
    return [...filtered].sort((a, b) => {
      switch (sortBy) {
        case 'popularity':
          return (b.searchVolume || 0) - (a.searchVolume || 0);
        case 'name':
          return a.name.localeCompare(b.name);
        default:
          return 0;
      }
    });
  }, [categoryTools, searchQuery, sortBy]);

  const categoryInfo = toolCategories[category];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20"></div>
        
        {/* Animated background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
          <div className="absolute top-0 right-0 w-96 h-96 bg-yellow-200 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-2000"></div>
          <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-4000"></div>
        </div>

        <div className="relative container mx-auto px-4 py-20">
          <div className="max-w-4xl mx-auto">
            {/* Back Navigation */}
            <div className="mb-8">
              <Button asChild variant="ghost" className="text-white hover:bg-white/10">
                <Link href="/tools" className="flex items-center gap-2">
                  <ArrowLeft className="w-4 h-4" />
                  {isZh ? '返回所有工具' : 'Back to All Tools'}
                </Link>
              </Button>
            </div>

            <div className="text-center">
              <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
                {categoryInfo.name}
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-blue-100 leading-relaxed">
                {categoryInfo.description}
              </p>
              <div className="flex justify-center">
                <Badge variant="secondary" className="text-lg px-4 py-2">
                  {isZh ? `${categoryTools.length} 个可用工具` : `${categoryTools.length} Tools Available`}
                </Badge>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="py-8 bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              {/* Search */}
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  type="text"
                  placeholder={isZh ? `搜索${categoryInfo.name}工具...` : `Search ${categoryInfo.name.toLowerCase()} tools...`}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>

              {/* Sort Options */}
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">{isZh ? '排序方式：' : 'Sort by:'}</span>
                <Button
                  variant={sortBy === 'popularity' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setSortBy('popularity')}
                >
                  {isZh ? '热门度' : 'Popularity'}
                </Button>
                <Button
                  variant={sortBy === 'name' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setSortBy('name')}
                >
                  {isZh ? '名称' : 'Name'}
                </Button>
              </div>
            </div>

            {/* Results Summary */}
            <div className="mt-4 text-center">
              <p className="text-sm text-gray-600">
                {isZh
                  ? `显示 ${displayTools.length} / ${categoryTools.length} 个${categoryInfo.name}工具${searchQuery ? `，匹配“${searchQuery}”` : ''}`
                  : `Showing ${displayTools.length} of ${categoryTools.length} ${categoryInfo.name.toLowerCase()} tools${searchQuery ? ` matching "${searchQuery}"` : ''}`}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Tools Grid */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          {displayTools.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {displayTools.map((tool, index) => (
                <ModernToolCard
                  key={tool.id}
                  tool={tool}
                  variant="default"
                  animationDelay={index * 100}
                  locale={locale}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{isZh ? '未找到工具' : 'No tools found'}</h3>
              <p className="text-gray-600">
                {searchQuery
                  ? (isZh ? `没有找到与“${searchQuery}”匹配的${categoryInfo.name}工具，请尝试其他关键词。` : `No ${categoryInfo.name.toLowerCase()} tools match "${searchQuery}". Try a different search term.`)
                  : (isZh ? `当前暂无可用的${categoryInfo.name}工具。` : `No ${categoryInfo.name.toLowerCase()} tools are currently available.`)
                }
              </p>
              {searchQuery && (
                <Button
                  variant="outline"
                  onClick={() => setSearchQuery('')}
                  className="mt-4"
                >
                  {isZh ? '清除搜索' : 'Clear Search'}
                </Button>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Related Categories */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {isZh ? '探索其他分类' : 'Explore Other Categories'}
            </h2>
            <p className="text-gray-600">
              {isZh ? '继续查看其他分类中的更多工具' : 'Discover more tools in our other categories'}
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {Object.entries(toolCategories)
              .filter(([key]) => key !== category)
              .map(([key, info]) => {
                const toolCount = getToolsByCategory(key as ToolCategory, undefined, locale).length;
                return (
                  <Link
                    key={key}
                    href={`/${key}`}
                    className="block p-6 bg-white rounded-lg border hover:shadow-lg transition-shadow"
                  >
                    <h3 className="font-semibold text-lg mb-2">{info.name}</h3>
                    <p className="text-gray-600 text-sm mb-3">{info.description}</p>
                    <Badge variant="secondary" className="text-xs">
                      {isZh ? `${toolCount} 个工具` : `${toolCount} tools`}
                    </Badge>
                  </Link>
                );
              })}
          </div>
        </div>
      </section>
    </div>
  );
}
