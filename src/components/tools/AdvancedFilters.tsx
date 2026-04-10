'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Search, X } from 'lucide-react';
import { getToolCategories } from '@/config/tools';
import { ToolConfig } from '@/types/tools';

export interface FilterState {
  categories: string[];
  difficulties: number[];
  searchVolume: 'all' | 'high' | 'medium' | 'low';
  sortBy: 'popularity' | 'name' | 'category' | 'difficulty';
  sortOrder: 'asc' | 'desc';
  searchQuery: string;
}

interface AdvancedFiltersProps {
  tools: ToolConfig[];
  onFiltersChange: (filteredTools: ToolConfig[], filters: FilterState) => void;
  className?: string;
  locale?: string;
}

export function AdvancedFilters({ tools, onFiltersChange, className = '', locale = 'en' }: AdvancedFiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const toolCategories = getToolCategories(locale);
  const localePrefix = locale === 'zh';
  
  const [filters, setFilters] = useState<FilterState>({
    categories: [],
    difficulties: [],
    searchVolume: 'all',
    sortBy: 'popularity',
    sortOrder: 'desc',
    searchQuery: ''
  });

  const [isExpanded, setIsExpanded] = useState(false);

  // Initialize filters from URL parameters
  useEffect(() => {
    const urlFilters: FilterState = {
      categories: searchParams.get('categories')?.split(',').filter(Boolean) || [],
      difficulties: searchParams.get('difficulties')?.split(',').map(Number).filter(Boolean) || [],
      searchVolume: (searchParams.get('searchVolume') as FilterState['searchVolume']) || 'all',
      sortBy: (searchParams.get('sortBy') as FilterState['sortBy']) || 'popularity',
      sortOrder: (searchParams.get('sortOrder') as FilterState['sortOrder']) || 'desc',
      searchQuery: searchParams.get('search') || ''
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
    if (newFilters.searchQuery.trim()) {
      params.set('search', newFilters.searchQuery.trim());
    }

    const newURL = params.toString() ? `?${params.toString()}` : '';
    router.replace(newURL, { scroll: false });
  };

  // Apply filters and sorting
  const applyFilters = useCallback((newFilters: FilterState) => {
    let filtered = [...tools];

    // Search query filter
    if (newFilters.searchQuery.trim()) {
      const query = newFilters.searchQuery.toLowerCase().trim();
      filtered = filtered.filter(tool => 
        tool.name.toLowerCase().includes(query) ||
        tool.description.toLowerCase().includes(query) ||
        tool.keywords.some(keyword => keyword.toLowerCase().includes(query)) ||
        tool.category.toLowerCase().includes(query)
      );
    }

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
  }, [tools, onFiltersChange]);

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
      sortOrder: 'desc',
      searchQuery: ''
    };
    
    setFilters(clearedFilters);
    updateURL(clearedFilters);
    applyFilters(clearedFilters);
  };

  // Apply filters on mount
  useEffect(() => {
    applyFilters(filters);
  }, [applyFilters, filters]);

  const getDifficultyLabel = (difficulty: number) => {
    switch (difficulty) {
      case 1: return { label: getDifficultyText(1), color: 'bg-green-100 text-green-700', icon: '🟢' };
      case 2: return { label: getDifficultyText(2), color: 'bg-yellow-100 text-yellow-700', icon: '🟡' };
      case 3: return { label: getDifficultyText(3), color: 'bg-orange-100 text-orange-700', icon: '🟠' };
      case 4: return { label: getDifficultyText(4), color: 'bg-red-100 text-red-700', icon: '🔴' };
      default: return { label: getDifficultyText(1), color: 'bg-green-100 text-green-700', icon: '🟢' };
    }
  };

  const activeFiltersCount = filters.categories.length + filters.difficulties.length +
    (filters.searchVolume !== 'all' ? 1 : 0) + (filters.searchQuery.trim() ? 1 : 0);
  const filterTitle = localePrefix ? '筛选与排序' : 'Filters & Sort';
  const activeLabel = localePrefix ? '已启用' : 'active';
  const clearAllLabel = localePrefix ? '清除全部' : 'Clear All';
  const searchToolsLabel = localePrefix ? '搜索工具' : 'Search Tools';
  const searchPlaceholder = localePrefix ? '按名称、描述或关键词搜索...' : 'Search by name, description, or keywords...';
  const sortByLabel = localePrefix ? '排序方式' : 'Sort By';
  const categoriesLabel = localePrefix ? '分类' : 'Categories';
  const difficultyLabel = localePrefix ? '难度' : 'Difficulty';
  const popularityLabel = localePrefix ? '热门度' : 'Popularity';
  const allToolsLabel = localePrefix ? '所有工具' : 'All Tools';
  const highTrafficLabel = localePrefix ? '高流量（10万+ 搜索）' : 'High Traffic (100K+ searches)';
  const mediumTrafficLabel = localePrefix ? '中流量（2万-10万）' : 'Medium Traffic (20K-100K)';
  const lowTrafficLabel = localePrefix ? '低流量（少于2万）' : 'Low Traffic (<20K)';
  const highToLowLabel = localePrefix ? '从高到低' : 'High to Low';
  const lowToHighLabel = localePrefix ? '从低到高' : 'Low to High';
  const popularityOptionLabel = localePrefix ? '热门度' : 'Popularity';
  const nameOptionLabel = localePrefix ? '名称' : 'Name';
  const categoryOptionLabel = localePrefix ? '分类' : 'Category';
  const difficultyOptionLabel = localePrefix ? '难度' : 'Difficulty';
  const getDifficultyText = (difficulty: number) => {
    switch (difficulty) {
      case 1: return localePrefix ? '简单' : 'Easy';
      case 2: return localePrefix ? '中等' : 'Medium';
      case 3: return localePrefix ? '较难' : 'Hard';
      case 4: return localePrefix ? '专家' : 'Expert';
      default: return localePrefix ? '简单' : 'Easy';
    }
  };

  return (
    <Card className={`${className} transition-all duration-300`}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center gap-2">
            🔍 {filterTitle}
            {activeFiltersCount > 0 && (
              <Badge variant="secondary" className="ml-2">
                {activeFiltersCount} {activeLabel}
              </Badge>
            )}
          </CardTitle>
          <div className="flex gap-2">
            {activeFiltersCount > 0 && (
              <Button variant="ghost" size="sm" onClick={clearFilters}>
                {clearAllLabel}
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
          {/* Search Input */}
          <div className="space-y-3">
            <h4 className="font-medium text-sm text-gray-700">{searchToolsLabel}</h4>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                type="text"
                placeholder={searchPlaceholder}
                value={filters.searchQuery}
                onChange={(e) => handleFilterChange({ searchQuery: e.target.value })}
                className="pl-10 pr-10"
              />
              {filters.searchQuery && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleFilterChange({ searchQuery: '' })}
                  className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0"
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>
          </div>

          {/* Sort Options */}
          <div className="space-y-3">
            <h4 className="font-medium text-sm text-gray-700">{sortByLabel}</h4>
            <div className="flex flex-wrap gap-2">
              <Select
                value={filters.sortBy}
                onValueChange={(value) => handleFilterChange({ sortBy: value as FilterState['sortBy'] })}
              >
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="popularity">{popularityOptionLabel}</SelectItem>
                  <SelectItem value="name">{nameOptionLabel}</SelectItem>
                  <SelectItem value="category">{categoryOptionLabel}</SelectItem>
                  <SelectItem value="difficulty">{difficultyOptionLabel}</SelectItem>
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
                  <SelectItem value="desc">{highToLowLabel}</SelectItem>
                  <SelectItem value="asc">{lowToHighLabel}</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Category Filters */}
          <div className="space-y-3">
            <h4 className="font-medium text-sm text-gray-700">{categoriesLabel}</h4>
            <div className="flex flex-wrap gap-2">
              {Object.entries(toolCategories).map(([key, category]) => (
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
            <h4 className="font-medium text-sm text-gray-700">{difficultyLabel}</h4>
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
            <h4 className="font-medium text-sm text-gray-700">{popularityLabel}</h4>
            <Select
              value={filters.searchVolume}
              onValueChange={(value) => handleFilterChange({ searchVolume: value as FilterState['searchVolume'] })}
            >
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{allToolsLabel}</SelectItem>
                <SelectItem value="high">{highTrafficLabel}</SelectItem>
                <SelectItem value="medium">{mediumTrafficLabel}</SelectItem>
                <SelectItem value="low">{lowTrafficLabel}</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      )}
    </Card>
  );
}
