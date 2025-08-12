import { useTranslations } from 'next-intl';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from '@/i18n/routing';

export default function ToolsPage() {
  const t = useTranslations();

  const tools = [
    {
      id: 'json-formatter',
      title: t('tools.jsonFormatter.title'),
      description: t('tools.jsonFormatter.description'),
      href: '/tools/json-formatter'
    },
    {
      id: 'base64',
      title: t('tools.base64.title'),
      description: t('tools.base64.description'),
      href: '/tools/base64'
    },
    {
      id: 'color-picker',
      title: t('tools.colorPicker.title'),
      description: t('tools.colorPicker.description'),
      href: '/tools/color-picker'
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">{t('tools.title')}</h1>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tools.map((tool) => (
          <Link key={tool.id} href={tool.href}>
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader>
                <CardTitle>{tool.title}</CardTitle>
                <CardDescription>{tool.description}</CardDescription>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
