import React from 'react';
import { ToolLayout } from '@/components/tools/ToolLayout';
import { StructuredData } from '@/components/seo/StructuredData';

interface AutomotiveToolLayoutProps {
  title: string;
  description: string;
  toolId: string;
  children: React.ReactNode;
}

export function AutomotiveToolLayout({
  title,
  description,
  toolId,
  children
}: AutomotiveToolLayoutProps) {
  return (
    <>
      <StructuredData
        type="SoftwareApplication"
        data={{
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          "name": title,
          "description": description,
          "applicationCategory": "UtilityApplication",
          "operatingSystem": "Web Browser",
          "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "USD"
          },
          "featureList": [
            "Free automotive calculations",
            "Real-time results",
            "No registration required",
            "Mobile responsive"
          ]
        }}
      />
      <ToolLayout
        title={title}
        description={description}
        toolId={toolId}
        category="automotive"
      >
        {children}
      </ToolLayout>
    </>
  );
}
