'use client';

import React from 'react';
import SEOHead from '@/components/seo/SEOHead';
import { useTranslation } from '@/hooks/useTranslation';

interface ToolLayoutProps {
  title: string;
  description: string;
  keywords: string[];
  canonicalUrl?: string;
  lang?: string;
  children: React.ReactNode;
  structuredData?: object;
}

export default function ToolLayout({
  title,
  description,
  keywords,
  canonicalUrl,
  lang = 'en',
  children,
  structuredData
}: ToolLayoutProps) {
  const { t } = useTranslation(lang);

  const defaultStructuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": title,
    "description": description,
    "url": canonicalUrl,
    "applicationCategory": "UtilityApplication",
    "operatingSystem": "Any",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "author": {
      "@type": "Organization",
      "name": "InterConverter",
      "url": "https://interconverter.com"
    }
  };

  return (
    <>
      <SEOHead
        title={title}
        description={description}
        keywords={keywords}
        canonicalUrl={canonicalUrl}
        lang={lang}
        structuredData={structuredData || defaultStructuredData}
      />
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {children}
        </div>
      </div>
    </>
  );
}
