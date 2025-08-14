'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Copy, Check } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CopyButtonProps {
  text: string;
  variant?: 'default' | 'outline' | 'ghost' | 'secondary';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  className?: string;
  showText?: boolean;
  successText?: string;
  disabled?: boolean;
  onCopy?: () => void;
}

export function CopyButton({
  text,
  variant = 'outline',
  size = 'sm',
  className,
  showText = false,
  successText = 'Copied!',
  disabled = false,
  onCopy
}: CopyButtonProps) {
  const [copied, setCopied] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleCopy = async () => {
    if (disabled || isLoading || !text) return;

    setIsLoading(true);
    
    try {
      // Try modern clipboard API first
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
      } else {
        // Fallback for older browsers or non-secure contexts
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        textArea.style.top = '-999999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        
        try {
          document.execCommand('copy');
        } catch (err) {
          console.error('Fallback copy failed:', err);
          throw new Error('Copy failed');
        } finally {
          document.body.removeChild(textArea);
        }
      }

      setCopied(true);
      onCopy?.();
      
      // Reset copied state after 2 seconds
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text:', err);
      // You could add a toast notification here for error feedback
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      onClick={handleCopy}
      variant={variant}
      size={size}
      disabled={disabled || isLoading || !text}
      className={cn(
        'transition-all duration-200',
        copied && 'bg-green-50 border-green-200 text-green-700 hover:bg-green-100',
        className
      )}
      title={copied ? successText : 'Copy to clipboard'}
    >
      {copied ? (
        <>
          <Check className="h-4 w-4" />
          {showText && <span className="ml-2">{successText}</span>}
        </>
      ) : (
        <>
          <Copy className="h-4 w-4" />
          {showText && <span className="ml-2">Copy</span>}
        </>
      )}
    </Button>
  );
}

// Specialized component for copying results with input field
interface CopyResultProps {
  value: string;
  label?: string;
  placeholder?: string;
  className?: string;
  inputClassName?: string;
  buttonClassName?: string;
  readOnly?: boolean;
  onCopy?: () => void;
}

export function CopyResult({
  value,
  label,
  placeholder = 'Result will appear here',
  className,
  inputClassName,
  buttonClassName,
  readOnly = true,
  onCopy
}: CopyResultProps) {
  return (
    <div className={cn('space-y-2', className)}>
      {label && (
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
          {label}
        </label>
      )}
      <div className="flex gap-2">
        <input
          type="text"
          value={value}
          placeholder={placeholder}
          readOnly={readOnly}
          className={cn(
            'flex-1 px-3 py-2 border border-gray-300 rounded-md',
            'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent',
            'bg-gray-50 dark:bg-gray-800 dark:border-gray-600',
            'font-mono text-sm',
            inputClassName
          )}
        />
        <CopyButton
          text={value}
          className={buttonClassName}
          onCopy={onCopy}
          disabled={!value}
        />
      </div>
    </div>
  );
}

// Hook for copy functionality
export function useCopyToClipboard() {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async (text: string): Promise<boolean> => {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
      } else {
        // Fallback
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        textArea.style.top = '-999999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        
        try {
          document.execCommand('copy');
        } finally {
          document.body.removeChild(textArea);
        }
      }

      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      return true;
    } catch (err) {
      console.error('Failed to copy:', err);
      return false;
    }
  };

  return { copyToClipboard, copied };
}
