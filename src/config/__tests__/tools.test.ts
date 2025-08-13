import { 
  TOOLS_CONFIG, 
  getToolById, 
  getToolsByCategory, 
  getPopularTools, 
  searchTools 
} from '../tools';

describe('Tools Configuration', () => {
  describe('TOOLS_CONFIG', () => {
    it('should contain 11 tools', () => {
      expect(TOOLS_CONFIG).toHaveLength(11);
    });

    it('should have all required properties for each tool', () => {
      TOOLS_CONFIG.forEach(tool => {
        expect(tool).toHaveProperty('id');
        expect(tool).toHaveProperty('name');
        expect(tool).toHaveProperty('description');
        expect(tool).toHaveProperty('category');
        expect(tool).toHaveProperty('keywords');
        expect(tool).toHaveProperty('path');
        expect(tool).toHaveProperty('isActive');
        expect(tool.keywords).toBeInstanceOf(Array);
        expect(tool.keywords.length).toBeGreaterThan(0);
      });
    });

    it('should have unique IDs', () => {
      const ids = TOOLS_CONFIG.map(tool => tool.id);
      const uniqueIds = new Set(ids);
      expect(uniqueIds.size).toBe(ids.length);
    });

    it('should have unique paths', () => {
      const paths = TOOLS_CONFIG.map(tool => tool.path);
      const uniquePaths = new Set(paths);
      expect(uniquePaths.size).toBe(paths.length);
    });
  });

  describe('getToolById', () => {
    it('should return tool by valid ID', () => {
      const tool = getToolById('timestamp-converter');
      expect(tool).toBeDefined();
      expect(tool?.name).toBe('Timestamp Converter');
    });

    it('should return undefined for invalid ID', () => {
      const tool = getToolById('non-existent-tool');
      expect(tool).toBeUndefined();
    });
  });

  describe('getToolsByCategory', () => {
    it('should return tools for valid category', () => {
      const tools = getToolsByCategory('time-date');
      expect(tools.length).toBeGreaterThan(0);
      tools.forEach(tool => {
        expect(tool.category).toBe('time-date');
      });
    });

    it('should return empty array for category with no tools', () => {
      const tools = getToolsByCategory('science-engineering' as any);
      expect(tools).toHaveLength(0);
    });
  });

  describe('getPopularTools', () => {
    it('should return tools sorted by search volume', () => {
      const tools = getPopularTools(5);
      expect(tools.length).toBeLessThanOrEqual(5);
      
      for (let i = 1; i < tools.length; i++) {
        const current = tools[i].searchVolume || 0;
        const previous = tools[i - 1].searchVolume || 0;
        expect(current).toBeLessThanOrEqual(previous);
      }
    });

    it('should only return active tools', () => {
      const tools = getPopularTools();
      tools.forEach(tool => {
        expect(tool.isActive).toBe(true);
      });
    });

    it('should respect the limit parameter', () => {
      const tools = getPopularTools(3);
      expect(tools.length).toBeLessThanOrEqual(3);
    });
  });

  describe('searchTools', () => {
    it('should find tools by name', () => {
      const results = searchTools('timestamp');
      expect(results.length).toBeGreaterThan(0);
      expect(results[0].name.toLowerCase()).toContain('timestamp');
    });

    it('should find tools by description', () => {
      const results = searchTools('exchange');
      expect(results.length).toBeGreaterThan(0);
      expect(results.some(tool => 
        tool.description.toLowerCase().includes('exchange')
      )).toBe(true);
    });

    it('should find tools by keywords', () => {
      const results = searchTools('hex');
      expect(results.length).toBeGreaterThan(0);
      expect(results.some(tool => 
        tool.keywords.some(keyword => keyword.toLowerCase().includes('hex'))
      )).toBe(true);
    });

    it('should be case insensitive', () => {
      const lowerResults = searchTools('timestamp');
      const upperResults = searchTools('TIMESTAMP');
      const mixedResults = searchTools('TimeStamp');
      
      expect(lowerResults).toEqual(upperResults);
      expect(lowerResults).toEqual(mixedResults);
    });

    it('should return empty array for no matches', () => {
      const results = searchTools('nonexistentterm12345');
      expect(results).toHaveLength(0);
    });

    it('should only return active tools', () => {
      const results = searchTools('converter');
      results.forEach(tool => {
        expect(tool.isActive).toBe(true);
      });
    });
  });
});