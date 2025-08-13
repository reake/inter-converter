import React from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ToolConfig } from '@/types/tools';
import { TOOL_CATEGORIES } from '@/config/tools';

interface EnhancedToolCardProps {
  tool: ToolConfig;
  featured?: boolean;
  showStats?: boolean;
}

export function EnhancedToolCard({ tool, featured = false, showStats = true }: EnhancedToolCardProps) {
  const categoryInfo = TOOL_CATEGORIES[tool.category as keyof typeof TOOL_CATEGORIES];
  
  const getDifficultyColor = (difficulty: number) => {
    if (difficulty <= 2) return 'bg-green-100 text-green-700 border-green-200';
    if (difficulty <= 3) return 'bg-yellow-100 text-yellow-700 border-yellow-200';
    return 'bg-red-100 text-red-700 border-red-200';
  };

  const getDifficultyText = (difficulty: number) => {
    if (difficulty <= 2) return 'Easy';
    if (difficulty <= 3) return 'Medium';
    return 'Advanced';
  };

  return (
    <Link href={tool.path} className="block group">
      <Card className={`h-full transition-all duration-300 group-hover:scale-[1.02] border-0 shadow-lg overflow-hidden ${
        featured 
          ? 'bg-gradient-to-br from-blue-50 via-white to-purple-50 shadow-xl' 
          : 'bg-gradient-to-br from-white to-gray-50 hover:shadow-xl'
      }`}>
        {featured && (
          <div className="h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>
        )}
        
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-2xl">{tool.icon}</span>
                {featured && (
                  <Badge className="bg-gradient-to-r from-blue-500 to-purple-500 text-white border-0 text-xs">
                    Popular
                  </Badge>
                )}
              </div>
              <CardTitle className={`text-lg font-bold group-hover:text-blue-600 transition-colors line-clamp-2 ${
                featured ? 'text-gray-900' : 'text-gray-800'
              }`}>
                {tool.name}
              </CardTitle>
              <p className="text-gray-600 mt-2 text-sm line-clamp-2 leading-relaxed">
                {tool.description}
              </p>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="pt-0">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Badge 
                variant="outline" 
                className="bg-blue-50 text-blue-700 border-blue-200 text-xs"
              >
                {categoryInfo?.name || tool.category}
              </Badge>
              <Badge 
                variant="outline" 
                className={`text-xs ${getDifficultyColor(tool.difficulty || 1)}`}
              >
                {getDifficultyText(tool.difficulty || 1)}
              </Badge>
            </div>
            
            {showStats && tool.searchVolume && (
              <div className="flex items-center justify-between text-xs text-gray-500">
                <span>Monthly searches</span>
                <span className="font-medium">{tool.searchVolume.toLocaleString()}</span>
              </div>
            )}
            
            {/* Keywords preview */}
            <div className="flex flex-wrap gap-1">
              {tool.keywords.slice(0, 3).map((keyword, index) => (
                <span 
                  key={index}
                  className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full"
                >
                  {keyword}
                </span>
              ))}
              {tool.keywords.length > 3 && (
                <span className="text-xs text-gray-400 px-2 py-1">
                  +{tool.keywords.length - 3}
                </span>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}