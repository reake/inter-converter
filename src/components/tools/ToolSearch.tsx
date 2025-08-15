'use client';

import React, { useState, useMemo } from 'react';
import { Input } from '@/components/ui/input';
import { Search, X } from 'lucide-react';
import { TOOLS_CONFIG } from '@/config/tools';
import Link from 'next/link';

interface ToolSearchProps {
  onSearch?: (query: string) => void;
  placeholder?: string;
  className?: string;
}

export function ToolSearch({
  onSearch,
  placeholder = "Search tools...",
  className = ""
}: ToolSearchProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [showResults, setShowResults] = useState(false);

  const handleSearch = (value: string) => {
    setSearchQuery(value);
    setShowResults(value.trim().length > 0);
    onSearch?.(value);
  };

  const clearSearch = () => {
    setSearchQuery('');
    setShowResults(false);
    onSearch?.('');
  };

  // Search results for dropdown
  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];

    const query = searchQuery.toLowerCase().trim();
    const allTools = TOOLS_CONFIG.filter(tool => tool.isActive);

    return allTools
      .filter(tool =>
        tool.name.toLowerCase().includes(query) ||
        tool.description.toLowerCase().includes(query) ||
        tool.keywords.some(keyword => keyword.toLowerCase().includes(query))
      )
      .slice(0, 8); // Limit to 8 results for dropdown
  }, [searchQuery]);

  return (
    <div className={`relative max-w-2xl mx-auto ${className}`}>
      <div className="relative">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
        <Input
          type="text"
          placeholder={placeholder}
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
          onFocus={() => setShowResults(searchQuery.trim().length > 0)}
          className="pl-12 pr-12 py-4 text-lg border-2 border-white/20 bg-white/10 backdrop-blur-sm text-white placeholder-white/70 focus:border-white/40 focus:bg-white/20 transition-all duration-300"
        />
        {searchQuery && (
          <button
            onClick={clearSearch}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        )}
      </div>

      {/* Search Results Dropdown */}
      {showResults && searchResults.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-xl border max-h-80 overflow-y-auto z-50">
          <div className="p-2">
            <div className="text-xs text-gray-500 px-3 py-2 border-b">
              Found {searchResults.length} result{searchResults.length !== 1 ? 's' : ''}
            </div>
            {searchResults.map((tool) => (
              <Link
                key={tool.id}
                href={tool.path}
                className="block px-3 py-3 hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-b-0"
                onClick={() => {
                  setShowResults(false);
                }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="font-medium text-gray-900 text-sm">
                      {tool.name}
                    </div>
                    <div className="text-xs text-gray-600 mt-1 line-clamp-2">
                      {tool.description}
                    </div>
                  </div>
                  <div className="ml-3 flex items-center gap-2">
                    <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full capitalize">
                      {tool.category}
                    </span>
                    <span className="text-xs text-gray-400">
                      {tool.icon}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* No Results */}
      {showResults && searchQuery.trim() && searchResults.length === 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-lg border z-50">
          <div className="p-4 text-center text-gray-600">
            <Search className="h-8 w-8 mx-auto mb-2 text-gray-400" />
            <div className="text-sm">No tools found for "{searchQuery}"</div>
            <div className="text-xs text-gray-500 mt-1">Try different keywords or browse by category</div>
          </div>
        </div>
      )}

      {/* Click outside to close */}
      {showResults && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setShowResults(false)}
        />
      )}
    </div>
  );
}