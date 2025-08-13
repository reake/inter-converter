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
    title:
      "InterConverter.com - Professional Online Conversion Tools & Calculators",
    description:
      "Comprehensive collection of professional conversion tools and calculators. Convert currencies, units, files, colors, and more. Free online tools for developers, designers, and professionals.",
    keywords: [
      "online converter",
      "conversion tools",
      "calculator",
      "currency converter",
      "unit converter",
      "file converter",
      "color converter",
      "automotive calculator",
      "professional tools",
    ],
    openGraph: {
      title: "InterConverter.com - Professional Conversion Tools",
      description:
        "The ultimate collection of professional conversion tools and calculators for all your needs.",
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
      automotive: "from-red-500 to-orange-500",
      "currency-finance": "from-green-500 to-emerald-500",
      "unit-measurement": "from-blue-500 to-cyan-500",
      "color-design": "from-purple-500 to-pink-500",
      "file-media": "from-indigo-500 to-purple-500",
      "health-fitness": "from-green-500 to-teal-500",
      "time-date": "from-blue-500 to-indigo-500",
    };
    return (
      gradients[categoryKey as keyof typeof gradients] ||
      "from-gray-500 to-gray-600"
    );
  };

  const getCategoryIcon = (categoryKey: string) => {
    const icons = {
      automotive: "🏎️",
      "currency-finance": "💰",
      "unit-measurement": "📏",
      "color-design": "🎨",
      "file-media": "📁",
      "health-fitness": "💪",
      "time-date": "⏰",
    };
    return icons[categoryKey as keyof typeof icons] || "🔧";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 opacity-90"></div>

        <div className="relative container mx-auto px-4 py-20 max-w-7xl">
          <div className="text-center text-white">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-white/20 rounded-full mb-8 backdrop-blur-sm">
              <span className="text-5xl">🔧</span>
            </div>
            <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
              Professional Conversion Tools
            </h1>
            <p className="text-xl text-blue-100 max-w-4xl mx-auto mb-10 leading-relaxed">
              The ultimate collection of professional conversion tools and
              calculators. From currency and units to automotive calculations
              and file conversions - everything you need in one place.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Badge className="bg-white/20 text-white border-white/30 hover:bg-white/30 px-4 py-2 text-sm">
                ✨ Free to Use
              </Badge>
              <Badge className="bg-white/20 text-white border-white/30 hover:bg-white/30 px-4 py-2 text-sm">
                🚀 No Registration Required
              </Badge>
              <Badge className="bg-white/20 text-white border-white/30 hover:bg-white/30 px-4 py-2 text-sm">
                💎 Professional Quality
              </Badge>
              <Badge className="bg-white/20 text-white border-white/30 hover:bg-white/30 px-4 py-2 text-sm">
                📱 Mobile Friendly
              </Badge>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16 max-w-7xl">
        {/* Popular Tools */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Most Popular Tools
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Start with these frequently used tools that professionals rely on
              daily
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {popularTools.map((tool, index) => (
              <EnhancedToolCard 
                key={tool.id} 
                tool={tool} 
                featured={index < 3}
                showStats={true}
              />
            ))}
          </div>
        </section>

        {/* Tool Search */}
        <ToolSearch />

        {/* Tool Categories */}
        <section className="mb-20 mt-32">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Browse by Category
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Explore our comprehensive collection of tools organized by
              category
            </p>
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

        {/* Features Section */}
        <section className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-3xl p-12 shadow-inner">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why Choose InterConverter.com?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Built by professionals, for professionals. Experience the
              difference quality makes.
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div className="text-center group">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-2xl mb-4 group-hover:scale-110 transition-transform">
                <span className="text-2xl">🚀</span>
              </div>
              <h3 className="font-bold text-lg mb-2 text-gray-900">
                Fast & Reliable
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Instant calculations with professional-grade accuracy and
                lightning-fast performance
              </p>
            </div>
            <div className="text-center group">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-green-500 to-teal-500 text-white rounded-2xl mb-4 group-hover:scale-110 transition-transform">
                <span className="text-2xl">🔒</span>
              </div>
              <h3 className="font-bold text-lg mb-2 text-gray-900">
                Secure & Private
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Your data stays private - no tracking, no storage, complete
                privacy protection
              </p>
            </div>
            <div className="text-center group">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-2xl mb-4 group-hover:scale-110 transition-transform">
                <span className="text-2xl">📱</span>
              </div>
              <h3 className="font-bold text-lg mb-2 text-gray-900">
                Mobile Optimized
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Perfect experience on all devices with responsive design and
                touch-friendly interface
              </p>
            </div>
            <div className="text-center group">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-2xl mb-4 group-hover:scale-110 transition-transform">
                <span className="text-2xl">🆓</span>
              </div>
              <h3 className="font-bold text-lg mb-2 text-gray-900">
                Completely Free
              </h3>
              <p className="text-gray-600 leading-relaxed">
                No registration, no limits, no hidden costs - professional tools
                at no charge
              </p>
            </div>
          </div>
        </section>

        {/* Statistics Section */}
        <section className="mt-20 text-center">
          <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-3xl p-12 text-white">
            <h2 className="text-4xl font-bold mb-8">Trusted by Professionals Worldwide</h2>
            <div className="grid gap-8 md:grid-cols-4">
              <div className="group">
                <div className="text-4xl font-bold mb-2 group-hover:scale-110 transition-transform">50K+</div>
                <div className="text-lg opacity-90">Daily Users</div>
              </div>
              <div className="group">
                <div className="text-4xl font-bold mb-2 group-hover:scale-110 transition-transform">1M+</div>
                <div className="text-lg opacity-90">Conversions Monthly</div>
              </div>
              <div className="group">
                <div className="text-4xl font-bold mb-2 group-hover:scale-110 transition-transform">99.9%</div>
                <div className="text-lg opacity-90">Uptime</div>
              </div>
              <div className="group">
                <div className="text-4xl font-bold mb-2 group-hover:scale-110 transition-transform">24/7</div>
                <div className="text-lg opacity-90">Available</div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="mt-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Get answers to common questions about our conversion tools
            </p>
          </div>
          <div className="max-w-4xl mx-auto space-y-4">
            {[
              {
                question: "Are all tools completely free to use?",
                answer: "Yes! All our conversion tools are completely free with no registration required, no usage limits, and no hidden costs. We believe professional-quality tools should be accessible to everyone."
              },
              {
                question: "Do you store or track my data?",
                answer: "No, we prioritize your privacy. All conversions happen locally in your browser, and we don't store, track, or collect any of your input data. Your information stays completely private."
              },
              {
                question: "Can I use these tools on mobile devices?",
                answer: "Absolutely! All our tools are fully responsive and optimized for mobile devices, tablets, and desktops. You'll get the same great experience regardless of your device."
              },
              {
                question: "How accurate are the conversion results?",
                answer: "Our tools use industry-standard formulas and algorithms to ensure professional-grade accuracy. We regularly update exchange rates, unit definitions, and calculation methods to maintain precision."
              },
              {
                question: "Can I suggest new tools or features?",
                answer: "We'd love to hear from you! While we don't have a formal suggestion system yet, we're always working on adding new tools based on user needs and industry trends."
              }
            ].map((faq, index) => (
              <Card key={index} className="border-0 shadow-md hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-gray-900 mb-3">{faq.question}</h3>
                  <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
