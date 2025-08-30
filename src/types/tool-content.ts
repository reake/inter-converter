export interface FAQItem {
  question: string;
  answer: string;
}

export interface ToolContent {
  about: string[];
  howToUse: string[];
  features: string[];
  faqs?: FAQItem[];
  details?: string[];
}
