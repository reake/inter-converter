import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ToolConfig } from '@/types/tools';

interface RelatedToolsProps {
  tools: ToolConfig[];
  currentToolId: string;
  category: string;
}

export function RelatedTools({ tools, currentToolId, category }: RelatedToolsProps) {
  // Filter out current tool and limit to 6 related tools
  const relatedTools = tools
    .filter(tool => tool.id !== currentToolId && tool.isActive)
    .slice(0, 6);

  if (relatedTools.length === 0) return null;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Related Tools</CardTitle>
        <p className="text-sm text-muted-foreground">
          Other useful tools in the {category} category
        </p>
      </CardHeader>
      <CardContent>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {relatedTools.map((tool) => (
            <Link key={tool.id} href={tool.path}>
              <Button 
                variant="outline" 
                className="h-auto w-full justify-start p-3 text-left"
              >
                <div className="flex items-center space-x-2">
                  <span className="text-lg">{tool.icon}</span>
                  <div className="min-w-0 flex-1">
                    <div className="truncate font-medium text-sm">
                      {tool.name}
                    </div>
                    <div className="truncate text-xs text-muted-foreground">
                      {tool.description}
                    </div>
                  </div>
                </div>
              </Button>
            </Link>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
