import { Metadata } from "next";
import {
  generateToolMetadata,
  generateToolStructuredData,
} from "@/components/tools/ToolLayout";
import { TaxCalculator } from "@/components/converters/TaxCalculator";

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
  "currency-finance"
);

export default function TaxCalculatorPage() {
  const structuredData = generateToolStructuredData(
    "Tax Calculator",
    "Calculate income tax liability and estimate tax refunds with support for different filing statuses and deductions",
    "tax-calculator",
    "currency-finance"
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
          <div className="mt-12 prose prose-gray max-w-none">
            <h2>About Tax Calculator</h2>
            <p>
              Our tax calculator helps you estimate your federal income tax
              liability, potential refund, and effective tax rate. Use it for
              tax planning, comparing filing statuses, and understanding your
              tax situation.
            </p>

            <h3>Features</h3>
            <ul>
              <li>Calculate federal income tax liability</li>
              <li>Support for all filing statuses</li>
              <li>Standard and itemized deductions</li>
              <li>Tax bracket analysis</li>
              <li>Effective and marginal tax rates</li>
              <li>Refund estimation</li>
            </ul>

            <h3>Filing Status Options</h3>
            <ul>
              <li>
                <strong>Single:</strong> Unmarried individuals
              </li>
              <li>
                <strong>Married Filing Jointly:</strong> Married couples filing
                together
              </li>
              <li>
                <strong>Married Filing Separately:</strong> Married couples
                filing separately
              </li>
              <li>
                <strong>Head of Household:</strong> Unmarried with qualifying
                dependents
              </li>
            </ul>

            <h3>How to Use</h3>
            <ol>
              <li>Enter your annual gross income</li>
              <li>Select your filing status</li>
              <li>Choose standard or itemized deductions</li>
              <li>Enter any additional deductions</li>
              <li>View your tax calculation results</li>
              <li>Analyze your tax brackets and rates</li>
            </ol>

            <h3>Tax Planning Tips</h3>
            <ul>
              <li>
                Maximize retirement contributions to reduce taxable income
              </li>
              <li>Consider timing of income and deductions</li>
              <li>Keep detailed records of deductible expenses</li>
              <li>Review tax withholdings throughout the year</li>
              <li>Consult tax professionals for complex situations</li>
            </ul>

            <h3>Common Deductions</h3>
            <ul>
              <li>
                <strong>Standard Deduction:</strong> Fixed amount based on
                filing status
              </li>
              <li>
                <strong>Mortgage Interest:</strong> Interest paid on home loans
              </li>
              <li>
                <strong>State and Local Taxes:</strong> SALT deduction (capped
                at $10,000)
              </li>
              <li>
                <strong>Charitable Contributions:</strong> Donations to
                qualified organizations
              </li>
              <li>
                <strong>Medical Expenses:</strong> Expenses exceeding 7.5% of
                AGI
              </li>
            </ul>

            <h3>Important Disclaimers</h3>
            <ul>
              <li>This calculator provides estimates for planning purposes</li>
              <li>
                Actual tax liability may vary based on specific circumstances
              </li>
              <li>
                Tax laws change frequently - consult current IRS guidelines
              </li>
              <li>Consider professional tax advice for complex situations</li>
              <li>State taxes are not included in these calculations</li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
