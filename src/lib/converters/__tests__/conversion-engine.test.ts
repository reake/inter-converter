import { ConversionEngine } from '../conversion-engine';

describe('ConversionEngine', () => {
  describe('convertTimestamp', () => {
    it('should convert valid timestamp to date string', () => {
      const timestamp = 1640995200; // 2022-01-01 00:00:00 UTC
      const result = ConversionEngine.convertTimestamp(timestamp);
      
      expect(result.success).toBe(true);
      expect(result.result).toContain('2022');
      expect(result.metadata?.source).toBe('conversion-engine');
    });

    it('should handle invalid timestamp', () => {
      const result = ConversionEngine.convertTimestamp(NaN);
      
      expect(result.success).toBe(false);
      expect(result.error).toBe('Invalid timestamp format');
    });
  });

  describe('convertDateToTimestamp', () => {
    it('should convert valid date to timestamp', () => {
      const dateString = '2022-01-01T00:00:00.000Z';
      const result = ConversionEngine.convertDateToTimestamp(dateString);
      
      expect(result.success).toBe(true);
      expect(result.result).toBe(1640995200);
    });

    it('should handle invalid date string', () => {
      const result = ConversionEngine.convertDateToTimestamp('invalid-date');
      
      expect(result.success).toBe(false);
      expect(result.error).toBe('Invalid date format');
    });
  });

  describe('convertColor', () => {
    it('should convert HEX to RGB', () => {
      const result = ConversionEngine.convertColor('#FF0000', 'hex', 'rgb');
      
      expect(result.success).toBe(true);
      expect(result.result).toBe('rgb(255, 0, 0)');
    });

    it('should convert RGB to HEX', () => {
      const result = ConversionEngine.convertColor('rgb(255, 0, 0)', 'rgb', 'hex');
      
      expect(result.success).toBe(true);
      expect(result.result).toBe('#FF0000');
    });

    it('should handle invalid HEX color', () => {
      const result = ConversionEngine.convertColor('invalid', 'hex', 'rgb');
      
      expect(result.success).toBe(false);
      expect(result.error).toBe('Invalid HEX color format');
    });

    it('should handle invalid RGB color', () => {
      const result = ConversionEngine.convertColor('invalid', 'rgb', 'hex');
      
      expect(result.success).toBe(false);
      expect(result.error).toBe('Invalid RGB color format');
    });
  });

  describe('calculateBMI', () => {
    it('should calculate BMI for metric units', () => {
      const result = ConversionEngine.calculateBMI(70, 1.75, 'metric');
      
      expect(result.success).toBe(true);
      expect(result.result?.bmi).toBeCloseTo(22.9, 1);
      expect(result.result?.category).toBe('Normal weight');
    });

    it('should calculate BMI for imperial units', () => {
      const result = ConversionEngine.calculateBMI(154, 69, 'imperial');
      
      expect(result.success).toBe(true);
      expect(result.result?.bmi).toBeCloseTo(22.7, 1);
      expect(result.result?.category).toBe('Normal weight');
    });

    it('should categorize BMI correctly', () => {
      const underweight = ConversionEngine.calculateBMI(45, 1.75, 'metric');
      const normal = ConversionEngine.calculateBMI(70, 1.75, 'metric');
      const overweight = ConversionEngine.calculateBMI(85, 1.75, 'metric');
      const obese = ConversionEngine.calculateBMI(100, 1.75, 'metric');

      expect(underweight.result?.category).toBe('Underweight');
      expect(normal.result?.category).toBe('Normal weight');
      expect(overweight.result?.category).toBe('Overweight');
      expect(obese.result?.category).toBe('Obese');
    });
  });

  describe('convertUnits', () => {
    it('should convert length units', () => {
      const result = ConversionEngine.convertUnits(100, 'cm', 'm', 'length');
      
      expect(result.success).toBe(true);
      expect(result.result).toBe(1);
    });

    it('should convert weight units', () => {
      const result = ConversionEngine.convertUnits(1, 'kg', 'g', 'weight');
      
      expect(result.success).toBe(true);
      expect(result.result).toBe(1000);
    });

    it('should handle unsupported units', () => {
      const result = ConversionEngine.convertUnits(100, 'invalid', 'm', 'length');
      
      expect(result.success).toBe(false);
      expect(result.error).toBe('Unsupported unit conversion');
    });
  });

  describe('convertTemperature', () => {
    it('should convert Celsius to Fahrenheit', () => {
      const result = ConversionEngine.convertTemperature(0, 'c', 'f');
      
      expect(result.success).toBe(true);
      expect(result.result).toBe(32);
    });

    it('should convert Fahrenheit to Celsius', () => {
      const result = ConversionEngine.convertTemperature(32, 'f', 'c');
      
      expect(result.success).toBe(true);
      expect(result.result).toBe(0);
    });

    it('should convert Celsius to Kelvin', () => {
      const result = ConversionEngine.convertTemperature(0, 'c', 'k');
      
      expect(result.success).toBe(true);
      expect(result.result).toBe(273.15);
    });

    it('should handle invalid temperature units', () => {
      const result = ConversionEngine.convertTemperature(0, 'invalid', 'c');
      
      expect(result.success).toBe(false);
      expect(result.error).toBe('Invalid temperature unit');
    });
  });
});