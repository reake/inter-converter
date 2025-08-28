import { AutomotiveToolConfig } from '@/types/automotive';

export const AUTOMOTIVE_TOOLS_CONFIG: AutomotiveToolConfig[] = [
  {
    id: 'carburetor-cfm-calculator',
    name: 'Carburetor CFM Calculator',
    description: 'Calculate the correct carburetor CFM for your engine based on displacement and modification level',
    category: 'auto',
    subcategory: 'engine',
    keywords: ['carburetor', 'cfm', 'airflow', 'engine', 'performance', 'tuning'],
    path: '/auto/carburetor-cfm-calculator',
    isActive: true,
    searchVolume: 12000,
    difficulty: 'beginner',
    safetyLevel: 'low',
    educationalContent: {
      theory: 'CFM (Cubic Feet per Minute) measures the airflow capacity of a carburetor. The correct CFM rating ensures optimal air/fuel mixture delivery to your engine. Too little CFM restricts power, while too much CFM can cause poor throttle response and fuel economy.',
      applications: [
        'Selecting the right carburetor for engine builds',
        'Upgrading carburetors for performance modifications',
        'Troubleshooting poor engine performance',
        'Matching carburetor size to engine displacement'
      ],
      tips: [
        'Stock engines typically need 1.5-1.7 CFM per cubic inch',
        'Modified engines may need 1.7-2.0 CFM per cubic inch',
        'Consider your driving style and intended use',
        'Vacuum secondary carburetors are more forgiving than mechanical'
      ],
      relatedTools: ['engine-displacement-calculator', 'compression-ratio-calculator']
    },
    relatedTools: ['compression-ratio-calculator', 'engine-displacement-calculator'],
    popularityScore: 85,
    icon: '🏎️'
  },
  {
    id: 'compression-ratio-calculator',
    name: 'Compression Ratio Calculator',
    description: 'Calculate horsepower changes from compression ratio modifications',
    category: 'auto',
    subcategory: 'engine',
    keywords: ['compression', 'ratio', 'horsepower', 'engine', 'performance', 'octane'],
    path: '/auto/compression-ratio-calculator',
    isActive: true,
    searchVolume: 8500,
    difficulty: 'intermediate',
    safetyLevel: 'medium',
    educationalContent: {
      theory: 'Compression ratio is the ratio of cylinder volume when the piston is at bottom dead center to the volume when at top dead center. Higher compression ratios extract more energy from the fuel but require higher octane to prevent detonation.',
      applications: [
        'Planning engine modifications for power gains',
        'Determining fuel octane requirements',
        'Calculating expected horsepower increases',
        'Balancing performance with pump gas compatibility'
      ],
      tips: [
        'Each point of compression ratio typically adds 3-4% horsepower',
        'Pump gas limits compression to about 10.5:1 for iron heads',
        'Aluminum heads can run higher compression on pump gas',
        'Consider cam timing effects on dynamic compression'
      ],
      safetyWarnings: [
        'High compression ratios may require premium fuel',
        'Detonation can cause severe engine damage',
        'Consult a professional for compression ratios above 11:1'
      ],
      relatedTools: ['carburetor-cfm-calculator', 'supercharger-calculator']
    },
    relatedTools: ['carburetor-cfm-calculator', 'supercharger-calculator'],
    popularityScore: 75,
    icon: '⚙️'
  },
  {
    id: 'gear-ratio-calculator',
    name: 'Gear Ratio Calculator',
    description: 'Calculate gear ratios, RPM, and speed relationships for optimal performance',
    category: 'auto',
    subcategory: 'drivetrain',
    keywords: ['gear', 'ratio', 'differential', 'rpm', 'speed', 'performance'],
    path: '/auto/gear-ratio-calculator',
    isActive: true,
    searchVolume: 15000,
    difficulty: 'beginner',
    safetyLevel: 'low',
    educationalContent: {
      theory: 'Gear ratio is determined by dividing the number of ring gear teeth by pinion gear teeth. Lower numerical ratios provide higher top speed but slower acceleration, while higher ratios provide quicker acceleration but lower top speed.',
      applications: [
        'Optimizing acceleration vs. top speed',
        'Calculating current gear ratio from speed/RPM',
        'Selecting ideal ratio for racing or street use',
        'Determining speedometer error from tire changes'
      ],
      tips: [
        'Higher ratios (4.10+) are better for drag racing',
        'Lower ratios (3.08-3.42) are better for highway driving',
        'Consider your transmission gear ratios in calculations',
        'Tire diameter significantly affects effective gearing'
      ],
      relatedTools: ['tire-speed-calculator', 'power-to-weight-calculator']
    },
    relatedTools: ['tire-speed-calculator', 'power-to-weight-calculator'],
    popularityScore: 90,
    icon: '⚙️'
  },
  {
    id: 'supercharger-calculator',
    name: 'Supercharger Calculator',
    description: 'Calculate horsepower gains from supercharger and forced induction systems',
    category: 'auto',
    subcategory: 'performance',
    keywords: ['supercharger', 'turbo', 'boost', 'horsepower', 'forced', 'induction'],
    path: '/auto/supercharger-calculator',
    isActive: true,
    searchVolume: 6500,
    difficulty: 'advanced',
    safetyLevel: 'high',
    educationalContent: {
      theory: 'Forced induction systems compress air entering the engine, allowing more fuel to be burned and increasing power output. The relationship between boost pressure and horsepower gain is roughly linear, with each PSI of boost adding approximately 7% more power.',
      applications: [
        'Estimating power gains from supercharger installation',
        'Calculating required CFM for boosted engines',
        'Planning fuel system upgrades for forced induction',
        'Understanding Ram Air effects at speed'
      ],
      tips: [
        'Each PSI of boost adds roughly 7% horsepower',
        'Intercooling improves efficiency and safety',
        'Fuel system must support increased demand',
        'Engine internals may need upgrading for high boost'
      ],
      safetyWarnings: [
        'High boost levels require fuel enrichment',
        'Detonation risk increases with boost pressure',
        'Professional tuning is essential for safety',
        'Monitor air/fuel ratios carefully'
      ],
      relatedTools: ['compression-ratio-calculator', 'carburetor-cfm-calculator']
    },
    relatedTools: ['compression-ratio-calculator', 'carburetor-cfm-calculator'],
    popularityScore: 70,
    icon: '🌪️'
  },
  {
    id: 'engine-displacement-calculator',
    name: 'Engine Displacement Calculator',
    description: 'Calculate engine displacement from bore, stroke, and cylinder count',
    category: 'auto',
    subcategory: 'engine',
    keywords: ['displacement', 'bore', 'stroke', 'engine', 'cubic', 'inches', 'liters'],
    path: '/auto/engine-displacement-calculator',
    isActive: true,
    searchVolume: 9500,
    difficulty: 'beginner',
    safetyLevel: 'low',
    educationalContent: {
      theory: 'Engine displacement is the total volume swept by all pistons in an engine. It\'s calculated by multiplying the area of the cylinder bore by the stroke length and the number of cylinders. Displacement is a key factor in determining an engine\'s power potential.',
      applications: [
        'Calculating displacement for custom engine builds',
        'Determining displacement after bore/stroke changes',
        'Converting between cubic inches and liters',
        'Planning engine modifications'
      ],
      tips: [
        'Bore has more effect on power than stroke',
        'Longer stroke increases torque production',
        'Oversquare engines (bore > stroke) rev higher',
        'Undersquare engines (stroke > bore) produce more torque'
      ],
      relatedTools: ['carburetor-cfm-calculator', 'compression-ratio-calculator']
    },
    relatedTools: ['carburetor-cfm-calculator', 'compression-ratio-calculator'],
    popularityScore: 65,
    icon: '🔧'
  },
  {
    id: 'torque-horsepower-calculator',
    name: 'Torque & Horsepower Calculator',
    description: 'Convert between torque, horsepower, and RPM using automotive formulas',
    category: 'auto',
    subcategory: 'performance',
    keywords: ['torque', 'horsepower', 'rpm', 'power', 'performance', '5252'],
    path: '/auto/torque-horsepower-calculator',
    isActive: true,
    searchVolume: 11000,
    difficulty: 'beginner',
    safetyLevel: 'low',
    educationalContent: {
      theory: 'Torque and horsepower are related by RPM through the formula: HP = (Torque × RPM) ÷ 5252. Torque is the twisting force, while horsepower is the rate of doing work. They are equal at 5252 RPM.',
      applications: [
        'Understanding dyno results and engine characteristics',
        'Calculating missing values from known parameters',
        'Comparing engine performance at different RPM',
        'Planning modifications for torque vs. horsepower'
      ],
      tips: [
        'Torque determines acceleration feel',
        'Horsepower determines top speed capability',
        'Peak torque usually occurs at lower RPM than peak HP',
        'The 5252 RPM crossover point is where HP equals torque'
      ],
      relatedTools: ['power-to-weight-calculator', 'volumetric-efficiency-calculator']
    },
    relatedTools: ['power-to-weight-calculator', 'volumetric-efficiency-calculator'],
    popularityScore: 80,
    icon: '💪'
  },
  {
    id: 'tire-speed-calculator',
    name: 'Tire & Speed Calculator',
    description: 'Calculate speed changes from tire size modifications and gear ratios',
    category: 'auto',
    subcategory: 'drivetrain',
    keywords: ['tire', 'speed', 'diameter', 'speedometer', 'gear', 'ratio'],
    path: '/auto/tire-speed-calculator',
    isActive: true,
    searchVolume: 7500,
    difficulty: 'beginner',
    safetyLevel: 'low',
    educationalContent: {
      theory: 'Tire diameter directly affects vehicle speed and speedometer accuracy. Larger tires increase speed at a given RPM, while smaller tires decrease it. This relationship is linear and affects both performance and speedometer readings.',
      applications: [
        'Calculating speedometer error from tire changes',
        'Determining optimal tire size for performance',
        'Planning gear ratio changes with tire modifications',
        'Understanding tire revolutions per mile'
      ],
      tips: [
        'Larger tires act like taller gearing',
        'Smaller tires act like shorter gearing',
        'Plus-sizing affects both performance and comfort',
        'Consider load rating and speed rating when changing sizes'
      ],
      relatedTools: ['gear-ratio-calculator', 'power-to-weight-calculator']
    },
    relatedTools: ['gear-ratio-calculator', 'power-to-weight-calculator'],
    popularityScore: 60,
    icon: '🛞'
  },
  {
    id: 'volumetric-efficiency-calculator',
    name: 'Volumetric Efficiency Calculator',
    description: 'Calculate engine breathing efficiency and airflow characteristics',
    category: 'auto',
    subcategory: 'performance',
    keywords: ['volumetric', 'efficiency', 'airflow', 'breathing', 'engine', 'performance'],
    path: '/auto/volumetric-efficiency-calculator',
    isActive: true,
    searchVolume: 4500,
    difficulty: 'advanced',
    safetyLevel: 'low',
    educationalContent: {
      theory: 'Volumetric Efficiency (VE) measures how effectively an engine fills its cylinders with air/fuel mixture. 100% VE means the engine completely fills its displacement volume. Higher VE indicates better breathing and more power potential.',
      applications: [
        'Evaluating engine breathing efficiency',
        'Comparing different intake/exhaust combinations',
        'Tuning carburetor and fuel injection systems',
        'Assessing the effectiveness of engine modifications'
      ],
      tips: [
        'Stock engines typically achieve 70-85% VE',
        'Well-tuned engines can exceed 100% VE',
        'Forced induction can achieve 150%+ VE',
        'VE varies with RPM and load conditions'
      ],
      relatedTools: ['carburetor-cfm-calculator', 'torque-horsepower-calculator']
    },
    relatedTools: ['carburetor-cfm-calculator', 'torque-horsepower-calculator'],
    popularityScore: 45,
    icon: '🌬️'
  },
  {
    id: 'power-to-weight-calculator',
    name: 'Power-to-Weight Calculator',
    description: 'Calculate power-to-weight ratios for performance analysis',
    category: 'auto',
    subcategory: 'performance',
    keywords: ['power', 'weight', 'ratio', 'performance', 'acceleration', 'horsepower'],
    path: '/auto/power-to-weight-calculator',
    isActive: true,
    searchVolume: 8000,
    difficulty: 'beginner',
    safetyLevel: 'low',
    educationalContent: {
      theory: 'Power-to-weight ratio is a key performance metric that determines acceleration capability. It can be expressed as horsepower per pound or pounds per horsepower. Lower weight per horsepower means better acceleration performance.',
      applications: [
        'Comparing vehicle performance potential',
        'Planning weight reduction modifications',
        'Evaluating the effect of power increases',
        'Understanding acceleration characteristics'
      ],
      tips: [
        'Economy cars: 15-20 lbs/hp',
        'Sports cars: 8-12 lbs/hp',
        'Supercars: 5-8 lbs/hp',
        'Weight reduction is often more effective than power increases'
      ],
      relatedTools: ['torque-horsepower-calculator', 'gear-ratio-calculator']
    },
    relatedTools: ['torque-horsepower-calculator', 'gear-ratio-calculator'],
    popularityScore: 70,
    icon: '⚖️'
  },
  {
    id: 'fluid-weight-calculator',
    name: 'Automotive Fluid Weight Calculator',
    description: 'Calculate weight and volume conversions for automotive fluids',
    category: 'auto',
    subcategory: 'fluids',
    keywords: ['fluid', 'weight', 'gasoline', 'oil', 'transmission', 'coolant', 'density'],
    path: '/auto/fluid-weight-calculator',
    isActive: true,
    searchVolume: 3500,
    difficulty: 'beginner',
    safetyLevel: 'low',
    educationalContent: {
      theory: 'Different automotive fluids have different densities, affecting vehicle weight distribution and capacity calculations. Understanding fluid weights is important for racing, towing, and weight distribution calculations.',
      applications: [
        'Calculating fuel weight for racing applications',
        'Determining fluid capacity by weight',
        'Weight distribution calculations',
        'Fluid system planning and design'
      ],
      tips: [
        'Gasoline weighs about 6.1 lbs per gallon',
        'Water/coolant weighs about 8.3 lbs per gallon',
        'Motor oil weighs about 7.4 lbs per gallon',
        'Fluid weight affects vehicle balance and performance'
      ],
      relatedTools: ['power-to-weight-calculator']
    },
    relatedTools: ['power-to-weight-calculator'],
    popularityScore: 40,
    icon: '🛢️'
  },
  {
    id: 'engine-size-converter',
    name: 'Engine Size Converter',
    description: 'Convert between cubic inches, liters, and cubic centimeters',
    category: 'auto',
    subcategory: 'engine',
    keywords: ['engine', 'size', 'converter', 'cubic', 'inches', 'liters', 'cc'],
    path: '/auto/engine-size-converter',
    isActive: true,
    searchVolume: 5500,
    difficulty: 'beginner',
    safetyLevel: 'low',
    educationalContent: {
      theory: 'Engine displacement can be measured in different units worldwide. Cubic inches (CI) are common in American engines, while liters and cubic centimeters (CC) are used internationally.',
      applications: [
        'Converting between measurement systems',
        'Understanding international engine specifications',
        'Comparing engines from different manufacturers',
        'Technical documentation and parts ordering'
      ],
      tips: [
        '1 liter = 61.024 cubic inches',
        '1 cubic inch = 16.387 cubic centimeters',
        'European engines typically measured in liters',
        'Motorcycle engines often measured in CC'
      ],
      relatedTools: ['engine-displacement-calculator']
    },
    relatedTools: ['engine-displacement-calculator'],
    popularityScore: 55,
    icon: '🔄'
  },
  {
    id: 'engine-volume-calculator',
    name: 'Engine Volume Calculator',
    description: 'Calculate total engine volume from cylinder volume and count',
    category: 'auto',
    subcategory: 'engine',
    keywords: ['engine', 'volume', 'cylinder', 'displacement', 'total'],
    path: '/auto/engine-volume-calculator',
    isActive: true,
    searchVolume: 4200,
    difficulty: 'beginner',
    safetyLevel: 'low',
    educationalContent: {
      theory: 'Total engine displacement is calculated by multiplying the volume of one cylinder by the number of cylinders. This is useful when you know individual cylinder displacement.',
      applications: [
        'Calculating total displacement from cylinder specs',
        'Engine building and modification planning',
        'Verifying manufacturer specifications',
        'Custom engine design calculations'
      ],
      tips: [
        'All cylinders are assumed to be identical',
        'Displacement affects power potential and tax classification',
        'Consider compression ratio in performance calculations',
        'Bore and stroke affect engine characteristics differently'
      ],
      relatedTools: ['engine-displacement-calculator', 'carburetor-cfm-calculator']
    },
    relatedTools: ['engine-displacement-calculator', 'carburetor-cfm-calculator'],
    popularityScore: 50,
    icon: '📐'
  },
  {
    id: 'power-to-weight-ratio',
    name: 'Power-to-Weight Ratio',
    description: 'Alternative power-to-weight ratio calculator with additional metrics',
    category: 'auto',
    subcategory: 'performance',
    keywords: ['power', 'weight', 'ratio', 'performance', 'acceleration'],
    path: '/auto/power-to-weight-ratio',
    isActive: true,
    searchVolume: 6000,
    difficulty: 'beginner',
    safetyLevel: 'low',
    educationalContent: {
      theory: 'Power-to-weight ratio is fundamental to vehicle performance, affecting acceleration, climbing ability, and overall dynamics.',
      applications: [
        'Performance vehicle comparison',
        'Weight reduction planning',
        'Power upgrade evaluation',
        'Racing class classification'
      ],
      tips: [
        'Lower weight per HP means better performance',
        'Consider both engine power and vehicle weight',
        'Weight distribution also affects handling',
        'Power-to-weight varies with fuel load'
      ],
      relatedTools: ['power-to-weight-calculator', 'torque-horsepower-calculator']
    },
    relatedTools: ['power-to-weight-calculator', 'torque-horsepower-calculator'],
    popularityScore: 65,
    icon: '⚖️'
  },
  {
    id: 'ram-air-calculator',
    name: 'Ram Air Calculator',
    description: 'Calculate horsepower gains from ram air induction systems',
    category: 'auto',
    subcategory: 'performance',
    keywords: ['ram', 'air', 'induction', 'horsepower', 'speed', 'pontiac'],
    path: '/auto/ram-air-calculator',
    isActive: true,
    searchVolume: 3200,
    difficulty: 'intermediate',
    safetyLevel: 'low',
    educationalContent: {
      theory: 'Ram air systems use vehicle speed to force additional air into the engine, creating a mild supercharging effect. The pressure increase is proportional to the square of vehicle speed.',
      applications: [
        'Calculating ram air pressure at speed',
        'Estimating horsepower gains from ram air',
        'Planning ram air intake systems',
        'Understanding speed-related power increases'
      ],
      tips: [
        'Ram air effect increases with speed squared',
        'Gains are modest compared to forced induction',
        'Intake design affects ram air efficiency',
        'Benefits are most noticeable at high speeds'
      ],
      relatedTools: ['supercharger-calculator', 'carburetor-cfm-calculator']
    },
    relatedTools: ['supercharger-calculator', 'carburetor-cfm-calculator'],
    popularityScore: 35,
    icon: '💨'
  },
  {
    id: 'rpm-calculator',
    name: 'RPM Calculator',
    description: 'Calculate engine RPM from speed, gear ratio, and tire diameter',
    category: 'auto',
    subcategory: 'drivetrain',
    keywords: ['rpm', 'speed', 'gear', 'ratio', 'tire', 'diameter'],
    path: '/auto/rpm-calculator',
    isActive: true,
    searchVolume: 8500,
    difficulty: 'beginner',
    safetyLevel: 'low',
    educationalContent: {
      theory: 'Engine RPM is determined by vehicle speed, final drive ratio, transmission gear ratio, and tire diameter. This relationship helps in gear selection and engine operation analysis.',
      applications: [
        'Determining engine RPM at cruising speed',
        'Gear ratio selection for optimal RPM range',
        'Analyzing engine load and efficiency',
        'Planning transmission and differential ratios'
      ],
      tips: [
        'Lower RPM generally means better fuel economy',
        'Keep RPM in engine\'s efficient range',
        'Consider tire diameter changes in calculations',
        'Overdrive gears reduce highway RPM'
      ],
      relatedTools: ['gear-ratio-calculator', 'tire-speed-calculator']
    },
    relatedTools: ['gear-ratio-calculator', 'tire-speed-calculator'],
    popularityScore: 75,
    icon: '🌀'
  },
  {
    id: 'speed-converter',
    name: 'Speed Converter',
    description: 'Convert between MPH, KPH, and other speed units',
    category: 'auto',
    subcategory: 'drivetrain',
    keywords: ['speed', 'converter', 'mph', 'kph', 'kmh', 'conversion'],
    path: '/auto/speed-converter',
    isActive: true,
    searchVolume: 12000,
    difficulty: 'beginner',
    safetyLevel: 'low',
    educationalContent: {
      theory: 'Speed conversion between different measurement systems is essential for international vehicle specifications and performance comparisons.',
      applications: [
        'Converting between imperial and metric speeds',
        'International vehicle specification comparison',
        'Performance data analysis',
        'Speedometer calibration verification'
      ],
      tips: [
        '1 MPH = 1.609344 KPH',
        'Most countries use KPH except US and UK',
        'Racing often uses MPH in America',
        'Consider measurement accuracy in conversions'
      ],
      relatedTools: ['tire-speed-calculator', 'rpm-calculator']
    },
    relatedTools: ['tire-speed-calculator', 'rpm-calculator'],
    popularityScore: 85,
    icon: '🏃'
  },
  {
    id: 'temperature-converter',
    name: 'Temperature Converter',
    description: 'Convert between Fahrenheit, Celsius, and other temperature units',
    category: 'auto',
    subcategory: 'fluids',
    keywords: ['temperature', 'converter', 'fahrenheit', 'celsius', 'kelvin'],
    path: '/auto/temperature-converter',
    isActive: true,
    searchVolume: 9500,
    difficulty: 'beginner',
    safetyLevel: 'low',
    educationalContent: {
      theory: 'Temperature conversion is crucial for automotive applications, especially when dealing with international specifications, engine tuning, and fluid management.',
      applications: [
        'Converting thermostat ratings',
        'Engine operating temperature analysis',
        'Coolant and oil temperature monitoring',
        'International specification comparison'
      ],
      tips: [
        'Engine operating temp typically 180-220°F (82-104°C)',
        'Oil temperature should stay below 250°F (121°C)',
        'Coolant boiling point varies with pressure',
        'Consider altitude effects on boiling points'
      ],
      relatedTools: ['fluid-weight-calculator']
    },
    relatedTools: ['fluid-weight-calculator'],
    popularityScore: 70,
    icon: '🌡️'
  },
  {
    id: 'tire-calculator',
    name: 'Tire Calculator',
    description: 'Calculate tire dimensions, revolutions per mile, and size comparisons',
    category: 'auto',
    subcategory: 'drivetrain',
    keywords: ['tire', 'calculator', 'diameter', 'revolutions', 'size', 'comparison'],
    path: '/auto/tire-calculator',
    isActive: true,
    searchVolume: 7800,
    difficulty: 'beginner',
    safetyLevel: 'low',
    educationalContent: {
      theory: 'Tire calculations involve diameter, circumference, and revolutions per mile. These affect speedometer accuracy, gear ratios, and vehicle performance.',
      applications: [
        'Calculating tire revolutions per mile',
        'Comparing different tire sizes',
        'Speedometer correction calculations',
        'Performance impact analysis'
      ],
      tips: [
        'Larger tires reduce engine RPM at speed',
        'Smaller tires increase acceleration',
        'Plus-sizing affects ride and handling',
        'Consider load and speed ratings'
      ],
      relatedTools: ['tire-speed-calculator', 'gear-ratio-calculator']
    },
    relatedTools: ['tire-speed-calculator', 'gear-ratio-calculator'],
    popularityScore: 60,
    icon: '🛞'
  },
  {
    id: 'auto-weight-converter',
    name: 'Auto Weight Converter',
    description: 'Convert between pounds, kilograms, ounces, and grams',
    category: 'auto',
    subcategory: 'fluids',
    keywords: ['weight', 'converter', 'pounds', 'kilograms', 'ounces', 'grams'],
    path: '/auto/auto-weight-converter',
    isActive: true,
    searchVolume: 11000,
    difficulty: 'beginner',
    safetyLevel: 'low',
    educationalContent: {
      theory: 'Weight conversion between different measurement systems is essential for automotive applications, especially in performance calculations and international specifications.',
      applications: [
        'Converting vehicle weights between systems',
        'Parts weight comparison',
        'Performance calculations',
        'International specification analysis'
      ],
      tips: [
        '1 pound = 0.453592 kilograms',
        '1 kilogram = 2.20462 pounds',
        'Racing often focuses on weight reduction',
        'Consider weight distribution in modifications'
      ],
      relatedTools: ['power-to-weight-calculator', 'fluid-weight-calculator']
    },
    relatedTools: ['power-to-weight-calculator', 'fluid-weight-calculator'],
    popularityScore: 80,
    icon: '⚖️'
  }
];

export const getAutomotiveToolById = (id: string): AutomotiveToolConfig | undefined => {
  return AUTOMOTIVE_TOOLS_CONFIG.find(tool => tool.id === id);
};

export const getAutomotiveToolsBySubcategory = (subcategory: string): AutomotiveToolConfig[] => {
  return AUTOMOTIVE_TOOLS_CONFIG.filter(tool => tool.subcategory === subcategory);
};

export const getPopularAutomotiveTools = (limit: number = 5): AutomotiveToolConfig[] => {
  return AUTOMOTIVE_TOOLS_CONFIG
    .filter(tool => tool.isActive)
    .sort((a, b) => b.popularityScore - a.popularityScore)
    .slice(0, limit);
};

export const searchAutomotiveTools = (query: string): AutomotiveToolConfig[] => {
  const lowercaseQuery = query.toLowerCase();
  return AUTOMOTIVE_TOOLS_CONFIG.filter(tool => 
    tool.isActive && (
      tool.name.toLowerCase().includes(lowercaseQuery) ||
      tool.description.toLowerCase().includes(lowercaseQuery) ||
      tool.keywords.some(keyword => keyword.toLowerCase().includes(lowercaseQuery))
    )
  );
};