export interface FinanceToolConfig {
  id: string;
  name: string;
  description: string;
  path: string;
  icon: string;
  category: string;
  subcategory: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  searchVolume?: number;
  component: string;
}

export const FINANCE_TOOLS_CONFIG: FinanceToolConfig[] = [
  // Loans & Credit
  {
    id: 'loan-calculator',
    name: 'Loan Calculator',
    description: 'Calculate loan payments, interest, and amortization schedules',
    path: '/finance/loan-calculator',
    icon: '💰',
    category: 'loans',
    subcategory: 'personal-loans',
    difficulty: 'beginner',
    searchVolume: 450000,
    component: 'PersonalLoanCalculator'
  },
  {
    id: 'auto-loan-calculator',
    name: 'Auto Loan Calculator',
    description: 'Calculate car loan payments, interest costs, and financing options',
    path: '/finance/auto-loan-calculator',
    icon: '🚗',
    category: 'loans',
    subcategory: 'auto-loans',
    difficulty: 'beginner',
    searchVolume: 180000,
    component: 'AutoLoanCalculator'
  },
  {
    id: 'personal-loan-calculator',
    name: 'Personal Loan Calculator',
    description: 'Calculate personal loan payments and compare lending options',
    path: '/finance/personal-loan-calculator',
    icon: '👤',
    category: 'loans',
    subcategory: 'personal-loans',
    difficulty: 'beginner',
    searchVolume: 125000,
    component: 'PersonalLoanCalculator'
  },
  {
    id: 'student-loan-calculator',
    name: 'Student Loan Calculator',
    description: 'Calculate student loan payments and repayment strategies',
    path: '/finance/student-loan-calculator',
    icon: '🎓',
    category: 'loans',
    subcategory: 'education',
    difficulty: 'intermediate',
    searchVolume: 95000,
    component: 'StudentLoanCalculator'
  },
  {
    id: 'business-loan-calculator',
    name: 'Business Loan Calculator',
    description: 'Calculate business loan payments and cash flow impact',
    path: '/finance/business-loan-calculator',
    icon: '🏢',
    category: 'loans',
    subcategory: 'business',
    difficulty: 'intermediate',
    searchVolume: 75000,
    component: 'BusinessLoanCalculator'
  },

  // Mortgages & Real Estate
  {
    id: 'mortgage-calculator',
    name: 'Mortgage Calculator',
    description: 'Calculate mortgage payments, taxes, insurance, and total costs',
    path: '/finance/mortgage-calculator',
    icon: '🏠',
    category: 'mortgages',
    subcategory: 'home-loans',
    difficulty: 'intermediate',
    searchVolume: 380000,
    component: 'MortgageCalculator'
  },
  {
    id: '30-year-fixed-mortgage-calculator',
    name: '30-Year Fixed Mortgage Calculator',
    description: 'Calculate 30-year fixed mortgage payments and amortization',
    path: '/finance/30-year-fixed-mortgage-calculator',
    icon: '🏡',
    category: 'mortgages',
    subcategory: 'fixed-rate',
    difficulty: 'beginner',
    searchVolume: 85000,
    component: 'ThirtyYearMortgageCalculator'
  },
  {
    id: '15-year-fixed-mortgage-calculator',
    name: '15-Year Fixed Mortgage Calculator',
    description: 'Calculate 15-year fixed mortgage payments and savings',
    path: '/finance/15-year-fixed-mortgage-calculator',
    icon: '🏘️',
    category: 'mortgages',
    subcategory: 'fixed-rate',
    difficulty: 'beginner',
    searchVolume: 45000,
    component: 'FifteenYearMortgageCalculator'
  },
  {
    id: 'mortgage-refinance-calculator',
    name: 'Mortgage Refinance Calculator',
    description: 'Calculate refinancing savings and break-even analysis',
    path: '/finance/mortgage-refinance-calculator',
    icon: '🔄',
    category: 'mortgages',
    subcategory: 'refinancing',
    difficulty: 'intermediate',
    searchVolume: 65000,
    component: 'MortgageRefinanceCalculator'
  },

  // Credit Cards
  {
    id: 'credit-card-payoff-calculator',
    name: 'Credit Card Payoff Calculator',
    description: 'Calculate time and cost to pay off credit card debt',
    path: '/finance/credit-card-payoff-calculator',
    icon: '💳',
    category: 'credit-cards',
    subcategory: 'debt-payoff',
    difficulty: 'beginner',
    searchVolume: 195000,
    component: 'CreditCardPayoffCalculator'
  },
  {
    id: 'credit-card-interest-calculator',
    name: 'Credit Card Interest Calculator',
    description: 'Calculate credit card interest charges and costs',
    path: '/finance/credit-card-interest-calculator',
    icon: '💸',
    category: 'credit-cards',
    subcategory: 'interest',
    difficulty: 'beginner',
    searchVolume: 35000,
    component: 'CreditCardInterestCalculator'
  },
  {
    id: 'balance-transfer-calculator',
    name: 'Balance Transfer Calculator',
    description: 'Calculate savings from balance transfer offers',
    path: '/finance/balance-transfer-calculator',
    icon: '⚖️',
    category: 'credit-cards',
    subcategory: 'balance-transfer',
    difficulty: 'intermediate',
    searchVolume: 25000,
    component: 'BalanceTransferCalculator'
  },

  // Savings & Banking
  {
    id: 'savings-calculator',
    name: 'Savings Calculator',
    description: 'Calculate savings growth with compound interest and regular deposits',
    path: '/finance/savings-calculator',
    icon: '💰',
    category: 'savings',
    subcategory: 'savings',
    difficulty: 'beginner',
    searchVolume: 220000,
    component: 'SavingsGoalCalculator'
  },
  {
    id: 'compound-interest-calculator',
    name: 'Compound Interest Calculator',
    description: 'Calculate the power of compound interest over time',
    path: '/finance/compound-interest-calculator',
    icon: '📈',
    category: 'banking',
    subcategory: 'interest',
    difficulty: 'beginner',
    searchVolume: 35000,
    component: 'MoneyMarketCalculator'
  },
  {
    id: 'savings-goal-calculator',
    name: 'Savings Goal Calculator',
    description: 'Calculate how to reach your savings goals with timeline planning',
    path: '/finance/savings-goal-calculator',
    icon: '🎯',
    category: 'savings',
    subcategory: 'planning',
    difficulty: 'beginner',
    searchVolume: 45000,
    component: 'SavingsGoalCalculator'
  },
  {
    id: 'cd-calculator',
    name: 'CD Calculator',
    description: 'Calculate certificate of deposit returns and maturity values',
    path: '/finance/cd-calculator',
    icon: '📜',
    category: 'banking',
    subcategory: 'certificates',
    difficulty: 'beginner',
    searchVolume: 55000,
    component: 'CDCalculator'
  },

  // Taxes
  {
    id: 'tax-calculator',
    name: 'Tax Calculator',
    description: 'Calculate federal and state income taxes and refunds',
    path: '/finance/tax-calculator',
    icon: '📋',
    category: 'taxes',
    subcategory: 'income-tax',
    difficulty: 'intermediate',
    searchVolume: 280000,
    component: 'TaxCalculator'
  },
  {
    id: 'income-tax-calculator',
    name: 'Income Tax Calculator',
    description: 'Calculate federal and state income tax liability',
    path: '/finance/income-tax-calculator',
    icon: '💼',
    category: 'taxes',
    subcategory: 'income-tax',
    difficulty: 'intermediate',
    searchVolume: 150000,
    component: 'IncomeTaxCalculator'
  },
  {
    id: 'capital-gains-tax-calculator',
    name: 'Capital Gains Tax Calculator',
    description: 'Calculate capital gains tax on investment profits',
    path: '/finance/capital-gains-tax-calculator',
    icon: '📊',
    category: 'taxes',
    subcategory: 'capital-gains',
    difficulty: 'advanced',
    searchVolume: 85000,
    component: 'TaxCalculator'
  },

  // Currency & Exchange
  {
    id: 'currency-converter',
    name: 'Currency Converter',
    description: 'Convert between different currencies with real-time exchange rates',
    path: '/finance/currency-converter',
    icon: '💱',
    category: 'currency',
    subcategory: 'conversion',
    difficulty: 'beginner',
    searchVolume: 165000,
    component: 'CurrencyConverter'
  },
  {
    id: 'exchange-rate-calculator',
    name: 'Exchange Rate Calculator',
    description: 'Calculate currency exchange rates and conversion costs',
    path: '/finance/exchange-rate-calculator',
    icon: '🔄',
    category: 'currency',
    subcategory: 'rates',
    difficulty: 'beginner',
    searchVolume: 95000,
    component: 'CurrencyExchangeCalculator'
  },

  // Investments & Retirement
  {
    id: 'investment-calculator',
    name: 'Investment Calculator',
    description: 'Calculate investment returns and portfolio growth',
    path: '/finance/investment-calculator',
    icon: '📈',
    category: 'investments',
    subcategory: 'general',
    difficulty: 'intermediate',
    searchVolume: 145000,
    component: 'InvestmentCalculator'
  },
  {
    id: '401k-calculator',
    name: '401(k) Calculator',
    description: 'Calculate 401(k) contributions and retirement savings',
    path: '/finance/401k-calculator',
    icon: '🏛️',
    category: 'investments',
    subcategory: 'retirement',
    difficulty: 'intermediate',
    searchVolume: 85000,
    component: 'FourOhOneKCalculator'
  },
  {
    id: 'retirement-calculator',
    name: 'Retirement Calculator',
    description: 'Calculate retirement savings needs and timeline',
    path: '/finance/retirement-calculator',
    icon: '🌅',
    category: 'investments',
    subcategory: 'retirement',
    difficulty: 'advanced',
    searchVolume: 185000,
    component: 'RetirementCalculator'
  },
  {
    id: 'roth-ira-calculator',
    name: 'Roth IRA Calculator',
    description: 'Calculate Roth IRA growth and retirement benefits',
    path: '/finance/roth-ira-calculator',
    icon: '🏦',
    category: 'retirement',
    subcategory: 'retirement',
    difficulty: 'intermediate',
    searchVolume: 55000,
    component: 'RothIRACalculator'
  },
  {
    id: 'annuity-calculator',
    name: 'Annuity Calculator',
    description: 'Calculate annuity payments and retirement income streams',
    path: '/finance/annuity-calculator',
    icon: '📊',
    category: 'investments',
    subcategory: 'retirement',
    difficulty: 'advanced',
    searchVolume: 55000,
    component: 'SavingsCalculator'
  },

  // Additional Mortgage Tools
  {
    id: '10-year-fixed-mortgage-calculator',
    name: '10-Year Fixed Mortgage Calculator',
    description: 'Calculate 10-year fixed mortgage payments and total interest savings',
    path: '/finance/10-year-fixed-mortgage-calculator',
    icon: '🏘️',
    category: 'mortgages',
    subcategory: 'fixed-rate',
    difficulty: 'beginner',
    searchVolume: 25000,
    component: 'MortgageCalculator'
  },
  {
    id: '15-vs-30-year-mortgage-calculator',
    name: '15 vs 30 Year Mortgage Calculator',
    description: 'Compare 15-year vs 30-year mortgage payments and total costs',
    path: '/finance/15-vs-30-year-mortgage-calculator',
    icon: '⚖️',
    category: 'mortgages',
    subcategory: 'comparison',
    difficulty: 'intermediate',
    searchVolume: 35000,
    component: 'MortgageCalculator'
  },
  {
    id: '20-year-fixed-mortgage-calculator',
    name: '20-Year Fixed Mortgage Calculator',
    description: 'Calculate 20-year fixed mortgage payments and amortization',
    path: '/finance/20-year-fixed-mortgage-calculator',
    icon: '🏠',
    category: 'mortgages',
    subcategory: 'fixed-rate',
    difficulty: 'beginner',
    searchVolume: 15000,
    component: 'MortgageCalculator'
  },
  {
    id: 'fha-loan-calculator',
    name: 'FHA Loan Calculator',
    description: 'Calculate FHA loan payments with mortgage insurance premiums',
    path: '/finance/fha-loan-calculator',
    icon: '🏛️',
    category: 'mortgages',
    subcategory: 'government-loans',
    difficulty: 'intermediate',
    searchVolume: 95000,
    component: 'FHALoanCalculator'
  },
  {
    id: 'va-loan-calculator',
    name: 'VA Loan Calculator',
    description: 'Calculate VA loan payments with no down payment and no PMI',
    path: '/finance/va-loan-calculator',
    icon: '🇺🇸',
    category: 'mortgages',
    subcategory: 'government-loans',
    difficulty: 'intermediate',
    searchVolume: 75000,
    component: 'VALoanCalculator'
  },
  {
    id: 'usda-mortgage-calculator',
    name: 'USDA Mortgage Calculator',
    description: 'Calculate USDA rural development loan payments and eligibility',
    path: '/finance/usda-mortgage-calculator',
    icon: '🌾',
    category: 'mortgages',
    subcategory: 'government-loans',
    difficulty: 'intermediate',
    searchVolume: 25000,
    component: 'MortgageCalculator'
  },
  {
    id: 'cash-out-refinance-calculator',
    name: 'Cash-Out Refinance Calculator',
    description: 'Calculate cash-out refinance payments and available equity',
    path: '/finance/cash-out-refinance-calculator',
    icon: '💰',
    category: 'mortgages',
    subcategory: 'refinancing',
    difficulty: 'advanced',
    searchVolume: 45000,
    component: 'MortgageCalculator'
  },
  {
    id: 'loan-refinance-calculator',
    name: 'Loan Refinance Calculator',
    description: 'Calculate refinancing savings and break-even analysis for any loan',
    path: '/finance/loan-refinance-calculator',
    icon: '🔄',
    category: 'mortgages',
    subcategory: 'refinancing',
    difficulty: 'intermediate',
    searchVolume: 35000,
    component: 'MortgageCalculator'
  },
  {
    id: 'mortgage-amortization-calculator',
    name: 'Mortgage Amortization Calculator',
    description: 'Generate detailed mortgage amortization schedule and payment breakdown',
    path: '/finance/mortgage-amortization-calculator',
    icon: '📊',
    category: 'mortgages',
    subcategory: 'analysis',
    difficulty: 'intermediate',
    searchVolume: 85000,
    component: 'MortgageCalculator'
  },
  {
    id: 'mortgage-apr-calculator',
    name: 'Mortgage APR Calculator',
    description: 'Calculate true mortgage APR including fees and closing costs',
    path: '/finance/mortgage-apr-calculator',
    icon: '📈',
    category: 'mortgages',
    subcategory: 'analysis',
    difficulty: 'advanced',
    searchVolume: 25000,
    component: 'MortgageCalculator'
  },
  {
    id: 'mortgage-payoff-calculator',
    name: 'Mortgage Payoff Calculator',
    description: 'Calculate early mortgage payoff savings with extra payments',
    path: '/finance/mortgage-payoff-calculator',
    icon: '🎯',
    category: 'mortgages',
    subcategory: 'payoff',
    difficulty: 'intermediate',
    searchVolume: 65000,
    component: 'MortgageCalculator'
  },
  {
    id: 'interest-only-mortgage-calculator',
    name: 'Interest-Only Mortgage Calculator',
    description: 'Calculate interest-only mortgage payments and total costs',
    path: '/finance/interest-only-mortgage-calculator',
    icon: '📉',
    category: 'mortgages',
    subcategory: 'specialty',
    difficulty: 'advanced',
    searchVolume: 15000,
    component: 'InterestOnlyMortgageCalculator'
  },
  {
    id: 'home-affordability-calculator',
    name: 'Home Affordability Calculator',
    description: 'Calculate how much house you can afford based on income and debts',
    path: '/finance/home-affordability-calculator',
    icon: '🏡',
    category: 'mortgages',
    subcategory: 'planning',
    difficulty: 'intermediate',
    searchVolume: 125000,
    component: 'HomeAffordabilityCalculator'
  },
  {
    id: 'home-equity-loan-calculator',
    name: 'Home Equity Loan Calculator',
    description: 'Calculate home equity loan payments and available equity',
    path: '/finance/home-equity-loan-calculator',
    icon: '🏠',
    category: 'mortgages',
    subcategory: 'equity',
    difficulty: 'intermediate',
    searchVolume: 55000,
    component: 'PersonalLoanCalculator'
  },
  {
    id: 'heloc-calculator',
    name: 'HELOC Calculator',
    description: 'Calculate Home Equity Line of Credit payments and draw periods',
    path: '/finance/heloc-calculator',
    icon: '🔄',
    category: 'mortgages',
    subcategory: 'equity',
    difficulty: 'advanced',
    searchVolume: 45000,
    component: 'BusinessLoanCalculator'
  },
  {
    id: 'home-improvement-loan-calculator',
    name: 'Home Improvement Loan Calculator',
    description: 'Calculate financing for home renovation projects',
    path: '/finance/home-improvement-loan-calculator',
    icon: '🏠',
    category: 'loans',
    subcategory: 'home-improvement',
    difficulty: 'intermediate',
    searchVolume: 35000,
    component: 'HomeImprovementLoanCalculator'
  },

  // Additional Loan Tools
  {
    id: 'boat-loan-calculator',
    name: 'Boat Loan Calculator',
    description: 'Calculate boat financing and marine loans',
    path: '/finance/boat-loan-calculator',
    icon: '⛵',
    category: 'loans',
    subcategory: 'recreational',
    difficulty: 'beginner',
    searchVolume: 15000,
    component: 'BoatLoanCalculator'
  },
  {
    id: 'rv-loan-calculator',
    name: 'RV Loan Calculator',
    description: 'Calculate RV and recreational vehicle financing',
    path: '/finance/rv-loan-calculator',
    icon: '🚐',
    category: 'loans',
    subcategory: 'recreational',
    difficulty: 'beginner',
    searchVolume: 25000,
    component: 'RVLoanCalculator'
  },
  {
    id: 'motorcycle-loan-calculator',
    name: 'Motorcycle Loan Calculator',
    description: 'Calculate motorcycle loan payments and bike financing options',
    path: '/finance/motorcycle-loan-calculator',
    icon: '🏍️',
    category: 'loans',
    subcategory: 'auto-loans',
    difficulty: 'beginner',
    searchVolume: 18000,
    component: 'MotorcycleLoanCalculator'
  },
  {
    id: 'equipment-loan-calculator',
    name: 'Equipment Loan Calculator',
    description: 'Calculate business equipment financing and loans',
    path: '/finance/equipment-loan-calculator',
    icon: '🏭',
    category: 'loans',
    subcategory: 'business',
    difficulty: 'intermediate',
    searchVolume: 22000,
    component: 'EquipmentLoanCalculator'
  },
  {
    id: 'consolidation-loan-calculator',
    name: 'Consolidation Loan Calculator',
    description: 'Calculate debt consolidation loan payments and savings',
    path: '/finance/consolidation-loan-calculator',
    icon: '📋',
    category: 'loans',
    subcategory: 'debt-consolidation',
    difficulty: 'intermediate',
    searchVolume: 45000,
    component: 'ConsolidationLoanCalculator'
  },
  {
    id: 'debt-consolidation-calculator',
    name: 'Debt Consolidation Calculator',
    description: 'Calculate debt consolidation savings and payment strategies',
    path: '/finance/debt-consolidation-calculator',
    icon: '💳',
    category: 'loans',
    subcategory: 'debt-consolidation',
    difficulty: 'intermediate',
    searchVolume: 65000,
    component: 'DebtConsolidationCalculator'
  },
  {
    id: 'secured-loan-calculator',
    name: 'Secured Loan Calculator',
    description: 'Calculate secured loan payments with collateral requirements',
    path: '/finance/secured-loan-calculator',
    icon: '🔒',
    category: 'loans',
    subcategory: 'secured',
    difficulty: 'intermediate',
    searchVolume: 15000,
    component: 'SecuredLoanCalculator'
  },
  {
    id: 'unsecured-loan-calculator',
    name: 'Unsecured Loan Calculator',
    description: 'Calculate unsecured personal loan payments and rates',
    path: '/finance/unsecured-loan-calculator',
    icon: '🔓',
    category: 'loans',
    subcategory: 'personal-loans',
    difficulty: 'beginner',
    searchVolume: 25000,
    component: 'UnsecuredLoanCalculator'
  },
  {
    id: 'payday-loan-calculator',
    name: 'Payday Loan Calculator',
    description: 'Calculate payday loan costs and compare alternatives',
    path: '/finance/payday-loan-calculator',
    icon: '⚡',
    category: 'loans',
    subcategory: 'short-term',
    difficulty: 'beginner',
    searchVolume: 35000,
    component: 'PaydayLoanCalculator'
  },
  {
    id: 'title-loan-calculator',
    name: 'Title Loan Calculator',
    description: 'Calculate auto title loan payments and risks',
    path: '/finance/title-loan-calculator',
    icon: '🚗',
    category: 'loans',
    subcategory: 'short-term',
    difficulty: 'intermediate',
    searchVolume: 18000,
    component: 'TitleLoanCalculator'
  },

  // Additional Credit Card Tools
  {
    id: 'credit-score-calculator',
    name: 'Credit Score Calculator',
    description: 'Estimate credit score and improvement strategies',
    path: '/finance/credit-score-calculator',
    icon: '📊',
    category: 'credit',
    subcategory: 'credit-score',
    difficulty: 'beginner',
    searchVolume: 25000,
    component: 'CreditScoreCalculator'
  },
  {
    id: 'minimum-payment-calculator',
    name: 'Minimum Payment Calculator',
    description: 'Calculate credit card minimum payments and payoff time',
    path: '/finance/minimum-payment-calculator',
    icon: '💳',
    category: 'credit',
    subcategory: 'payments',
    difficulty: 'beginner',
    searchVolume: 35000,
    component: 'MinimumPaymentCalculator'
  },
  {
    id: 'debt-payoff-calculator',
    name: 'Debt Payoff Calculator',
    description: 'Calculate debt payoff strategies using snowball or avalanche methods',
    path: '/finance/debt-payoff-calculator',
    icon: '❄️',
    category: 'credit-cards',
    subcategory: 'debt-payoff',
    difficulty: 'intermediate',
    searchVolume: 85000,
    component: 'DebtPayoffCalculator'
  },
  {
    id: 'rewards-calculator',
    name: 'Credit Card Rewards Calculator',
    description: 'Calculate credit card rewards and cashback earnings',
    path: '/finance/rewards-calculator',
    icon: '🎁',
    category: 'credit-cards',
    subcategory: 'rewards',
    difficulty: 'beginner',
    searchVolume: 45000,
    component: 'RewardsCalculator'
  },

  // Additional Banking & Savings Tools
  {
    id: 'high-yield-savings-calculator',
    name: 'High-Yield Savings Calculator',
    description: 'Calculate high-yield savings account growth and earnings',
    path: '/finance/high-yield-savings-calculator',
    icon: '💰',
    category: 'banking',
    subcategory: 'savings',
    difficulty: 'beginner',
    searchVolume: 45000,
    component: 'HighYieldSavingsCalculator'
  },
  {
    id: 'money-market-calculator',
    name: 'Money Market Calculator',
    description: 'Calculate money market account returns and growth',
    path: '/finance/money-market-calculator',
    icon: '📈',
    category: 'banking',
    subcategory: 'savings',
    difficulty: 'beginner',
    searchVolume: 35000,
    component: 'MoneyMarketCalculator'
  },
  {
    id: 'emergency-fund-calculator',
    name: 'Emergency Fund Calculator',
    description: 'Calculate emergency fund needs and savings timeline',
    path: '/finance/emergency-fund-calculator',
    icon: '🚨',
    category: 'banking',
    subcategory: 'planning',
    difficulty: 'beginner',
    searchVolume: 45000,
    component: 'SavingsCalculator'
  },

  // Additional Tax Tools
  {
    id: 'sales-tax-calculator',
    name: 'Sales Tax Calculator',
    description: 'Calculate sales tax amounts for purchases by state',
    path: '/finance/sales-tax-calculator',
    icon: '🛒',
    category: 'taxes',
    subcategory: 'sales-tax',
    difficulty: 'beginner',
    searchVolume: 125000,
    component: 'TaxCalculator'
  },
  {
    id: 'property-tax-calculator',
    name: 'Property Tax Calculator',
    description: 'Calculate property tax amounts and assessments',
    path: '/finance/property-tax-calculator',
    icon: '🏠',
    category: 'taxes',
    subcategory: 'property-tax',
    difficulty: 'intermediate',
    searchVolume: 85000,
    component: 'TaxCalculator'
  },
  {
    id: 'payroll-tax-calculator',
    name: 'Payroll Tax Calculator',
    description: 'Calculate payroll taxes and withholdings for employers',
    path: '/finance/payroll-tax-calculator',
    icon: '💼',
    category: 'taxes',
    subcategory: 'payroll',
    difficulty: 'advanced',
    searchVolume: 65000,
    component: 'TaxCalculator'
  },

  // Additional Currency Tools
  {
    id: 'eur-to-usd-calculator',
    name: 'EUR to USD Calculator',
    description: 'Convert Euros to US Dollars with real-time exchange rates',
    path: '/finance/eur-to-usd-calculator',
    icon: '🇪🇺',
    category: 'currency',
    subcategory: 'major-pairs',
    difficulty: 'beginner',
    searchVolume: 95000,
    component: 'CurrencyConverter'
  },
  {
    id: 'usd-to-eur-calculator',
    name: 'USD to EUR Calculator',
    description: 'Convert US Dollars to Euros with current exchange rates',
    path: '/finance/usd-to-eur-calculator',
    icon: '🇺🇸',
    category: 'currency',
    subcategory: 'major-pairs',
    difficulty: 'beginner',
    searchVolume: 85000,
    component: 'CurrencyConverter'
  },
  {
    id: 'usd-to-gbp-calculator',
    name: 'USD to GBP Calculator',
    description: 'Convert US Dollars to British Pounds with live rates',
    path: '/finance/usd-to-gbp-calculator',
    icon: '🇬🇧',
    category: 'currency',
    subcategory: 'major-pairs',
    difficulty: 'beginner',
    searchVolume: 75000,
    component: 'CurrencyConverter'
  },
  {
    id: 'usd-to-jpy-calculator',
    name: 'USD to JPY Calculator',
    description: 'Convert US Dollars to Japanese Yen with current rates',
    path: '/finance/usd-to-jpy-calculator',
    icon: '🇯🇵',
    category: 'currency',
    subcategory: 'major-pairs',
    difficulty: 'beginner',
    searchVolume: 65000,
    component: 'CurrencyConverter'
  },

  // Additional Investment Tools
  {
    id: 'ira-calculator',
    name: 'IRA Calculator',
    description: 'Calculate IRA contributions and retirement savings growth',
    path: '/finance/ira-calculator',
    icon: '🏦',
    category: 'retirement',
    subcategory: 'retirement',
    difficulty: 'intermediate',
    searchVolume: 95000,
    component: 'IRACalculator'
  },
  {
    id: 'roth-ira-calculator',
    name: 'Roth IRA Calculator',
    description: 'Calculate Roth IRA growth and retirement benefits',
    path: '/finance/roth-ira-calculator',
    icon: '🏦',
    category: 'retirement',
    subcategory: 'retirement',
    difficulty: 'intermediate',
    searchVolume: 55000,
    component: 'RothIRACalculator'
  },
  {
    id: 'annuity-calculator',
    name: 'Annuity Calculator',
    description: 'Calculate annuity payments and retirement income streams',
    path: '/finance/annuity-calculator',
    icon: '📊',
    category: 'investments',
    subcategory: 'retirement',
    difficulty: 'advanced',
    searchVolume: 55000,
    component: 'SavingsCalculator'
  },
  {
    id: 'dividend-calculator',
    name: 'Dividend Calculator',
    description: 'Calculate dividend income and reinvestment returns',
    path: '/finance/dividend-calculator',
    icon: '💰',
    category: 'investments',
    subcategory: 'stocks',
    difficulty: 'intermediate',
    searchVolume: 45000,
    component: 'DividendCalculator'
  },
  {
    id: 'stock-calculator',
    name: 'Stock Calculator',
    description: 'Calculate stock investment returns and analysis',
    path: '/finance/stock-calculator',
    icon: '📈',
    category: 'investments',
    subcategory: 'stocks',
    difficulty: 'intermediate',
    searchVolume: 85000,
    component: 'StockCalculator'
  },
  {
    id: 'bond-calculator',
    name: 'Bond Calculator',
    description: 'Calculate bond yields, duration, and total returns',
    path: '/finance/bond-calculator',
    icon: '📊',
    category: 'investments',
    subcategory: 'bonds',
    difficulty: 'advanced',
    searchVolume: 35000,
    component: 'BondCalculator'
  },
  {
    id: 'mutual-fund-calculator',
    name: 'Mutual Fund Calculator',
    description: 'Calculate mutual fund returns and fee impact',
    path: '/finance/mutual-fund-calculator',
    icon: '📈',
    category: 'investments',
    subcategory: 'funds',
    difficulty: 'intermediate',
    searchVolume: 65000,
    component: 'MutualFundCalculator'
  },
  {
    id: 'etf-calculator',
    name: 'ETF Calculator',
    description: 'Calculate ETF investment returns and compare costs',
    path: '/finance/etf-calculator',
    icon: '📊',
    category: 'investments',
    subcategory: 'funds',
    difficulty: 'intermediate',
    searchVolume: 45000,
    component: 'ETFCalculator'
  },
  {
    id: 'bitcoin-calculator',
    name: 'Bitcoin Calculator',
    description: 'Calculate Bitcoin investment returns and analyze crypto strategies',
    path: '/finance/bitcoin-calculator',
    icon: '₿',
    category: 'investments',
    subcategory: 'crypto',
    difficulty: 'advanced',
    searchVolume: 125000,
    component: 'BitcoinCalculator'
  },

  // Insurance Tools
  {
    id: 'life-insurance-calculator',
    name: 'Life Insurance Calculator',
    description: 'Calculate life insurance needs and coverage amounts',
    path: '/finance/life-insurance-calculator',
    icon: '🛡️',
    category: 'insurance',
    subcategory: 'life-insurance',
    difficulty: 'intermediate',
    searchVolume: 85000,
    component: 'InsuranceCalculator'
  },
  {
    id: 'auto-insurance-calculator',
    name: 'Auto Insurance Calculator',
    description: 'Calculate auto insurance premiums and coverage costs',
    path: '/finance/auto-insurance-calculator',
    icon: '🚗',
    category: 'insurance',
    subcategory: 'auto-insurance',
    difficulty: 'beginner',
    searchVolume: 125000,
    component: 'InsuranceCalculator'
  },
  {
    id: 'home-insurance-calculator',
    name: 'Home Insurance Calculator',
    description: 'Calculate home insurance premiums and coverage needs',
    path: '/finance/home-insurance-calculator',
    icon: '🏠',
    category: 'insurance',
    subcategory: 'home-insurance',
    difficulty: 'intermediate',
    searchVolume: 95000,
    component: 'InsuranceCalculator'
  },

  // Cost of Living Tools
  {
    id: 'cost-of-living-calculator',
    name: 'Cost of Living Calculator',
    description: 'Compare cost of living between cities and states',
    path: '/finance/cost-of-living-calculator',
    icon: '🏙️',
    category: 'planning',
    subcategory: 'cost-analysis',
    difficulty: 'intermediate',
    searchVolume: 165000,
    component: 'CostOfLivingCalculator'
  },
  {
    id: 'moving-cost-calculator',
    name: 'Moving Cost Calculator',
    description: 'Calculate moving expenses and relocation costs',
    path: '/finance/moving-cost-calculator',
    icon: '📦',
    category: 'planning',
    subcategory: 'moving',
    difficulty: 'beginner',
    searchVolume: 45000,
    component: 'CostOfLivingCalculator'
  }
];

// Helper functions
export const getFinanceToolsByCategory = (category: string) => {
  return FINANCE_TOOLS_CONFIG.filter(tool => tool.category === category);
};

export const getFinanceToolsBySubcategory = (subcategory: string) => {
  return FINANCE_TOOLS_CONFIG.filter(tool => tool.subcategory === subcategory);
};

export const getPopularFinanceTools = (limit: number = 6) => {
  return FINANCE_TOOLS_CONFIG
    .sort((a, b) => (b.searchVolume || 0) - (a.searchVolume || 0))
    .slice(0, limit);
};

export const FINANCE_CATEGORIES = [
  {
    id: 'loans',
    name: 'Loans & Credit',
    description: 'Personal, auto, student, and business loan calculators',
    color: 'bg-blue-500',
    icon: '💰'
  },
  {
    id: 'mortgages',
    name: 'Mortgages & Real Estate',
    description: 'Home loans, refinancing, and real estate calculators',
    color: 'bg-green-500',
    icon: '🏠'
  },
  {
    id: 'credit-cards',
    name: 'Credit Cards',
    description: 'Credit card payoff, interest, and balance transfer tools',
    color: 'bg-orange-500',
    icon: '💳'
  },
  {
    id: 'banking',
    name: 'Banking & Savings',
    description: 'Savings accounts, CDs, and compound interest calculators',
    color: 'bg-cyan-500',
    icon: '🏦'
  },
  {
    id: 'taxes',
    name: 'Taxes',
    description: 'Income tax, capital gains, and tax planning tools',
    color: 'bg-red-500',
    icon: '📋'
  },
  {
    id: 'currency',
    name: 'Currency & Exchange',
    description: 'Currency conversion and exchange rate calculators',
    color: 'bg-yellow-500',
    icon: '💱'
  },
  {
    id: 'investments',
    name: 'Investments & Retirement',
    description: 'Investment returns, 401(k), and retirement planning',
    color: 'bg-purple-500',
    icon: '📈'
  },
  {
    id: 'insurance',
    name: 'Insurance',
    description: 'Life, auto, and home insurance calculators',
    color: 'bg-indigo-500',
    icon: '🛡️'
  },
  {
    id: 'planning',
    name: 'Financial Planning',
    description: 'Cost of living, budgeting, and financial planning tools',
    color: 'bg-teal-500',
    icon: '📊'
  }
];
