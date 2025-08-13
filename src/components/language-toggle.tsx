'use client';

import { useLocale, useTranslations } from 'next-intl';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from '@/components/ui/dropdown-menu';
import {
  getEnabledLanguages,
  getLanguageConfig,
  LanguageManager,
  getBrowserLanguage
} from '@/lib/i18n/language-config';

export function LanguageToggle() {
  const t = useTranslations('common');
  const locale = useLocale();
  const [isAutoDetected, setIsAutoDetected] = useState(false);

  const enabledLanguages = getEnabledLanguages();
  const currentLanguage = getLanguageConfig(locale);
  const languageManager = LanguageManager.getInstance();

  // Check if current language was auto-detected
  useEffect(() => {
    const browserLang = getBrowserLanguage();
    const preferredLang = languageManager.getPreferredLanguage();
    setIsAutoDetected(locale === browserLang && locale !== preferredLang);
  }, [locale]);

  const switchLanguage = (newLocale: string) => {
    // Update language manager
    languageManager.setLanguage(newLocale);

    // Use window.location to perform a full page navigation
    // This ensures we don't have any issues with pathname handling
    if (typeof window !== 'undefined') {
      const currentPath = window.location.pathname;
      let newPath = '';

      // Remove any existing locale prefix from the current path
      const pathWithoutLocale = currentPath.replace(/^\/(?:en|zh)(?=\/|$)/, '') || '/';

      // Build the new path based on the target locale
      if (newLocale === 'en') {
        // For English (default locale), don't add prefix
        newPath = pathWithoutLocale === '/' ? '/' : pathWithoutLocale;
      } else {
        // For non-default locales, add the locale prefix
        newPath = `/${newLocale}${pathWithoutLocale === '/' ? '' : pathWithoutLocale}`;
      }

      // Force reload to ensure proper language switching
      window.location.href = newPath;
    }
  };

  if (!currentLanguage) {
    return null;
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="gap-2 relative">
          <span className="text-lg">{currentLanguage.flag}</span>
          <span className="hidden sm:inline font-medium">{currentLanguage.nativeName}</span>
          {isAutoDetected && (
            <div className="absolute -top-1 -right-1 w-2 h-2 bg-blue-500 rounded-full"
                 title="Auto-detected language" />
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-64">
        <DropdownMenuLabel className="text-xs text-gray-500 uppercase tracking-wide">
          {t('language')}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />

        {enabledLanguages.map((language) => {
          const isCurrentLanguage = language.code === locale;

          return (
            <DropdownMenuItem
              key={language.code}
              onClick={() => switchLanguage(language.code)}
              className="gap-3 py-3 cursor-pointer"
              disabled={isCurrentLanguage}
            >
              <span className="text-lg">{language.flag}</span>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-medium">{language.nativeName}</span>
                  {isCurrentLanguage && (
                    <span className="text-blue-500 text-sm">✓</span>
                  )}
                </div>
                <div className="text-xs text-gray-500">{language.name}</div>
              </div>
              <div className="flex flex-col items-end gap-1">
                <Badge variant="outline" className={`text-xs px-2 py-0 ${
                  language.completeness >= 95 ? 'bg-green-100 text-green-700' :
                  language.completeness >= 80 ? 'bg-blue-100 text-blue-700' :
                  language.completeness >= 50 ? 'bg-yellow-100 text-yellow-700' :
                  'bg-red-100 text-red-700'
                }`}>
                  {language.completeness >= 95 ? 'Complete' :
                   language.completeness >= 80 ? 'Good' :
                   language.completeness >= 50 ? 'Partial' : 'Limited'}
                </Badge>
                <div className="text-xs text-gray-400">
                  {Math.round(language.completeness)}%
                </div>
              </div>
            </DropdownMenuItem>
          );
        })}

        <DropdownMenuSeparator />

        {/* Language preferences info */}
        <div className="px-2 py-2 text-xs text-gray-500">
          <div className="flex items-center justify-between mb-1">
            <span>Browser:</span>
            <span className="font-mono">{getBrowserLanguage()}</span>
          </div>
          {isAutoDetected && (
            <div className="text-blue-600 text-xs">
              Language auto-detected from browser
            </div>
          )}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
