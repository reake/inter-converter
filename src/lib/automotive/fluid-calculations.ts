import { FluidWeightResult } from '@/types/automotive';

export class FluidCalculations {
  // Fluid densities in pounds per gallon
  private static readonly FLUID_DENSITIES = {
    gasoline: 6.073,
    motorOil: 7.35,
    transmissionFluid: 7.4,
    water: 8.34
  } as const;

  /**
   * Calculate fluid weight from volume
   * @param gallons Volume in gallons
   * @param fluidType Type of automotive fluid
   * @returns Fluid weight calculation result
   */
  static calculateFluidWeight(
    gallons: number, 
    fluidType: keyof typeof FluidCalculations.FLUID_DENSITIES
  ): FluidWeightResult {
    const density = this.FLUID_DENSITIES[fluidType];
    const weight = gallons * density;
    
    return {
      weight,
      volume: gallons,
      fluidType,
      density
    };
  }

  /**
   * Calculate fluid volume from weight
   * @param pounds Weight in pounds
   * @param fluidType Type of automotive fluid
   * @returns Fluid volume calculation result
   */
  static calculateFluidVolume(
    pounds: number, 
    fluidType: keyof typeof FluidCalculations.FLUID_DENSITIES
  ): FluidWeightResult {
    const density = this.FLUID_DENSITIES[fluidType];
    const volume = pounds / density;
    
    return {
      weight: pounds,
      volume,
      fluidType,
      density
    };
  }

  /**
   * Get fluid density
   * @param fluidType Type of automotive fluid
   * @returns Density in pounds per gallon
   */
  static getFluidDensity(fluidType: keyof typeof FluidCalculations.FLUID_DENSITIES): number {
    return this.FLUID_DENSITIES[fluidType];
  }

  /**
   * Get all supported fluid types
   * @returns Array of supported fluid types
   */
  static getSupportedFluidTypes(): (keyof typeof FluidCalculations.FLUID_DENSITIES)[] {
    return Object.keys(this.FLUID_DENSITIES) as (keyof typeof FluidCalculations.FLUID_DENSITIES)[];
  }

  /**
   * Get fluid type display name
   * @param fluidType Fluid type key
   * @returns Human-readable fluid name
   */
  static getFluidDisplayName(fluidType: keyof typeof FluidCalculations.FLUID_DENSITIES): string {
    const displayNames = {
      gasoline: 'Gasoline',
      motorOil: 'Motor Oil',
      transmissionFluid: 'Transmission Fluid',
      water: 'Water/Coolant'
    };
    
    return displayNames[fluidType];
  }

  /**
   * Convert gallons to liters
   * @param gallons Volume in gallons
   * @returns Volume in liters
   */
  static gallonsToLiters(gallons: number): number {
    return gallons * 3.78541;
  }

  /**
   * Convert liters to gallons
   * @param liters Volume in liters
   * @returns Volume in gallons
   */
  static litersToGallons(liters: number): number {
    return liters / 3.78541;
  }

  /**
   * Convert gallons to quarts
   * @param gallons Volume in gallons
   * @returns Volume in quarts
   */
  static gallonsToQuarts(gallons: number): number {
    return gallons * 4;
  }

  /**
   * Convert quarts to gallons
   * @param quarts Volume in quarts
   * @returns Volume in gallons
   */
  static quartsToGallons(quarts: number): number {
    return quarts / 4;
  }

  /**
   * Convert quarts to liters
   * @param quarts Volume in quarts
   * @returns Volume in liters
   */
  static quartsToLiters(quarts: number): number {
    return quarts / 1.056688;
  }

  /**
   * Convert liters to quarts
   * @param liters Volume in liters
   * @returns Volume in quarts
   */
  static litersToQuarts(liters: number): number {
    return liters * 1.056688;
  }

  /**
   * Convert fluid ounces to milliliters
   * @param fluidOunces Volume in fluid ounces
   * @returns Volume in milliliters
   */
  static fluidOuncesToML(fluidOunces: number): number {
    return fluidOunces * 29.57353;
  }

  /**
   * Convert milliliters to fluid ounces
   * @param milliliters Volume in milliliters
   * @returns Volume in fluid ounces
   */
  static mlToFluidOunces(milliliters: number): number {
    return milliliters / 29.57353;
  }

  /**
   * Convert pints to milliliters
   * @param pints Volume in pints
   * @returns Volume in milliliters
   */
  static pintsToML(pints: number): number {
    return pints * 473.1765;
  }

  /**
   * Convert milliliters to pints
   * @param milliliters Volume in milliliters
   * @returns Volume in pints
   */
  static mlToPints(milliliters: number): number {
    return milliliters / 473.1765;
  }

  /**
   * Validate fluid volume input
   * @param volume Volume value
   * @param unit Volume unit
   * @returns Validation result
   */
  static validateVolume(volume: number, unit: 'gallons' | 'liters' | 'quarts'): { isValid: boolean; error?: string } {
    const limits = {
      gallons: { min: 0.1, max: 100 },
      liters: { min: 0.4, max: 380 },
      quarts: { min: 0.4, max: 400 }
    };
    
    const limit = limits[unit];
    if (volume < limit.min || volume > limit.max) {
      return {
        isValid: false,
        error: `Volume must be between ${limit.min} and ${limit.max} ${unit}`
      };
    }
    
    return { isValid: true };
  }

  /**
   * Validate fluid weight input
   * @param weight Weight in pounds
   * @returns Validation result
   */
  static validateWeight(weight: number): { isValid: boolean; error?: string } {
    if (weight < 0.5 || weight > 1000) {
      return {
        isValid: false,
        error: 'Weight must be between 0.5 and 1000 pounds'
      };
    }
    
    return { isValid: true };
  }

  /**
   * Get fluid properties and characteristics
   * @param fluidType Type of automotive fluid
   * @returns Fluid properties object
   */
  static getFluidProperties(fluidType: keyof typeof FluidCalculations.FLUID_DENSITIES) {
    const properties = {
      gasoline: {
        density: this.FLUID_DENSITIES.gasoline,
        description: 'Automotive gasoline fuel',
        characteristics: ['Highly flammable', 'Volatile', 'Lower density than water'],
        safetyNotes: ['Store in approved containers', 'Keep away from heat sources', 'Ensure proper ventilation']
      },
      motorOil: {
        density: this.FLUID_DENSITIES.motorOil,
        description: 'Engine lubricating oil',
        characteristics: ['Viscous liquid', 'Temperature dependent viscosity', 'Heavier than gasoline'],
        safetyNotes: ['Dispose of properly', 'Avoid skin contact', 'Use appropriate grade for engine']
      },
      transmissionFluid: {
        density: this.FLUID_DENSITIES.transmissionFluid,
        description: 'Automatic transmission fluid (ATF)',
        characteristics: ['Hydraulic fluid', 'Red color typically', 'Similar density to motor oil'],
        safetyNotes: ['Use correct ATF type', 'Check when warm', 'Replace per manufacturer schedule']
      },
      water: {
        density: this.FLUID_DENSITIES.water,
        description: 'Water or engine coolant',
        characteristics: ['Heaviest common automotive fluid', 'Freezes at 32°F', 'Boils at 212°F'],
        safetyNotes: ['Use proper coolant mixture', 'Check for leaks regularly', 'Maintain proper level']
      }
    };
    
    return properties[fluidType];
  }
}