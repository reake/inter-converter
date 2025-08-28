'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Globe } from 'lucide-react';

interface LanguageSelectorProps {
  currentLang: string;
  onLanguageChange: (lang: string) => void;
  className?: string;
}

export default function LanguageSelector({ 
  currentLang, 
  onLanguageChange, 
  className = '' 
}: LanguageSelectorProps) {
  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'zh', name: '中文', flag: '🇨🇳' }
  ];

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <Globe className="w-4 h-4 text-gray-500" />
      <div className="flex gap-1">
        {languages.map((lang) => (
          <Button
            key={lang.code}
            variant={currentLang === lang.code ? 'default' : 'outline'}
            size="sm"
            onClick={() => onLanguageChange(lang.code)}
            className="text-xs px-2 py-1"
          >
            <span className="mr-1">{lang.flag}</span>
            {lang.name}
          </Button>
        ))}
      </div>
    </div>
  );
}
