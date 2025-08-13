'use client';

import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

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

  const handleSearch = (value: string) => {
    setSearchQuery(value);
    onSearch?.(value);
  };

  return (
    <div className={`relative max-w-2xl mx-auto ${className}`}>
      <div className="relative">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
        <Input
          type="text"
          placeholder={placeholder}
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
          className="pl-12 pr-4 py-4 text-lg border-2 border-white/20 bg-white/10 backdrop-blur-sm text-white placeholder-white/70 focus:border-white/40 focus:bg-white/20 transition-all duration-300"
        />
      </div>
      {searchQuery && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-lg border max-h-60 overflow-y-auto z-50">
          <div className="p-4 text-gray-600 text-sm">
            Search functionality will be integrated with the main tool list below
          </div>
        </div>
      )}
    </div>
  );
}