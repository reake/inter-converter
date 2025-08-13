import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

interface ToolCardSkeletonProps {
  variant?: 'default' | 'featured' | 'compact';
  count?: number;
}

export function ToolCardSkeleton({ variant = 'default', count = 1 }: ToolCardSkeletonProps) {
  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <Card key={index} className="h-full border-0 shadow-lg overflow-hidden bg-white animate-pulse">
          {variant === 'featured' && (
            <div className="h-1 bg-gray-200"></div>
          )}
          
          <CardHeader className={variant === 'compact' ? 'pb-2' : 'pb-3'}>
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  {/* Icon skeleton */}
                  <div className="w-12 h-12 rounded-xl bg-gray-200"></div>
                  
                  {/* Badges skeleton */}
                  {variant === 'featured' && (
                    <div className="flex flex-col gap-1">
                      <div className="w-16 h-5 bg-gray-200 rounded-full"></div>
                    </div>
                  )}
                </div>
                
                {/* Title skeleton */}
                <div className={`bg-gray-200 rounded ${
                  variant === 'compact' ? 'h-4 w-32' : 'h-5 w-40'
                } mb-2`}></div>
                
                {/* Description skeleton */}
                <div className="space-y-1">
                  <div className={`bg-gray-200 rounded ${
                    variant === 'compact' ? 'h-3 w-full' : 'h-4 w-full'
                  }`}></div>
                  {variant !== 'compact' && (
                    <div className="bg-gray-200 rounded h-4 w-3/4"></div>
                  )}
                </div>
              </div>
            </div>
          </CardHeader>
          
          <CardContent className="pt-0">
            <div className="space-y-3">
              {/* Badges skeleton */}
              <div className="flex items-center justify-between gap-2">
                <div className="w-20 h-6 bg-gray-200 rounded-full"></div>
                <div className="w-16 h-6 bg-gray-200 rounded-full"></div>
              </div>
              
              {/* Stats skeleton */}
              {variant !== 'compact' && (
                <div className="flex items-center justify-between">
                  <div className="w-24 h-4 bg-gray-200 rounded"></div>
                  <div className="w-12 h-5 bg-gray-200 rounded-full"></div>
                </div>
              )}
              
              {/* Keywords skeleton */}
              {variant !== 'compact' && (
                <div className="flex flex-wrap gap-1">
                  <div className="w-16 h-6 bg-gray-200 rounded-full"></div>
                  <div className="w-20 h-6 bg-gray-200 rounded-full"></div>
                  <div className="w-14 h-6 bg-gray-200 rounded-full"></div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </>
  );
}