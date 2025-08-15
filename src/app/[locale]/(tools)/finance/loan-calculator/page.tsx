import { Metadata } from "next";
import { ToolLayout, generateToolMetadata } from "@/components/tools/ToolLayout";
import { LoanCalculator } from "@/components/converters/LoanCalculator";




// Force static generation
export const dynamic = 'force-static';
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
  "finance"
);

export default function LoanCalculatorPage() {
  return (
    <ToolLayout
      title="Loan Calculator"
      description="Calculate monthly loan payments, total interest, and amortization schedules. Perfect for mortgages, auto loans, and personal loans."
      toolId="loan-calculator"
      category="finance"
      emoji="🏦"
      customHowToUse={[
        "Enter the loan amount (principal)",
        "Input the annual interest rate",
        "Set the loan term in years",
        "View your monthly payment and total costs"
      ]}
      customFeatures={[
        "Calculate monthly loan payments",
        "Total interest and total payment amounts",
        "Detailed amortization schedule",
        "Support for different loan types"
      ]}
    >
      <LoanCalculator />
    </ToolLayout>
  );
}
