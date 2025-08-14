import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from '@/i18n/routing';
import { ToolConfig, ToolCategory } from '@/types/tools';
import { TOOLS_CONFIG, TOOL_CATEGORIES } from '@/config/tools';

interface RelatedToolsProps {
  currentToolId: string;
  category?: ToolCategory;
  maxTools?: number;
}

export function RelatedTools({ currentToolId, category, maxTools = 6 }: RelatedToolsProps) {
  // Get related tools based on category and popularity
  const getRelatedTools = (): ToolConfig[] => {
    let relatedTools = TOOLS_CONFIG.filter(tool => 
      tool.id !== currentToolId && tool.isActive
    );

    // Prioritize tools from the same category
    if (category) {
      const sameCategory = relatedTools.filter(tool => tool.category === category);
      const otherCategories = relatedTools.filter(tool => tool.category !== category);
      
      // Sort by search volume (popularity)
      sameCategory.sort((a, b) => (b.searchVolume || 0) - (a.searchVolume || 0));
      otherCategories.sort((a, b) => (b.searchVolume || 0) - (a.searchVolume || 0));
      
      // Take more from same category, fewer from others
      const sameCategoryCount = Math.min(sameCategory.length, Math.ceil(maxTools * 0.7));
      const otherCategoryCount = maxTools - sameCategoryCount;
      
      relatedTools = [
        ...sameCategory.slice(0, sameCategoryCount),
        ...otherCategories.slice(0, otherCategoryCount)
      ];
    } else {
      // Sort by search volume if no category specified
      relatedTools.sort((a, b) => (b.searchVolume || 0) - (a.searchVolume || 0));
      relatedTools = relatedTools.slice(0, maxTools);
    }

    return relatedTools;
  };

  const relatedTools = getRelatedTools();

  if (relatedTools.length === 0) {
    return null;
  }

  return (
    <section className="py-12">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-4">Related Tools</h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Discover more professional Converters tools and calculators to boost your productivity
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {relatedTools.map((tool) => {
          const categoryInfo = TOOL_CATEGORIES[tool.category as keyof typeof TOOL_CATEGORIES];
          
          return (
            <Card key={tool.id} className="group hover:shadow-lg transition-all duration-300 border-0 shadow-md">
              <CardHeader className="pb-3">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center text-white text-lg">
                    {tool.icon || '🔧'}
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-lg group-hover:text-blue-600 transition-colors">
                      {tool.name}
                    </CardTitle>
                    <div className="text-xs text-gray-500 font-medium">
                      {categoryInfo?.name || tool.category}
                    </div>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="pt-0">
                <CardDescription className="text-sm text-gray-600 mb-4 line-clamp-2">
                  {tool.description}
                </CardDescription>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    {tool.searchVolume && (
                      <span className="bg-gray-100 px-2 py-1 rounded-full">
                        {tool.searchVolume > 1000 
                          ? `${Math.round(tool.searchVolume / 1000)}k searches/mo`
                          : `${tool.searchVolume} searches/mo`
                        }
                      </span>
                    )}
                    <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full">
                      Free
                    </span>
                  </div>
                  
                  <Button asChild size="sm" variant="outline" className="group-hover:bg-blue-50 group-hover:border-blue-200">
                    <Link href={tool.path as any}>
                      Try Now
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="text-center">
        <Button asChild variant="outline" size="lg">
          <Link href="/tools">
            View All Tools
          </Link>
        </Button>
      </div>
    </section>
  );
}

// Category-specific related tools component
export function CategoryRelatedTools({ category, currentToolId }: { category: ToolCategory; currentToolId: string }) {
  const categoryInfo = TOOL_CATEGORIES[category];
  const categoryTools = TOOLS_CONFIG.filter(tool => 
    tool.category === category && 
    tool.id !== currentToolId && 
    tool.isActive
  ).slice(0, 4);

  if (categoryTools.length === 0) {
    return null;
  }

  return (
    <section className="py-8 bg-gray-50 rounded-2xl">
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold mb-2">More {categoryInfo.name} Tools</h3>
        <p className="text-gray-600">{categoryInfo.description}</p>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {categoryTools.map((tool) => (
          <div key={tool.id} className="bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-2xl">{tool.icon || '🔧'}</span>
              <div>
                <h4 className="font-semibold text-gray-900">{tool.name}</h4>
                <p className="text-sm text-gray-600 line-clamp-1">{tool.description}</p>
              </div>
            </div>
            <Button asChild size="sm" variant="outline" className="w-full mt-2">
              <Link href={tool.path as any}>
                Use Tool
              </Link>
            </Button>
          </div>
        ))}
      </div>
    </section>
  );
}

// Popular tools showcase
export function PopularToolsShowcase({ currentToolId, maxTools = 3 }: { currentToolId: string; maxTools?: number }) {
  const popularTools = TOOLS_CONFIG
    .filter(tool => tool.id !== currentToolId && tool.isActive)
    .sort((a, b) => (b.searchVolume || 0) - (a.searchVolume || 0))
    .slice(0, maxTools);

  return (
    <section className="py-8">
      <h3 className="text-xl font-bold mb-4 text-center">Most Popular Tools</h3>
      <div className="flex flex-wrap justify-center gap-3">
        {popularTools.map((tool) => (
          <Button key={tool.id} asChild variant="outline" size="sm">
            <Link href={tool.path as any} className="flex items-center gap-2">
              <span>{tool.icon || '🔧'}</span>
              {tool.name}
            </Link>
          </Button>
        ))}
      </div>
    </section>
  );
}
