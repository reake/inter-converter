import { ToolContent, FAQItem } from '@/types/tool-content';
import { RichAboutContent, RichHowToContent, RichFeatureContent, RichFAQContent, RichHowToStep } from '@/types/json-content';

/**
 * Normalize rich JSON structure to simple arrays for ToolContent
 * Handles new JSON format with {title, description} objects
 */
function isRichAboutContent(content: unknown): content is RichAboutContent {
  return typeof content === 'object' && content !== null && 'description' in content;
}

function isRichHowToContent(content: unknown): content is RichHowToContent {
  return typeof content === 'object' && content !== null && 'steps' in content;
}

function isRichFeatureContent(item: unknown): item is RichFeatureContent {
  return typeof item === 'object' && item !== null && 'title' in item && 'description' in item;
}

function isRichFAQContent(item: unknown): item is RichFAQContent {
  return typeof item === 'object' && item !== null && 'q' in item && 'a' in item;
}

export function normalizeToolContent(rawContent: unknown): ToolContent {
  const content = rawContent as Record<string, unknown>; // 临时使用unknown，但通过类型守卫确保安全

  // Handle about - ensure it's always a string array
  let about: string[] = [];
  if (Array.isArray(content.about)) {
    about = content.about.filter((item: unknown) => typeof item === 'string');
  } else if (isRichAboutContent(content.about)) {
    if (Array.isArray(content.about.description)) {
      about = content.about.description.filter((item: unknown) => typeof item === 'string');
    } else if (typeof content.about.description === 'string') {
      about = [content.about.description];
    }
  } else if (typeof content.about === 'string') {
    about = [content.about];
  }

  // Handle howToUse - check both howTo and howToUse fields
  let howToUse: string[] = [];
  if (isRichHowToContent(content.howTo)) {
    howToUse = content.howTo.steps.map((step: RichHowToStep) => 
      `${step.title}: ${step.description}`
    );
    if (content.howTo.tips) {
      howToUse.push(...content.howTo.tips);
    }
  } else if (Array.isArray(content.howToUse)) {
    howToUse = content.howToUse.filter((item: unknown) => typeof item === 'string');
  }

  // Handle features - ensure it's always a string array
  let features: string[] = [];
  if (Array.isArray(content.features)) {
    features = content.features.map((item: unknown) => {
      if (typeof item === 'string') {
        return item;
      } else if (isRichFeatureContent(item)) {
        return `${item.title}: ${item.description}`;
      }
      return '';
    }).filter(Boolean);
  }
  
  // Handle FAQs - ensure proper format
  let faqs: FAQItem[] = [];
  const faqSource = content.faqs || content.faq;
  if (Array.isArray(faqSource)) {
    faqs = faqSource
      .filter((item: unknown) => isRichFAQContent(item))
      .map((item: RichFAQContent) => ({
        question: item.q,
        answer: item.a
      }));
  }
  
  return { about, howToUse, features, faqs };
}
