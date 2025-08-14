import { EngineFormulas } from '../engine-formulas';

describe('EngineFormulas', () => {
  describe('CFM Calculations', () => {
    test('calculates CFM for stock engine correctly', () => {
      expect(EngineFormulas.calculateCFM(350, 'stock')).toBeCloseTo(566.3, 1);
      expect(EngineFormulas.calculateCFM(454, 'stock')).toBeCloseTo(734.6, 1);
    });

    test('calculates CFM for street-strip engine correctly', () => {
      expect(EngineFormulas.calculateCFM(350, 'street-strip')).toBeCloseTo(616, 1);
      expect(EngineFormulas.calculateCFM(454, 'street-strip')).toBeCloseTo(799.04, 1);
    });

    test('calculates CFM from liters correctly', () => {
      expect(EngineFormulas.calculateCFMFromLiters(5.7, 'stock')).toBeCloseTo(563.2, 1);
      expect(EngineFormulas.calculateCFMFromLiters(5.7, 'street-strip')).toBeCloseTo(612.8, 1);
    });
  });

  describe('Compression Ratio Calculations', () => {
    test('calculates compression ratio HP change correctly', () => {
      const result = EngineFormulas.calculateCompressionHPChange(300, 9.0, 10.0);
      
      expect(result.hpPercentChange).toBeGreaterThan(0);
      expect(result.hpChange).toBeGreaterThan(0);
      expect(result.newHorsepower).toBeGreaterThan(300);
      expect(result.originalCR).toBe(9.0);
      expect(result.newCR).toBe(10.0);
    });

    test('provides warnings for high compression ratios', () => {
      const result = EngineFormulas.calculateCompressionHPChange(300, 9.0, 13.0);
      expect(result.warnings.length).toBeGreaterThan(0);
      expect(result.warnings.some(w => w.includes('premium fuel'))).toBe(true);
    });

    test('provides warnings for very high compression ratios', () => {
      const result = EngineFormulas.calculateCompressionHPChange(300, 9.0, 15.0);
      expect(result.warnings.length).toBeGreaterThan(1);
      expect(result.warnings.some(w => w.includes('race fuel'))).toBe(true);
    });
  });

  describe('Supercharger Calculations', () => {
    test('calculates supercharger gain correctly', () => {
      expect(EngineFormulas.calculateSuperchargerGain(300, 8)).toBeCloseTo(163.3, 1);
      expect(EngineFormulas.calculateSuperchargerGain(400, 6)).toBeCloseTo(163.3, 1);
    });

    test('calculates supercharger total correctly', () => {
      const result = EngineFormulas.calculateSuperchargerTotal(300, 8);
      
      expect(result.hpGain).toBeCloseTo(163.3, 1);
      expect(result.totalHorsepower).toBeCloseTo(463.3, 1);
      expect(result.psi).toBe(8);
      expect(result.baseHorsepower).toBe(300);
    });

    test('provides warnings for high boost', () => {
      const result = EngineFormulas.calculateSuperchargerTotal(300, 12);
      expect(result.warnings.length).toBeGreaterThan(0);
      expect(result.warnings.some(w => w.includes('fuel enrichment'))).toBe(true);
    });

    test('calculates supercharger CFM correctly', () => {
      const cfm = EngineFormulas.calculateSuperchargerCFM(350, 6000, 8);
      expect(cfm).toBeGreaterThan(600);
      expect(cfm).toBeLessThan(1000);
    });
  });

  describe('Ram Air Calculations', () => {
    test('calculates ram air gain correctly', () => {
      const result = EngineFormulas.calculateRamAirGain(300, 100);
      
      expect(result.hpGain).toBeGreaterThan(0);
      expect(result.totalHorsepower).toBeGreaterThan(300);
      expect(result.psi).toBeGreaterThan(0);
      expect(result.baseHorsepower).toBe(300);
    });

    test('ram air gain increases with speed', () => {
      const result50 = EngineFormulas.calculateRamAirGain(300, 50);
      const result100 = EngineFormulas.calculateRamAirGain(300, 100);
      
      expect(result100.hpGain).toBeGreaterThan(result50.hpGain);
      expect(result100.psi).toBeGreaterThan(result50.psi);
    });
  });

  describe('Volumetric Efficiency Calculations', () => {
    test('calculates VE correctly', () => {
      const result = EngineFormulas.calculateVE(300, 350, 5500);
      
      expect(result.volumetricEfficiency).toBeGreaterThan(0);
      expect(result.volumetricEfficiency).toBeLessThan(2);
      expect(result.horsepower).toBe(300);
      expect(result.displacement).toBe(350);
      expect(result.rpm).toBe(5500);
    });

    test('categorizes VE correctly', () => {
      const poorVE = EngineFormulas.calculateVE(200, 350, 5500);
      const goodVE = EngineFormulas.calculateVE(400, 350, 5500);
      
      expect(poorVE.category).toBe('poor');
      expect(goodVE.category).toBe('good');
    });
  });

  describe('Torque and Horsepower Relationships', () => {
    test('calculates torque from HP and RPM correctly', () => {
      expect(EngineFormulas.calculateTorque(300, 5252)).toBeCloseTo(300, 1);
      expect(EngineFormulas.calculateTorque(400, 6000)).toBeCloseTo(350, 1);
    });

    test('calculates horsepower from torque and RPM correctly', () => {
      expect(EngineFormulas.calculateHorsepower(300, 5252)).toBeCloseTo(300, 1);
      expect(EngineFormulas.calculateHorsepower(350, 6000)).toBeCloseTo(400, 1);
    });

    test('calculates RPM from HP and torque correctly', () => {
      expect(EngineFormulas.calculateRPM(300, 300)).toBeCloseTo(5252, 1);
      expect(EngineFormulas.calculateRPM(400, 350)).toBeCloseTo(6000, 1);
    });

    test('torque and HP are equal at 5252 RPM', () => {
      const torque = 350;
      const hp = EngineFormulas.calculateHorsepower(torque, 5252);
      expect(hp).toBeCloseTo(torque, 1);
    });
  });

  describe('Displacement Converterss', () => {
    test('converts CI to liters correctly', () => {
      expect(EngineFormulas.ciToLiters(350)).toBeCloseTo(5.735, 2);
      expect(EngineFormulas.ciToLiters(454)).toBeCloseTo(7.440, 2);
    });

    test('converts liters to CI correctly', () => {
      expect(EngineFormulas.litersToCi(5.7)).toBeCloseTo(347.8, 1);
      expect(EngineFormulas.litersToCi(7.4)).toBeCloseTo(451.6, 1);
    });

    test('CI to liters and back is consistent', () => {
      const originalCI = 350;
      const liters = EngineFormulas.ciToLiters(originalCI);
      const backToCI = EngineFormulas.litersToCi(liters);
      expect(backToCI).toBeCloseTo(originalCI, 1);
    });
  });

  describe('Volume Calculations', () => {
    test('calculates cylinder volume correctly', () => {
      const volume = EngineFormulas.calculateCylinderVolume(4.0, 3.48);
      expect(volume).toBeCloseTo(43.75, 1);
    });

    test('calculates engine displacement correctly', () => {
      const cylinderVolume = 43.75;
      const displacement = EngineFormulas.calculateEngineDisplacement(cylinderVolume, 8);
      expect(displacement).toBeCloseTo(350, 1);
    });

    test('bore and stroke to displacement calculation', () => {
      const cylinderVolume = EngineFormulas.calculateCylinderVolume(4.0, 3.48);
      const totalDisplacement = EngineFormulas.calculateEngineDisplacement(cylinderVolume, 8);
      expect(totalDisplacement).toBeCloseTo(350, 1);
    });
  });
});