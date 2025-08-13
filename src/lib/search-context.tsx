'use client';

import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

interface SearchContextType {
  currentQuery: string;
  searchHistory: string[];
  recentSearches: string[];
  setCurrentQuery: (query: string) => void;
  addToHistory: (query: string) => void;
  clearHistory: () => void;
  navigateWithSearch: (path: string, query?: string) => void;
}

const SearchContext = createContext<SearchContextType | undefined>(undefined);

interface SearchProviderProps {
  children: ReactNode;
}

export function SearchProvider({ children }: SearchProviderProps) {
  const [currentQuery, setCurrentQueryState] = useState('');
  const [searchHistory, setSearchHistory] = useState<string[]>([]);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const router = useRouter();

  // Load search history from localStorage on mount
  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedHistory = localStorage.getItem('search_history');
      const savedRecent = localStorage.getItem('recent_searches');
      
      if (savedHistory) {
        try {
          setSearchHistory(JSON.parse(savedHistory));
        } catch (e) {
          console.warn('Failed to parse search history:', e);
        }
      }
      
      if (savedRecent) {
        try {
          setRecentSearches(JSON.parse(savedRecent));
        } catch (e) {
          console.warn('Failed to parse recent searches:', e);
        }
      }
    }
  }, []);

  const setCurrentQuery = useCallback((query: string) => {
    setCurrentQueryState(query);
  }, []);

  const addToHistory = useCallback((query: string) => {
    if (!query.trim()) return;

    setSearchHistory(prev => {
      const newHistory = [query, ...prev.filter(q => q !== query)].slice(0, 50);
      if (typeof window !== 'undefined') {
        localStorage.setItem('search_history', JSON.stringify(newHistory));
      }
      return newHistory;
    });

    setRecentSearches(prev => {
      const newRecent = [query, ...prev.filter(q => q !== query)].slice(0, 10);
      if (typeof window !== 'undefined') {
        localStorage.setItem('recent_searches', JSON.stringify(newRecent));
      }
      return newRecent;
    });
  }, []);

  const clearHistory = useCallback(() => {
    setSearchHistory([]);
    setRecentSearches([]);
    if (typeof window !== 'undefined') {
      localStorage.removeItem('search_history');
      localStorage.removeItem('recent_searches');
    }
  }, []);

  const navigateWithSearch = useCallback((path: string, query?: string) => {
    const searchQuery = query || currentQuery;
    if (searchQuery) {
      addToHistory(searchQuery);
      const url = new URL(path, window.location.origin);
      url.searchParams.set('q', searchQuery);
      router.push(url.pathname + url.search);
    } else {
      router.push(path);
    }
  }, [currentQuery, addToHistory, router]);

  const value: SearchContextType = {
    currentQuery,
    searchHistory,
    recentSearches,
    setCurrentQuery,
    addToHistory,
    clearHistory,
    navigateWithSearch
  };

  return (
    <SearchContext.Provider value={value}>
      {children}
    </SearchContext.Provider>
  );
}

export function useSearch() {
  const context = useContext(SearchContext);
  if (context === undefined) {
    throw new Error('useSearch must be used within a SearchProvider');
  }
  return context;
}

// Hook to get search params from URL
export function useSearchQuery() {
  const searchParams = useSearchParams();
  return searchParams.get('q') || '';
}