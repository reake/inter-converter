'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface TitleLoanResults {
  loanAmount: number;
  monthlyPayment: number;
  totalPayments: number;
  totalInterest: number;
  apr: number;
  vehicleValue: number;
  loanToValueRatio: number;
  riskAssessment: string;
  alternativeCosts: {
    personalLoan: number;
    creditCard: number;
    paydayLoan: number;
  };
}

export default function TitleLoanCalculator() {
  const [vehicleValue, setVehicleValue] = useState<string>('15000');
  const [loanAmount, setLoanAmount] = useState<string>('5000');
  const [interestRate, setInterestRate] = useState<string>('25');
  const [loanTerm, setLoanTerm] = useState<string>('12');
  const [vehicleYear, setVehicleYear] = useState<string>('2018');
  const [vehicleMileage, setVehicleMileage] = useState<string>('75000');
  const [creditScore, setCreditScore] = useState<string>('600');
  const [results, setResults] = useState<TitleLoanResults | null>(null);

  const calculateTitleLoan = useCallback(() => {
    const vehicleVal = parseFloat(vehicleValue);
    const principal = parseFloat(loanAmount);
    const annualRate = parseFloat(interestRate) / 100;
    const termMonths = parseFloat(loanTerm);
    const year = parseInt(vehicleYear);
    const mileage = parseFloat(vehicleMileage);
    const score = parseInt(creditScore);
    
    if (vehicleVal <= 0 || principal <= 0 || annualRate < 0 || termMonths <= 0) return;

    const monthlyRate = annualRate / 12;
    
    // Calculate monthly payment
    const monthlyPayment = (principal * monthlyRate * Math.pow(1 + monthlyRate, termMonths)) / 
                          (Math.pow(1 + monthlyRate, termMonths) - 1);
    
    const totalPayments = monthlyPayment * termMonths;
    const totalInterest = totalPayments - principal;
    
    // Calculate loan-to-value ratio
    const loanToValueRatio = (principal / vehicleVal) * 100;
    
    // Risk assessment based on vehicle and loan factors
    let riskAssessment = '';
    const currentYear = new Date().getFullYear();
    const vehicleAge = currentYear - year;
    
    if (loanToValueRatio > 80 || vehicleAge > 10 || mileage > 150000) {
      riskAssessment = 'Very High Risk - Old/high-mileage vehicle, high LTV ratio';
    } else if (loanToValueRatio > 60 || vehicleAge > 7 || mileage > 100000) {
      riskAssessment = 'High Risk - Significant depreciation risk';
    } else if (loanToValueRatio > 40 || vehicleAge > 5) {
      riskAssessment = 'Moderate Risk - Some depreciation concerns';
    } else {
      riskAssessment = 'Lower Risk - Newer vehicle, conservative loan amount';
    }
    
    // Alternative loan costs comparison
    let personalLoanAPR = 15;
    if (score >= 700) personalLoanAPR = 12;
    else if (score >= 650) personalLoanAPR = 15;
    else if (score >= 600) personalLoanAPR = 18;
    else personalLoanAPR = 25;
    
    const personalLoanRate = personalLoanAPR / 100 / 12;
    const personalLoanPayment = (principal * personalLoanRate * Math.pow(1 + personalLoanRate, termMonths)) / 
                               (Math.pow(1 + personalLoanRate, termMonths) - 1);
    const personalLoanTotal = personalLoanPayment * termMonths;
    
    const creditCardAPR = Math.max(18, personalLoanAPR + 3);
    const creditCardRate = creditCardAPR / 100 / 12;
    const creditCardPayment = (principal * creditCardRate * Math.pow(1 + creditCardRate, termMonths)) / 
                             (Math.pow(1 + creditCardRate, termMonths) - 1);
    const creditCardTotal = creditCardPayment * termMonths;
    
    // Payday loan (assuming rolled over multiple times)
    const paydayFeeRate = 0.15; // $15 per $100 every 2 weeks
    const paydayRollovers = Math.ceil(termMonths / 0.5); // Estimate rollovers
    const paydayTotal = principal + (principal * paydayFeeRate * paydayRollovers);

    setResults({
      loanAmount: principal,
      monthlyPayment,
      totalPayments,
      totalInterest,
      apr: annualRate * 100,
      vehicleValue: vehicleVal,
      loanToValueRatio,
      riskAssessment,
      alternativeCosts: {
        personalLoan: personalLoanTotal - principal,
        creditCard: creditCardTotal - principal,
        paydayLoan: paydayTotal - principal
      }
    });
  }, [vehicleValue, loanAmount, interestRate, loanTerm, vehicleYear, vehicleMileage, creditScore]);

  useEffect(() => {
    calculateTitleLoan();
  }, [calculateTitleLoan]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatPercent = (rate: number) => `${rate.toFixed(1)}%`;

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            🚗 Title Loan Calculator
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="calculator" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="calculator">Calculator</TabsTrigger>
              <TabsTrigger value="risks">Risks & Alternatives</TabsTrigger>
              <TabsTrigger value="warnings">Important Warnings</TabsTrigger>
            </TabsList>

            <TabsContent value="calculator" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="vehicleValue">Vehicle Value</Label>
                    <Input
                      id="vehicleValue"
                      type="number"
                      value={vehicleValue}
                      onChange={(e) => setVehicleValue(e.target.value)}
                      placeholder="Enter vehicle value"
                    />
                    <div className="text-sm text-gray-500 mt-1">
                      Current market value (KBB, Edmunds)
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="loanAmount">Loan Amount</Label>
                    <Input
                      id="loanAmount"
                      type="number"
                      value={loanAmount}
                      onChange={(e) => setLoanAmount(e.target.value)}
                      placeholder="Enter loan amount"
                    />
                    <div className="text-sm text-gray-500 mt-1">
                      Typically 25-50% of vehicle value
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="vehicleYear">Vehicle Year</Label>
                    <Input
                      id="vehicleYear"
                      type="number"
                      value={vehicleYear}
                      onChange={(e) => setVehicleYear(e.target.value)}
                      placeholder="Enter vehicle year"
                    />
                  </div>

                  <div>
                    <Label htmlFor="vehicleMileage">Vehicle Mileage</Label>
                    <Input
                      id="vehicleMileage"
                      type="number"
                      value={vehicleMileage}
                      onChange={(e) => setVehicleMileage(e.target.value)}
                      placeholder="Enter vehicle mileage"
                    />
                  </div>

                  <div>
                    <Label htmlFor="interestRate">Interest Rate (%)</Label>
                    <Input
                      id="interestRate"
                      type="number"
                      step="0.1"
                      value={interestRate}
                      onChange={(e) => setInterestRate(e.target.value)}
                      placeholder="Enter interest rate"
                    />
                    <div className="text-sm text-gray-500 mt-1">
                      Title loans typically 25-300% APR
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="loanTerm">Loan Term (months)</Label>
                    <Select value={loanTerm} onValueChange={setLoanTerm}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select loan term" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">1 month</SelectItem>
                        <SelectItem value="3">3 months</SelectItem>
                        <SelectItem value="6">6 months</SelectItem>
                        <SelectItem value="12">12 months</SelectItem>
                        <SelectItem value="24">24 months</SelectItem>
                        <SelectItem value="36">36 months</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="creditScore">Credit Score</Label>
                    <Select value={creditScore} onValueChange={setCreditScore}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select credit score range" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="750">750+ (Excellent)</SelectItem>
                        <SelectItem value="700">700-749 (Good)</SelectItem>
                        <SelectItem value="650">650-699 (Fair)</SelectItem>
                        <SelectItem value="600">600-649 (Poor)</SelectItem>
                        <SelectItem value="550">550-599 (Very Poor)</SelectItem>
                        <SelectItem value="500">Below 550 (Extremely Poor)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-4">
                  {results && (
                    <>
                      <Card className="bg-red-50 border-red-200">
                        <CardHeader>
                          <CardTitle className="text-red-800 text-sm">Title Loan Details</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span>Loan Amount:</span>
                              <span className="font-semibold">{formatCurrency(results.loanAmount)}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Monthly Payment:</span>
                              <span className="font-semibold">{formatCurrency(results.monthlyPayment)}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Total Payments:</span>
                              <span className="font-semibold">{formatCurrency(results.totalPayments)}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Total Interest:</span>
                              <span className="font-semibold text-red-600">{formatCurrency(results.totalInterest)}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>APR:</span>
                              <span className="font-semibold text-red-800">{formatPercent(results.apr)}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Loan-to-Value:</span>
                              <span className="font-semibold">{formatPercent(results.loanToValueRatio)}</span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      <Card className="bg-orange-50 border-orange-200">
                        <CardHeader>
                          <CardTitle className="text-orange-800 text-sm">⚠️ Risk Assessment</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="text-sm text-orange-700">
                            {results.riskAssessment}
                          </div>
                        </CardContent>
                      </Card>

                      <Card className="bg-yellow-50 border-yellow-200">
                        <CardHeader>
                          <CardTitle className="text-yellow-800 text-sm">💰 Alternative Costs</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span>Title Loan Interest:</span>
                              <span className="font-semibold text-red-600">{formatCurrency(results.totalInterest)}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Personal Loan Interest:</span>
                              <span className="font-semibold">{formatCurrency(results.alternativeCosts.personalLoan)}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Credit Card Interest:</span>
                              <span className="font-semibold">{formatCurrency(results.alternativeCosts.creditCard)}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Payday Loan Cost:</span>
                              <span className="font-semibold text-red-600">{formatCurrency(results.alternativeCosts.paydayLoan)}</span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </>
                  )}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="risks" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-red-800 text-sm">🚨 Major Risks</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-sm">
                      <div>🚗 <strong>Vehicle Repossession:</strong> Lose your car if you default</div>
                      <div>💸 <strong>Extremely High APR:</strong> Often 25-300% annual rate</div>
                      <div>🔄 <strong>Rollover Trap:</strong> 80% of borrowers renew loans</div>
                      <div>📉 <strong>Depreciation Risk:</strong> Vehicle value drops quickly</div>
                      <div>💰 <strong>Additional Fees:</strong> Processing, late, rollover fees</div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-green-800 text-sm">✅ Better Alternatives</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-sm">
                      <div>🏦 <strong>Personal Loan:</strong> Much lower APR, no collateral risk</div>
                      <div>💳 <strong>Credit Card Advance:</strong> High but lower than title loans</div>
                      <div>👥 <strong>Family/Friends:</strong> No interest, flexible terms</div>
                      <div>💼 <strong>Employer Advance:</strong> Often free or low cost</div>
                      <div>🏛️ <strong>Credit Union Loan:</strong> PAL programs available</div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-blue-800 text-sm">🆘 Emergency Resources</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-sm">
                      <div>🏛️ <strong>Government Assistance:</strong> SNAP, TANF, utility help</div>
                      <div>⛪ <strong>Religious Organizations:</strong> Emergency financial aid</div>
                      <div>🤝 <strong>Community Programs:</strong> Local assistance programs</div>
                      <div>📱 <strong>Cash Advance Apps:</strong> Earnin, Dave, Brigit</div>
                      <div>💼 <strong>Side Work:</strong> Gig economy for quick cash</div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-purple-800 text-sm">🔧 Long-term Solutions</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-sm">
                      <div>💰 <strong>Emergency Fund:</strong> Build $500-$1,000 buffer</div>
                      <div>📊 <strong>Budget Creation:</strong> Track income and expenses</div>
                      <div>📈 <strong>Credit Building:</strong> Improve access to better loans</div>
                      <div>💼 <strong>Income Increase:</strong> Skills training, second job</div>
                      <div>📉 <strong>Expense Reduction:</strong> Cut unnecessary spending</div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="warnings" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-red-800 text-sm">🚫 Predatory Practices</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-sm">
                      <div>🎯 <strong>Targeting Vulnerable:</strong> Low-income communities</div>
                      <div>📺 <strong>Misleading Ads:</strong> &quot;Fast cash&quot; promises</div>
                      <div>🔄 <strong>Rollover Encouragement:</strong> Profit from renewals</div>
                      <div>📋 <strong>Hidden Fees:</strong> Processing, documentation costs</div>
                      <div>⚡ <strong>Pressure Tactics:</strong> &quot;Act now&quot; urgency</div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-orange-800 text-sm">📊 Shocking Statistics</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-sm">
                      <div>📈 <strong>Average APR:</strong> 300% annually</div>
                      <div>🔄 <strong>Rollover Rate:</strong> 80% renew their loans</div>
                      <div>🚗 <strong>Repossession:</strong> 1 in 5 borrowers lose vehicle</div>
                      <div>💸 <strong>Debt Cycle:</strong> Average borrower in debt 5 months/year</div>
                      <div>💰 <strong>Fees Exceed Loan:</strong> Often pay more in fees than borrowed</div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-purple-800 text-sm">⚖️ Legal Protections</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-sm">
                      <div>🏛️ <strong>State Regulations:</strong> Some states ban title loans</div>
                      <div>📋 <strong>Disclosure Rules:</strong> Must show APR and terms</div>
                      <div>⏰ <strong>Right to Cancel:</strong> Usually 24-72 hours</div>
                      <div>🔄 <strong>Rollover Limits:</strong> Some states restrict renewals</div>
                      <div>📞 <strong>File Complaints:</strong> CFPB, state regulators</div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-green-800 text-sm">🆘 If You&apos;re Trapped</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-sm">
                      <div>📞 <strong>Contact Lender:</strong> Discuss payment plans</div>
                      <div>⚖️ <strong>Legal Aid:</strong> Free legal assistance</div>
                      <div>💰 <strong>Credit Counseling:</strong> Non-profit debt help</div>
                      <div>🏦 <strong>Refinance Options:</strong> Bank or credit union loan</div>
                      <div>🚗 <strong>Sell Vehicle:</strong> Pay off loan, keep difference</div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
