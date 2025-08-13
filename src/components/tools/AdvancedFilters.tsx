'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { TOOL_CATEGORIES } from '@/config/tools';
import { ToolConfig } from '@/types/tools';

interface FilterState {
  categories: string[];
  difficulties: number[];
  searchVolume: 'all' | 'high' | 'medium' | 'low';
  sortBy: 'popularity' | 'name' | 'category' | 'difficulty';
  sortOrder: 'asc' | 'desc';
}

interface AdvancedFiltersProps {
  tools: ToolConfig[];
  onFiltersChange: (filteredTools: ToolConfig[], filters: FilterState) => void;
  className?: string;
}

export function AdvancedFilters({ tools, onFiltersChange, className = '' }: AdvancedFiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [filters, setFilters] = useState<FilterState>({
    categories: [],
    difficulties: [],
    searchVolume: 'all',
    sortBy: 'popularity',
    sortOrder: 'desc'
  });

  const [isExpanded, setIsExpanded] = useState(false);

  // Initialize filters from URL parameters
  useEffect(() => {
    const urlFilters: FilterState = {
      categories: searchParams.get('categories')?.split(',').filter(Boolean) || [],
      difficulties: searchParams.get('difficulties')?.split(',').map(Number).filter(Boolean) || [],
      searchVolume: (searchParams.get('searchVolume') as FilterState['searchVolume']) || 'all',
      sortBy: (searchParams.get('sortBy') as FilterState['sortBy']) || 'popularity',
      sortOrder: (searchParams.get('sortOrder') as FilterState['sortOrder']) || 'desc'
    };
    
    setFilters(urlFilters);
  }, [searchParams]);

  // Update URL when filters change
  const updateURL = (newFilters: FilterState) => {
    const params = new URLSearchParams();
    
    if (newFilters.categories.length > 0) {
      params.set('categories', newFilters.categories.join(','));
    }
    if (newFilters.difficulties.length > 0) {
      params.set('difficulties', newFilters.difficulties.join(','));
    }
    if (newFilters.searchVolume !== 'all') {
      params.set('searchVolume', newFilters.searchVolume);
    }
    if (newFilters.sortBy !== 'popularity') {
      params.set('sortBy', newFilters.sortBy);
    }
    if (newFilters.sortOrder !== 'desc') {
      params.set('sortOrder', newFilters.sortOrder);
    }

    const newURL = params.toString() ? `?${params.toString()}` : '';
    router.replace(newURL, { scroll: false });
  };

  // Apply filters and sorting
  const applyFilters = (newFilters: FilterState) => {
    let filtered = [...tools];

    // Category filter
    if (newFilters.categories.length > 0) {
      filtered = filtered.filter(tool => newFilters.categories.includes(tool.category));
    }

    // Difficulty filter
    if (newFilters.difficulties.length > 0) {
      filtered = filtered.filter(tool => 
        newFilters.difficulties.includes(tool.difficulty || 1)
      );
    }

    // Search volume filter
    if (newFilters.searchVolume !== 'all') {
      filtered = filtered.filter(tool => {
        const volume = tool.searchVolume || 0;
        switch (newFilters.searchVolume) {
          case 'high': return volume > 100000;
          case 'medium': return volume > 20000 && volume <= 100000;
          case 'low': return volume <= 20000;
          default: return true;
        }
      });
    }

    // Sort
    filtered.sort((a, b) => {
      let comparison = 0;
      
      switch (newFilters.sortBy) {
        case 'popularity':
          comparison = (b.searchVolume || 0) - (a.searchVolume || 0);
          break;
        case 'name':
          comparison = a.name.localeCompare(b.name);
          break;
        case 'category':
          comparison = a.category.localeCompare(b.category);
          break;
        case 'difficulty':
          comparison = (a.difficulty || 1) - (b.difficulty || 1);
          break;
      }
      
      return newFilters.sortOrder === 'asc' ? comparison : -comparison;
    });

    onFiltersChange(filtered, newFilters);
  };

  // Handle filter changes
  const handleFilterChange = (newFilters: Partial<FilterState>) => {
    const updatedFilters = { ...filters, ...newFilters };
    setFilters(updatedFilters);
    updateURL(updatedFilters);
    applyFilters(updatedFilters);
  };

  // Toggle category filter
  const toggleCategory = (category: string) => {
    const newCategories = filters.categories.includes(category)
      ? filters.categories.filter(c => c !== category)
      : [...filters.categories, category];
    
    handleFilterChange({ categories: newCategories });
  };

  // Toggle difficulty filter
  const toggleDifficulty = (difficulty: number) => {
    const newDifficulties = filters.difficulties.includes(difficulty)
      ? filters.difficulties.filter(d => d !== difficulty)
      : [...filters.difficulties, difficulty];
    
    handleFilterChange({ difficulties: newDifficulties });
  };

  // Clear all filters
  const clearFilters = () => {
    const clearedFilters: FilterState = {
      categories: [],
      difficulties: [],
      searchVolume: 'all',
      sortBy: 'popularity',
      sortOrder: 'desc'
    };
    
    setFilters(clearedFilters);
    updateURL(clearedFilters);
    applyFilters(clearedFilters);
  };

  // Apply filters on mount
  useEffect(() => {
    applyFilters(filters);
  }, [tools]);

  const getDifficultyLabel = (difficulty: number) => {
    switch (difficulty) {
      case 1: return { label: 'Easy', color: 'bg-green-100 text-green-700', icon: '🟢' };
      case 2: return { label: 'Medium', color: 'bg-yellow-100 text-yellow-700', icon: '🟡' };
      case 3: return { label: 'Hard', color: 'bg-orange-100 text-orange-700', icon: '🟠' };
      case 4: return { label: 'Expert', color: 'bg-red-100 text-red-700', icon: '🔴' };
      default: return { label: 'Easy', color: 'bg-green-100 text-green-700', icon: '🟢' };
    }
  };

  const activeFiltersCount = filters.categories.length + filters.difficulties.length + 
    (filters.searchVolume !== 'all' ? 1 : 0);

  return (
    <Card className={`${className} transition-all duration-300`}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center gap-2">
            🔍 Filters & Sort
            {activeFiltersCount > 0 && (
              <Badge variant="secondary" className="ml-2">
                {activeFiltersCount} active
              </Badge>
            )}
          </CardTitle>
          <div className="flex gap-2">
            {activeFiltersCount > 0 && (
              <Button variant="ghost" size="sm" onClick={clearFilters}>
                Clear All
              </Button>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsExpanded(!isExpanded)}
            >
              {isExpanded ? '▲' : '▼'}
            </Button>
          </div>
        </div>
      </CardHeader>
      
      {isExpanded && (
        <CardContent className="space-y-6">
          {/* Sort Options */}
          <div className="space-y-3">
            <h4 className="font-medium text-sm text-gray-700">Sort By</h4>
            <div className="flex flex-wrap gap-2">
              <Select
                value={filters.sortBy}
                onValueChange={(value) => handleFilterChange({ sortBy: value as FilterState['sortBy'] })}
              >
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="popularity">Popularity</SelectItem>
                  <SelectItem value="name">Name</SelectItem>
                  <SelectItem value="category">Category</SelectItem>
                  <SelectItem value="difficulty">Difficulty</SelectItem>
                </SelectContent>
              </Select>
              
              <Select
                value={filters.sortOrder}
                onValueChange={(value) => handleFilterChange({ sortOrder: value as FilterState['sortOrder'] })}
              >
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="desc">High to Low</SelectItem>
                  <SelectItem value="asc">Low to High</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Category Filters */}
          <div className="space-y-3">
            <h4 className="font-medium text-sm text-gray-700">Categories</h4>
            <div className="flex flex-wrap gap-2">
              {Object.entries(TOOL_CATEGORIES).map(([key, category]) => (
                <Button
                  key={key}
                  variant={filters.categories.includes(key) ? "default" : "outline"}
                  size="sm"
                  onClick={() => toggleCategory(key)}
                  className="text-xs"
                >
                  {category.name}
                </Button>
              ))}
            </div>
          </div>

          {/* Difficulty Filters */}
          <div className="space-y-3">
            <h4 className="font-medium text-sm text-gray-700">Difficulty</h4>
            <div className="flex flex-wrap gap-2">
              {[1, 2, 3, 4].map((difficulty) => {
                const diffInfo = getDifficultyLabel(difficulty);
                return (
                  <Button
                    key={difficulty}
                    variant={filters.difficulties.includes(difficulty) ? "default" : "outline"}
                    size="sm"
                    onClick={() => toggleDifficulty(difficulty)}
                    className="text-xs"
                  >
                    {diffInfo.icon} {diffInfo.label}
                  </Button>
                );
              })}
            </div>
          </div>

          {/* Search Volume Filter */}
          <div className="space-y-3">
            <h4 className="font-medium text-sm text-gray-700">Popularity</h4>
            <Select
              value={filters.searchVolume}
              onValueChange={(value) => handleFilterChange({ searchVolume: value as FilterState['searchVolume'] })}
            >
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Tools</SelectItem>
                <SelectItem value="high">High Traffic (100K+ searches)</SelectItem>
                <SelectItem value="medium">Medium Traffic (20K-100K)</SelectItem>
                <SelectItem value="low">Low Traffic (&lt;20K)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      )}
    </Card>
  );
}
