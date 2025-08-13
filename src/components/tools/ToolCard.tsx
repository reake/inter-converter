import { ToolCardProps } from '@/types/tools';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from '@/i18n/routing';

export function ToolCard({ 
  title, 
  description, 
  href, 
  category, 
  icon, 
  isPopular = false,
  searchVolume 
}: ToolCardProps) {
  return (
    <Link href={href as any} className="block group">
      <Card className="h-full hover:shadow-lg transition-all duration-200 group-hover:scale-[1.02]">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              {icon && (
                <div className="text-2xl" role="img" aria-label="Tool icon">
                  {icon}
                </div>
              )}
              <div>
                <CardTitle className="text-lg group-hover:text-primary transition-colors">
                  {title}
                </CardTitle>
                {isPopular && (
                  <Badge variant="secondary" className="mt-1 text-xs">
                    Popular
                  </Badge>
                )}
              </div>
            </div>
            {searchVolume && (
              <div className="text-xs text-muted-foreground">
                {(searchVolume / 1000).toFixed(0)}k searches
              </div>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <CardDescription className="text-sm leading-relaxed">
            {description}
          </CardDescription>
          <div className="mt-3">
            <Badge variant="outline" className="text-xs">
              {category.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
            </Badge>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}