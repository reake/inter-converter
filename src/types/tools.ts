export interface ToolConfig {
  id: string;
  name: string;
  description: string;
  category: string;
  keywords: string[];
  path: string;
  isActive: boolean;
  searchVolume?: number;
  difficulty?: number;
  icon?: string;
}

export interface ConvertersResult<T = any> {
  success: boolean;
  result?: T;
  error?: string;
  metadata?: {
    timestamp: Date;
    source?: string;
    accuracy?: number;
  };
}

export interface ToolUsage {
  toolId: string;
  sessionId: string;
  timestamp: Date;
  ConvertersCount: number;
  userAgent: string;
  locale: string;
}

export interface SEOConfig {
  title: string;
  description: string;
  keywords: string[];
  canonicalUrl: string;
  structuredData?: Record<string, any>;
}

export interface ToolLayoutProps {
  title: string;
  description: string;
  children: React.ReactNode;
  toolId: string;
  keywords?: string[];
  category?: string;
}

export interface ToolCardProps {
  title: string;
  description: string;
  href: string;
  category: string;
  icon?: React.ReactNode;
  isPopular?: boolean;
  searchVolume?: number;
}

export type ToolCategory =
  | 'time'
  | 'finance'
  | 'unit'
  | 'media'
  | 'color'
  | 'health'
  | 'science'
  | 'auto';

export interface ValidationError {
  field: string;
  message: string;
  code: string;
}

export interface APIError {
  status: number;
  message: string;
  code: string;
}

export interface ProcessingError {
  type: 'validation' | 'processing' | 'network';
  message: string;
  details?: any;
}