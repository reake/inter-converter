'use client';

import { useState, useEffect, useMemo } from 'react';
import { TOOLS_CONFIG, TOOL_CATEGORIES, getPopularTools } from '@/config/tools';
import { ModernToolCard } from '@/components/tools/ModernToolCard';
import { AdvancedFilters } from '@/components/tools/AdvancedFilters';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ToolConfig } from '@/types/tools';
import Link from 'next/link';

interface ToolsPageClientProps {
  locale: string;
}

export function ToolsPageClient({ locale }: ToolsPageClientProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'popularity' | 'name' | 'category'>('popularity');
  const [filteredTools, setFilteredTools] = useState<ToolConfig[]>([]);
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [currentFilters, setCurrentFilters] = useState<any>(null);

  // Memoize expensive calculations to prevent re-creation on every render
  const popularTools = useMemo(() => getPopularTools(8), []);
  const allTools = useMemo(() => TOOLS_CONFIG.filter(tool => tool.isActive), []);
  const featuredTools = useMemo(() => popularTools.slice(0, 3), [popularTools]);

  // Group tools by category
  const toolsByCategory = useMemo(() => {
    return allTools.reduce((acc, tool) => {
      if (!acc[tool.category]) {
        acc[tool.category] = [];
      }
      acc[tool.category].push(tool);
      return acc;
    }, {} as Record<string, typeof allTools>);
  }, [allTools]);

  // Handle category selection
  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    setCurrentFilters(null); // Clear advanced filters
    setShowAdvancedFilters(false);
  };

  // Handle advanced filters
  const handleAdvancedFiltersChange = (filtered: ToolConfig[], filters: any) => {
    setFilteredTools(filtered);
    setCurrentFilters(filters);
    setSelectedCategory('all'); // Reset category selection when using advanced filters
  };

  // Compute filtered and sorted tools
  const displayTools = useMemo(() => {
    // If advanced filters are active, use those results
    if (currentFilters && (currentFilters.categories.length > 0 || currentFilters.difficulties.length > 0 || currentFilters.searchVolume !== 'all')) {
      return filteredTools;
    }

    // Start with all tools or category filtered tools
    let filtered = selectedCategory === 'all'
      ? allTools
      : allTools.filter(tool => tool.category === selectedCategory);

    // Sort tools
    return [...filtered].sort((a, b) => {
      switch (sortBy) {
        case 'popularity':
          return (b.searchVolume || 0) - (a.searchVolume || 0);
        case 'name':
          return a.name.localeCompare(b.name);
        case 'category':
          return a.category.localeCompare(b.category);
        default:
          return 0;
      }
    });
  }, [selectedCategory, sortBy, allTools, currentFilters, filteredTools]);

  // Initialize filteredTools on mount
  useEffect(() => {
    if (!currentFilters) {
      const initial = allTools.sort((a, b) => (b.searchVolume || 0) - (a.searchVolume || 0));
      setFilteredTools(initial);
    }
  }, []); // Only run on mount

  const categoryStats = useMemo(() =>
    Object.entries(toolsByCategory).map(([key, tools]) => ({
      key,
      name: TOOL_CATEGORIES[key as keyof typeof TOOL_CATEGORIES]?.name || key,
      count: tools.length,
      totalSearchVolume: tools.reduce((sum, tool) => sum + (tool.searchVolume || 0), 0)
    })), [toolsByCategory]
  );

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
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
              All Free Online Converters & Calculators
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100 leading-relaxed">
              Professional-grade conversion tools and calculators for developers, engineers, students, and professionals.
              Browse by category, search by name, or filter by features.
            </p>

          </div>
        </div>
      </section>

      {/* Category Navigation */}
      <section className="py-12 bg-gradient-to-r from-gray-50 to-blue-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold mb-4">Browse Tools by Category</h2>
            <p className="text-gray-600">Discover specialized calculators and converters organized by category to find exactly what you need</p>
          </div>
          
          {/* Category Filter Buttons */}
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            <Button
              variant={selectedCategory === 'all' ? 'default' : 'outline'}
              onClick={() => handleCategorySelect('all')}
              className="transition-all duration-200"
            >
              All Tools ({allTools.length})
            </Button>
            {categoryStats.map(({ key, name, count }) => (
              <Button
                key={key}
                variant={selectedCategory === key ? 'default' : 'outline'}
                onClick={() => handleCategorySelect(key)}
                className="transition-all duration-200"
              >
                {name} ({count})
              </Button>
            ))}
          </div>

          {/* Advanced Filters Toggle */}
          <div className="flex justify-center gap-4 mb-8">
            <Button
              variant={showAdvancedFilters ? 'default' : 'outline'}
              onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
              className="flex items-center gap-2"
            >
              🔧 Advanced Filters
              {showAdvancedFilters ? '▲' : '▼'}
            </Button>
            
            {!showAdvancedFilters && (
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">Quick sort:</span>
                <Button
                  variant={sortBy === 'popularity' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setSortBy('popularity')}
                >
                  Popularity
                </Button>
                <Button
                  variant={sortBy === 'name' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setSortBy('name')}
                >
                  Name
                </Button>
                <Button
                  variant={sortBy === 'category' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setSortBy('category')}
                >
                  Category
                </Button>
              </div>
            )}
          </div>

          {/* Advanced Filters Component */}
          {showAdvancedFilters && (
            <div className="max-w-4xl mx-auto mb-8">
              <AdvancedFilters
                tools={allTools}
                onFiltersChange={handleAdvancedFiltersChange}
                className="animate-fade-in-up"
              />
            </div>
          )}
        </div>
      </section>

      {/* Tools Grid */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          {/* Results Summary */}
          <div className="mb-8 text-center">
            <div className="flex flex-wrap justify-center items-center gap-4 text-sm text-gray-600">
              <span>Showing {displayTools.length} of {allTools.length} tools</span>
              {currentFilters && (currentFilters.categories.length > 0 || currentFilters.difficulties.length > 0 || currentFilters.searchVolume !== 'all') && (
                <Badge variant="outline" className="bg-blue-50 text-blue-700">
                  Filtered results
                </Badge>
              )}
              {selectedCategory !== 'all' && !showAdvancedFilters && (
                <Badge variant="outline" className="bg-green-50 text-green-700">
                  Category: {TOOL_CATEGORIES[selectedCategory as keyof typeof TOOL_CATEGORIES]?.name}
                </Badge>
              )}
            </div>
          </div>

          {/* Main Tools Display */}
          {selectedCategory === 'all' && (!currentFilters || (currentFilters.categories.length === 0 && currentFilters.difficulties.length === 0 && currentFilters.searchVolume === 'all')) ? (
            // Show all tools grouped by category (default view)
            <div className="space-y-16">
              {Object.entries(toolsByCategory).map(([categoryKey, categoryTools]) => {
                const categoryInfo = TOOL_CATEGORIES[categoryKey as keyof typeof TOOL_CATEGORIES];
                const displayTools = categoryTools.slice(0, 8); // Limit to 8 tools per category

                return (
                  <div key={`category-${categoryKey}`} className="category-section">
                    <div className="flex items-center justify-between mb-8">
                      <div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">
                          {categoryInfo.name}
                        </h3>
                        <p className="text-gray-600">{categoryInfo.description}</p>
                      </div>
                      <Badge variant="secondary" className="text-sm">
                        {categoryTools.length} tools
                      </Badge>
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                      {displayTools.map((tool, index) => (
                        <ModernToolCard
                          key={`category-${categoryKey}-tool-${tool.id}`}
                          tool={tool}
                          variant="default"
                          animationDelay={index * 100}
                          locale={locale}
                        />
                      ))}
                    </div>
                    {categoryTools.length > 8 && (
                      <div className="text-center mt-6">
                        <Button
                          variant="outline"
                          onClick={() => setSelectedCategory(categoryKey)}
                        >
                          View all {categoryTools.length} {categoryInfo.name.toLowerCase()} tools
                        </Button>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          ) : (
            // Show filtered or category-specific tools
            <div>
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  {selectedCategory !== 'all'
                    ? TOOL_CATEGORIES[selectedCategory as keyof typeof TOOL_CATEGORIES]?.name
                    : 'Filtered Tools'
                  }
                </h3>
                <p className="text-gray-600">
                  {displayTools.length} tool{displayTools.length !== 1 ? 's' : ''} found
                </p>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {displayTools.map((tool, index) => (
                  <ModernToolCard
                    key={`filtered-tool-${tool.id}-${index}`}
                    tool={tool}
                    variant="default"
                    animationDelay={index * 100}
                    locale={locale}
                  />
                ))}
              </div>

              {displayTools.length === 0 && (
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">🔍</div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">No tools found</h3>
                  <p className="text-gray-600">
                    Try adjusting your filters or search criteria.
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </section>
      

      {/* Call to Action */}
      {/* <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Need a Specific Calculator or Converter?</h2>
          <p className="text-xl mb-8 text-blue-100">
            We're continuously expanding our collection of professional tools. Request new calculators or suggest improvements to existing ones!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="bg-white text-blue-600 hover:bg-blue-50">
              Request New Tool
            </Button>
          
            <Button asChild size="lg" className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-semibold shadow-lg border-0">
              <Link href="/tools"> Explore All Tools</Link>
            </Button>
          </div>
        </div>
      </section> */}


    </div>
  );
}
