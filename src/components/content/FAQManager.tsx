'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ToolConfig } from '@/types/tools';
import { TOOL_CATEGORIES } from '@/config/tools';

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category?: string;
  toolId?: string;
  tags: string[];
  isGeneral: boolean;
  searchVolume?: number;
}

interface FAQManagerProps {
  tool?: ToolConfig;
  category?: string;
  maxItems?: number;
  showSearch?: boolean;
  className?: string;
}

// Comprehensive FAQ database
const FAQ_DATABASE: FAQItem[] = [
  // General FAQs
  {
    id: 'general-free',
    question: 'Are these tools really free to use?',
    answer: 'Yes, all our tools are completely free to use with no hidden costs, registration requirements, or usage limits. We believe in providing accessible tools for everyone.',
    tags: ['free', 'cost', 'pricing', 'registration'],
    isGeneral: true,
    searchVolume: 15000
  },
  {
    id: 'general-privacy',
    question: 'Do you store my data or calculations?',
    answer: 'No, all calculations are performed locally in your browser. We don\'t store, track, or have access to your input data or results. Your privacy is our priority.',
    tags: ['privacy', 'data', 'security', 'storage'],
    isGeneral: true,
    searchVolume: 12000
  },
  {
    id: 'general-accuracy',
    question: 'How accurate are the conversion results?',
    answer: 'Our tools use industry-standard formulas and regularly updated data sources to ensure maximum accuracy. For financial tools, we use real-time exchange rates and official tax tables.',
    tags: ['accuracy', 'precision', 'reliability', 'formulas'],
    isGeneral: true,
    searchVolume: 8000
  },
  {
    id: 'general-mobile',
    question: 'Do these tools work on mobile devices?',
    answer: 'Yes, all our tools are fully responsive and optimized for mobile devices, tablets, and desktops. You can use them anywhere with an internet connection.',
    tags: ['mobile', 'responsive', 'tablet', 'compatibility'],
    isGeneral: true,
    searchVolume: 6000
  },
  {
    id: 'general-offline',
    question: 'Can I use these tools offline?',
    answer: 'Most tools work offline once loaded, as calculations happen in your browser. However, tools requiring real-time data (like currency converters) need an internet connection.',
    tags: ['offline', 'internet', 'connection', 'browser'],
    isGeneral: true,
    searchVolume: 4000
  },

  // Time & Date FAQs
  {
    id: 'time-timezone',
    question: 'How do I convert between different time zones?',
    answer: 'Our timestamp converter automatically detects your local timezone and allows you to convert to any timezone worldwide. Simply enter the time and select your desired timezone.',
    category: 'time',
    tags: ['timezone', 'conversion', 'timestamp', 'UTC'],
    isGeneral: false,
    searchVolume: 25000
  },
  {
    id: 'time-unix',
    question: 'What is a Unix timestamp?',
    answer: 'A Unix timestamp is the number of seconds since January 1, 1970 (UTC). It\'s commonly used in programming and databases to represent dates and times.',
    category: 'time',
    toolId: 'timestamp-converter',
    tags: ['unix', 'timestamp', 'epoch', 'programming'],
    isGeneral: false,
    searchVolume: 18000
  },

  // Currency & Finance FAQs
  {
    id: 'currency-rates',
    question: 'How often are exchange rates updated?',
    answer: 'Our currency converter uses real-time exchange rates that are updated every few minutes during market hours. Rates are sourced from reliable financial data providers.',
    category: 'finance',
    toolId: 'currency-converter',
    tags: ['exchange rates', 'real-time', 'updates', 'forex'],
    isGeneral: false,
    searchVolume: 22000
  },
  {
    id: 'loan-calculation',
    question: 'How is the monthly payment calculated?',
    answer: 'Monthly payments are calculated using the standard amortization formula: M = P[r(1+r)^n]/[(1+r)^n-1], where P is principal, r is monthly interest rate, and n is number of payments.',
    category: 'finance',
    toolId: 'loan-calculator',
    tags: ['loan', 'payment', 'formula', 'amortization'],
    isGeneral: false,
    searchVolume: 15000
  },

  // Unit & Measurement FAQs
  {
    id: 'unit-precision',
    question: 'How precise are the unit conversions?',
    answer: 'Our unit conversions use precise conversion factors with up to 15 decimal places. Results are rounded to a reasonable number of decimal places for readability.',
    category: 'unit',
    tags: ['precision', 'accuracy', 'decimal', 'rounding'],
    isGeneral: false,
    searchVolume: 8000
  },

  // Health & Fitness FAQs
  {
    id: 'bmi-accuracy',
    question: 'Is BMI an accurate measure of health?',
    answer: 'BMI is a useful screening tool but has limitations. It doesn\'t account for muscle mass, bone density, or body composition. Consult healthcare professionals for comprehensive health assessment.',
    category: 'health',
    toolId: 'bmi-calculator',
    tags: ['BMI', 'health', 'accuracy', 'limitations'],
    isGeneral: false,
    searchVolume: 35000
  },

  // File & Media FAQs
  {
    id: 'file-security',
    question: 'Is it safe to upload files for conversion?',
    answer: 'File conversions happen entirely in your browser - files are never uploaded to our servers. Your files remain private and secure on your device.',
    category: 'media',
    tags: ['security', 'upload', 'privacy', 'files'],
    isGeneral: false,
    searchVolume: 12000
  },

  // Color & Design FAQs
  {
    id: 'color-formats',
    question: 'What color formats do you support?',
    answer: 'We support all major color formats including HEX, RGB, HSL, HSV, CMYK, and named colors. You can convert between any of these formats instantly.',
    category: 'color',
    tags: ['color formats', 'HEX', 'RGB', 'HSL', 'CMYK'],
    isGeneral: false,
    searchVolume: 10000
  },

  // Automotive FAQs
  {
    id: 'automotive-accuracy',
    question: 'How accurate are the automotive calculations?',
    answer: 'Our automotive tools use industry-standard formulas and are designed for estimation purposes. For critical applications, always consult with automotive professionals.',
    category: 'auto',
    tags: ['accuracy', 'auto', 'professional', 'estimation'],
    isGeneral: false,
    searchVolume: 5000
  }
];

export function FAQManager({ tool, category, maxItems = 6, showSearch = true, className = '' }: FAQManagerProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Filter FAQs based on context
  const getRelevantFAQs = (): FAQItem[] => {
    let faqs = FAQ_DATABASE;

    // Filter by tool
    if (tool) {
      faqs = faqs.filter(faq => 
        faq.toolId === tool.id || 
        faq.category === tool.category || 
        faq.isGeneral
      );
    }
    // Filter by category
    else if (category) {
      faqs = faqs.filter(faq => 
        faq.category === category || 
        faq.isGeneral
      );
    }

    // Filter by selected category
    if (selectedCategory !== 'all') {
      if (selectedCategory === 'general') {
        faqs = faqs.filter(faq => faq.isGeneral);
      } else {
        faqs = faqs.filter(faq => faq.category === selectedCategory);
      }
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      faqs = faqs.filter(faq =>
        faq.question.toLowerCase().includes(query) ||
        faq.answer.toLowerCase().includes(query) ||
        faq.tags.some(tag => tag.toLowerCase().includes(query))
      );
    }

    // Sort by relevance (tool-specific first, then by search volume)
    faqs.sort((a, b) => {
      if (tool) {
        if (a.toolId === tool.id && b.toolId !== tool.id) return -1;
        if (b.toolId === tool.id && a.toolId !== tool.id) return 1;
      }
      return (b.searchVolume || 0) - (a.searchVolume || 0);
    });

    return faqs.slice(0, maxItems);
  };

  const toggleExpanded = (id: string) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedItems(newExpanded);
  };

  const relevantFAQs = getRelevantFAQs();

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Frequently Asked Questions
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          {tool 
            ? `Common questions about ${tool.name} and related tools`
            : category 
            ? `Common questions about ${TOOL_CATEGORIES[category as keyof typeof TOOL_CATEGORIES]?.name} tools`
            : 'Common questions about our conversion tools'
          }
        </p>
      </div>

      {/* Search and Filters */}
      {showSearch && (
        <div className="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search FAQs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex gap-2">
            <Button
              variant={selectedCategory === 'all' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedCategory('all')}
            >
              All
            </Button>
            <Button
              variant={selectedCategory === 'general' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedCategory('general')}
            >
              General
            </Button>
            {category && (
              <Button
                variant={selectedCategory === category ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedCategory(category)}
              >
                {TOOL_CATEGORIES[category as keyof typeof TOOL_CATEGORIES]?.name}
              </Button>
            )}
          </div>
        </div>
      )}

      {/* FAQ Items */}
      <div className="space-y-4 max-w-4xl mx-auto">
        {relevantFAQs.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            No FAQs found matching your search.
          </div>
        ) : (
          relevantFAQs.map((faq) => (
            <Card key={faq.id} className="transition-shadow duration-200 hover:shadow-md">
              <CardHeader 
                className="cursor-pointer"
                onClick={() => toggleExpanded(faq.id)}
              >
                <div className="flex items-start justify-between">
                  <CardTitle className="text-lg font-semibold text-gray-900 pr-4">
                    {faq.question}
                  </CardTitle>
                  <div className="flex items-center gap-2">
                    {faq.category && (
                      <Badge variant="outline" className="text-xs">
                        {TOOL_CATEGORIES[faq.category as keyof typeof TOOL_CATEGORIES]?.name || faq.category}
                      </Badge>
                    )}
                    <Button variant="ghost" size="sm">
                      {expandedItems.has(faq.id) ? '▲' : '▼'}
                    </Button>
                  </div>
                </div>
              </CardHeader>
              
              {expandedItems.has(faq.id) && (
                <CardContent className="pt-0">
                  <p className="text-gray-700 leading-relaxed mb-4">
                    {faq.answer}
                  </p>
                  
                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {faq.tags.map((tag, index) => (
                      <span 
                        key={index}
                        className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </CardContent>
              )}
            </Card>
          ))
        )}
      </div>

      {/* Load More Button */}
      {relevantFAQs.length === maxItems && FAQ_DATABASE.length > maxItems && (
        <div className="text-center">
          <Button variant="outline" onClick={() => {}}>
            View More FAQs
          </Button>
        </div>
      )}
    </div>
  );
}

// Export FAQ data for use in other components
export { FAQ_DATABASE };
