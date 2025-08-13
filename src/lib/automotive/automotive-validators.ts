import { ValidationResult } from '@/types/automotive';

export class AutomotiveValidator {
  /**
   * Validate engine displacement
   * @param displacement Engine displacement value
   * @param unit Unit of measurement (ci or liters)
   * @returns Validation result
   */
  static validateEngineDisplacement(displacement: number, unit: 'ci' | 'liters'): ValidationResult {
    const limits = unit === 'ci' ? { min: 50, max: 1000 } : { min: 0.8, max: 16.4 };
    
    if (displacement < limits.min || displacement > limits.max) {
      return {
        isValid: false,
        error: `Engine displacement must be between ${limits.min} and ${limits.max} ${unit}`
      };
    }
    
    return { isValid: true };
  }

  /**
   * Validate compression ratio
   * @param cr Compression ratio
   * @returns Validation result with warnings
   */
  static validateCompressionRatio(cr: number): ValidationResult {
    if (cr < 6 || cr > 20) {
      return {
        isValid: false,
        error: 'Compression ratio must be between 6:1 and 20:1'
      };
    }
    
    let warning: string | undefined;
    if (cr > 12) {
      warning = 'High compression ratios may require premium fuel and careful tuning';
    } else if (cr < 7.5) {
      warning = 'Low compression ratio may indicate engine wear or performance issues';
    }
    
    return { 
      isValid: true,
      warning
    };
  }

  /**
   * Validate RPM input
   * @param rpm RPM value
   * @param engineType Type of engine configuration
   * @returns Validation result
   */
  static validateRPM(rpm: number, engineType: 'stock' | 'modified' = 'stock'): ValidationResult {
    const maxRPM = engineType === 'stock' ? 7000 : 10000;
    
    if (rpm < 500 || rpm > maxRPM) {
      return {
        isValid: false,
        error: `RPM must be between 500 and ${maxRPM} for ${engineType} engines`
      };
    }
    
    let warning: string | undefined;
    if (rpm > 6500 && engineType === 'stock') {
      warning = 'High RPM for stock engine - ensure adequate valve springs and components';
    } else if (rpm > 8500) {
      warning = 'Very high RPM - requires race-quality components and professional tuning';
    }
    
    return { 
      isValid: true,
      warning
    };
  }

  /**
   * Validate horsepower input
   * @param hp Horsepower value
   * @param displacement Engine displacement in cubic inches (optional for context)
   * @returns Validation result
   */
  static validateHorsepower(hp: number, displacement?: number): ValidationResult {
    if (hp < 50 || hp > 2000) {
      return {
        isValid: false,
        error: 'Horsepower must be between 50 and 2000 HP'
      };
    }
    
    let warning: string | undefined;
    if (displacement && hp / displacement > 2.5) {
      warning = 'Very high specific output - may require extensive modifications';
    } else if (displacement && hp / displacement < 0.5) {
      warning = 'Low specific output - may indicate engine issues or conservative tune';
    }
    
    return { 
      isValid: true,
      warning
    };
  }

  /**
   * Validate torque input
   * @param torque Torque value in lb-ft
   * @returns Validation result
   */
  static validateTorque(torque: number): ValidationResult {
    if (torque < 50 || torque > 1500) {
      return {
        isValid: false,
        error: 'Torque must be between 50 and 1500 lb-ft'
      };
    }
    
    return { isValid: true };
  }

  /**
   * Validate boost pressure
   * @param psi Boost pressure in PSI
   * @returns Validation result with safety warnings
   */
  static validateBoostPressure(psi: number): ValidationResult {
    if (psi < 0 || psi > 30) {
      return {
        isValid: false,
        error: 'Boost pressure must be between 0 and 30 PSI'
      };
    }
    
    let warning: string | undefined;
    if (psi > 15) {
      warning = 'Very high boost pressure - requires race fuel and extensive engine modifications';
    } else if (psi > 8) {
      warning = 'High boost pressure - ensure proper fuel system and engine internals';
    }
    
    return { 
      isValid: true,
      warning
    };
  }

  /**
   * Validate vehicle speed
   * @param mph Speed in miles per hour
   * @returns Validation result
   */
  static validateSpeed(mph: number): ValidationResult {
    if (mph < 5 || mph > 300) {
      return {
        isValid: false,
        error: 'Speed must be between 5 and 300 MPH'
      };
    }
    
    let warning: string | undefined;
    if (mph > 200) {
      warning = 'Very high speed - ensure vehicle is properly prepared for high-speed operation';
    }
    
    return { 
      isValid: true,
      warning
    };
  }

  /**
   * Validate tire diameter
   * @param diameter Tire diameter in inches
   * @returns Validation result
   */
  static validateTireDiameter(diameter: number): ValidationResult {
    if (diameter < 20 || diameter > 40) {
      return {
        isValid: false,
        error: 'Tire diameter must be between 20 and 40 inches'
      };
    }
    
    return { isValid: true };
  }

  /**
   * Validate gear ratio
   * @param ratio Gear ratio
   * @returns Validation result
   */
  static validateGearRatio(ratio: number): ValidationResult {
    if (ratio < 2.0 || ratio > 6.0) {
      return {
        isValid: false,
        error: 'Gear ratio must be between 2.0:1 and 6.0:1'
      };
    }
    
    let warning: string | undefined;
    if (ratio > 4.5) {
      warning = 'Very aggressive gear ratio - excellent for acceleration but poor for highway driving';
    } else if (ratio < 2.5) {
      warning = 'Very tall gear ratio - good for highway but may feel sluggish in city driving';
    }
    
    return { 
      isValid: true,
      warning
    };
  }

  /**
   * Validate bore and stroke dimensions
   * @param bore Bore diameter in inches
   * @param stroke Stroke length in inches
   * @returns Validation result
   */
  static validateBoreStroke(bore: number, stroke: number): ValidationResult {
    if (bore < 2.0 || bore > 6.0) {
      return {
        isValid: false,
        error: 'Bore diameter must be between 2.0 and 6.0 inches'
      };
    }
    
    if (stroke < 2.0 || stroke > 6.0) {
      return {
        isValid: false,
        error: 'Stroke length must be between 2.0 and 6.0 inches'
      };
    }
    
    let warning: string | undefined;
    const boreStrokeRatio = bore / stroke;
    if (boreStrokeRatio > 1.3) {
      warning = 'Oversquare engine (bore > stroke) - typically better for high RPM';
    } else if (boreStrokeRatio < 0.9) {
      warning = 'Undersquare engine (stroke > bore) - typically better for torque';
    }
    
    return { 
      isValid: true,
      warning
    };
  }

  /**
   * Validate number of cylinders
   * @param cylinders Number of cylinders
   * @returns Validation result
   */
  static validateCylinders(cylinders: number): ValidationResult {
    const validCylinders = [3, 4, 5, 6, 8, 10, 12, 16];
    
    if (!validCylinders.includes(cylinders)) {
      return {
        isValid: false,
        error: 'Number of cylinders must be 3, 4, 5, 6, 8, 10, 12, or 16'
      };
    }
    
    return { isValid: true };
  }

  /**
   * Validate vehicle weight
   * @param weight Vehicle weight in pounds
   * @returns Validation result
   */
  static validateVehicleWeight(weight: number): ValidationResult {
    if (weight < 1000 || weight > 10000) {
      return {
        isValid: false,
        error: 'Vehicle weight must be between 1000 and 10000 pounds'
      };
    }
    
    return { isValid: true };
  }

  /**
   * Validate gear teeth count
   * @param teeth Number of teeth on gear
   * @param gearType Type of gear (ring or pinion)
   * @returns Validation result
   */
  static validateGearTeeth(teeth: number, gearType: 'ring' | 'pinion'): ValidationResult {
    const limits = gearType === 'ring' 
      ? { min: 30, max: 60 }
      : { min: 8, max: 20 };
    
    if (teeth < limits.min || teeth > limits.max) {
      return {
        isValid: false,
        error: `${gearType} gear teeth must be between ${limits.min} and ${limits.max}`
      };
    }
    
    return { isValid: true };
  }

  /**
   * Validate multiple related parameters for consistency
   * @param params Object containing related parameters
   * @returns Validation result with consistency checks
   */
  static validateParameterConsistency(params: {
    hp?: number;
    torque?: number;
    rpm?: number;
    displacement?: number;
  }): ValidationResult {
    const { hp, torque, rpm, displacement } = params;
    
    // Check torque/HP/RPM relationship if all three are provided
    if (hp && torque && rpm) {
      const calculatedHP = (torque * rpm) / 5252;
      const hpDifference = Math.abs(hp - calculatedHP) / hp;
      
      if (hpDifference > 0.1) { // Allow 10% tolerance
        return {
          isValid: false,
          error: 'Horsepower, torque, and RPM values are not consistent with each other'
        };
      }
    }
    
    // Check specific output if HP and displacement are provided
    if (hp && displacement) {
      const specificOutput = hp / displacement;
      if (specificOutput > 3.0) {
        return {
          isValid: true,
          warning: 'Very high specific output - may require extensive modifications and race fuel'
        };
      }
    }
    
    return { isValid: true };
  }
}