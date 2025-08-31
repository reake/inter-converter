interface CanonicalLinkProps {
  locale: string;
  pathname: string;
}

export function CanonicalLink({ locale, pathname }: CanonicalLinkProps) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://interconverter.com';
  const canonicalUrl = `${baseUrl}${locale === 'en' ? '' : `/${locale}`}${pathname}`;
  
  return <link rel="canonical" href={canonicalUrl} />;
}
