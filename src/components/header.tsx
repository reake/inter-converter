"use client"

import { useTranslations } from 'next-intl';
import { Link, usePathname } from '@/i18n/routing';
import { ThemeToggle } from '@/components/theme-toggle';
import { cn } from '@/lib/utils';

export function Header() {
  const t = useTranslations('common');
  const pathname = usePathname();

  // 使用静态导航配置避免翻译不匹配
  const navigation = [
    { name: 'Home', href: '/', key: 'home' },
    { name: 'Tools', href: '/tools', key: 'tools' },
    { name: 'Auto', href: '/auto', key: 'auto' },
    { name: 'About', href: '/about', key: 'about' },
  ];

  return (
    <header className="border-b">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-xl font-bold">
            {t('title')}
          </Link>
          
          <nav className="hidden md:flex items-center space-x-6">
            {navigation.map((item) => {
              const isActive = pathname === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href as any}
                  className={cn(
                    "text-sm font-medium transition-colors hover:text-primary",
                    isActive ? "text-primary" : "text-muted-foreground"
                  )}
                >
                  {item.name}
                </Link>
              );
            })}
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
