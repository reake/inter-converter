export interface LanguageConfig {
  code: string;
  name: string;
  nativeName: string;
  flag: string;
  direction: 'ltr' | 'rtl';
  dateFormat: string;
  numberFormat: {
    decimal: string;
    thousands: string;
    currency: string;
  };
  enabled: boolean;
  completeness: number; // Percentage of translations completed
  fallback?: string;
}

export const SUPPORTED_LANGUAGES: Record<string, LanguageConfig> = {
  en: {
    code: 'en',
    name: 'English',
    nativeName: 'English',
    flag: '🇺🇸',
    direction: 'ltr',
    dateFormat: 'MM/DD/YYYY',
    numberFormat: {
      decimal: '.',
      thousands: ',',
      currency: '$'
    },
    enabled: true,
    completeness: 100
  },
  zh: {
    code: 'zh',
    name: 'Chinese',
    nativeName: '中文',
    flag: '🇨🇳',
    direction: 'ltr',
    dateFormat: 'YYYY/MM/DD',
    numberFormat: {
      decimal: '.',
      thousands: ',',
      currency: '¥'
    },
    enabled: true,
    completeness: 85
  },
  es: {
    code: 'es',
    name: 'Spanish',
    nativeName: 'Español',
    flag: '🇪🇸',
    direction: 'ltr',
    dateFormat: 'DD/MM/YYYY',
    numberFormat: {
      decimal: ',',
      thousands: '.',
      currency: '€'
    },
    enabled: false,
    completeness: 0,
    fallback: 'en'
  },
  fr: {
    code: 'fr',
    name: 'French',
    nativeName: 'Français',
    flag: '🇫🇷',
    direction: 'ltr',
    dateFormat: 'DD/MM/YYYY',
    numberFormat: {
      decimal: ',',
      thousands: ' ',
      currency: '€'
    },
    enabled: false,
    completeness: 0,
    fallback: 'en'
  },
  de: {
    code: 'de',
    name: 'German',
    nativeName: 'Deutsch',
    flag: '🇩🇪',
    direction: 'ltr',
    dateFormat: 'DD.MM.YYYY',
    numberFormat: {
      decimal: ',',
      thousands: '.',
      currency: '€'
    },
    enabled: false,
    completeness: 0,
    fallback: 'en'
  },
  ja: {
    code: 'ja',
    name: 'Japanese',
    nativeName: '日本語',
    flag: '🇯🇵',
    direction: 'ltr',
    dateFormat: 'YYYY/MM/DD',
    numberFormat: {
      decimal: '.',
      thousands: ',',
      currency: '¥'
    },
    enabled: false,
    completeness: 0,
    fallback: 'en'
  },
  ko: {
    code: 'ko',
    name: 'Korean',
    nativeName: '한국어',
    flag: '🇰🇷',
    direction: 'ltr',
    dateFormat: 'YYYY.MM.DD',
    numberFormat: {
      decimal: '.',
      thousands: ',',
      currency: '₩'
    },
    enabled: false,
    completeness: 0,
    fallback: 'en'
  },
  ar: {
    code: 'ar',
    name: 'Arabic',
    nativeName: 'العربية',
    flag: '🇸🇦',
    direction: 'rtl',
    dateFormat: 'DD/MM/YYYY',
    numberFormat: {
      decimal: '.',
      thousands: ',',
      currency: 'ر.س'
    },
    enabled: false,
    completeness: 0,
    fallback: 'en'
  }
};

export const DEFAULT_LANGUAGE = 'en';

// Get enabled languages only
export function getEnabledLanguages(): LanguageConfig[] {
  return Object.values(SUPPORTED_LANGUAGES).filter(lang => lang.enabled);
}

// Get language config by code
export function getLanguageConfig(code: string): LanguageConfig | undefined {
  return SUPPORTED_LANGUAGES[code];
}

// Get fallback language for a given language
export function getFallbackLanguage(code: string): string {
  const config = getLanguageConfig(code);
  return config?.fallback || DEFAULT_LANGUAGE;
}

// Check if language is RTL
export function isRTL(code: string): boolean {
  const config = getLanguageConfig(code);
  return config?.direction === 'rtl';
}

// Format number according to language settings
export function formatNumber(
  value: number, 
  locale: string, 
  options?: Intl.NumberFormatOptions
): string {
  const config = getLanguageConfig(locale);
  if (!config) {
    return value.toString();
  }

  try {
    return new Intl.NumberFormat(locale, {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
      ...options
    }).format(value);
  } catch {
    // Fallback formatting
    const str = value.toFixed(options?.maximumFractionDigits || 2);
    return str
      .replace('.', config.numberFormat.decimal)
      .replace(/\B(?=(\d{3})+(?!\d))/g, config.numberFormat.thousands);
  }
}

// Format currency according to language settings
export function formatCurrency(
  value: number, 
  locale: string, 
  currency?: string
): string {
  const config = getLanguageConfig(locale);
  if (!config) {
    return `$${value.toFixed(2)}`;
  }

  try {
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: currency || (locale === 'zh' ? 'CNY' : locale === 'en' ? 'USD' : 'EUR'),
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(value);
  } catch {
    // Fallback formatting
    const formatted = formatNumber(value, locale, { maximumFractionDigits: 2 });
    return `${config.numberFormat.currency}${formatted}`;
  }
}

// Format date according to language settings
export function formatDate(
  date: Date, 
  locale: string, 
  options?: Intl.DateTimeFormatOptions
): string {
  try {
    return new Intl.DateTimeFormat(locale, {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      ...options
    }).format(date);
  } catch {
    // Fallback formatting
    const config = getLanguageConfig(locale);
    const format = config?.dateFormat || 'MM/DD/YYYY';
    
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    
    return format
      .replace('YYYY', year.toString())
      .replace('MM', month)
      .replace('DD', day);
  }
}

// Get browser language preference
export function getBrowserLanguage(): string {
  if (typeof window === 'undefined') {
    return DEFAULT_LANGUAGE;
  }

  const browserLang = navigator.language || navigator.languages?.[0];
  if (!browserLang) {
    return DEFAULT_LANGUAGE;
  }

  // Extract language code (e.g., 'en-US' -> 'en')
  const langCode = browserLang.split('-')[0];
  
  // Check if we support this language
  const config = getLanguageConfig(langCode);
  if (config && config.enabled) {
    return langCode;
  }

  return DEFAULT_LANGUAGE;
}

// Validate translation completeness
export function getTranslationCompleteness(locale: string): number {
  const config = getLanguageConfig(locale);
  return config?.completeness || 0;
}

// Get missing translation keys (placeholder for future implementation)
export function getMissingTranslations(_locale: string): string[] {
  // This would be implemented to check against a reference translation file
  // and return missing keys
  return [];
}

// Language detection and preference management
export class LanguageManager {
  private static instance: LanguageManager;
  private currentLanguage: string = DEFAULT_LANGUAGE;
  private listeners: ((language: string) => void)[] = [];

  static getInstance(): LanguageManager {
    if (!LanguageManager.instance) {
      LanguageManager.instance = new LanguageManager();
    }
    return LanguageManager.instance;
  }

  getCurrentLanguage(): string {
    return this.currentLanguage;
  }

  setLanguage(language: string): void {
    const config = getLanguageConfig(language);
    if (config && config.enabled) {
      this.currentLanguage = language;
      this.notifyListeners();
      
      // Store preference
      if (typeof window !== 'undefined') {
        localStorage.setItem('preferred-language', language);
      }
    }
  }

  getPreferredLanguage(): string {
    if (typeof window === 'undefined') {
      return DEFAULT_LANGUAGE;
    }

    // Check stored preference first
    const stored = localStorage.getItem('preferred-language');
    if (stored && getLanguageConfig(stored)?.enabled) {
      return stored;
    }

    // Always default to English unless explicitly set
    // This prevents automatic browser language detection from overriding the default
    return DEFAULT_LANGUAGE;
  }

  addLanguageChangeListener(listener: (language: string) => void): void {
    this.listeners.push(listener);
  }

  removeLanguageChangeListener(listener: (language: string) => void): void {
    this.listeners = this.listeners.filter(l => l !== listener);
  }

  private notifyListeners(): void {
    this.listeners.forEach(listener => listener(this.currentLanguage));
  }
}
