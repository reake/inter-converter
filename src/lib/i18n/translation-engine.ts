import { getFallbackLanguage, DEFAULT_LANGUAGE } from './language-config';

type Translations = Record<string, unknown>;

export interface TranslationKey {
  key: string;
  namespace: string;
  defaultValue?: string;
  interpolations?: Record<string, string | number>;
}

export interface TranslationMissing {
  key: string;
  namespace: string;
  locale: string;
  context?: string;
  timestamp: Date;
}

export interface TranslationStats {
  totalKeys: number;
  translatedKeys: number;
  missingKeys: number;
  completeness: number;
  lastUpdated: Date;
}

class TranslationEngine {
  private static instance: TranslationEngine;
  private translations: Map<string, Translations> = new Map();
  private missingTranslations: TranslationMissing[] = [];
  private loadingPromises: Map<string, Promise<Translations>> = new Map();
  private translationStats: Map<string, TranslationStats> = new Map();

  static getInstance(): TranslationEngine {
    if (!TranslationEngine.instance) {
      TranslationEngine.instance = new TranslationEngine();
    }
    return TranslationEngine.instance;
  }

  // Load translations for a specific locale
  async loadTranslations(locale: string): Promise<Translations> {
    // Check if already loaded
    if (this.translations.has(locale)) {
      return this.translations.get(locale)!;
    }

    // Check if already loading
    if (this.loadingPromises.has(locale)) {
      return this.loadingPromises.get(locale)!;
    }

    // Start loading
    const loadingPromise = this.fetchTranslations(locale);
    this.loadingPromises.set(locale, loadingPromise);

    try {
      const translations = await loadingPromise;
      this.translations.set(locale, translations);
      this.updateTranslationStats(locale, translations);
      return translations;
    } catch (error) {
      console.error(`Failed to load translations for ${locale}:`, error);
      
      // Try fallback language
      const fallback = getFallbackLanguage(locale);
      if (fallback !== locale) {
        return this.loadTranslations(fallback);
      }
      
      // Return empty object as last resort
      return {};
    } finally {
      this.loadingPromises.delete(locale);
    }
  }

  // Fetch translations from the server or local files
  private async fetchTranslations(locale: string): Promise<Translations> {
    try {
      // Try to load from messages directory
      const response = await fetch(`/messages/${locale}.json`);
      if (response.ok) {
        return (await response.json()) as Translations;
      }
    } catch (error) {
      console.warn(`Could not fetch translations for ${locale}:`, error);
    }

    // Try dynamic import as fallback
    try {
      const importedModule = await import(`../../messages/${locale}.json`);
      return (importedModule.default || importedModule) as Translations;
    } catch (error) {
      console.warn(`Could not import translations for ${locale}:`, error);
    }

    throw new Error(`No translations found for locale: ${locale}`);
  }

  // Get a translation with fallback support
  getTranslation(
    key: string, 
    locale: string, 
    interpolations?: Record<string, string | number>,
    defaultValue?: string
  ): string {
    const translations = this.translations.get(locale);
    
    // Try to get translation from current locale
    let value = this.getNestedValue(translations, key);
    
    // If not found, try fallback locale
    if (value === undefined) {
      const fallback = getFallbackLanguage(locale);
      if (fallback !== locale) {
        const fallbackTranslations = this.translations.get(fallback);
        value = this.getNestedValue(fallbackTranslations, key);
      }
    }

    // If still not found, use default value or key
    if (value === undefined) {
      value = defaultValue || key;
      
      // Track missing translation
      this.trackMissingTranslation(key, locale);
    }

    // Apply interpolations
    if (interpolations && typeof value === 'string') {
      value = this.interpolateString(value, interpolations);
    }

    return typeof value === 'string' ? value : String(value);
  }

  // Get nested value from object using dot notation
  private getNestedValue(obj: Translations | undefined, path: string): unknown {
    if (!obj) return undefined;
    
    return path.split('.').reduce<unknown>((current, key) => {
      if (current && typeof current === 'object' && !Array.isArray(current)) {
        const record = current as Record<string, unknown>;
        return record[key];
      }
      return undefined;
    }, obj);
  }

  // Interpolate variables in translation strings
  private interpolateString(
    template: string, 
    variables: Record<string, string | number>
  ): string {
    return template.replace(/\{\{(\w+)\}\}/g, (match, key) => {
      return variables[key] !== undefined ? String(variables[key]) : match;
    });
  }

  // Track missing translations for analysis
  private trackMissingTranslation(key: string, locale: string): void {
    const existing = this.missingTranslations.find(
      m => m.key === key && m.locale === locale
    );

    if (!existing) {
      this.missingTranslations.push({
        key,
        namespace: key.split('.')[0] || 'common',
        locale,
        timestamp: new Date()
      });
    }
  }

  // Update translation statistics
  private updateTranslationStats(locale: string, translations: Translations): void {
    const flatKeys = this.flattenObject(translations);
    const totalKeys = Object.keys(flatKeys).length;
    
    // Compare with reference locale (English) to calculate completeness
    const referenceTranslations = this.translations.get(DEFAULT_LANGUAGE);
    let referenceTotalKeys = totalKeys;
    
    if (referenceTranslations && locale !== DEFAULT_LANGUAGE) {
      const referenceFlatKeys = this.flattenObject(referenceTranslations);
      referenceTotalKeys = Object.keys(referenceFlatKeys).length;
    }

    const completeness = referenceTotalKeys > 0 ? (totalKeys / referenceTotalKeys) * 100 : 100;

    this.translationStats.set(locale, {
      totalKeys,
      translatedKeys: totalKeys,
      missingKeys: Math.max(0, referenceTotalKeys - totalKeys),
      completeness: Math.min(100, completeness),
      lastUpdated: new Date()
    });
  }

  // Flatten nested object to count keys
  private flattenObject(obj: Record<string, unknown>, prefix = ''): Record<string, unknown> {
    const flattened: Record<string, unknown> = {};
    
    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        const newKey = prefix ? `${prefix}.${key}` : key;
        const value = obj[key];
        
        if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
          Object.assign(flattened, this.flattenObject(value as Record<string, unknown>, newKey));
        } else {
          flattened[newKey] = value;
        }
      }
    }
    
    return flattened;
  }

  // Get missing translations for a locale
  getMissingTranslations(locale: string): TranslationMissing[] {
    return this.missingTranslations.filter(m => m.locale === locale);
  }

  // Get translation statistics
  getTranslationStats(locale: string): TranslationStats | undefined {
    return this.translationStats.get(locale);
  }

  // Get all translation statistics
  getAllTranslationStats(): Map<string, TranslationStats> {
    return new Map(this.translationStats);
  }

  // Clear missing translations (useful for development)
  clearMissingTranslations(locale?: string): void {
    if (locale) {
      this.missingTranslations = this.missingTranslations.filter(m => m.locale !== locale);
    } else {
      this.missingTranslations = [];
    }
  }

  // Preload translations for multiple locales
  async preloadTranslations(locales: string[]): Promise<void> {
    const promises = locales.map(locale => this.loadTranslations(locale));
    await Promise.allSettled(promises);
  }

  // Check if translations are loaded for a locale
  isLoaded(locale: string): boolean {
    return this.translations.has(locale);
  }

  // Get all loaded locales
  getLoadedLocales(): string[] {
    return Array.from(this.translations.keys());
  }

  // Validate translation keys against a schema
  validateTranslations(locale: string, schema: Record<string, { required?: boolean }>): string[] {
    const translations = this.translations.get(locale);
    if (!translations) {
      return ['Translations not loaded'];
    }

    const errors: string[] = [];
    const flatSchema = this.flattenObject(schema as Record<string, unknown>);
    const flatTranslations = this.flattenObject(translations);

    // Check for missing required keys
    for (const key in flatSchema) {
      const schemaValue = flatSchema[key] as { required?: boolean } | undefined;
      if (schemaValue?.required && !flatTranslations[key]) {
        errors.push(`Missing required translation key: ${key}`);
      }
    }

    // Check for extra keys (might indicate outdated translations)
    for (const key in flatTranslations) {
      if (!flatSchema[key]) {
        errors.push(`Extra translation key (not in schema): ${key}`);
      }
    }

    return errors;
  }

  // Export missing translations for translation services
  exportMissingTranslations(locale: string): Record<string, string> {
    const missing = this.getMissingTranslations(locale);
    const exported: Record<string, string> = {};

    missing.forEach(item => {
      exported[item.key] = ''; // Empty value to be filled by translators
    });

    return exported;
  }

  // Import translations from external source
  async importTranslations(locale: string, translations: Translations): Promise<void> {
    const existing = this.translations.get(locale) || {};
    const merged = this.deepMerge(existing, translations);
    
    this.translations.set(locale, merged);
    this.updateTranslationStats(locale, merged);
  }

  // Deep merge two objects
  private deepMerge(target: Record<string, unknown>, source: Record<string, unknown>): Record<string, unknown> {
    const result: Record<string, unknown> = { ...target };
    
    for (const key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        const sourceValue = source[key];
        if (typeof sourceValue === 'object' && sourceValue !== null && !Array.isArray(sourceValue)) {
          const targetValue = (result[key] && typeof result[key] === 'object' && !Array.isArray(result[key]))
            ? (result[key] as Record<string, unknown>)
            : {};
          result[key] = this.deepMerge(targetValue, sourceValue as Record<string, unknown>);
        } else {
          result[key] = sourceValue;
        }
      }
    }
    
    return result;
  }
}

// Export singleton instance
export const translationEngine = TranslationEngine.getInstance();

// Utility functions
export async function loadTranslationsForLocale(locale: string): Promise<Translations> {
  return translationEngine.loadTranslations(locale);
}

export function getTranslation(
  key: string, 
  locale: string, 
  interpolations?: Record<string, string | number>,
  defaultValue?: string
): string {
  return translationEngine.getTranslation(key, locale, interpolations, defaultValue);
}

export function getMissingTranslations(locale: string): TranslationMissing[] {
  return translationEngine.getMissingTranslations(locale);
}

export function getTranslationStats(locale: string): TranslationStats | undefined {
  return translationEngine.getTranslationStats(locale);
}
