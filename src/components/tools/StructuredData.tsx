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
  const isZh = normalizedLocale === 'zh';
  const localePrefix = normalizedLocale === 'en' ? '' : `/${normalizedLocale}`;
  const withLocalePath = (toolPath: string) => {
    const alreadyLocalized = /^\/[a-z]{2}(?=\/)/.test(toolPath);
    return `${baseUrl}${alreadyLocalized ? toolPath : `${localePrefix}${toolPath}`}`;
  };
  const homeLabel = isZh ? '首页' : 'Home';
  const toolsLabel = isZh ? '工具' : 'Tools';
  const onlineToolsLabel = isZh ? '在线工具' : 'Online Tools';
  const itemListName = category ? `${categoryInfo?.name} ${isZh ? '工具' : 'Tools'}` : (isZh ? '在线转换器和计算器工具' : 'Online Converter Tools');
  const itemListDescription = category
    ? categoryInfo?.description
    : (isZh
      ? '当前公开维护的在线转换器和计算器工具集合'
      : 'Current public collection of featured online converter tools and calculators');
  const collectionDescription = category
    ? (isZh
      ? `${categoryInfo?.name}工具，包括 ${tools.slice(0, 3).map(t => t.name).join('、')} 等。`
      : `Free ${categoryInfo?.name.toLowerCase()} tools including ${tools.slice(0, 3).map(t => t.name).join(', ')} and more.`)
    : (isZh
      ? '精选在线转换器和计算器，覆盖单位、时间、颜色和常见工作流。'
      : 'Featured online converter tools and calculators for units, time, colors, and selected workflows.');
  const aboutDescription = category
    ? categoryInfo?.description
    : (isZh
      ? '公开站点持续维护的在线转换与计算工具'
      : 'Featured online converter and calculation tools maintained on the public site');
  
  // Organization structured data
  const organizationData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "InterConverter",
    "legalName": "InterConverter",
    "description": isZh
      ? '公开维护的在线转换器和计算器工具集合'
      : 'Public collection of online converter tools and calculators with a smaller featured set currently maintained on the site',
    "url": baseUrl,
    "foundingDate": "2024",
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": isZh ? '客户支持' : 'customer service',
      "availableLanguage": isZh ? ["中文", "English"] : ["English", "Chinese"],
      "serviceType": isZh ? '技术支持' : 'Technical Support'
    },
    "knowsAbout": isZh
      ? ["单位转换器", "时间转换工具", "颜色转换工具", "汽车计算器"]
      : ["Unit Converters", "Time Conversion Tools", "Color Conversion Tools", "Automotive Calculators"]
  };

  // Breadcrumb structured data
  const breadcrumbData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": homeLabel,
        "item": `${baseUrl}${localePrefix}`
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": toolsLabel,
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
    "name": itemListName,
    "description": itemListDescription,
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
    "name": itemListName,
    "description": collectionDescription,
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
      "name": category ? categoryInfo?.name : onlineToolsLabel,
      "description": aboutDescription
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
  const isZh = normalizedLocale === 'zh';
  const localePrefix = normalizedLocale === 'en' ? '' : `/${normalizedLocale}`;
  const alreadyLocalized = /^\/[a-z]{2}(?=\/)/.test(tool.path);
  const toolUrl = `${baseUrl}${alreadyLocalized ? tool.path : `${localePrefix}${tool.path}`}`;
  const toolCategories = getToolCategories(locale);
  const categoryInfo = toolCategories[tool.category as keyof typeof toolCategories];
  const homeLabel = isZh ? '首页' : 'Home';
  const toolsLabel = isZh ? '工具' : 'Tools';
  const featureList = isZh
    ? ['免费使用', '无需注册', '浏览器端流程', '页面内即时显示结果']
    : ['Free to use', 'No registration required', 'Browser-based workflow', 'Immediate on-page results'];
  const browserRequirements = isZh ? '需要 JavaScript 和 HTML5。' : 'Requires JavaScript. Requires HTML5.';
  const permissions = isZh ? '无需特殊权限' : 'No special permissions required';
  const applicationCategory = isZh ? '工具应用' : 'WebApplication';
  const operatingSystem = isZh ? '任意系统' : 'Any';
  
  const toolData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": tool.name,
    "description": tool.description,
    "url": toolUrl,
    "applicationCategory": applicationCategory,
    "operatingSystem": operatingSystem,
    "browserRequirements": browserRequirements,
    "permissions": permissions,
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
    "featureList": featureList
  };

  const breadcrumbData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": homeLabel,
        "item": `${baseUrl}${localePrefix}`
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": toolsLabel,
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
