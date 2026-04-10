interface JsonLdProps {
  data: Record<string, unknown>;
}

export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

// Schema generators for different content types
export const generateWebsiteSchema = (locale: string) => {
  const normalizedLocale = locale === 'zh' ? 'zh' : 'en';
  const localePrefix = normalizedLocale === 'en' ? '' : `/${normalizedLocale}`;

  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "InterConverter",
    "url": `${process.env.NEXT_PUBLIC_SITE_URL || "https://interconverter.com"}${localePrefix}`,
    "description": normalizedLocale === 'zh'
      ? "免费在线转换器和计算器，支持单位、时间、颜色等常见浏览器端任务"
      : "Free online converters and calculators for common browser-based tasks across units, time, color, and more.",
    "inLanguage": normalizedLocale,
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": `${process.env.NEXT_PUBLIC_SITE_URL || "https://interconverter.com"}${localePrefix}/tools?q={search_term_string}`
      },
      "query-input": "required name=search_term_string"
    },
  };
  };

export const generateArticleSchema = (title: string, description: string, locale: string, pathname: string) => ({
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": title,
  "description": description,
  "inLanguage": locale,
  "url": `${process.env.NEXT_PUBLIC_SITE_URL || "https://interconverter.com"}${locale === 'en' ? '' : `/${locale}`}${pathname}`,
  "author": {
    "@type": "Organization",
    "name": "InterConverter"
  },
  "publisher": {
    "@type": "Organization",
    "name": "InterConverter",
    "logo": {
      "@type": "ImageObject",
      "url": `${process.env.NEXT_PUBLIC_SITE_URL || "https://interconverter.com"}/icons/icon-192x192.png`
    }
  },
  "datePublished": new Date().toISOString(),
  "dateModified": new Date().toISOString()
});

export const generateFAQSchema = (faqItems: Array<{question: string, answer: string}>) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": faqItems.map(item => ({
    "@type": "Question",
    "name": item.question,
    "acceptedAnswer": {
      "@type": "Answer",
      "text": item.answer
    }
  }))
});

export const generateHowToSchema = (title: string, steps: Array<{title: string, description: string}>, locale: string) => ({
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": title,
  "description": title,
  "inLanguage": locale,
  "step": steps.map((step, index) => ({
    "@type": "HowToStep",
    "position": index + 1,
    "name": step.title,
    "text": step.description
  }))
});

export const generateSoftwareApplicationSchema = (toolName: string, description: string, locale: string) => ({
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": toolName,
  "description": description,
  "inLanguage": locale,
  "applicationCategory": "UtilityApplication",
  "operatingSystem": "Web Browser",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  },
  "featureList": [
    locale === 'zh' ? "免费使用" : "Free to use",
    locale === 'zh' ? "无需注册" : "No registration required",
    locale === 'zh' ? "浏览器端工作流" : "Browser-based workflow",
    locale === 'zh' ? "页面内即时显示结果" : "Immediate on-page results"
  ]
});
