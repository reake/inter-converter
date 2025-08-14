import { Metadata } from "next";
import {
  generateToolMetadata,
  generateToolStructuredData,
} from "@/components/tools/ToolLayout";
import { TaxCalculator } from "@/components/converters/TaxCalculator";
import { ModernSEOContent } from "@/components/tools/ModernSEOContent";



// Cloudflare Pages Edge Runtime 配置
export const runtime = 'edge';
export const metadata: Metadata = generateToolMetadata(
  "Tax Calculator",
  "Calculate income tax, estimate tax liability, and plan your tax strategy. Free tax calculator with multiple filing statuses.",
  "tax-calculator",
  [
    "tax",
    "income",
    "calculator",
    "irs",
    "refund",
    "liability",
    "deduction",
    "filing",
  ],
  "finance"
);

export default function TaxCalculatorPage() {
  const structuredData = generateToolStructuredData(
    "Tax Calculator",
    "Calculate income tax liability and estimate tax refunds with support for different filing statuses and deductions",
    "tax-calculator",
    "finance"
  );

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* SEO Header */}
          <div className="mb-8 text-center">
            <h1 className="text-4xl font-bold mb-4">🧾 Tax Calculator</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Calculate your income tax liability, estimate refunds, and plan
              your tax strategy. Support for different filing statuses and
              deductions.
            </p>
          </div>

          {/* Tool Component */}
          <TaxCalculator />

          {/* SEO Content */}
          <ModernSEOContent
            title="Tax Calculator"
            description="Our tax calculator helps you estimate your federal income tax liability, potential refund, and effective tax rate. Use it for tax planning, comparing filing statuses, and understanding your tax situation."
            features={[
              "Calculate federal income tax liability",
              "Support for all filing statuses",
              "Standard and itemized deductions",
              "Tax bracket analysis",
              "Effective and marginal tax rates",
              "Refund estimation"
            ]}
            useCases={[
              {
                category: "Tax Planning",
                examples: ["Annual tax estimation", "Retirement planning", "Investment strategy", "Income optimization"]
              },
              {
                category: "Filing Preparation",
                examples: ["Compare filing statuses", "Deduction analysis", "Withholding adjustments", "Refund estimation"]
              },
              {
                category: "Financial Planning",
                examples: ["Budget planning", "Career decisions", "Side income evaluation", "Tax-efficient investing"]
              },
              {
                category: "Business Use",
                examples: ["Contractor tax planning", "Business income analysis", "Quarterly estimates", "Tax strategy consulting"]
              }
            ]}
            howToUse={[
              "Enter your annual gross income",
              "Select your filing status",
              "Choose standard or itemized deductions",
              "Enter any additional deductions",
              "View your tax calculation results",
              "Analyze your tax brackets and rates"
            ]}
            tips={[
              "Maximize retirement contributions to reduce taxable income",
              "Consider timing of income and deductions",
              "Keep detailed records of deductible expenses",
              "Review tax withholdings throughout the year",
              "Consult tax professionals for complex situations",
              "Use tax-advantaged accounts like HSAs and FSAs"
            ]}
            technicalDetails={[
              {
                term: "Standard Deduction",
                definition: "Fixed amount based on filing status that reduces taxable income"
              },
              {
                term: "Marginal Tax Rate",
                definition: "The tax rate applied to your last dollar of income"
              },
              {
                term: "Effective Tax Rate",
                definition: "Your total tax divided by your total income"
              },
              {
                term: "AGI",
                definition: "Adjusted Gross Income - your total income minus specific deductions"
              }
            ]}
            faqs={[
              {
                question: "What's the difference between standard and itemized deductions?",
                answer: "Standard deduction is a fixed amount based on your filing status. Itemized deductions let you deduct specific expenses like mortgage interest, charitable donations, and medical expenses. You should choose whichever gives you the larger deduction."
              },
              {
                question: "How accurate are these tax calculations?",
                answer: "Our calculator provides estimates based on current tax brackets and standard deductions. Actual tax liability may vary based on specific circumstances, credits, and other factors not included in basic calculations."
              },
              {
                question: "Should I file jointly or separately if married?",
                answer: "Most married couples benefit from filing jointly, but filing separately might be better if one spouse has significant medical expenses, miscellaneous deductions, or student loan payments based on income."
              },
              {
                question: "When should I consider itemizing deductions?",
                answer: "Consider itemizing if your total deductible expenses (mortgage interest, state/local taxes, charitable donations, medical expenses) exceed the standard deduction for your filing status."
              }
            ]}
            currentToolId="tax-calculator"
            category="finance"
          />
        </div>
      </div>
    </>
  );
}
