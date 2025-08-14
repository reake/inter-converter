import { ToolConfig } from '@/types/tools';
import { TOOLS_CONFIG } from '@/config/tools';

export interface SearchResult {
  tool: ToolConfig;
  score: number;
  matchType: 'exact' | 'prefix' | 'contains' | 'keyword' | 'description';
}

export interface SearchAnalytics {
  query: string;
  timestamp: Date;
  resultsCount: number;
  selectedResult?: string;
  sessionId: string;
}

class SearchEngine {
  private searchHistory: SearchAnalytics[] = [];
  private searchCache = new Map<string, SearchResult[]>();
  private readonly CACHE_SIZE = 100;
  private readonly CACHE_TTL = 5 * 60 * 1000; // 5 minutes

  /**
   * Perform fuzzy search with advanced scoring
   */
  search(query: string, options: {
    limit?: number;
    minScore?: number;
    categories?: string[];
  } = {}): SearchResult[] {
    const { limit = 10, minScore = 1, categories } = options;
    
    if (!query.trim()) return [];

    const cacheKey = `${query.toLowerCase()}_${JSON.stringify(options)}`;
    
    // Check cache first
    const cached = this.searchCache.get(cacheKey);
    if (cached) {
      return cached.slice(0, limit);
    }

    const lowercaseQuery = query.toLowerCase();
    const results: SearchResult[] = [];

    // Filter tools by category if specified
    const toolsToSearch = categories 
      ? TOOLS_CONFIG.filter(tool => categories.includes(tool.category))
      : TOOLS_CONFIG;

    for (const tool of toolsToSearch) {
      if (!tool.isActive) continue;

      const score = this.calculateScore(tool, lowercaseQuery);
      if (score > minScore) {
        results.push({
          tool,
          score,
          matchType: this.getMatchType(tool, lowercaseQuery)
        });
      }
    }

    // Sort by score (descending)
    results.sort((a, b) => b.score - a.score);

    // Cache results
    this.cacheResults(cacheKey, results);

    // Track search analytics
    this.trackSearch(query, results.length);

    return results.slice(0, limit);
  }

  /**
   * Calculate relevance score for a tool
   */
  private calculateScore(tool: ToolConfig, query: string): number {
    let score = 0;
    let hasMatch = false;
    const toolName = tool.name.toLowerCase();
    const toolDescription = tool.description.toLowerCase();

    // Exact name match - highest priority
    if (toolName === query) {
      score += 1000;
      hasMatch = true;
    }

    // Name prefix match
    if (toolName.startsWith(query)) {
      score += 500;
      hasMatch = true;
    }

    // Name contains query
    if (toolName.includes(query)) {
      score += 200;
      hasMatch = true;
      // Bonus for shorter names (more specific)
      score += Math.max(0, 50 - toolName.length);
    }

    // Description prefix match
    if (toolDescription.startsWith(query)) {
      score += 100;
      hasMatch = true;
    }

    // Description contains query
    if (toolDescription.includes(query)) {
      score += 50;
      hasMatch = true;
    }

    // Keywords matching
    for (const keyword of tool.keywords) {
      const keywordLower = keyword.toLowerCase();
      if (keywordLower === query) {
        score += 300;
        hasMatch = true;
      } else if (keywordLower.startsWith(query)) {
        score += 150;
        hasMatch = true;
      } else if (keywordLower.includes(query)) {
        score += 75;
        hasMatch = true;
      }
    }

    // Category matching
    if (tool.category.toLowerCase().includes(query)) {
      score += 25;
      hasMatch = true;
    }

    // Only apply bonuses if there's an actual match
    if (hasMatch) {
      // Popularity boost
      if (tool.searchVolume) {
        if (tool.searchVolume > 100000) score += 20;
        else if (tool.searchVolume > 50000) score += 10;
        else if (tool.searchVolume > 20000) score += 5;
      }

      // Length penalty for very short queries
      if (query.length < 3 && toolName.length > 25) {
        score *= 0.8;
      }

      // Difficulty bonus (easier tools get slight boost)
      if (tool.difficulty && tool.difficulty <= 2) {
        score += 5;
      }
    }

    return hasMatch ? Math.round(score) : 0;
  }

  /**
   * Determine the type of match
   */
  private getMatchType(tool: ToolConfig, query: string): SearchResult['matchType'] {
    const toolName = tool.name.toLowerCase();
    const toolDescription = tool.description.toLowerCase();

    if (toolName === query) return 'exact';
    if (toolName.startsWith(query)) return 'prefix';
    if (toolName.includes(query)) return 'contains';
    
    // Check keywords
    for (const keyword of tool.keywords) {
      if (keyword.toLowerCase().includes(query)) {
        return 'keyword';
      }
    }

    if (toolDescription.includes(query)) return 'description';
    
    return 'contains';
  }

  /**
   * Cache search results
   */
  private cacheResults(key: string, results: SearchResult[]): void {
    // Clear old cache entries if we're at capacity
    if (this.searchCache.size >= this.CACHE_SIZE) {
      const firstKey = this.searchCache.keys().next().value;
      if (firstKey) {
        this.searchCache.delete(firstKey);
      }
    }

    this.searchCache.set(key, results);

    // Set TTL cleanup
    setTimeout(() => {
      this.searchCache.delete(key);
    }, this.CACHE_TTL);
  }

  /**
   * Track search analytics
   */
  private trackSearch(query: string, resultsCount: number): void {
    const analytics: SearchAnalytics = {
      query,
      timestamp: new Date(),
      resultsCount,
      sessionId: this.getSessionId()
    };

    this.searchHistory.push(analytics);

    // Keep only last 1000 searches
    if (this.searchHistory.length > 1000) {
      this.searchHistory = this.searchHistory.slice(-1000);
    }
  }

  /**
   * Get or create session ID
   */
  private getSessionId(): string {
    if (typeof window === 'undefined') return 'server';
    
    let sessionId = sessionStorage.getItem('search_session_id');
    if (!sessionId) {
      sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      sessionStorage.setItem('search_session_id', sessionId);
    }
    return sessionId;
  }

  /**
   * Get search suggestions based on query
   */
  getSuggestions(query: string, limit: number = 6): SearchResult[] {
    return this.search(query, { limit, minScore: 10 });
  }

  /**
   * Get popular searches
   */
  getPopularSearches(limit: number = 10): string[] {
    const searchCounts = new Map<string, number>();
    
    // Count search frequency
    for (const search of this.searchHistory) {
      const count = searchCounts.get(search.query) || 0;
      searchCounts.set(search.query, count + 1);
    }

    // Sort by frequency and return top queries
    return Array.from(searchCounts.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, limit)
      .map(([query]) => query);
  }

  /**
   * Clear search cache
   */
  clearCache(): void {
    this.searchCache.clear();
  }

  /**
   * Get search analytics
   */
  getAnalytics(): {
    totalSearches: number;
    uniqueQueries: number;
    averageResults: number;
    popularQueries: string[];
  } {
    const uniqueQueries = new Set(this.searchHistory.map(s => s.query)).size;
    const totalResults = this.searchHistory.reduce((sum, s) => sum + s.resultsCount, 0);
    const averageResults = this.searchHistory.length > 0 ? totalResults / this.searchHistory.length : 0;

    return {
      totalSearches: this.searchHistory.length,
      uniqueQueries,
      averageResults: Math.round(averageResults * 100) / 100,
      popularQueries: this.getPopularSearches(5)
    };
  }
}

// Export singleton instance
export const searchEngine = new SearchEngine();

// Export utility functions
export const searchTools = (query: string, options?: Parameters<SearchEngine['search']>[1]) => {
  return searchEngine.search(query, options).map(result => result.tool);
};

export const getSearchSuggestions = (query: string, limit?: number) => {
  return searchEngine.getSuggestions(query, limit);
};