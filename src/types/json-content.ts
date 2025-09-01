// JSON数据结构的类型定义
export interface RichAboutContent {
  title?: string;
  description: string | string[];
}

export interface RichHowToStep {
  title: string;
  description: string;
}

export interface RichHowToContent {
  title?: string;
  steps: RichHowToStep[];
  tips?: string[];
}

export interface RichFeatureContent {
  title: string;
  description: string;
}

export interface RichFAQContent {
  q: string;
  a: string;
}

export interface RelativeLink {
  title: string;
  url: string;
  description?: string;
}

// 富JSON内容结构
export interface RichToolContent {
  about: RichAboutContent | string | string[];
  howTo?: RichHowToContent;
  howToUse?: string[]; // 向后兼容
  features: RichFeatureContent[] | string[];
  faq?: RichFAQContent[];
  faqs?: RichFAQContent[]; // 向后兼容
  relativeLinks?: RelativeLink[];
}

// 工具目录项
export interface ToolCatalogItem {
  id: string;
  name: string;
  description: string;
  path?: string;
  keywords?: string[];
  titleSuffix?: string;
  difficulty?: 'easy' | 'medium' | 'hard';
  searchVolume?: number;
  isActive?: boolean;
}

// 分类页面内容
export interface CategoryPageContent {
  title: string;
  description: string;
  stats?: {
    totalTools: number;
    popularTools: number;
    categories: number;
  };
  sections?: {
    title: string;
    description: string;
    tools?: string[];
  }[];
  categories?: {
    name: string;
    description: string;
    count: number;
  }[];
  tips?: string[];
  concepts?: {
    term: string;
    definition: string;
  }[];
  disclaimer?: string;
}
