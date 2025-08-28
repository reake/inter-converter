import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChevronDown } from 'lucide-react';
import { useState } from 'react';

export interface FAQ {
  question: string;
  answer: string;
}

interface ToolFAQsProps {
  faqs: FAQ[];
  toolName: string;
}

export function ToolFAQs({ faqs, toolName }: ToolFAQsProps) {
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
        <CardTitle className="text-xl">Frequently Asked Questions</CardTitle>
        <p className="text-sm text-muted-foreground">
          Common questions about {toolName}
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        {faqs.map((faq, index) => (
          <div key={index}>
            <button
              className="flex w-full items-center justify-between rounded-lg border p-4 text-left hover:bg-muted/50"
              onClick={() => toggleItem(index)}
            >
              <h3 className="font-medium">{faq.question}</h3>
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
