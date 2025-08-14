'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ToolConfig } from '@/types/tools';
import { TOOL_CATEGORIES } from '@/config/tools';

interface ModernToolCardProps {
  tool: ToolConfig;
  variant?: 'default' | 'featured' | 'compact';
  showStats?: boolean;
  showDescription?: boolean;
  animationDelay?: number;
  locale?: string;
}

export function ModernToolCard({ 
  tool, 
  variant = 'default',
  showStats = true,
  showDescription = true,
  animationDelay = 0,
  locale = 'en'
}: ModernToolCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const categoryInfo = TOOL_CATEGORIES[tool.category as keyof typeof TOOL_CATEGORIES];
  
  const getCategoryGradient = (category: string) => {
    const gradients = {
      'time': 'from-blue-500 to-cyan-500',
      'finance': 'from-green-500 to-emerald-500',
      'unit': 'from-purple-500 to-violet-500',
      'media': 'from-orange-500 to-red-500',
      'color': 'from-pink-500 to-rose-500',
      'health': 'from-teal-500 to-green-500',
      'science': 'from-indigo-500 to-blue-500',
      'auto': 'from-gray-700 to-gray-900'
    };
    return gradients[category as keyof typeof gradients] || 'from-gray-500 to-gray-700';
  };

  const getDifficultyInfo = (difficulty: number) => {
    if (difficulty <= 2) return { 
      color: 'bg-green-100 text-green-700 border-green-200', 
      text: 'Easy',
      icon: '🟢'
    };
    if (difficulty <= 3) return { 
      color: 'bg-yellow-100 text-yellow-700 border-yellow-200', 
      text: 'Medium',
      icon: '🟡'
    };
    return { 
      color: 'bg-red-100 text-red-700 border-red-200', 
      text: 'Advanced',
      icon: '🔴'
    };
  };

  const formatSearchVolume = (volume: number) => {
    if (volume >= 1000000) return `${(volume / 1000000).toFixed(1)}M`;
    if (volume >= 1000) return `${(volume / 1000).toFixed(1)}K`;
    return volume.toString();
  };

  const toolPath = locale === 'en' ? tool.path : `/${locale}${tool.path}`;
  const difficultyInfo = getDifficultyInfo(tool.difficulty || 1);
  const categoryGradient = getCategoryGradient(tool.category);

  const cardClasses = {
    default: "h-full transition-all duration-500 ease-out group-hover:scale-[1.03] group-hover:-translate-y-2 border-0 shadow-lg hover:shadow-2xl overflow-hidden bg-white",
    featured: "h-full transition-all duration-500 ease-out group-hover:scale-[1.03] group-hover:-translate-y-2 border-0 shadow-xl hover:shadow-2xl overflow-hidden bg-gradient-to-br from-white via-blue-50 to-purple-50",
    compact: "h-full transition-all duration-300 ease-out group-hover:scale-[1.02] border-0 shadow-md hover:shadow-lg overflow-hidden bg-white"
  };

  return (
    <div 
      className="group"
      style={{ 
        animationDelay: `${animationDelay}ms`,
        animation: 'fadeInUp 0.6s ease-out forwards'
      }}
    >
      <Link 
        href={toolPath} 
        className="block"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Card className={cardClasses[variant]}>
          {/* Top gradient bar for featured cards */}
          {variant === 'featured' && (
            <div className={`h-1 bg-gradient-to-r ${categoryGradient}`}></div>
          )}
          
          {/* Animated background pattern */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-500">
            <div className={`absolute inset-0 bg-gradient-to-br ${categoryGradient}`}></div>
          </div>
          
          <CardHeader className={variant === 'compact' ? 'pb-2' : 'pb-3'}>
            <div className="flex items-start justify-between relative z-10">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  {/* Icon with animated background */}
                  <div className={`relative flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-r ${categoryGradient} text-white text-xl shadow-lg transition-transform duration-300 ${isHovered ? 'scale-110 rotate-3' : ''}`}>
                    {tool.icon}
                    <div className="absolute inset-0 rounded-xl bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                  </div>
                  
                  {/* Badges */}
                  <div className="flex flex-col gap-1">
                    {variant === 'featured' && (
                      <Badge className="bg-gradient-to-r from-blue-500 to-purple-500 text-white border-0 text-xs px-2 py-1 shadow-md">
                        ⭐ Popular
                      </Badge>
                    )}
                    {tool.searchVolume && tool.searchVolume > 100000 && (
                      <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white border-0 text-xs px-2 py-1 shadow-md">
                        🔥 Trending
                      </Badge>
                    )}
                  </div>
                </div>
                
                <CardTitle className={`font-bold group-hover:text-blue-600 transition-colors duration-300 ${
                  variant === 'compact' ? 'text-base' : 'text-lg'
                } ${variant === 'featured' ? 'text-gray-900' : 'text-gray-800'}`}>
                  {tool.name}
                </CardTitle>
                
                {showDescription && (
                  <p className={`text-gray-600 mt-2 leading-relaxed ${
                    variant === 'compact' ? 'text-xs line-clamp-1' : 'text-sm line-clamp-2'
                  }`}>
                    {tool.description}
                  </p>
                )}
              </div>
            </div>
          </CardHeader>
          
          <CardContent className="pt-0 relative z-10">
            <div className="space-y-3">
              {/* Category and Difficulty */}
              <div className="flex items-center justify-between gap-2">
                <Badge 
                  variant="outline" 
                  className={`bg-gradient-to-r ${categoryGradient} bg-opacity-10 text-gray-700 border-gray-200 text-xs font-medium px-3 py-1`}
                >
                  {categoryInfo?.name || tool.category}
                </Badge>
                <Badge 
                  variant="outline" 
                  className={`text-xs font-medium px-2 py-1 ${difficultyInfo.color}`}
                >
                  {difficultyInfo.icon} {difficultyInfo.text}
                </Badge>
              </div>
              
              {/* Stats */}
              {showStats && tool.searchVolume && variant !== 'compact' && (
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-500 flex items-center gap-1">
                    📊 Monthly searches
                  </span>
                  <span className="font-bold text-gray-700 bg-gray-100 px-2 py-1 rounded-full">
                    {formatSearchVolume(tool.searchVolume)}
                  </span>
                </div>
              )}
              
              {/* Keywords */}
              {variant !== 'compact' && (
                <div className="flex flex-wrap gap-1">
                  {tool.keywords.slice(0, variant === 'featured' ? 4 : 3).map((keyword, index) => (
                    <span 
                      key={index}
                      className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full hover:bg-gray-200 transition-colors duration-200"
                    >
                      {keyword}
                    </span>
                  ))}
                  {tool.keywords.length > (variant === 'featured' ? 4 : 3) && (
                    <span className="text-xs text-gray-400 px-2 py-1 font-medium">
                      +{tool.keywords.length - (variant === 'featured' ? 4 : 3)} more
                    </span>
                  )}
                </div>
              )}
              
              {/* Hover indicator */}
              <div className="flex items-center justify-end opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="text-xs text-blue-600 font-medium flex items-center gap-1">
                  Try it now 
                  <svg className="w-3 h-3 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </Link>
      
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}