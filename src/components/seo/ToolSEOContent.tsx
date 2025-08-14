import React from 'react';

interface ToolSEOContentProps {
  title: string;
  description: string;
  features: string[];
  useCases: Array<{ icon: string; text: string }>;
  instructions: string[];
  additionalInfo?: string;
  className?: string;
}

export function ToolSEOContent({
  title,
  description,
  features,
  useCases,
  instructions,
  additionalInfo,
  className = ""
}: ToolSEOContentProps) {
  return (
    <div className={`mt-12 bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl p-8 ${className}`}>
      <div className="max-w-4xl mx-auto">
        <div className="grid md:grid-cols-2 gap-8">
          {/* About Section */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <span className="text-blue-500">🛠️</span>
                About {title}
              </h2>
              <p className="text-gray-600 leading-relaxed">
                {description}
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <span className="text-green-500">✨</span>
                Key Features
              </h3>
              <div className="grid gap-3">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-gray-600 text-sm">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Use Cases and Instructions */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <span className="text-purple-500">🎯</span>
                Common Use Cases
              </h3>
              <div className="grid gap-3">
                {useCases.map((useCase, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <span className="text-lg">{useCase.icon}</span>
                    <span className="text-gray-600 text-sm">{useCase.text}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <span className="text-orange-500">📋</span>
                How to Use
              </h3>
              <div className="space-y-3">
                {instructions.map((step, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center text-xs font-semibold flex-shrink-0">
                      {index + 1}
                    </div>
                    <span className="text-gray-600 text-sm">{step}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Additional Information */}
        {additionalInfo && (
          <div className="mt-8 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-100">
            <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <span className="text-blue-500">💡</span>
              Additional Information
            </h3>
            <p className="text-gray-600 leading-relaxed">
              {additionalInfo}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
