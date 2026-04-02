"use client"

import { useTranslations } from 'next-intl';
import { Link, usePathname } from '@/i18n/routing';
import { ThemeToggle } from '@/components/theme-toggle';
import { cn } from '@/lib/utils';

export function Header() {
  const t = useTranslations('common');
  const pathname = usePathname();

  // 使用翻译配置的导航
  const navigation = [
    { href: '/', key: 'home' },
    { href: '/tools', key: 'tools' },
    { href: '/about', key: 'about' },
  ];

  return (
    <header className="border-b">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <img 
              src="/logo.png" 
              alt={t('title')} 
              width={32} 
              height={32}
              className="h-8 w-auto"
            />
            <span className="text-xl font-bold">{t('title')}</span>
          </Link>
          
          <nav className="hidden md:flex items-center space-x-6">
            {navigation.map((item) => {
              const isActive = pathname === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "text-sm font-medium transition-colors hover:text-primary",
                    isActive ? "text-primary" : "text-muted-foreground"
                  )}
                >
                  {t(item.key)}
                </Link>
              );
            })}
          </nav>
          <div className="flex items-center space-x-2">
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  );
}
