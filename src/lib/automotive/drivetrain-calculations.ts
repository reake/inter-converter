import { GearRatioResult } from '@/types/automotive';

export class DrivetrainFormulas {
  /**
   * Calculate gear ratio from ring and pinion teeth count
   * @param ringTeeth Number of teeth on ring gear
   * @param pinionTeeth Number of teeth on pinion gear
   * @returns Gear ratio
   */
  static calculateGearRatio(ringTeeth: number, pinionTeeth: number): number {
    return ringTeeth / pinionTeeth;
  }

  /**
   * Calculate current gear ratio from speed, RPM, and tire diameter
   * @param mph Vehicle speed in MPH
   * @param rpm Engine RPM
   * @param tireDiameter Tire diameter in inches
   * @returns Current gear ratio
   */
  static calculateCurrentRatio(mph: number, rpm: number, tireDiameter: number): number {
    return (rpm * tireDiameter) / (mph * 336);
  }

  /**
   * Calculate ideal gear ratio for desired performance
   * @param desiredMPH Target speed in MPH
   * @param maxRPM Maximum safe engine RPM
   * @param tireDiameter Tire diameter in inches
   * @returns Ideal gear ratio
   */
  static calculateIdealRatio(desiredMPH: number, maxRPM: number, tireDiameter: number): GearRatioResult {
    const ratio = (maxRPM * tireDiameter) / (desiredMPH * 336);
    
    return {
      ratio,
      calculationType: 'ideal-ratio',
      inputs: {
        desiredMPH,
        maxRPM,
        tireDiameter
      },
      applications: this.getGearRatioApplications(ratio),
      recommendations: this.getGearRatioRecommendations(ratio)
    };
  }

  /**
   * Calculate vehicle speed from RPM, gear ratio, and tire diameter
   * @param rpm Engine RPM
   * @param gearRatio Final drive ratio
   * @param tireDiameter Tire diameter in inches
   * @returns Vehicle speed in MPH
   */
  static calculateSpeed(rpm: number, gearRatio: number, tireDiameter: number): number {
    return (rpm * tireDiameter) / (gearRatio * 336);
  }

  /**
   * Calculate RPM from speed, gear ratio, and tire diameter
   * @param mph Vehicle speed in MPH
   * @param gearRatio Final drive ratio
   * @param tireDiameter Tire diameter in inches
   * @returns Engine RPM
   */
  static calculateRPM(mph: number, gearRatio: number, tireDiameter: number): number {
    return (mph * gearRatio * 336) / tireDiameter;
  }

  /**
   * Calculate tire revolutions per mile
   * @param tireDiameter Tire diameter in inches
   * @returns Revolutions per mile
   */
  static calculateTireRPM(tireDiameter: number): number {
    return 5280 / ((tireDiameter / 12) * Math.PI);
  }

  /**
   * Calculate speed change from tire size change
   * @param currentDiameter Current tire diameter in inches
   * @param newDiameter New tire diameter in inches
   * @param gearRatio Final drive ratio
   * @param rpm Engine RPM
   * @returns Change in MPH
   */
  static calculateSpeedChange(
    currentDiameter: number,
    newDiameter: number,
    gearRatio: number,
    rpm: number
  ): number {
    return (rpm * (newDiameter - currentDiameter)) / (gearRatio * 336);
  }

  /**
   * Calculate speedometer error from tire size change
   * @param originalDiameter Original tire diameter
   * @param newDiameter New tire diameter
   * @returns Speedometer error percentage
   */
  static calculateSpeedometerError(originalDiameter: number, newDiameter: number): number {
    return ((newDiameter - originalDiameter) / originalDiameter) * 100;
  }

  /**
   * Convert MPH to KPH
   * @param mph Speed in miles per hour
   * @returns Speed in kilometers per hour
   */
  static mphToKph(mph: number): number {
    return mph * 1.609344;
  }

  /**
   * Convert KPH to MPH
   * @param kph Speed in kilometers per hour
   * @returns Speed in miles per hour
   */
  static kphToMph(kph: number): number {
    return kph / 1.609344;
  }

  /**
   * Get gear ratio applications based on ratio value
   * @param ratio Gear ratio
   * @returns Array of application descriptions
   */
  private static getGearRatioApplications(ratio: number): string[] {
    const applications: string[] = [];
    
    if (ratio >= 4.5) {
      applications.push('Drag racing and acceleration');
      applications.push('Rock crawling and off-road');
    } else if (ratio >= 3.7) {
      applications.push('Street performance and autocross');
      applications.push('Towing and heavy loads');
    } else if (ratio >= 3.0) {
      applications.push('Balanced street driving');
      applications.push('Light towing capability');
    } else {
      applications.push('Highway cruising and fuel economy');
      applications.push('High-speed applications');
    }
    
    return applications;
  }

  /**
   * Get gear ratio recommendations
   * @param ratio Gear ratio
   * @returns Array of recommendation messages
   */
  private static getGearRatioRecommendations(ratio: number): string[] {
    const recommendations: string[] = [];
    
    if (ratio > 5.0) {
      recommendations.push('Very aggressive ratio - excellent for drag racing but poor fuel economy');
      recommendations.push('May require higher stall torque converter for automatics');
    } else if (ratio > 4.0) {
      recommendations.push('Good for acceleration and performance driving');
      recommendations.push('Consider impact on highway RPM and fuel economy');
    } else if (ratio > 3.0) {
      recommendations.push('Balanced ratio for street performance');
      recommendations.push('Good compromise between acceleration and cruising');
    } else {
      recommendations.push('Economy-focused ratio for highway driving');
      recommendations.push('May feel sluggish in stop-and-go traffic');
    }
    
    return recommendations;
  }

  /**
   * Validate tire diameter input
   * @param diameter Tire diameter in inches
   * @returns Validation result
   */
  static validateTireDiameter(diameter: number): { isValid: boolean; error?: string } {
    if (diameter < 20 || diameter > 40) {
      return {
        isValid: false,
        error: 'Tire diameter must be between 20 and 40 inches'
      };
    }
    return { isValid: true };
  }

  /**
   * Validate gear ratio input
   * @param ratio Gear ratio
   * @returns Validation result
   */
  static validateGearRatio(ratio: number): { isValid: boolean; error?: string } {
    if (ratio < 2.0 || ratio > 6.0) {
      return {
        isValid: false,
        error: 'Gear ratio must be between 2.0:1 and 6.0:1'
      };
    }
    return { isValid: true };
  }

  /**
   * Validate RPM input
   * @param rpm Engine RPM
   * @param engineType Type of engine (stock or modified)
   * @returns Validation result
   */
  static validateRPM(rpm: number, engineType: 'stock' | 'modified' = 'stock'): { isValid: boolean; error?: string } {
    const maxRPM = engineType === 'stock' ? 7000 : 10000;
    
    if (rpm < 500 || rpm > maxRPM) {
      return {
        isValid: false,
        error: `RPM must be between 500 and ${maxRPM} for ${engineType} engines`
      };
    }
    return { isValid: true };
  }
}