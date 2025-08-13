import { FluidCalculations } from '../fluid-calculations';

describe('FluidCalculations', () => {
  describe('Fluid Weight Calculations', () => {
    test('calculates gasoline weight correctly', () => {
      const result = FluidCalculations.calculateFluidWeight(10, 'gasoline');
      
      expect(result.weight).toBeCloseTo(60.73, 2);
      expect(result.volume).toBe(10);
      expect(result.fluidType).toBe('gasoline');
      expect(result.density).toBe(6.073);
    });

    test('calculates motor oil weight correctly', () => {
      const result = FluidCalculations.calculateFluidWeight(5, 'motorOil');
      
      expect(result.weight).toBeCloseTo(36.75, 2);
      expect(result.volume).toBe(5);
      expect(result.fluidType).toBe('motorOil');
      expect(result.density).toBe(7.35);
    });

    test('calculates transmission fluid weight correctly', () => {
      const result = FluidCalculations.calculateFluidWeight(3, 'transmissionFluid');
      
      expect(result.weight).toBeCloseTo(22.2, 2);
      expect(result.volume).toBe(3);
      expect(result.fluidType).toBe('transmissionFluid');
      expect(result.density).toBe(7.4);
    });

    test('calculates water weight correctly', () => {
      const result = FluidCalculations.calculateFluidWeight(2, 'water');
      
      expect(result.weight).toBeCloseTo(16.68, 2);
      expect(result.volume).toBe(2);
      expect(result.fluidType).toBe('water');
      expect(result.density).toBe(8.34);
    });
  });

  describe('Fluid Volume Calculations', () => {
    test('calculates gasoline volume from weight correctly', () => {
      const result = FluidCalculations.calculateFluidVolume(60.73, 'gasoline');
      
      expect(result.volume).toBeCloseTo(10, 2);
      expect(result.weight).toBe(60.73);
      expect(result.fluidType).toBe('gasoline');
      expect(result.density).toBe(6.073);
    });

    test('calculates motor oil volume from weight correctly', () => {
      const result = FluidCalculations.calculateFluidVolume(36.75, 'motorOil');
      
      expect(result.volume).toBeCloseTo(5, 2);
      expect(result.weight).toBe(36.75);
      expect(result.fluidType).toBe('motorOil');
      expect(result.density).toBe(7.35);
    });

    test('weight to volume and back is consistent', () => {
      const originalVolume = 15;
      const weightResult = FluidCalculations.calculateFluidWeight(originalVolume, 'gasoline');
      const volumeResult = FluidCalculations.calculateFluidVolume(weightResult.weight, 'gasoline');
      
      expect(volumeResult.volume).toBeCloseTo(originalVolume, 2);
    });
  });

  describe('Fluid Properties', () => {
    test('gets fluid density correctly', () => {
      expect(FluidCalculations.getFluidDensity('gasoline')).toBe(6.073);
      expect(FluidCalculations.getFluidDensity('motorOil')).toBe(7.35);
      expect(FluidCalculations.getFluidDensity('transmissionFluid')).toBe(7.4);
      expect(FluidCalculations.getFluidDensity('water')).toBe(8.34);
    });

    test('gets supported fluid types correctly', () => {
      const types = FluidCalculations.getSupportedFluidTypes();
      
      expect(types).toContain('gasoline');
      expect(types).toContain('motorOil');
      expect(types).toContain('transmissionFluid');
      expect(types).toContain('water');
      expect(types.length).toBe(4);
    });

    test('gets fluid display names correctly', () => {
      expect(FluidCalculations.getFluidDisplayName('gasoline')).toBe('Gasoline');
      expect(FluidCalculations.getFluidDisplayName('motorOil')).toBe('Motor Oil');
      expect(FluidCalculations.getFluidDisplayName('transmissionFluid')).toBe('Transmission Fluid');
      expect(FluidCalculations.getFluidDisplayName('water')).toBe('Water/Coolant');
    });

    test('gets fluid properties correctly', () => {
      const gasolineProps = FluidCalculations.getFluidProperties('gasoline');
      
      expect(gasolineProps.density).toBe(6.073);
      expect(gasolineProps.description).toContain('gasoline');
      expect(gasolineProps.characteristics.length).toBeGreaterThan(0);
      expect(gasolineProps.safetyNotes.length).toBeGreaterThan(0);
    });
  });

  describe('Volume Unit Conversions', () => {
    test('converts gallons to liters correctly', () => {
      expect(FluidCalculations.gallonsToLiters(10)).toBeCloseTo(37.8541, 3);
      expect(FluidCalculations.gallonsToLiters(5)).toBeCloseTo(18.9271, 3);
    });

    test('converts liters to gallons correctly', () => {
      expect(FluidCalculations.litersToGallons(37.8541)).toBeCloseTo(10, 3);
      expect(FluidCalculations.litersToGallons(18.9271)).toBeCloseTo(5, 3);
    });

    test('converts gallons to quarts correctly', () => {
      expect(FluidCalculations.gallonsToQuarts(5)).toBe(20);
      expect(FluidCalculations.gallonsToQuarts(2.5)).toBe(10);
    });

    test('converts quarts to gallons correctly', () => {
      expect(FluidCalculations.quartsToGallons(20)).toBe(5);
      expect(FluidCalculations.quartsToGallons(10)).toBe(2.5);
    });

    test('converts quarts to liters correctly', () => {
      expect(FluidCalculations.quartsToLiters(4)).toBeCloseTo(3.785, 2);
    });

    test('converts liters to quarts correctly', () => {
      expect(FluidCalculations.litersToQuarts(3.785)).toBeCloseTo(4, 2);
    });

    test('converts fluid ounces to mL correctly', () => {
      expect(FluidCalculations.fluidOuncesToML(8)).toBeCloseTo(236.59, 2);
    });

    test('converts mL to fluid ounces correctly', () => {
      expect(FluidCalculations.mlToFluidOunces(236.59)).toBeCloseTo(8, 2);
    });

    test('converts pints to mL correctly', () => {
      expect(FluidCalculations.pintsToML(2)).toBeCloseTo(946.35, 2);
    });

    test('converts mL to pints correctly', () => {
      expect(FluidCalculations.mlToPints(946.35)).toBeCloseTo(2, 2);
    });
  });

  describe('Validation Functions', () => {
    test('validates volume correctly', () => {
      expect(FluidCalculations.validateVolume(5, 'gallons').isValid).toBe(true);
      expect(FluidCalculations.validateVolume(0.05, 'gallons').isValid).toBe(false);
      expect(FluidCalculations.validateVolume(150, 'gallons').isValid).toBe(false);
      
      expect(FluidCalculations.validateVolume(20, 'liters').isValid).toBe(true);
      expect(FluidCalculations.validateVolume(0.2, 'liters').isValid).toBe(false);
      expect(FluidCalculations.validateVolume(500, 'liters').isValid).toBe(false);
    });

    test('validates weight correctly', () => {
      expect(FluidCalculations.validateWeight(50).isValid).toBe(true);
      expect(FluidCalculations.validateWeight(0.3).isValid).toBe(false);
      expect(FluidCalculations.validateWeight(1500).isValid).toBe(false);
    });
  });

  describe('Density Comparisons', () => {
    test('water is heaviest common automotive fluid', () => {
      const waterDensity = FluidCalculations.getFluidDensity('water');
      const gasolineDensity = FluidCalculations.getFluidDensity('gasoline');
      const oilDensity = FluidCalculations.getFluidDensity('motorOil');
      const atfDensity = FluidCalculations.getFluidDensity('transmissionFluid');
      
      expect(waterDensity).toBeGreaterThan(gasolineDensity);
      expect(waterDensity).toBeGreaterThan(oilDensity);
      expect(waterDensity).toBeGreaterThan(atfDensity);
    });

    test('gasoline is lightest common automotive fluid', () => {
      const waterDensity = FluidCalculations.getFluidDensity('water');
      const gasolineDensity = FluidCalculations.getFluidDensity('gasoline');
      const oilDensity = FluidCalculations.getFluidDensity('motorOil');
      const atfDensity = FluidCalculations.getFluidDensity('transmissionFluid');
      
      expect(gasolineDensity).toBeLessThan(waterDensity);
      expect(gasolineDensity).toBeLessThan(oilDensity);
      expect(gasolineDensity).toBeLessThan(atfDensity);
    });
  });
});