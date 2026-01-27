import React from 'react';
import { ToolConfig } from '@/types/tools';
import { getToolCategories } from '@/config/tools';

interface StructuredDataProps {
  tools: ToolConfig[];
  category?: string;
  locale?: string;
  faqItems?: Array<{ question: string; answer: string }>;
}

export function StructuredData({ tools = [], category, locale = 'en', faqItems = [] }: StructuredDataProps) {
  const toolCategories = getToolCategories(locale);
  const categoryInfo = category ? toolCategories[category as keyof typeof toolCategories] : null;
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://interconverter.com';
  const normalizedLocale = (locale || 'en').toLowerCase();
  const localePrefix = normalizedLocale === 'en' ? '' : `/${normalizedLocale}`;
  
  // Website structured data
  const websiteData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "InterConverter - Free Online Converters Tools",
    "alternateName": "InterConverter",
    "description": "Professional online Converters tools and calculators. Free, secure, and accurate tools for unit Converters, currency calculation, and specialized calculations.",
    "url": `${baseUrl}${localePrefix}`,
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": `${baseUrl}${localePrefix}/tools?q={search_term_string}`
      },
      "query-input": "required name=search_term_string"
    },
    "keywords": "online converter, free calculator, unit Converters, currency converter, measurement tools, professional calculators"
  };

  // Organization structured data
  const organizationData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "InterConverter",
    "legalName": "InterConverter",
    "description": "Leading provider of free online Converters tools and professional calculators for developers, engineers, students, and professionals worldwide",
    "url": baseUrl,
    "foundingDate": "2024",
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "customer service",
      "availableLanguage": ["English", "Chinese"],
      "serviceType": "Technical Support"
    },
    "knowsAbout": [
      "Unit Converters",
      "Currency Converters",
      "Mathematical Calculations",
      "Engineering Tools",
      "Automotive Calculators",
      "Health & Fitness Tools"
    ]
  };

  // Breadcrumb structured data
  const breadcrumbData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": `${baseUrl}${localePrefix}`
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Tools",
        "item": `${baseUrl}${localePrefix}/tools`
      },
      ...(category ? [{
        "@type": "ListItem",
        "position": 3,
        "name": categoryInfo?.name || category,
        "item": `${baseUrl}${localePrefix}/${category}`
      }] : [])
    ]
  };

  // FAQ structured data
  const faqData = faqItems.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqItems.map((item) => ({
      "@type": "Question",
      "name": item.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.answer
      }
    }))
  } : null;

  // Software Application structured data for tools
  const toolsData = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": category ? `${categoryInfo?.name} Tools` : "Online Converters Tools",
    "description": category ? categoryInfo?.description : "Comprehensive collection of free online Converters tools and calculators",
    "numberOfItems": tools.length,
    "itemListElement": tools.slice(0, 20).map((tool, index) => ({
      "@type": "SoftwareApplication",
      "position": index + 1,
      "name": tool.name,
      "description": tool.description,
      "url": `${baseUrl}${localePrefix}${tool.path}`,
      "applicationCategory": "WebApplication",
      "operatingSystem": "Any",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      },
      "keywords": tool.keywords.join(", "),
      "category": toolCategories[tool.category as keyof typeof toolCategories]?.name || tool.category
    }))
  };

  // Collection page structured data
  const collectionData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": category ? `${categoryInfo?.name} Tools` : "Online Converters Tools",
    "description": category ? 
      `Free ${categoryInfo?.name.toLowerCase()} tools including ${tools.slice(0, 3).map(t => t.name).join(', ')} and more.` :
      `Free online Converters tools and calculators. Convert units, currencies, files, and more.`,
    "url": category ? `${baseUrl}${localePrefix}/${category}` : `${baseUrl}${localePrefix}/tools`,
    "mainEntity": {
      "@type": "ItemList",
      "numberOfItems": tools.length,
      "itemListElement": tools.map((tool, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "url": `${baseUrl}${localePrefix}${tool.path}`,
        "name": tool.name
      }))
    },
    "about": {
      "@type": "Thing",
      "name": category ? categoryInfo?.name : "Online Tools",
      "description": category ? categoryInfo?.description : "Free online Converters and calculation tools"
    }
  };

  const allStructuredData: Array<Record<string, unknown>> = [
    websiteData,
    organizationData,
    breadcrumbData,
    toolsData,
    collectionData
  ];

  if (faqData) {
    allStructuredData.splice(3, 0, faqData as Record<string, unknown>);
  }

  return (
    <>
      {allStructuredData.map((data, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(data, null, 2)
          }}
        />
      ))}
    </>
  );
}

// Generate individual tool structured data
export function generateToolStructuredData(tool: ToolConfig, locale: string = 'en') {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://interconverter.com';
  const normalizedLocale = (locale || 'en').toLowerCase();
  const localePrefix = normalizedLocale === 'en' ? '' : `/${normalizedLocale}`;
  const toolCategories = getToolCategories(locale);
  const categoryInfo = toolCategories[tool.category as keyof typeof toolCategories];
  
  const toolData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": tool.name,
    "description": tool.description,
    "url": `${baseUrl}${localePrefix}${tool.path}`,
    "applicationCategory": "WebApplication",
    "operatingSystem": "Any",
    "browserRequirements": "Requires JavaScript. Requires HTML5.",
    "permissions": "No special permissions required",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD",
      "availability": "https://schema.org/InStock"
    },
    "keywords": tool.keywords.join(", "),
    "category": categoryInfo?.name || tool.category,
    "creator": {
      "@type": "Organization",
      "name": "InterConverter"
    },
    "datePublished": "2024-01-01",
    "dateModified": new Date().toISOString().split('T')[0],
    "inLanguage": normalizedLocale,
    "isAccessibleForFree": true,
    "softwareVersion": "1.0",
    "featureList": tool.keywords.slice(0, 5)
  };

  const breadcrumbData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": `${baseUrl}${localePrefix}`
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Tools",
        "item": `${baseUrl}${localePrefix}/tools`
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": categoryInfo?.name || tool.category,
        "item": `${baseUrl}${localePrefix}/${tool.category}`
      },
      {
        "@type": "ListItem",
        "position": 4,
        "name": tool.name,
        "item": `${baseUrl}${localePrefix}${tool.path}`
      }
    ]
  };

  return [toolData, breadcrumbData];
}
