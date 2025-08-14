"use client"

import { useTranslations } from 'next-intl';
import { Link, usePathname } from '@/i18n/routing';
import { ThemeToggle } from '@/components/theme-toggle';
import { useEffect, useState } from 'react';

export function Header() {
  const t = useTranslations('common');
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  const navigation = [
    { name: t('home'), href: '/' },
    { name: t('tools'), href: '/tools' },
    { name: t('auto'), href: '/auto' },
    { name: t('about'), href: '/about' },
  ];

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <header className="border-b">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-xl font-bold">
            {t('title')}
          </Link>
          
          <nav className="hidden md:flex items-center space-x-6">
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href as any}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  mounted && pathname === item.href
                    ? 'text-primary'
                    : 'text-muted-foreground'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          <div className="flex items-center space-x-2">
            {/* <LanguageToggle /> */}
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  );
}
