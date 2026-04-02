import React from 'react';
import { ToolConfig } from '@/types/tools';
import { getToolCategories } from '@/config/tools';

interface StructuredDataProps {
  tools: ToolConfig[];
  category?: string;
  locale?: string;
}

export function StructuredData({ tools = [], category, locale = 'en' }: StructuredDataProps) {
  const toolCategories = getToolCategories(locale);
  const categoryInfo = category ? toolCategories[category as keyof typeof toolCategories] : null;
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://interconverter.com';
  const normalizedLocale = (locale || 'en').toLowerCase();
  const localePrefix = normalizedLocale === 'en' ? '' : `/${normalizedLocale}`;
  const withLocalePath = (toolPath: string) => {
    const alreadyLocalized = /^\/[a-z]{2}(?=\/)/.test(toolPath);
    return `${baseUrl}${alreadyLocalized ? toolPath : `${localePrefix}${toolPath}`}`;
  };
  
  // Organization structured data
  const organizationData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "InterConverter",
    "legalName": "InterConverter",
    "description": "Leading provider of free online converter tools and professional calculators for developers, engineers, students, and professionals worldwide",
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
      "Time Conversion Tools",
      "Color Conversion Tools",
      "Image Conversion Tools"
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

  const faqData = null;

  // Software Application structured data for tools
  const toolsData = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": category ? `${categoryInfo?.name} Tools` : "Online Converter Tools",
    "description": category ? categoryInfo?.description : "Comprehensive collection of free online converter tools and calculators",
    "numberOfItems": tools.length,
    "itemListElement": tools.slice(0, 20).map((tool, index) => ({
      "@type": "SoftwareApplication",
      "position": index + 1,
      "name": tool.name,
      "description": tool.description,
      "url": withLocalePath(tool.path),
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
    "name": category ? `${categoryInfo?.name} Tools` : "Online Converter Tools",
    "description": category ? 
      `Free ${categoryInfo?.name.toLowerCase()} tools including ${tools.slice(0, 3).map(t => t.name).join(', ')} and more.` :
      `Free online converter tools and calculators. Convert units, currencies, files, and more.`,
    "url": category ? `${baseUrl}${localePrefix}/${category}` : `${baseUrl}${localePrefix}/tools`,
    "mainEntity": {
      "@type": "ItemList",
      "numberOfItems": tools.length,
      "itemListElement": tools.map((tool, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "url": withLocalePath(tool.path),
        "name": tool.name
      }))
    },
    "about": {
      "@type": "Thing",
      "name": category ? categoryInfo?.name : "Online Tools",
      "description": category ? categoryInfo?.description : "Free online converter and calculation tools"
    }
  };

  const allStructuredData: Array<Record<string, unknown>> = [
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
  const alreadyLocalized = /^\/[a-z]{2}(?=\/)/.test(tool.path);
  const toolUrl = `${baseUrl}${alreadyLocalized ? tool.path : `${localePrefix}${tool.path}`}`;
  const toolCategories = getToolCategories(locale);
  const categoryInfo = toolCategories[tool.category as keyof typeof toolCategories];
  
  const toolData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": tool.name,
    "description": tool.description,
    "url": toolUrl,
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
        "item": toolUrl
      }
    ]
  };

  return [toolData, breadcrumbData];
}
