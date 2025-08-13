'use client';

import React from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ToolConfig } from '@/types/tools';
import { TOOLS_CONFIG, TOOL_CATEGORIES } from '@/config/tools';

interface RelatedToolsEngineProps {
  currentTool?: ToolConfig;
  category?: string;
  maxItems?: number;
  variant?: 'grid' | 'list' | 'carousel';
  showCategory?: boolean;
  locale?: string;
  className?: string;
}

interface RelatedToolScore {
  tool: ToolConfig;
  score: number;
  reasons: string[];
}

export function RelatedToolsEngine({
  currentTool,
  category,
  maxItems = 6,
  variant = 'grid',
  showCategory = true,
  locale = 'en',
  className = ''
}: RelatedToolsEngineProps) {
  
  // Calculate relevance score for tools
  const calculateRelevanceScore = (tool: ToolConfig): RelatedToolScore => {
    let score = 0;
    const reasons: string[] = [];

    // Skip the current tool
    if (currentTool && tool.id === currentTool.id) {
      return { tool, score: -1, reasons: [] };
    }

    // Same category gets high score
    if (currentTool && tool.category === currentTool.category) {
      score += 100;
      reasons.push('Same category');
    } else if (category && tool.category === category) {
      score += 100;
      reasons.push('Category match');
    }

    // Keyword overlap
    if (currentTool) {
      const commonKeywords = tool.keywords.filter(keyword => 
        currentTool.keywords.some(currentKeyword => 
          currentKeyword.toLowerCase().includes(keyword.toLowerCase()) ||
          keyword.toLowerCase().includes(currentKeyword.toLowerCase())
        )
      );
      score += commonKeywords.length * 20;
      if (commonKeywords.length > 0) {
        reasons.push(`${commonKeywords.length} shared keywords`);
      }
    }

    // Popularity boost
    if (tool.searchVolume) {
      if (tool.searchVolume > 100000) {
        score += 30;
        reasons.push('High popularity');
      } else if (tool.searchVolume > 50000) {
        score += 20;
        reasons.push('Popular');
      } else if (tool.searchVolume > 20000) {
        score += 10;
        reasons.push('Moderately popular');
      }
    }

    // Difficulty similarity
    if (currentTool && tool.difficulty === currentTool.difficulty) {
      score += 15;
      reasons.push('Similar difficulty');
    }

    // Related category bonus
    const relatedCategories = getRelatedCategories(currentTool?.category || category);
    if (relatedCategories.includes(tool.category)) {
      score += 25;
      reasons.push('Related category');
    }

    // Name similarity (basic)
    if (currentTool) {
      const currentWords = currentTool.name.toLowerCase().split(' ');
      const toolWords = tool.name.toLowerCase().split(' ');
      const commonWords = currentWords.filter(word => 
        toolWords.some(toolWord => toolWord.includes(word) || word.includes(toolWord))
      );
      score += commonWords.length * 10;
      if (commonWords.length > 0) {
        reasons.push('Similar name');
      }
    }

    return { tool, score, reasons };
  };

  // Get related categories
  const getRelatedCategories = (toolCategory?: string): string[] => {
    const categoryRelations: Record<string, string[]> = {
      'time-date': ['unit-measurement', 'science-engineering'],
      'currency-finance': ['unit-measurement', 'science-engineering'],
      'unit-measurement': ['time-date', 'science-engineering', 'automotive'],
      'file-media': ['color-design'],
      'color-design': ['file-media'],
      'health-fitness': ['unit-measurement', 'science-engineering'],
      'science-engineering': ['unit-measurement', 'time-date', 'automotive'],
      'automotive': ['unit-measurement', 'science-engineering']
    };

    return categoryRelations[toolCategory || ''] || [];
  };

  // Get recommended tools
  const getRecommendedTools = (): RelatedToolScore[] => {
    const allTools = TOOLS_CONFIG.filter(tool => tool.isActive);
    
    const scoredTools = allTools
      .map(calculateRelevanceScore)
      .filter(item => item.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, maxItems);

    return scoredTools;
  };

  const recommendedTools = getRecommendedTools();

  if (recommendedTools.length === 0) {
    return null;
  }

  const renderToolCard = (item: RelatedToolScore, index: number) => {
    const { tool, score, reasons } = item;
    const toolPath = locale === 'en' ? tool.path : `/${locale}${tool.path}`;
    const categoryInfo = TOOL_CATEGORIES[tool.category as keyof typeof TOOL_CATEGORIES];

    return (
      <Card key={tool.id} className="h-full hover:shadow-lg transition-all duration-300 group">
        <Link href={toolPath} className="block h-full">
          <CardHeader className="pb-3">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3 flex-1">
                <div className="text-2xl">{tool.icon}</div>
                <div className="flex-1 min-w-0">
                  <CardTitle className="text-lg font-semibold group-hover:text-blue-600 transition-colors line-clamp-2">
                    {tool.name}
                  </CardTitle>
                  {showCategory && (
                    <Badge variant="outline" className="mt-1 text-xs">
                      {categoryInfo?.name || tool.category}
                    </Badge>
                  )}
                </div>
              </div>
              <div className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                {Math.round(score)}% match
              </div>
            </div>
          </CardHeader>
          
          <CardContent className="pt-0">
            <p className="text-gray-600 text-sm line-clamp-2 mb-3">
              {tool.description}
            </p>
            
            {/* Relevance reasons */}
            <div className="flex flex-wrap gap-1 mb-3">
              {reasons.slice(0, 2).map((reason, idx) => (
                <span 
                  key={idx}
                  className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full"
                >
                  {reason}
                </span>
              ))}
            </div>

            {/* Keywords */}
            <div className="flex flex-wrap gap-1">
              {tool.keywords.slice(0, 3).map((keyword, idx) => (
                <span 
                  key={idx}
                  className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full"
                >
                  {keyword}
                </span>
              ))}
              {tool.keywords.length > 3 && (
                <span className="text-xs text-gray-400 px-2 py-1">
                  +{tool.keywords.length - 3} more
                </span>
              )}
            </div>
          </CardContent>
        </Link>
      </Card>
    );
  };

  const renderListItem = (item: RelatedToolScore, index: number) => {
    const { tool, score, reasons } = item;
    const toolPath = locale === 'en' ? tool.path : `/${locale}${tool.path}`;
    const categoryInfo = TOOL_CATEGORIES[tool.category as keyof typeof TOOL_CATEGORIES];

    return (
      <div key={tool.id} className="flex items-center gap-4 p-4 border rounded-lg hover:bg-gray-50 transition-colors">
        <div className="text-2xl">{tool.icon}</div>
        <div className="flex-1 min-w-0">
          <Link href={toolPath} className="block">
            <h4 className="font-semibold text-gray-900 hover:text-blue-600 transition-colors">
              {tool.name}
            </h4>
            <p className="text-gray-600 text-sm line-clamp-1 mt-1">
              {tool.description}
            </p>
            <div className="flex items-center gap-2 mt-2">
              {showCategory && (
                <Badge variant="outline" className="text-xs">
                  {categoryInfo?.name || tool.category}
                </Badge>
              )}
              <span className="text-xs text-gray-500">
                {Math.round(score)}% match
              </span>
            </div>
          </Link>
        </div>
        <Button variant="ghost" size="sm" asChild>
          <Link href={toolPath}>
            Try it →
          </Link>
        </Button>
      </div>
    );
  };

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Header */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          {currentTool 
            ? `Related to ${currentTool.name}`
            : category 
            ? `More ${TOOL_CATEGORIES[category as keyof typeof TOOL_CATEGORIES]?.name} Tools`
            : 'Recommended Tools'
          }
        </h2>
        <p className="text-gray-600">
          {currentTool 
            ? 'Tools that work well with this one'
            : 'Tools you might find useful'
          }
        </p>
      </div>

      {/* Tools Display */}
      {variant === 'grid' && (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recommendedTools.map(renderToolCard)}
        </div>
      )}

      {variant === 'list' && (
        <div className="space-y-4">
          {recommendedTools.map(renderListItem)}
        </div>
      )}

      {variant === 'carousel' && (
        <div className="flex gap-4 overflow-x-auto pb-4">
          {recommendedTools.map((item, index) => (
            <div key={item.tool.id} className="flex-shrink-0 w-80">
              {renderToolCard(item, index)}
            </div>
          ))}
        </div>
      )}

      {/* View More Button */}
      {recommendedTools.length === maxItems && (
        <div className="text-center">
          <Button variant="outline" asChild>
            <Link href={category ? `/tools?categories=${category}` : '/tools'}>
              View More Tools
            </Link>
          </Button>
        </div>
      )}
    </div>
  );
}

// Utility function to get related tools for a specific tool
export function getRelatedTools(tool: ToolConfig, maxItems: number = 6): ToolConfig[] {
  const engine = new RelatedToolsEngine({ currentTool: tool, maxItems });
  // This would need to be refactored to work outside of React component
  // For now, return a simple category-based filter
  return TOOLS_CONFIG
    .filter(t => t.isActive && t.id !== tool.id && t.category === tool.category)
    .slice(0, maxItems);
}
