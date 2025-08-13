import { Metadata } from "next";
import {
  generateToolMetadata,
  generateToolStructuredData,
} from "@/components/tools/ToolLayout";
import { LoanCalculator } from "@/components/converters/LoanCalculator";

export const metadata: Metadata = generateToolMetadata(
  "Loan Calculator",
  "Calculate monthly payments, total interest, and amortization schedules for loans and mortgages. Free loan payment calculator.",
  "loan-calculator",
  [
    "loan",
    "mortgage",
    "payment",
    "interest",
    "calculator",
    "finance",
    "amortization",
    "monthly",
  ],
  "currency-finance"
);

export default function LoanCalculatorPage() {
  const structuredData = generateToolStructuredData(
    "Loan Calculator",
    "Calculate loan payments, interest, and amortization schedules for mortgages, auto loans, and personal loans",
    "loan-calculator",
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
            <h1 className="text-4xl font-bold mb-4">🏦 Loan Calculator</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Calculate monthly loan payments, total interest, and amortization
              schedules. Perfect for mortgages, auto loans, and personal loans.
            </p>
          </div>

          {/* Tool Component */}
          <LoanCalculator />

          {/* SEO Content */}
          <div className="mt-12 prose prose-gray max-w-none">
            <h2>About Loan Calculator</h2>
            <p>
              Our loan calculator helps you determine monthly payments, total
              interest costs, and create detailed amortization schedules for any
              type of loan. Whether you're buying a home, car, or need a
              personal loan, get accurate calculations instantly.
            </p>

            <h3>Features</h3>
            <ul>
              <li>Calculate monthly loan payments</li>
              <li>Total interest and total payment amounts</li>
              <li>Detailed amortization schedule</li>
              <li>Support for different loan types</li>
              <li>Extra payment scenarios</li>
              <li>Loan comparison tools</li>
            </ul>

            <h3>Loan Types Supported</h3>
            <ul>
              <li>
                <strong>Mortgage Loans:</strong> 15-year, 30-year fixed and
                adjustable rates
              </li>
              <li>
                <strong>Auto Loans:</strong> New and used car financing
              </li>
              <li>
                <strong>Personal Loans:</strong> Unsecured personal financing
              </li>
              <li>
                <strong>Student Loans:</strong> Education financing calculations
              </li>
              <li>
                <strong>Business Loans:</strong> Commercial lending calculations
              </li>
            </ul>

            <h3>How to Use</h3>
            <ol>
              <li>Enter the loan amount (principal)</li>
              <li>Input the annual interest rate</li>
              <li>Set the loan term in years</li>
              <li>View your monthly payment and total costs</li>
              <li>Explore the amortization schedule</li>
              <li>Try different scenarios with extra payments</li>
            </ol>

            <h3>Understanding Loan Terms</h3>
            <ul>
              <li>
                <strong>Principal:</strong> The original loan amount
              </li>
              <li>
                <strong>Interest Rate:</strong> Annual percentage rate (APR)
              </li>
              <li>
                <strong>Term:</strong> Length of the loan in years
              </li>
              <li>
                <strong>Monthly Payment:</strong> Fixed amount paid each month
              </li>
              <li>
                <strong>Total Interest:</strong> Total interest paid over loan
                life
              </li>
              <li>
                <strong>Amortization:</strong> How payments are split between
                principal and interest
              </li>
            </ul>

            <h3>Tips for Better Loan Terms</h3>
            <ul>
              <li>Shop around with multiple lenders for best rates</li>
              <li>Improve your credit score before applying</li>
              <li>Consider larger down payments to reduce loan amount</li>
              <li>Compare different loan terms and their total costs</li>
              <li>Factor in additional costs like insurance and taxes</li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
