import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ToolConfig } from '@/types/tools';
import { TOOL_CATEGORIES } from '@/config/tools';

interface ToolDescriptionEngineProps {
  tool: ToolConfig;
  showFeatures?: boolean;
  showUseCases?: boolean;
  showTechnicalDetails?: boolean;
  showBenefits?: boolean;
  className?: string;
}

interface ToolFeature {
  title: string;
  description: string;
  icon: string;
}

interface UseCase {
  title: string;
  description: string;
  audience: string;
  example?: string;
}

interface TechnicalDetail {
  aspect: string;
  description: string;
  value?: string;
}

export function ToolDescriptionEngine({
  tool,
  showFeatures = true,
  showUseCases = true,
  showTechnicalDetails = true,
  showBenefits = true,
  className = ''
}: ToolDescriptionEngineProps) {
  
  // Generate features based on tool type and keywords
  const generateFeatures = (tool: ToolConfig): ToolFeature[] => {
    const features: ToolFeature[] = [];
    const category = tool.category;
    const keywords = tool.keywords;

    // Common features for all tools
    features.push(
      {
        title: 'Instant Results',
        description: 'Get immediate results as you type with real-time calculations',
        icon: '⚡'
      },
      {
        title: 'No Registration',
        description: 'Use all features without creating an account or signing up',
        icon: '🔓'
      },
      {
        title: 'Privacy First',
        description: 'All calculations happen in your browser - no data sent to servers',
        icon: '🔒'
      }
    );

    // Category-specific features
    switch (category) {
      case 'time':
        features.push(
          {
            title: 'Timezone Support',
            description: 'Automatic timezone detection and conversion between any timezones',
            icon: '🌍'
          },
          {
            title: 'Multiple Formats',
            description: 'Support for various date and time formats including ISO, Unix, and custom',
            icon: '📅'
          }
        );
        break;

      case 'finance':
        features.push(
          {
            title: 'Real-time Rates',
            description: 'Live exchange rates updated every few minutes during market hours',
            icon: '💱'
          },
          {
            title: 'Historical Data',
            description: 'Access to historical exchange rates and financial calculations',
            icon: '📊'
          }
        );
        break;

      case 'unit':
        features.push(
          {
            title: 'High Precision',
            description: 'Accurate conversions with up to 15 decimal places of precision',
            icon: '🎯'
          },
          {
            title: 'Multiple Units',
            description: 'Support for metric, imperial, and specialized measurement units',
            icon: '📏'
          }
        );
        break;

      case 'media':
        features.push(
          {
            title: 'Client-side Processing',
            description: 'Files are processed entirely in your browser for maximum security',
            icon: '🛡️'
          },
          {
            title: 'Batch Processing',
            description: 'Convert multiple files at once to save time',
            icon: '📦'
          }
        );
        break;

      case 'health':
        features.push(
          {
            title: 'Evidence-based',
            description: 'Calculations based on established medical and scientific formulas',
            icon: '🔬'
          },
          {
            title: 'Comprehensive Results',
            description: 'Detailed results with explanations and health recommendations',
            icon: '📋'
          }
        );
        break;
    }

    // Keyword-based features
    if (keywords.includes('calculator')) {
      features.push({
        title: 'Advanced Calculator',
        description: 'Sophisticated calculation engine with error checking and validation',
        icon: '🧮'
      });
    }

    if (keywords.includes('converter')) {
      features.push({
        title: 'Bidirectional Conversion',
        description: 'Convert in both directions with automatic unit detection',
        icon: '🔄'
      });
    }

    return features.slice(0, 6); // Limit to 6 features
  };

  // Generate use cases based on tool type
  const generateUseCases = (tool: ToolConfig): UseCase[] => {
    const useCases: UseCase[] = [];
    const category = tool.category;

    switch (category) {
      case 'time':
        useCases.push(
          {
            title: 'Software Development',
            description: 'Convert timestamps for database queries and API responses',
            audience: 'Developers',
            example: 'Converting Unix timestamps to readable dates for log analysis'
          },
          {
            title: 'Project Management',
            description: 'Calculate project timelines and deadline differences',
            audience: 'Project Managers',
            example: 'Determining days between project milestones'
          },
          {
            title: 'International Business',
            description: 'Schedule meetings across different time zones',
            audience: 'Business Professionals',
            example: 'Finding optimal meeting times for global teams'
          }
        );
        break;

      case 'finance':
        useCases.push(
          {
            title: 'International Trade',
            description: 'Calculate costs and profits in different currencies',
            audience: 'Business Owners',
            example: 'Converting supplier costs from EUR to USD'
          },
          {
            title: 'Travel Planning',
            description: 'Budget for international trips and expenses',
            audience: 'Travelers',
            example: 'Converting hotel prices to home currency'
          },
          {
            title: 'Investment Analysis',
            description: 'Analyze loan terms and investment returns',
            audience: 'Investors',
            example: 'Calculating monthly mortgage payments'
          }
        );
        break;

      case 'unit':
        useCases.push(
          {
            title: 'Engineering Projects',
            description: 'Convert measurements for technical specifications',
            audience: 'Engineers',
            example: 'Converting metric measurements to imperial for US projects'
          },
          {
            title: 'Cooking & Baking',
            description: 'Scale recipes and convert ingredient measurements',
            audience: 'Home Cooks',
            example: 'Converting cups to grams for precise baking'
          },
          {
            title: 'Construction',
            description: 'Calculate material quantities and dimensions',
            audience: 'Contractors',
            example: 'Converting square feet to square meters for flooring'
          }
        );
        break;

      case 'health':
        useCases.push(
          {
            title: 'Health Monitoring',
            description: 'Track health metrics and fitness progress',
            audience: 'Health Enthusiasts',
            example: 'Calculating BMI to monitor weight status'
          },
          {
            title: 'Medical Practice',
            description: 'Quick calculations for patient assessments',
            audience: 'Healthcare Providers',
            example: 'Calculating dosages based on body weight'
          },
          {
            title: 'Fitness Planning',
            description: 'Plan workouts and nutrition goals',
            audience: 'Fitness Trainers',
            example: 'Calculating caloric needs for weight goals'
          }
        );
        break;
    }

    return useCases.slice(0, 4);
  };

  // Generate technical details
  const generateTechnicalDetails = (tool: ToolConfig): TechnicalDetail[] => {
    const details: TechnicalDetail[] = [
      {
        aspect: 'Processing',
        description: 'All calculations performed client-side in your browser',
        value: 'Client-side'
      },
      {
        aspect: 'Data Privacy',
        description: 'No data transmitted to external servers',
        value: 'Fully Private'
      },
      {
        aspect: 'Accuracy',
        description: 'Industry-standard formulas and precision calculations',
        value: 'High Precision'
      },
      {
        aspect: 'Compatibility',
        description: 'Works on all modern browsers and devices',
        value: 'Universal'
      }
    ];

    // Add category-specific technical details
    switch (tool.category) {
      case 'finance':
        details.push({
          aspect: 'Data Source',
          description: 'Real-time exchange rates from reliable financial providers',
          value: 'Live Data'
        });
        break;
      case 'unit':
        details.push({
          aspect: 'Precision',
          description: 'Calculations accurate to 15 decimal places',
          value: '15 Decimals'
        });
        break;
    }

    return details;
  };

  // Generate benefits
  const generateBenefits = (tool: ToolConfig): string[] => {
    return [
      'Save time with instant calculations',
      'Eliminate manual calculation errors',
      'Access from any device with internet',
      'No software installation required',
      'Always up-to-date with latest standards',
      'Free to use with no limitations'
    ];
  };

  const features = generateFeatures(tool);
  const useCases = generateUseCases(tool);
  const technicalDetails = generateTechnicalDetails(tool);
  const benefits = generateBenefits(tool);
  const categoryInfo = TOOL_CATEGORIES[tool.category as keyof typeof TOOL_CATEGORIES];

  return (
    <div className={`space-y-8 ${className}`}>
      {/* Enhanced Description */}
      <div className="prose prose-lg max-w-none">
        <p className="text-lg text-gray-700 leading-relaxed">
          {tool.description} This professional-grade tool is designed for accuracy, speed, and ease of use, 
          making it perfect for {categoryInfo?.name.toLowerCase()} tasks across various industries and applications.
        </p>
      </div>

      {/* Features */}
      {showFeatures && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              ✨ Key Features
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                  <span className="text-2xl">{feature.icon}</span>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">{feature.title}</h4>
                    <p className="text-sm text-gray-600">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Use Cases */}
      {showUseCases && useCases.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              🎯 Common Use Cases
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              {useCases.map((useCase, index) => (
                <div key={index} className="border-l-4 border-blue-500 pl-4">
                  <div className="flex items-center gap-2 mb-2">
                    <h4 className="font-semibold text-gray-900">{useCase.title}</h4>
                    <Badge variant="outline" className="text-xs">
                      {useCase.audience}
                    </Badge>
                  </div>
                  <p className="text-gray-600 text-sm mb-2">{useCase.description}</p>
                  {useCase.example && (
                    <p className="text-xs text-gray-500 italic">
                      Example: {useCase.example}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Technical Details */}
      {showTechnicalDetails && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              ⚙️ Technical Details
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              {technicalDetails.map((detail, index) => (
                <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <div>
                    <h4 className="font-medium text-gray-900">{detail.aspect}</h4>
                    <p className="text-sm text-gray-600">{detail.description}</p>
                  </div>
                  {detail.value && (
                    <Badge variant="secondary" className="ml-2">
                      {detail.value}
                    </Badge>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Benefits */}
      {showBenefits && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              💡 Benefits
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-2">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-center gap-2">
                  <span className="text-green-500">✓</span>
                  <span className="text-gray-700">{benefit}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
