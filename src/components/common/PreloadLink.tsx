'use client';

import { useRouter } from 'next/navigation';
import { useCallback } from 'react';
import Link from 'next/link';

interface PreloadLinkProps {
  href: string;
  children: React.ReactNode;
  prefetch?: boolean;
  className?: string;
  onClick?: () => void;
}

export function PreloadLink({ 
  href, 
  children, 
  prefetch = true, 
  className,
  onClick 
}: PreloadLinkProps) {
  const router = useRouter();

  const handleMouseEnter = useCallback(() => {
    if (prefetch && href.startsWith('/')) {
      router.prefetch(href);
    }
  }, [href, prefetch, router]);

  return (
    <Link 
      href={href} 
      className={className}
      onMouseEnter={handleMouseEnter}
      onClick={onClick}
    >
      {children}
    </Link>
  );
}

export function usePreload() {
  const preloadRoute = useCallback((path: string) => {
    if (typeof window !== 'undefined' && path.startsWith('/')) {
      const link = document.createElement('link');
      link.rel = 'prefetch';
      link.href = path;
      link.as = 'document';
      document.head.appendChild(link);
    }
  }, []);

  const preloadImage = useCallback((src: string) => {
    if (typeof window !== 'undefined') {
      const img = new Image();
      img.src = src;
    }
  }, []);

  return { preloadRoute, preloadImage };
}
