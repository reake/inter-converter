import React from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { getToolById, getToolsByCategory } from '@/config/tools';
import { ToolCategory } from '@/types/tools';

interface RelatedToolsSectionProps {
  currentToolId: string;
  category: ToolCategory;
  relatedToolIds?: string[];
  title?: string;
  maxTools?: number;
}

export function RelatedToolsSection({ 
  currentToolId, 
  category, 
  relatedToolIds = [], 
  title = "Related Tools",
  maxTools = 6 
}: RelatedToolsSectionProps) {
  // Get related tools by priority:
  // 1. Explicitly specified related tools
  // 2. Other tools in the same category
  const explicitRelatedTools = relatedToolIds
    .map(id => getToolById(id))
    .filter((tool): tool is NonNullable<typeof tool> => tool !== undefined && tool.id !== currentToolId);

  const categoryTools = getToolsByCategory(category)
    .filter(tool => tool.id !== currentToolId && !relatedToolIds.includes(tool.id))
    .sort((a, b) => (b.searchVolume || 0) - (a.searchVolume || 0));

  const allRelatedTools = [...explicitRelatedTools, ...categoryTools]
    .slice(0, maxTools);

  if (allRelatedTools.length === 0) {
    return null;
  }

  return (
    <section className="mt-16">
      <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center gap-3">
        <span className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center text-white text-sm font-bold">
          🔗
        </span>
        {title}
      </h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {allRelatedTools.map((tool) => (
          <Link key={tool.id} href={tool.path} className="block group">
            <Card className="h-full hover:shadow-lg transition-all duration-300 group-hover:scale-[1.02] border-0 shadow-md bg-gradient-to-br from-white to-gray-50">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2">
                      {tool.name}
                    </CardTitle>
                    <p className="text-gray-600 mt-2 text-sm line-clamp-2">
                      {tool.description}
                    </p>
                  </div>
                  <div className="ml-3 p-2 bg-blue-50 rounded-lg group-hover:bg-blue-100 transition-colors">
                    <span className="text-2xl">{tool.icon}</span>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="flex items-center justify-between">
                  <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 text-xs">
                    {tool.category.replace('-', ' ')}
                  </Badge>
                  {tool.searchVolume && (
                    <Badge variant="secondary" className="bg-gray-100 text-gray-700 text-xs">
                      {tool.searchVolume.toLocaleString()}/mo
                    </Badge>
                  )}
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  );
}