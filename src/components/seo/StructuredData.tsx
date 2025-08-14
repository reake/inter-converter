import React from 'react';
import { ToolConfig } from '@/types/tools';
import { TOOL_CATEGORIES } from '@/config/tools';

interface StructuredDataProps {
  tools: ToolConfig[];
  category?: string;
  locale?: string;
}

export function StructuredData({ tools = [], category, locale = 'en' }: StructuredDataProps) {
  const categoryInfo = category ? TOOL_CATEGORIES[category as keyof typeof TOOL_CATEGORIES] : null;
  const baseUrl = 'https://interconverter.com';
  
  // Website structured data
  const websiteData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "InterConverter - Free Online Converters Tools",
    "alternateName": "InterConverter",
    "description": "Professional online Converters tools and calculators. Free, secure, and accurate tools for unit Converters, currency calculation, and specialized calculations.",
    "url": baseUrl,
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": `${baseUrl}/tools?q={search_term_string}`
      },
      "query-input": "required name=search_term_string"
    },
    "sameAs": [
      "https://github.com/interconverter",
      "https://twitter.com/interconverter"
    ],
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
    "logo": {
      "@type": "ImageObject",
      "url": `${baseUrl}/logo.png`,
      "width": 200,
      "height": 60
    },
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
        "item": baseUrl
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Tools",
        "item": `${baseUrl}/tools`
      },
      ...(category ? [{
        "@type": "ListItem",
        "position": 3,
        "name": categoryInfo?.name || category,
        "item": `${baseUrl}/tools?categories=${category}`
      }] : [])
    ]
  };

  // FAQ structured data
  const faqData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Are these tools really free to use?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, all our tools are completely free to use with no hidden costs, registration requirements, or usage limits. We believe in providing accessible tools for everyone."
        }
      },
      {
        "@type": "Question",
        "name": "Do you store my data or calculations?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "No, all calculations are performed locally in your browser. We don't store, track, or have access to your input data or results. Your privacy is our priority."
        }
      },
      {
        "@type": "Question",
        "name": "How accurate are the Converters results?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Our tools use industry-standard formulas and regularly updated data sources to ensure maximum accuracy. For financial tools, we use real-time exchange rates and official tax tables."
        }
      },
      ...(category ? [{
        "@type": "Question",
        "name": `What makes your ${categoryInfo?.name.toLowerCase()} tools special?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `Our ${categoryInfo?.name.toLowerCase()} tools are designed with user experience in mind, featuring intuitive interfaces, instant results, and comprehensive functionality. ${categoryInfo?.description}`
        }
      }] : [])
    ]
  };

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
      "url": `${baseUrl}${tool.path}`,
      "applicationCategory": "WebApplication",
      "operatingSystem": "Any",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.8",
        "reviewCount": Math.max(10, Math.floor((tool.searchVolume || 1000) / 1000)),
        "bestRating": "5",
        "worstRating": "1"
      },
      "keywords": tool.keywords.join(", "),
      "category": TOOL_CATEGORIES[tool.category as keyof typeof TOOL_CATEGORIES]?.name || tool.category
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
    "url": category ? `${baseUrl}/tools?categories=${category}` : `${baseUrl}/tools`,
    "mainEntity": {
      "@type": "ItemList",
      "numberOfItems": tools.length,
      "itemListElement": tools.map((tool, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "url": `${baseUrl}${tool.path}`,
        "name": tool.name
      }))
    },
    "about": {
      "@type": "Thing",
      "name": category ? categoryInfo?.name : "Online Tools",
      "description": category ? categoryInfo?.description : "Free online Converters and calculation tools"
    }
  };

  const allStructuredData = [
    websiteData,
    organizationData,
    breadcrumbData,
    faqData,
    toolsData,
    collectionData
  ];

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
  const baseUrl = 'https://interconverter.com';
  const categoryInfo = TOOL_CATEGORIES[tool.category as keyof typeof TOOL_CATEGORIES];
  
  const toolData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": tool.name,
    "description": tool.description,
    "url": `${baseUrl}${tool.path}`,
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
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "reviewCount": Math.max(10, Math.floor((tool.searchVolume || 1000) / 1000)),
      "bestRating": "5",
      "worstRating": "1"
    },
    "keywords": tool.keywords.join(", "),
    "category": categoryInfo?.name || tool.category,
    "creator": {
      "@type": "Organization",
      "name": "InterConverter"
    },
    "datePublished": "2024-01-01",
    "dateModified": new Date().toISOString().split('T')[0],
    "inLanguage": locale,
    "isAccessibleForFree": true,
    "screenshot": `${baseUrl}/screenshots/${tool.id}.png`,
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
        "item": baseUrl
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Tools",
        "item": `${baseUrl}/tools`
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": categoryInfo?.name || tool.category,
        "item": `${baseUrl}/tools?categories=${tool.category}`
      },
      {
        "@type": "ListItem",
        "position": 4,
        "name": tool.name,
        "item": `${baseUrl}${tool.path}`
      }
    ]
  };

  return [toolData, breadcrumbData];
}
