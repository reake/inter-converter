import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getToolById, TOOLS_CONFIG } from '@/config/tools';

interface EmbedPageProps {
  params: Promise<{ toolId: string }>;
}

export async function generateStaticParams() {
  return TOOLS_CONFIG.map((tool) => ({
    toolId: tool.id
  }));
}

export async function generateMetadata({ params }: EmbedPageProps): Promise<Metadata> {
  const { toolId } = await params;
  const tool = getToolById(toolId);
  
  if (!tool) {
    return {
      title: 'Tool Not Found - InterConverter'
    };
  }
  
  return {
    title: `${tool.name} - InterConverter Embed`,
    description: tool.description,
    robots: 'noindex, nofollow',
    viewport: 'width=device-width, initial-scale=1',
  };
}

export default async function EmbedPage({ params }: EmbedPageProps) {
  const { toolId } = await params;
  const tool = getToolById(toolId);
  
  if (!tool) {
    notFound();
  }
  
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 px-4">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xl">{tool.icon}</span>
            <span className="font-semibold">{tool.name}</span>
          </div>
          <a 
            href={`/${tool.category}/${toolId}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-white/80 hover:text-white underline"
          >
            Open in InterConverter →
          </a>
        </div>
      </div>
      
      <div className="max-w-2xl mx-auto py-8 px-4">
        <div className="bg-white rounded-lg p-6 shadow-sm text-center">
          <h2 className="text-lg font-semibold mb-4">{tool.name}</h2>
          <p className="text-gray-600 mb-4">{tool.description}</p>
          <a 
            href={`/${tool.category}/${toolId}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Use This Tool →
          </a>
        </div>
      </div>
      
      <div className="text-center py-4 text-sm text-gray-500">
        Powered by <a href="https://interconverter.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">InterConverter</a>
      </div>
    </div>
  );
}
