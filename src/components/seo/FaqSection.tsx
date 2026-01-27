import { JsonLd, generateFAQSchema } from './JsonLd';

interface FaqItem {
  question: string;
  answer: string;
}

interface FaqSectionProps {
  title: string;
  subtitle?: string;
  faqItems: FaqItem[];
}

export function FaqSection({ title, subtitle, faqItems }: FaqSectionProps) {
  return (
    <>
      <JsonLd data={generateFAQSchema(faqItems)} />
      <section className="py-20 bg-gray-50 rounded-3xl mx-4">
        <div className="max-w-4xl mx-auto px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {title}
            </h2>
            {subtitle && (
              <p className="text-lg text-gray-600">
                {subtitle}
              </p>
            )}
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {faqItems.map((item, index) => (
              <div key={index} className="bg-white rounded-lg p-6 shadow-sm">
                <h3 className="font-semibold text-lg mb-3 text-gray-900">
                  {item.question}
                </h3>
                <p className="text-gray-700">
                  {item.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
