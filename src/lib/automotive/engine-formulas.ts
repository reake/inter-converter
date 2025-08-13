import { CompressionResult, CFMResult, SuperchargerResult, VEResult } from '@/types/automotive';

export class EngineFormulas {
  /**
   * Calculate carburetor CFM requirement based on engine displacement
   * @param displacement Engine displacement in cubic inches
   * @param engineType Stock or modified engine configuration
   * @returns CFM requirement
   */
  static calculateCFM(displacement: number, engineType: 'stock' | 'street-strip'): number {
    const multiplier = engineType === 'stock' ? 1.618 : 1.76;
    return displacement * multiplier;
  }

  /**
   * Calculate CFM from liters displacement
   * @param liters Engine displacement in liters
   * @param engineType Stock or modified engine configuration
   * @returns CFM requirement
   */
  static calculateCFMFromLiters(liters: number, engineType: 'stock' | 'street-strip'): number {
    const cubicInches = liters / 0.01638706;
    return this.calculateCFM(cubicInches, engineType);
  }

  /**
   * Calculate horsepower change from compression ratio modification
   * @param currentHP Current horsepower
   * @param currentCR Current compression ratio
   * @param newCR New compression ratio
   * @returns Compression ratio calculation result
   */
  static calculateCompressionHPChange(
    currentHP: number, 
    currentCR: number, 
    newCR: number
  ): CompressionResult {
    const hpPercentChange = ((1 - (1 / Math.pow(newCR, 0.4))) / 
                            (1 - (1 / Math.pow(currentCR, 0.4)))) - 1;
    const hpChange = hpPercentChange * currentHP;
    const newHorsepower = currentHP + hpChange;
    
    return {
      hpPercentChange: hpPercentChange * 100,
      hpChange,
      newHorsepower,
      originalCR: currentCR,
      newCR,
      warnings: this.getCompressionWarnings(newCR)
    };
  }

  /**
   * Calculate supercharger horsepower gain
   * @param baseHP Base naturally aspirated horsepower
   * @param psi Boost pressure in PSI
   * @returns Horsepower gain from supercharger
   */
  static calculateSuperchargerGain(baseHP: number, psi: number): number {
    return (baseHP * psi) / 14.696;
  }

  /**
   * Calculate total horsepower with supercharger
   * @param baseHP Base naturally aspirated horsepower
   * @param psi Boost pressure in PSI
   * @returns Total horsepower with supercharger
   */
  static calculateSuperchargerTotal(baseHP: number, psi: number): SuperchargerResult {
    const hpGain = this.calculateSuperchargerGain(baseHP, psi);
    const totalHorsepower = baseHP + hpGain;
    
    return {
      hpGain,
      totalHorsepower,
      psi,
      baseHorsepower: baseHP,
      warnings: this.getSuperchargerWarnings(psi)
    };
  }

  /**
   * Calculate CFM requirement for supercharged engine
   * @param displacement Engine displacement in cubic inches
   * @param rpm Maximum RPM
   * @param psi Boost pressure in PSI
   * @returns CFM requirement for supercharged engine
   */
  static calculateSuperchargerCFM(displacement: number, rpm: number, psi: number): number {
    return ((displacement * rpm) / 3456) * ((psi / 14.696) + 0.977);
  }

  /**
   * Calculate Ram Air horsepower gain based on speed
   * @param baseHP Base horsepower
   * @param mph Vehicle speed in MPH
   * @returns Ram Air calculation result
   */
  static calculateRamAirGain(baseHP: number, mph: number): SuperchargerResult {
    const ramAirPSI = 0.0000168498 * mph * mph + 0.000142857 * mph + 0.000732;
    const hpGain = (baseHP * ramAirPSI) / 14.696;
    const totalHorsepower = baseHP + hpGain;
    
    return {
      hpGain,
      totalHorsepower,
      psi: ramAirPSI,
      baseHorsepower: baseHP,
      warnings: []
    };
  }

  /**
   * Calculate volumetric efficiency
   * @param hp Horsepower
   * @param displacement Engine displacement in cubic inches
   * @param rpm RPM
   * @returns Volumetric efficiency percentage
   */
  static calculateVE(hp: number, displacement: number, rpm: number): VEResult {
    const ve = (9411 * hp * 0.45) / (displacement * rpm);
    
    let category: 'poor' | 'average' | 'good' | 'excellent';
    if (ve < 0.7) category = 'poor';
    else if (ve < 0.85) category = 'average';
    else if (ve < 1.0) category = 'good';
    else category = 'excellent';
    
    return {
      volumetricEfficiency: ve,
      horsepower: hp,
      displacement,
      rpm,
      category
    };
  }

  /**
   * Calculate torque from horsepower and RPM
   * @param hp Horsepower
   * @param rpm RPM
   * @returns Torque in lb-ft
   */
  static calculateTorque(hp: number, rpm: number): number {
    return (hp * 5252) / rpm;
  }

  /**
   * Calculate horsepower from torque and RPM
   * @param torque Torque in lb-ft
   * @param rpm RPM
   * @returns Horsepower
   */
  static calculateHorsepower(torque: number, rpm: number): number {
    return (torque * rpm) / 5252;
  }

  /**
   * Calculate RPM from horsepower and torque
   * @param hp Horsepower
   * @param torque Torque in lb-ft
   * @returns RPM
   */
  static calculateRPM(hp: number, torque: number): number {
    return (hp * 5252) / torque;
  }

  /**
   * Convert cubic inches to liters
   * @param ci Cubic inches
   * @returns Liters
   */
  static ciToLiters(ci: number): number {
    return ci * 0.01638706;
  }

  /**
   * Convert liters to cubic inches
   * @param liters Liters
   * @returns Cubic inches
   */
  static litersToCi(liters: number): number {
    return liters / 0.01638706;
  }

  /**
   * Calculate cylinder volume from bore and stroke
   * @param bore Bore diameter in inches
   * @param stroke Stroke length in inches
   * @returns Cylinder volume in cubic inches
   */
  static calculateCylinderVolume(bore: number, stroke: number): number {
    return bore * bore * stroke * 0.7854;
  }

  /**
   * Calculate total engine displacement
   * @param cylinderVolume Volume of one cylinder in cubic inches
   * @param cylinders Number of cylinders
   * @returns Total engine displacement in cubic inches
   */
  static calculateEngineDisplacement(cylinderVolume: number, cylinders: number): number {
    return cylinderVolume * cylinders;
  }

  /**
   * Get compression ratio warnings
   * @param cr Compression ratio
   * @returns Array of warning messages
   */
  private static getCompressionWarnings(cr: number): string[] {
    const warnings: string[] = [];
    
    if (cr > 12) {
      warnings.push('High compression ratio may require premium fuel (91+ octane)');
    }
    if (cr > 14) {
      warnings.push('Very high compression ratio may require race fuel');
      warnings.push('Consider detonation risks and proper tuning');
    }
    if (cr < 7) {
      warnings.push('Low compression ratio may indicate engine wear or damage');
    }
    
    return warnings;
  }

  /**
   * Get supercharger warnings
   * @param psi Boost pressure
   * @returns Array of warning messages
   */
  private static getSuperchargerWarnings(psi: number): string[] {
    const warnings: string[] = [];
    
    if (psi > 8) {
      warnings.push('High boost levels require fuel enrichment and proper tuning');
    }
    if (psi > 12) {
      warnings.push('Very high boost may require forged internals and race fuel');
    }
    if (psi > 15) {
      warnings.push('Extreme boost levels - consult professional tuner');
    }
    
    warnings.push('Supercharged engines may need enriched carburetor settings/jets to prevent running lean');
    
    return warnings;
  }
}