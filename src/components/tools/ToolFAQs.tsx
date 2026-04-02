'use client';

import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { ChevronDown } from 'lucide-react';
import { useState } from 'react';

export interface FAQ {
  question: string;
  answer: string;
}

interface ToolFAQsProps {
  faqs: FAQ[];
  toolName: string;
  title?: string;
  subtitle?: string;
}

export function ToolFAQs({ faqs, toolName, title, subtitle }: ToolFAQsProps) {
  const [openItems, setOpenItems] = useState<number[]>([]);

  const toggleItem = (index: number) => {
    setOpenItems(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  if (!faqs || faqs.length === 0) return null;

  return (
    <Card>
      <CardHeader>
        <h2 className="text-xl font-semibold tracking-tight">{title || 'Frequently Asked Questions'}</h2>
        <p className="text-sm text-muted-foreground">
          {subtitle || `Common questions about ${toolName}`}
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        {faqs.map((faq, index) => (
          <div key={index}>
            <button
              className="flex w-full items-center justify-between rounded-lg border p-4 text-left hover:bg-muted/50"
              onClick={() => toggleItem(index)}
            >
              <span className="font-medium">{faq.question}</span>
              <ChevronDown 
                className={`h-4 w-4 transition-transform ${
                  openItems.includes(index) ? 'rotate-180' : ''
                }`} 
              />
            </button>
            {openItems.includes(index) && (
              <div className="px-4 pb-4">
                <div className="text-sm text-muted-foreground">
                  {faq.answer}
                </div>
              </div>
            )}
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
