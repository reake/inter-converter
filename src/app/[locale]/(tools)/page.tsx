import { Metadata } from "next";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  TOOL_CATEGORIES,
  getToolsByCategory,
  getPopularTools,
} from "@/config/tools";
import { EnhancedToolCard } from "@/components/tools/EnhancedToolCard";
import { ToolSearch } from "@/components/tools/ToolSearch";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "All Conversion Tools - InterConverter",
    description:
      "Browse all conversion tools and calculators. Convert currencies, units, timestamps, colors, and more. Free online tools with instant results.",
    keywords: [
      "conversion tools",
      "online converter",
      "calculator",
      "currency converter",
      "unit converter",
      "timestamp converter",
      "color converter",
      "free tools",
    ],
    openGraph: {
      title: "All Conversion Tools - InterConverter",
      description:
        "Browse all conversion tools and calculators. Free, fast, and accurate.",
      type: "website",
    },
    alternates: {
      canonical: "/tools",
    },
  };
}

export default function ToolsPage() {
  const popularTools = getPopularTools(6);

  const getCategoryGradient = (categoryKey: string) => {
    const gradients = {
      auto: "from-red-500 to-orange-500",
      finance: "from-green-500 to-emerald-500",
      unit: "from-blue-500 to-cyan-500",
      color: "from-purple-500 to-pink-500",
      media: "from-indigo-500 to-purple-500",
      health: "from-green-500 to-teal-500",
      time: "from-blue-500 to-indigo-500",
    };
    return (
      gradients[categoryKey as keyof typeof gradients] ||
      "from-gray-500 to-gray-600"
    );
  };

  const getCategoryIcon = (categoryKey: string) => {
    const icons = {
      auto: "🏎️",
      finance: "💰",
      unit: "📏",
      color: "🎨",
      media: "📁",
      health: "💪",
      time: "⏰",
    };
    return icons[categoryKey as keyof typeof icons] || "🔧";
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Simple Header */}
      <div className="container mx-auto px-4 py-12 max-w-6xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-gray-900 via-blue-800 to-indigo-800 bg-clip-text text-transparent">
            All Conversion Tools
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Browse our complete collection of free conversion tools and calculators
          </p>
        </div>

        {/* Tool Search */}
        <div className="mb-12">
          <ToolSearch />
        </div>

        {/* Tool Categories */}
        <section className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Browse by Category
            </h2>
          </div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {Object.entries(TOOL_CATEGORIES).map(([categoryKey, category]) => {
              const categoryTools = getToolsByCategory(
                categoryKey as keyof typeof TOOL_CATEGORIES
              );
              const categoryPath =
                categoryKey === "automotive"
                  ? "/automotive"
                  : `/${categoryKey}`;

              return (
                <Link
                  key={categoryKey}
                  href={categoryPath}
                  className="block group"
                >
                  <Card className="h-full hover:shadow-2xl transition-all duration-300 group-hover:scale-[1.02] border-0 shadow-lg overflow-hidden">
                    <div
                      className={`h-2 bg-gradient-to-r ${getCategoryGradient(
                        categoryKey
                      )}`}
                    ></div>
                    <CardHeader className="pb-4">
                      <div className="flex items-center gap-4 mb-3">
                        <div
                          className={`p-3 rounded-xl bg-gradient-to-r ${getCategoryGradient(
                            categoryKey
                          )} text-white shadow-lg`}
                        >
                          <span className="text-2xl">
                            {getCategoryIcon(categoryKey)}
                          </span>
                        </div>
                        <div className="flex-1">
                          <CardTitle className="text-xl font-bold group-hover:text-blue-600 transition-colors">
                            {category.name}
                          </CardTitle>
                          <Badge variant="outline" className="mt-1">
                            {categoryTools.length} tools
                          </Badge>
                        </div>
                      </div>
                      <CardDescription className="text-base text-gray-600 leading-relaxed">
                        {category.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <Badge
                            variant="secondary"
                            className="bg-gray-100 text-gray-700"
                          >
                            {categoryTools
                              .reduce(
                                (sum, tool) => sum + (tool.searchVolume || 0),
                                0
                              )
                              .toLocaleString()}{" "}
                            searches/mo
                          </Badge>
                        </div>

                        <div className="space-y-2">
                          <p className="text-sm font-medium text-gray-700">
                            Popular tools:
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {categoryTools.slice(0, 3).map((tool) => (
                              <span
                                key={tool.id}
                                className="text-xs bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded-full transition-colors"
                              >
                                {tool.icon} {tool.name}
                              </span>
                            ))}
                            {categoryTools.length > 3 && (
                              <span className="text-xs text-gray-500 px-3 py-1 font-medium">
                                +{categoryTools.length - 3} more
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
}
