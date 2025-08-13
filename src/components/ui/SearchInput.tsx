'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { TOOL_CATEGORIES } from '@/config/tools';
import { getSearchSuggestions, SearchResult } from '@/lib/search-engine';
import { useSearch } from '@/lib/search-context';
import { ToolConfig } from '@/types/tools';

interface ToolSuggestion {
  id: string;
  name: string;
  path: string;
  category: string;
  icon: string;
  relevanceScore: number;
  matchType: string;
}

interface SearchInputProps {
  placeholder?: string;
  redirectTo?: string;
  locale?: string;
  onSearch?: (query: string) => void;
  showSuggestions?: boolean;
}

export function SearchInput({ 
  placeholder = "Search...", 
  redirectTo = "/tools",
  locale = 'en',
  onSearch,
  showSuggestions = true
}: SearchInputProps) {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<ToolSuggestion[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [isLoading, setIsLoading] = useState(false);
  
  const inputRef = useRef<HTMLInputElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const { addToHistory, navigateWithSearch } = useSearch();

  // Debounced search function
  const debouncedSearch = useCallback(
    debounce((searchQuery: string) => {
      if (searchQuery.trim().length === 0) {
        setSuggestions([]);
        setIsOpen(false);
        return;
      }

      setIsLoading(true);
      const results = getSearchSuggestions(searchQuery, 6);
      
      // Convert to suggestions format
      const toolSuggestions: ToolSuggestion[] = results.map((result: SearchResult) => ({
        id: result.tool.id,
        name: result.tool.name,
        path: result.tool.path,
        category: result.tool.category,
        icon: result.tool.icon || '🔧',
        relevanceScore: result.score,
        matchType: result.matchType
      }));

      setSuggestions(toolSuggestions);
      setIsOpen(toolSuggestions.length > 0);
      setIsLoading(false);
    }, 300),
    []
  );



  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    setSelectedIndex(-1);
    
    if (showSuggestions) {
      debouncedSearch(value);
    }
  };

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!isOpen || suggestions.length === 0) {
      if (e.key === 'Enter' && query.trim()) {
        handleSearch();
      }
      return;
    }

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex(prev => 
          prev < suggestions.length - 1 ? prev + 1 : prev
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(prev => prev > 0 ? prev - 1 : -1);
        break;
      case 'Enter':
        e.preventDefault();
        if (selectedIndex >= 0) {
          navigateToTool(suggestions[selectedIndex]);
        } else if (query.trim()) {
          handleSearch();
        }
        break;
      case 'Escape':
        setIsOpen(false);
        setSelectedIndex(-1);
        inputRef.current?.blur();
        break;
    }
  };

  // Handle search submission
  const handleSearch = () => {
    if (query.trim()) {
      addToHistory(query);
      
      if (onSearch) {
        onSearch(query);
      } else {
        // If we have suggestions, navigate to the first one
        if (suggestions.length > 0) {
          navigateToTool(suggestions[0]);
        } else {
          // Fallback to tools page with search query
          navigateWithSearch(redirectTo, query);
        }
      }
    }
    setIsOpen(false);
  };

  // Navigate to specific tool
  const navigateToTool = (suggestion: ToolSuggestion) => {
    addToHistory(query);
    const toolPath = locale === 'en' ? suggestion.path : `/${locale}${suggestion.path}`;
    router.push(toolPath);
    setIsOpen(false);
    setQuery('');
  };

  // Handle suggestion click
  const handleSuggestionClick = (suggestion: ToolSuggestion) => {
    navigateToTool(suggestion);
  };

  // Handle input focus
  const handleFocus = () => {
    if (!showSuggestions) {
      // Original behavior - redirect to tools page
      router.push(redirectTo);
      return;
    }
    
    if (query.trim() && suggestions.length > 0) {
      setIsOpen(true);
    }
  };

  // Handle click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        suggestionsRef.current &&
        !suggestionsRef.current.contains(event.target as Node) &&
        !inputRef.current?.contains(event.target as Node)
      ) {
        setIsOpen(false);
        setSelectedIndex(-1);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative w-full">
      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          placeholder={placeholder}
          value={query}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onFocus={handleFocus}
          className="w-full px-4 py-3 text-lg border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
          autoComplete="off"
        />
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none">
          {isLoading ? (
            <div className="animate-spin w-5 h-5 border-2 border-gray-300 border-t-blue-500 rounded-full"></div>
          ) : (
            <span className="text-xl">🔍</span>
          )}
        </div>
      </div>

      {/* Suggestions Dropdown */}
      {showSuggestions && isOpen && suggestions.length > 0 && (
        <div
          ref={suggestionsRef}
          className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-lg z-50 max-h-80 overflow-y-auto"
        >
          {suggestions.map((suggestion, index) => (
            <div
              key={suggestion.id}
              onClick={() => handleSuggestionClick(suggestion)}
              className={`flex items-center px-4 py-3 cursor-pointer transition-colors duration-150 ${
                index === selectedIndex
                  ? 'bg-blue-50 border-l-4 border-blue-500'
                  : 'hover:bg-gray-50'
              } ${index === 0 ? 'rounded-t-xl' : ''} ${
                index === suggestions.length - 1 ? 'rounded-b-xl' : 'border-b border-gray-100'
              }`}
            >
              <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg text-white text-lg mr-3">
                {suggestion.icon}
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-medium text-gray-900 truncate">
                  {suggestion.name}
                </div>
                <div className="text-sm text-gray-500 capitalize">
                  {TOOL_CATEGORIES[suggestion.category as keyof typeof TOOL_CATEGORIES]?.name || suggestion.category}
                </div>
              </div>
              <div className="flex-shrink-0 text-gray-400">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// Debounce utility function
function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}