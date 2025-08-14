import { ConvertersResult } from '@/types/tools';

export class ConvertersEngine {
  // Timestamp Converterss
  static convertTimestamp(timestamp: number, timezone?: string): ConvertersResult<string> {
    try {
      const date = new Date(timestamp * 1000);
      
      if (isNaN(date.getTime())) {
        return {
          success: false,
          error: 'Invalid timestamp format'
        };
      }

      const options: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        timeZone: timezone || 'UTC'
      };

      const result = date.toLocaleString('en-US', options);
      
      return {
        success: true,
        result,
        metadata: {
          timestamp: new Date(),
          source: 'Converters-engine'
        }
      };
    } catch (error) {
      return {
        success: false,
        error: 'Failed to convert timestamp'
      };
    }
  }

  static convertDateToTimestamp(dateString: string): ConvertersResult<number> {
    try {
      const date = new Date(dateString);
      
      if (isNaN(date.getTime())) {
        return {
          success: false,
          error: 'Invalid date format'
        };
      }

      const timestamp = Math.floor(date.getTime() / 1000);
      
      return {
        success: true,
        result: timestamp,
        metadata: {
          timestamp: new Date(),
          source: 'Converters-engine'
        }
      };
    } catch (error) {
      return {
        success: false,
        error: 'Failed to convert date to timestamp'
      };
    }
  }

  // Unit Converterss
  static convertUnits(
    value: number, 
    fromUnit: string, 
    toUnit: string, 
    category: string
  ): ConvertersResult<number> {
    try {
      const ConvertersFactors = this.getConvertersFactors(category);
      
      if (!ConvertersFactors[fromUnit] || !ConvertersFactors[toUnit]) {
        return {
          success: false,
          error: 'Unsupported unit Converters'
        };
      }

      // Convert to base unit first, then to target unit
      const baseValue = value * ConvertersFactors[fromUnit];
      const result = baseValue / ConvertersFactors[toUnit];
      
      return {
        success: true,
        result: parseFloat(result.toFixed(10)),
        metadata: {
          timestamp: new Date(),
          source: 'Converters-engine'
        }
      };
    } catch (error) {
      return {
        success: false,
        error: 'Failed to convert units'
      };
    }
  }

  // Color Converterss
  static convertColor(value: string, fromFormat: string, toFormat: string): ConvertersResult<string> {
    try {
      if (fromFormat === 'hex' && toFormat === 'rgb') {
        return this.hexToRgb(value);
      } else if (fromFormat === 'rgb' && toFormat === 'hex') {
        return this.rgbToHex(value);
      }
      
      return {
        success: false,
        error: 'Unsupported color Converters'
      };
    } catch (error) {
      return {
        success: false,
        error: 'Failed to convert color'
      };
    }
  }

  private static hexToRgb(hex: string): ConvertersResult<string> {
    // Remove # if present
    hex = hex.replace('#', '');
    
    // Validate hex format
    if (!/^[0-9A-Fa-f]{6}$/.test(hex)) {
      return {
        success: false,
        error: 'Invalid HEX color format'
      };
    }

    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);

    return {
      success: true,
      result: `rgb(${r}, ${g}, ${b})`,
      metadata: {
        timestamp: new Date(),
        source: 'Converters-engine'
      }
    };
  }

  private static rgbToHex(rgb: string): ConvertersResult<string> {
    // Extract RGB values
    const match = rgb.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
    
    if (!match) {
      return {
        success: false,
        error: 'Invalid RGB color format'
      };
    }

    const r = parseInt(match[1]);
    const g = parseInt(match[2]);
    const b = parseInt(match[3]);

    // Validate RGB values
    if (r > 255 || g > 255 || b > 255 || r < 0 || g < 0 || b < 0) {
      return {
        success: false,
        error: 'RGB values must be between 0 and 255'
      };
    }

    const hex = '#' + [r, g, b].map(x => {
      const hex = x.toString(16);
      return hex.length === 1 ? '0' + hex : hex;
    }).join('');

    return {
      success: true,
      result: hex.toUpperCase(),
      metadata: {
        timestamp: new Date(),
        source: 'Converters-engine'
      }
    };
  }

  // BMI calculation
  static calculateBMI(weight: number, height: number, unit: 'metric' | 'imperial'): ConvertersResult<{
    bmi: number;
    category: string;
    recommendation: string;
  }> {
    try {
      let bmi: number;
      
      if (unit === 'imperial') {
        // Convert pounds and inches to metric
        const weightKg = weight * 0.453592;
        const heightM = (height * 2.54) / 100;
        bmi = weightKg / (heightM * heightM);
      } else {
        // Height should be in meters
        const heightM = height > 3 ? height / 100 : height; // Convert cm to m if needed
        bmi = weight / (heightM * heightM);
      }

      const category = this.getBMICategory(bmi);
      const recommendation = this.getBMIRecommendation(category);

      return {
        success: true,
        result: {
          bmi: parseFloat(bmi.toFixed(1)),
          category,
          recommendation
        },
        metadata: {
          timestamp: new Date(),
          source: 'Converters-engine'
        }
      };
    } catch (error) {
      return {
        success: false,
        error: 'Failed to calculate BMI'
      };
    }
  }

  private static getBMICategory(bmi: number): string {
    if (bmi < 18.5) return 'Underweight';
    if (bmi < 25) return 'Normal weight';
    if (bmi < 30) return 'Overweight';
    return 'Obese';
  }

  private static getBMIRecommendation(category: string): string {
    const recommendations = {
      'Underweight': 'Consider consulting with a healthcare provider about healthy weight gain strategies.',
      'Normal weight': 'Maintain your current healthy lifestyle with balanced diet and regular exercise.',
      'Overweight': 'Consider adopting a healthier diet and increasing physical activity.',
      'Obese': 'Consult with a healthcare provider about weight management strategies.'
    };
    return recommendations[category as keyof typeof recommendations] || '';
  }

  private static getConvertersFactors(category: string): Record<string, number> {
    const factors: Record<string, Record<string, number>> = {
      length: {
        // Base unit: meter
        mm: 0.001,
        cm: 0.01,
        m: 1,
        km: 1000,
        in: 0.0254,
        ft: 0.3048,
        yd: 0.9144,
        mi: 1609.344
      },
      weight: {
        // Base unit: gram
        mg: 0.001,
        g: 1,
        kg: 1000,
        oz: 28.3495,
        lb: 453.592,
        ton: 1000000
      },
      temperature: {
        // Special handling needed for temperature
        c: 1,
        f: 1,
        k: 1
      }
    };

    return factors[category] || {};
  }

  // Temperature Converters (special case)
  static convertTemperature(value: number, fromUnit: string, toUnit: string): ConvertersResult<number> {
    try {
      let result: number;

      // Convert to Celsius first
      let celsius: number;
      switch (fromUnit.toLowerCase()) {
        case 'c':
        case 'celsius':
          celsius = value;
          break;
        case 'f':
        case 'fahrenheit':
          celsius = (value - 32) * 5/9;
          break;
        case 'k':
        case 'kelvin':
          celsius = value - 273.15;
          break;
        default:
          return { success: false, error: 'Invalid temperature unit' };
      }

      // Convert from Celsius to target unit
      switch (toUnit.toLowerCase()) {
        case 'c':
        case 'celsius':
          result = celsius;
          break;
        case 'f':
        case 'fahrenheit':
          result = (celsius * 9/5) + 32;
          break;
        case 'k':
        case 'kelvin':
          result = celsius + 273.15;
          break;
        default:
          return { success: false, error: 'Invalid temperature unit' };
      }

      return {
        success: true,
        result: parseFloat(result.toFixed(2)),
        metadata: {
          timestamp: new Date(),
          source: 'Converters-engine'
        }
      };
    } catch (error) {
      return {
        success: false,
        error: 'Failed to convert temperature'
      };
    }
  }
}