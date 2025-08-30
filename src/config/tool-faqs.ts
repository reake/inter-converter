import { FAQ } from '@/components/tools/ToolFAQs';

// Automotive Tools FAQs
export const AUTOMOTIVE_FAQS: Record<string, FAQ[]> = {
  'temperature-converter': [
    {
      question: 'What is the difference between Celsius and Fahrenheit?',
      answer: 'Celsius uses 0°C as the freezing point of water and 100°C as the boiling point. Fahrenheit uses 32°F as freezing and 212°F as boiling. The conversion formula is: °F = (°C × 9/5) + 32.'
    },
    {
      question: 'What are normal engine operating temperatures?',
      answer: 'Most car engines operate between 195-220°F (90-104°C). Temperatures above 230°F (110°C) may indicate overheating, while temperatures below 160°F (71°C) suggest the engine hasn\'t warmed up properly.'
    },
    {
      question: 'When should I be concerned about engine temperature?',
      answer: 'Be concerned if your engine temperature exceeds 230°F (110°C) or stays below 160°F (71°C) after warming up. Consistent high temperatures can cause engine damage, while low temperatures reduce efficiency and increase emissions.'
    },
    {
      question: 'How accurate is this temperature converter?',
      answer: 'Our converter provides precise calculations using standard conversion formulas. Results are accurate to multiple decimal places, making it suitable for both casual use and professional automotive applications.'
    }
  ],
  'gear-ratio-calculator': [
    {
      question: 'What is a gear ratio and why does it matter?',
      answer: 'Gear ratio is the ratio of ring gear teeth to pinion gear teeth (e.g., 41 ÷ 11 = 3.73). A higher numerical ratio multiplies torque for better acceleration but increases cruising RPM; a lower ratio reduces RPM at speed and improves economy.'
    },
    {
      question: 'How do I calculate ring and pinion gear ratio?',
      answer: 'Divide the number of ring gear teeth by the number of pinion gear teeth. Our calculator performs this automatically and displays the result to two decimals by default.'
    },
    {
      question: 'Which ratio should I choose for larger tires or off-road use?',
      answer: 'Larger tires reduce effective torque. Many off-road builds move to a higher numerical axle ratio (e.g., 4.10–4.88) to restore drivability and keep the engine in its power band.'
    },
    {
      question: 'Will a higher gear ratio hurt highway fuel economy?',
      answer: 'Usually yes. Higher numerical ratios raise RPM at a given speed, which can increase noise and fuel consumption. Balance your needs: acceleration, towing, and cruising comfort.'
    },
    {
      question: 'Do I need to re-gear both axles on a 4x4?',
      answer: 'Yes. Front and rear axle ratios must match to prevent driveline binding in 4WD. Re-gear both axles to the same ratio when changing ring and pinion sets.'
    }
  ],
  'compression-ratio-calculator': [
    {
      question: 'What is compression ratio and why does it matter?',
      answer: 'Compression ratio is the ratio of cylinder volume at bottom dead center to volume at top dead center. Higher compression ratios increase power and efficiency but require higher octane fuel to prevent knock.'
    },
    {
      question: 'What is a good compression ratio for my engine?',
      answer: 'Stock engines typically run 8:1 to 10.5:1. Performance engines can run 10:1 to 12:1 with premium fuel. Higher ratios require careful tuning and high-octane fuel to prevent detonation.'
    },
    {
      question: 'How do I measure compression ratio?',
      answer: 'You need bore diameter, stroke length, combustion chamber volume, and deck height. Our calculator uses these measurements to determine the exact compression ratio of your engine build.'
    },
    {
      question: 'What happens if compression ratio is too high?',
      answer: 'Excessive compression can cause engine knock, pre-ignition, and potential engine damage. Symptoms include pinging sounds, reduced power, and increased engine temperatures.'
    }
  ],
  'engine-displacement-calculator': [
    {
      question: 'What is engine displacement?',
      answer: 'Engine displacement is the total volume of all cylinders in an engine, measured in cubic inches (CI) or liters. It\'s calculated using bore diameter, stroke length, and number of cylinders.'
    },
    {
      question: 'How does displacement affect performance?',
      answer: 'Larger displacement generally means more power potential, as more air and fuel can be burned per cycle. However, efficiency, design, and tuning also significantly impact performance.'
    },
    {
      question: 'What\'s the difference between bore and stroke?',
      answer: 'Bore is the cylinder diameter, stroke is the distance the piston travels. Larger bore allows bigger valves and better breathing, while longer stroke increases torque production.'
    },
    {
      question: 'How accurate are displacement calculations?',
      answer: 'Our calculator provides precise results using standard formulas. Accuracy depends on the precision of your bore and stroke measurements, which should be measured to at least 0.001 inches.'
    }
  ],
  'carburetor-cfm-calculator': [
    {
      question: 'What does CFM stand for in carburetors?',
      answer: 'CFM stands for Cubic Feet per Minute, which measures the volume of air a carburetor can flow. Higher CFM ratings allow more air flow, supporting higher engine power output.'
    },
    {
      question: 'How do I calculate the right CFM for my engine?',
      answer: 'Use the formula: (Engine Displacement × RPM × Volumetric Efficiency) ÷ 3456. For stock engines, use 85% VE; for modified engines, use 95-110% VE depending on modifications.'
    },
    {
      question: 'What happens if my carburetor CFM is too high?',
      answer: 'An oversized carburetor can cause poor throttle response, reduced fuel economy, and difficulty tuning. The engine may run lean at low RPMs and have poor drivability characteristics.'
    },
    {
      question: 'What happens if my carburetor CFM is too low?',
      answer: 'An undersized carburetor restricts airflow, limiting engine power output. You\'ll experience reduced performance, especially at high RPMs, and the engine may run rich under load.'
    }
  ],
  'power-to-weight-calculator': [
    {
      question: 'What is power-to-weight ratio?',
      answer: 'Power-to-weight ratio is the amount of power (horsepower) per unit of weight (pounds or kilograms). It\'s calculated as HP ÷ Weight and indicates a vehicle\'s acceleration potential.'
    },
    {
      question: 'What is a good power-to-weight ratio?',
      answer: 'Sports cars typically have 8-12 HP/lb, supercars have 6-8 HP/lb, and economy cars have 12-20 HP/lb. Lower numbers indicate better performance (more power per pound of weight).'
    },
    {
      question: 'How does power-to-weight ratio affect performance?',
      answer: 'Better (lower) power-to-weight ratios result in faster acceleration, better hill climbing ability, and improved overall performance. It\'s more important than absolute horsepower for acceleration.'
    },
    {
      question: 'Should I include driver weight in calculations?',
      answer: 'For accurate performance comparisons, include driver weight plus fuel. This gives a more realistic power-to-weight ratio that reflects real-world driving conditions.'
    }
  ]
};

// Unit Conversion FAQs
export const UNIT_FAQS: Record<string, FAQ[]> = {
  'temperature-converter': [
    {
      question: 'What are the most common temperature scales?',
      answer: 'The three most common temperature scales are Celsius (°C), Fahrenheit (°F), and Kelvin (K). Celsius is used worldwide, Fahrenheit primarily in the US, and Kelvin in scientific applications.'
    },
    {
      question: 'How do I convert Celsius to Fahrenheit?',
      answer: 'Use the formula: °F = (°C × 9/5) + 32. For example, 20°C = (20 × 9/5) + 32 = 68°F. This converter handles the calculation automatically.'
    },
    {
      question: 'What is absolute zero in different scales?',
      answer: 'Absolute zero is -273.15°C, -459.67°F, or 0K. This is the theoretical temperature where all molecular motion stops.'
    },
    {
      question: 'When should I use Kelvin instead of Celsius?',
      answer: 'Use Kelvin for scientific calculations, especially in physics and chemistry. Kelvin is an absolute scale starting from absolute zero, making it ideal for thermodynamic calculations.'
    }
  ],
  'weight-converter': [
    {
      question: 'What is the difference between mass and weight?',
      answer: 'Mass is the amount of matter in an object (measured in kg or grams), while weight is the force gravity exerts on that mass (measured in pounds or newtons). In everyday use, the terms are often used interchangeably.'
    },
    {
      question: 'How many pounds are in a kilogram?',
      answer: '1 kilogram equals 2.20462 pounds. This is a fixed conversion factor used worldwide for weight conversions between metric and imperial systems.'
    },
    {
      question: 'What weight units are used in different countries?',
      answer: 'Most countries use kilograms and grams (metric system). The United States primarily uses pounds and ounces. The UK uses a mix of both systems depending on the context.'
    },
    {
      question: 'How accurate are the conversions?',
      answer: 'Our converter uses precise conversion factors and displays results to multiple decimal places. The accuracy is suitable for both everyday use and professional applications.'
    }
  ]
};

// Finance Tools FAQs
export const FINANCE_FAQS: Record<string, FAQ[]> = {
  'mortgage-calculator': [
    {
      question: 'What factors affect my monthly mortgage payment?',
      answer: 'Your monthly payment depends on loan amount, interest rate, loan term, property taxes, homeowners insurance, and PMI (if applicable). Our calculator includes all these factors for accurate estimates.'
    },
    {
      question: 'Should I choose a 15-year or 30-year mortgage?',
      answer: '15-year mortgages have higher monthly payments but lower total interest costs. 30-year mortgages have lower monthly payments but higher total interest. Choose based on your budget and financial goals.'
    },
    {
      question: 'What is PMI and when do I need it?',
      answer: 'PMI (Private Mortgage Insurance) is required when your down payment is less than 20%. It protects the lender if you default and typically costs 0.3-1.5% of the loan amount annually.'
    },
    {
      question: 'How much house can I afford?',
      answer: 'Generally, your total monthly housing costs shouldn\'t exceed 28% of your gross monthly income. This includes mortgage, taxes, insurance, and HOA fees. Use our affordability calculator for personalized estimates.'
    }
  ],
  'compound-interest-calculator': [
    {
      question: 'What is compound interest?',
      answer: 'Compound interest is interest earned on both the principal amount and previously earned interest. It\'s "interest on interest" and can significantly increase investment returns over time.'
    },
    {
      question: 'How often should interest compound for best results?',
      answer: 'More frequent compounding (daily vs. annually) results in slightly higher returns. However, the difference is minimal compared to the impact of interest rate and time invested.'
    },
    {
      question: 'What is the rule of 72?',
      answer: 'The rule of 72 estimates how long it takes for an investment to double. Divide 72 by the annual interest rate. For example, at 6% interest, money doubles in approximately 12 years (72 ÷ 6 = 12).'
    },
    {
      question: 'Should I invest or pay off debt first?',
      answer: 'Generally, pay off high-interest debt (>6-7%) before investing. For lower-interest debt, investing may provide better long-term returns, especially with compound growth over time.'
    }
  ]
};

// Color Tools FAQs
export const COLOR_FAQS: Record<string, FAQ[]> = {
  'hex-to-rgb-converter': [
    {
      question: 'What is the difference between HEX and RGB?',
      answer: 'HEX uses hexadecimal notation (#RRGGBB) while RGB uses decimal values (0-255) for red, green, and blue. Both represent the same colors but in different formats commonly used in web design.'
    },
    {
      question: 'When should I use HEX vs RGB?',
      answer: 'Use HEX for CSS and HTML (more compact), and RGB for design software, programming, or when you need to manipulate individual color channels. Both are widely supported.'
    },
    {
      question: 'What do the numbers in RGB mean?',
      answer: 'RGB values range from 0-255 for each color channel. RGB(255,0,0) is pure red, RGB(0,255,0) is pure green, and RGB(0,0,255) is pure blue. RGB(255,255,255) is white.'
    },
    {
      question: 'How do I create custom colors?',
      answer: 'Adjust RGB values to create custom colors: increase red for warmer tones, increase blue for cooler tones, and balance all three for grays. Use our color picker for visual selection.'
    }
  ]
};

// Helper function to get FAQs by tool ID
export const getFAQsByToolId = (toolId: string, category: string): FAQ[] => {
  const categoryFAQs = {
    'auto': AUTOMOTIVE_FAQS,
    'unit': UNIT_FAQS,
    'finance': FINANCE_FAQS,
    'color': COLOR_FAQS
  };

  const faqs = categoryFAQs[category as keyof typeof categoryFAQs];
  return faqs?.[toolId] || [];
};
