import { Metadata } from "next";
import { ToolLayout } from "@/components/tools/ToolLayout";
import TaxCalculator from "@/components/converters/finance/TaxCalculator";
import { ModernSEOContent } from "@/components/tools/ModernSEOContent";

// Force static generation
export const dynamic = 'force-static';
const title = "Tax Calculator";
const description = "Calculate income tax, estimate tax liability, and plan your tax strategy. Free tax calculator with multiple filing statuses.";
const keywordsArr = [
  "tax",
  "income",
  "calculator",
  "irs",
  "refund",
  "liability",
  "deduction",
  "filing",
];

export const metadata: Metadata = {
  title: `${title} | InterConverter`,
  description,
  keywords: keywordsArr.join(', '),
  openGraph: {
    title: `${title} | InterConverter`,
    description,
    type: 'website',
  },
  alternates: {
    canonical: '/finance/tax-calculator',
  },
};

export default function TaxCalculatorPage() {
  return (
    <ToolLayout
      title={title}
      description={description}
      keywords={keywordsArr}
      toolId="tax-calculator"
      category="finance"
      emoji="🧾"
    >
      <TaxCalculator />
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
    </ToolLayout>
  );
}
