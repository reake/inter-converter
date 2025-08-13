export interface AutomotiveToolConfig {
  id: string;
  name: string;
  description: string;
  category: 'automotive';
  subcategory: 'engine' | 'drivetrain' | 'performance' | 'fluids';
  keywords: string[];
  path: string;
  isActive: boolean;
  searchVolume?: number;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  safetyLevel: 'low' | 'medium' | 'high';
  educationalContent: EducationalContent;
  relatedTools: string[];
  popularityScore: number;
  icon?: string;
}

export interface EducationalContent {
  theory: string;
  applications: string[];
  tips: string[];
  relatedTools: string[];
  safetyWarnings?: string[];
}

export interface AutomotiveCalculationResult<T = any> {
  success: boolean;
  result?: T;
  error?: string;
  warnings: Warning[];
  recommendations: Recommendation[];
  metadata: {
    timestamp: Date;
    formula: string;
    inputs: Record<string, any>;
    accuracy: 'high' | 'medium' | 'estimated';
  };
}

export interface Warning {
  type: 'safety' | 'performance' | 'accuracy';
  message: string;
  severity: 'low' | 'medium' | 'high';
}

export interface Recommendation {
  type: 'performance' | 'safety' | 'tuning';
  message: string;
  priority: 'high' | 'medium' | 'low';
}

export interface EngineParameters {
  displacement?: number; // CI or Liters
  bore?: number; // inches or mm
  stroke?: number; // inches or mm
  cylinders?: number;
  compressionRatio?: number;
  horsepower?: number;
  torque?: number;
  rpm?: number;
}

export interface AutomotiveResult {
  label: string;
  value: number | string;
  unit: string;
  precision: number;
  category: 'primary' | 'secondary' | 'derived';
}

export interface EngineSpec {
  displacement: {
    ci: number;
    liters: number;
  };
  bore: number;
  stroke: number;
  cylinders: number;
  compressionRatio: number;
  valvesPerCylinder?: number;
  fuelSystem?: 'carbureted' | 'fuel-injected';
  aspiration?: 'naturally-aspirated' | 'turbocharged' | 'supercharged';
}

export interface DrivetrainConfig {
  transmission: {
    type: 'manual' | 'automatic';
    gearRatios: number[];
    finalDrive: number;
  };
  differential: {
    ratio: number;
    type: 'open' | 'limited-slip' | 'locking';
  };
  tires: {
    diameter: number;
    width: number;
    sidewallRatio: number;
  };
}

export interface ValidationResult {
  isValid: boolean;
  error?: string;
  warning?: string;
}

// Specific calculation result interfaces
export interface CFMResult {
  cfm: number;
  engineType: 'stock' | 'street-strip';
  displacement: number;
  unit: 'ci' | 'liters';
  recommendations: string[];
}

export interface CompressionResult {
  hpPercentChange: number;
  hpChange: number;
  newHorsepower: number;
  originalCR: number;
  newCR: number;
  warnings: string[];
}

export interface GearRatioResult {
  ratio: number;
  calculationType: 'teeth-count' | 'speed-rpm' | 'ideal-ratio';
  inputs: Record<string, number>;
  applications: string[];
  recommendations: string[];
}

export interface SuperchargerResult {
  hpGain: number;
  totalHorsepower: number;
  psi: number;
  baseHorsepower: number;
  warnings: string[];
}

export interface VEResult {
  volumetricEfficiency: number;
  horsepower: number;
  displacement: number;
  rpm: number;
  category: 'poor' | 'average' | 'good' | 'excellent';
}

export interface PowerToWeightResult {
  hpPerPound: number;
  poundsPerHp: number;
  horsepower: number;
  weight: number;
  category: 'economy' | 'sport' | 'performance' | 'supercar';
}

export interface FluidWeightResult {
  weight: number;
  volume: number;
  fluidType: 'gasoline' | 'motorOil' | 'transmissionFluid' | 'water';
  density: number;
}