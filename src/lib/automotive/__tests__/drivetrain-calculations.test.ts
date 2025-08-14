import { DrivetrainFormulas } from '../drivetrain-calculations';

describe('DrivetrainFormulas', () => {
  describe('Gear Ratio Calculations', () => {
    test('calculates gear ratio from teeth count correctly', () => {
      expect(DrivetrainFormulas.calculateGearRatio(41, 11)).toBeCloseTo(3.73, 2);
      expect(DrivetrainFormulas.calculateGearRatio(37, 9)).toBeCloseTo(4.11, 2);
      expect(DrivetrainFormulas.calculateGearRatio(33, 11)).toBe(3);
    });

    test('calculates current ratio from speed and RPM correctly', () => {
      const ratio = DrivetrainFormulas.calculateCurrentRatio(60, 2000, 28);
      expect(ratio).toBeCloseTo(2.78, 2);
    });

    test('calculates ideal ratio correctly', () => {
      const result = DrivetrainFormulas.calculateIdealRatio(120, 6000, 28);
      
      expect(result.ratio).toBeGreaterThan(3);
      expect(result.ratio).toBeLessThan(5);
      expect(result.calculationType).toBe('ideal-ratio');
      expect(result.inputs.desiredMPH).toBe(120);
      expect(result.inputs.maxRPM).toBe(6000);
      expect(result.inputs.tireDiameter).toBe(28);
      expect(result.applications.length).toBeGreaterThan(0);
      expect(result.recommendations.length).toBeGreaterThan(0);
    });
  });

  describe('Speed and RPM Calculations', () => {
    test('calculates speed from RPM, ratio, and tire diameter correctly', () => {
      const speed = DrivetrainFormulas.calculateSpeed(3000, 3.73, 28);
      expect(speed).toBeCloseTo(67.2, 1);
    });

    test('calculates RPM from speed, ratio, and tire diameter correctly', () => {
      const rpm = DrivetrainFormulas.calculateRPM(60, 3.73, 28);
      expect(rpm).toBeCloseTo(2678.6, 1);
    });

    test('speed and RPM calculations are consistent', () => {
      const originalRPM = 3000;
      const ratio = 3.73;
      const tireDiameter = 28;
      
      const speed = DrivetrainFormulas.calculateSpeed(originalRPM, ratio, tireDiameter);
      const calculatedRPM = DrivetrainFormulas.calculateRPM(speed, ratio, tireDiameter);
      
      expect(calculatedRPM).toBeCloseTo(originalRPM, 1);
    });
  });

  describe('Tire Calculations', () => {
    test('calculates tire RPM correctly', () => {
      const trpm = DrivetrainFormulas.calculateTireRPM(28);
      expect(trpm).toBeCloseTo(719.4, 1);
    });

    test('calculates speed change from tire size change correctly', () => {
      const speedChange = DrivetrainFormulas.calculateSpeedChange(28, 30, 3.73, 3000);
      expect(speedChange).toBeGreaterThan(0);
      expect(speedChange).toBeCloseTo(4.8, 1);
    });

    test('larger tires increase speed', () => {
      const speedChange = DrivetrainFormulas.calculateSpeedChange(28, 30, 3.73, 3000);
      expect(speedChange).toBeGreaterThan(0);
    });

    test('smaller tires decrease speed', () => {
      const speedChange = DrivetrainFormulas.calculateSpeedChange(30, 28, 3.73, 3000);
      expect(speedChange).toBeLessThan(0);
    });

    test('calculates speedometer error correctly', () => {
      const error = DrivetrainFormulas.calculateSpeedometerError(28, 30);
      expect(error).toBeCloseTo(7.14, 2);
      
      const errorSmaller = DrivetrainFormulas.calculateSpeedometerError(30, 28);
      expect(errorSmaller).toBeCloseTo(-6.67, 2);
    });
  });

  describe('Speed Unit Converterss', () => {
    test('converts MPH to KPH correctly', () => {
      expect(DrivetrainFormulas.mphToKph(60)).toBeCloseTo(96.56, 2);
      expect(DrivetrainFormulas.mphToKph(100)).toBeCloseTo(160.93, 2);
    });

    test('converts KPH to MPH correctly', () => {
      expect(DrivetrainFormulas.kphToMph(100)).toBeCloseTo(62.14, 2);
      expect(DrivetrainFormulas.kphToMph(160)).toBeCloseTo(99.42, 2);
    });

    test('MPH to KPH and back is consistent', () => {
      const originalMPH = 75;
      const kph = DrivetrainFormulas.mphToKph(originalMPH);
      const backToMPH = DrivetrainFormulas.kphToMph(kph);
      expect(backToMPH).toBeCloseTo(originalMPH, 2);
    });
  });

  describe('Validation Functions', () => {
    test('validates tire diameter correctly', () => {
      expect(DrivetrainFormulas.validateTireDiameter(28).isValid).toBe(true);
      expect(DrivetrainFormulas.validateTireDiameter(15).isValid).toBe(false);
      expect(DrivetrainFormulas.validateTireDiameter(45).isValid).toBe(false);
    });

    test('validates gear ratio correctly', () => {
      expect(DrivetrainFormulas.validateGearRatio(3.73).isValid).toBe(true);
      expect(DrivetrainFormulas.validateGearRatio(1.5).isValid).toBe(false);
      expect(DrivetrainFormulas.validateGearRatio(7.0).isValid).toBe(false);
    });

    test('validates RPM correctly', () => {
      expect(DrivetrainFormulas.validateRPM(3000, 'stock').isValid).toBe(true);
      expect(DrivetrainFormulas.validateRPM(8000, 'modified').isValid).toBe(true);
      expect(DrivetrainFormulas.validateRPM(8000, 'stock').isValid).toBe(false);
      expect(DrivetrainFormulas.validateRPM(300, 'stock').isValid).toBe(false);
      expect(DrivetrainFormulas.validateRPM(12000, 'modified').isValid).toBe(false);
    });
  });

  describe('Gear Ratio Applications and Recommendations', () => {
    test('provides appropriate applications for different ratios', () => {
      const highRatio = DrivetrainFormulas.calculateIdealRatio(60, 6000, 28);
      const lowRatio = DrivetrainFormulas.calculateIdealRatio(120, 6000, 28);
      
      expect(highRatio.applications.some(app => app.includes('racing'))).toBe(true);
      expect(lowRatio.applications.some(app => app.includes('highway'))).toBe(true);
    });

    test('provides appropriate recommendations for different ratios', () => {
      const highRatio = DrivetrainFormulas.calculateIdealRatio(60, 6000, 28);
      const lowRatio = DrivetrainFormulas.calculateIdealRatio(120, 6000, 28);
      
      expect(highRatio.recommendations.length).toBeGreaterThan(0);
      expect(lowRatio.recommendations.length).toBeGreaterThan(0);
    });
  });
});