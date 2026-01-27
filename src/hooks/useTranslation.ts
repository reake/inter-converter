'use client';

import { useState, useEffect } from 'react';

export interface TranslationStrings {
  // Common UI elements
  converter: string;
  commonValues: string;
  formula: string;
  guide: string;
  copy: string;
  result: string;
  calculate: string;
  clear: string;
  
  // Units and measurements
  fahrenheit: string;
  celsius: string;
  pounds: string;
  kilograms: string;
  feet: string;
  meters: string;
  inches: string;
  centimeters: string;
  
  // Colors
  red: string;
  green: string;
  blue: string;
  hue: string;
  saturation: string;
  lightness: string;
  colorPreview: string;
  colorHistory: string;
  
  // Tools page
  allToolsTitle: string;
  allToolsDescription: string;
  browseByCategory: string;
  browseCategoryDescription: string;
  allTools: string;
  advancedFilters: string;
  quickSort: string;
  popularity: string;
  name: string;
  category: string;
  showing: string;
  of: string;
  tools: string;
  filteredResults: string;
  categoryLabel: string;
  viewAll: string;
  filteredTools: string;
  toolsFound: string;
  tool: string;
  noToolsFound: string;
  noToolsDescription: string;
  
  // Unit converter interfaces
  poundsToKg: {
    title: string;
    description: string;
    enterPounds: string;
    enterKilograms: string;
    conversionNote: string;
  };
  celsiusToFahrenheit: {
    title: string;
    description: string;
    enterCelsius: string;
    enterFahrenheit: string;
    conversionNote: string;
  };
  feetToMeters: {
    title: string;
    description: string;
    enterFeet: string;
    enterMeters: string;
    conversionNote: string;
  };
  inchesToCm: {
    title: string;
    description: string;
    enterInches: string;
    enterCentimeters: string;
    conversionNote: string;
  };
  
  // Color tool interfaces
  rgbToHex: {
    title: string;
    description: string;
    enterRed: string;
    enterGreen: string;
    enterBlue: string;
    enterHex: string;
    copyColor: string;
    colorPreview: string;
  };
  colorPicker: {
    title: string;
    description: string;
    hueLabel: string;
    saturationLabel: string;
    lightnessLabel: string;
    colorHistory: string;
    saveColor: string;
    clearHistory: string;
  };
  
  // Common phrases
  enterValue: string;
  conversionFormula: string;
  usageGuide: string;
  commonConversions: string;
  quickReference: string;
}

const translations: Record<string, TranslationStrings> = {
  en: {
    // Common UI elements
    converter: 'Converter',
    commonValues: 'Common Values',
    formula: 'Formula',
    guide: 'Guide',
    copy: 'Copy',
    result: 'Result',
    calculate: 'Calculate',
    clear: 'Clear',
    
    // Units and measurements
    fahrenheit: 'Fahrenheit',
    celsius: 'Celsius',
    pounds: 'Pounds',
    kilograms: 'Kilograms',
    feet: 'Feet',
    meters: 'Meters',
    inches: 'Inches',
    centimeters: 'Centimeters',
    
    // Colors
    red: 'Red',
    green: 'Green',
    blue: 'Blue',
    hue: 'Hue',
    saturation: 'Saturation',
    lightness: 'Lightness',
    colorPreview: 'Color Preview',
    colorHistory: 'Color History',
    
    // Tools page
    allToolsTitle: 'All Free Online Converters & Calculators',
    allToolsDescription: 'Professional-grade conversion tools and calculators for developers, engineers, students, and professionals. Browse by category, search by name, or filter by features.',
    browseByCategory: 'Browse Tools by Category',
    browseCategoryDescription: 'Discover specialized calculators and converters organized by category to find exactly what you need',
    allTools: 'All Tools',
    advancedFilters: 'Advanced Filters',
    quickSort: 'Quick sort:',
    popularity: 'Popularity',
    name: 'Name',
    category: 'Category',
    showing: 'Showing',
    of: 'of',
    tools: 'tools',
    filteredResults: 'Filtered results',
    categoryLabel: 'Category:',
    viewAll: 'View all',
    filteredTools: 'Filtered Tools',
    toolsFound: 'tools found',
    tool: 'tool',
    noToolsFound: 'No tools found',
    noToolsDescription: 'Try adjusting your filters or search criteria.',
    
    // Common phrases
    enterValue: 'Enter value',
    conversionFormula: 'Conversion Formula',
    usageGuide: 'Usage Guide',
    commonConversions: 'Common Conversions',
    quickReference: 'Quick Reference',
    
    // Unit converter translations
    poundsToKg: {
      title: 'Pounds to Kilograms Converter',
      description: 'Convert pounds to kilograms instantly with accurate conversion formula',
      enterPounds: 'Enter pounds',
      enterKilograms: 'Enter kilograms',
      conversionNote: '1 pound = 0.453592 kilograms'
    },
    celsiusToFahrenheit: {
      title: 'Celsius to Fahrenheit Converter',
      description: 'Convert Celsius to Fahrenheit instantly with accurate temperature formula',
      enterCelsius: 'Enter Celsius',
      enterFahrenheit: 'Enter Fahrenheit',
      conversionNote: '°F = (°C × 9/5) + 32'
    },
    feetToMeters: {
      title: 'Feet to Meters Converter',
      description: 'Convert feet to meters instantly with accurate length conversion',
      enterFeet: 'Enter feet',
      enterMeters: 'Enter meters',
      conversionNote: '1 foot = 0.3048 meters'
    },
    inchesToCm: {
      title: 'Inches to Centimeters Converter',
      description: 'Convert inches to centimeters instantly with accurate length formula',
      enterInches: 'Enter inches',
      enterCentimeters: 'Enter centimeters',
      conversionNote: '1 inch = 2.54 centimeters'
    },
    
    // Color tool translations
    rgbToHex: {
      title: 'RGB to HEX Color Converter',
      description: 'Convert RGB color values to HEX color codes instantly',
      enterRed: 'Enter red value (0-255)',
      enterGreen: 'Enter green value (0-255)',
      enterBlue: 'Enter blue value (0-255)',
      enterHex: 'Enter HEX color code',
      copyColor: 'Copy color code',
      colorPreview: 'Color preview'
    },
    colorPicker: {
      title: 'Online Color Picker Tool',
      description: 'Professional color picker with HSL controls and color history',
      hueLabel: 'Hue',
      saturationLabel: 'Saturation',
      lightnessLabel: 'Lightness',
      colorHistory: 'Color History',
      saveColor: 'Save Color',
      clearHistory: 'Clear History'
    }
  },
  zh: {
    // Common UI elements
    converter: '转换器',
    commonValues: '常用数值',
    formula: '转换公式',
    guide: '使用指南',
    copy: '复制',
    result: '结果',
    calculate: '计算',
    clear: '清除',
    
    // Units and measurements
    fahrenheit: '华氏度',
    celsius: '摄氏度',
    pounds: '磅',
    kilograms: '公斤',
    feet: '英尺',
    meters: '米',
    inches: '英寸',
    centimeters: '厘米',
    
    // Colors
    red: '红',
    green: '绿',
    blue: '蓝',
    hue: '色相',
    saturation: '饱和度',
    lightness: '亮度',
    colorPreview: '颜色预览',
    colorHistory: '颜色历史',
    
    // Tools page
    allToolsTitle: '所有免费在线转换器和计算器',
    allToolsDescription: '为开发者、工程师、学生和专业人士提供专业级转换工具和计算器。按类别浏览、按名称搜索或按功能筛选。',
    browseByCategory: '按类别浏览工具',
    browseCategoryDescription: '发现按类别组织的专业计算器和转换器，找到您需要的确切工具',
    allTools: '所有工具',
    advancedFilters: '高级筛选',
    quickSort: '快速排序：',
    popularity: '热门度',
    name: '名称',
    category: '类别',
    showing: '显示',
    of: '共',
    tools: '个工具',
    filteredResults: '筛选结果',
    categoryLabel: '类别：',
    viewAll: '查看全部',
    filteredTools: '筛选工具',
    toolsFound: '个工具',
    tool: '工具',
    noToolsFound: '未找到工具',
    noToolsDescription: '请尝试调整筛选条件或搜索标准。',
    
    // Common phrases
    enterValue: '输入数值',
    conversionFormula: '转换公式',
    usageGuide: '使用指南',
    commonConversions: '常用转换',
    quickReference: '快速参考',
    
    // Unit converter translations
    poundsToKg: {
      title: '磅转公斤转换器',
      description: '使用精确转换公式即时将磅转换为公斤',
      enterPounds: '输入磅数',
      enterKilograms: '输入公斤数',
      conversionNote: '1磅 = 0.453592公斤'
    },
    celsiusToFahrenheit: {
      title: '摄氏度转华氏度转换器',
      description: '使用精确温度公式即时将摄氏度转换为华氏度',
      enterCelsius: '输入摄氏度',
      enterFahrenheit: '输入华氏度',
      conversionNote: '°F = (°C × 9/5) + 32'
    },
    feetToMeters: {
      title: '英尺转米转换器',
      description: '使用精确长度转换公式即时将英尺转换为米',
      enterFeet: '输入英尺',
      enterMeters: '输入米数',
      conversionNote: '1英尺 = 0.3048米'
    },
    inchesToCm: {
      title: '英寸转厘米转换器',
      description: '使用精确长度公式即时将英寸转换为厘米',
      enterInches: '输入英寸',
      enterCentimeters: '输入厘米',
      conversionNote: '1英寸 = 2.54厘米'
    },
    
    // Color tool translations
    rgbToHex: {
      title: 'RGB转HEX颜色转换器',
      description: '即时将RGB颜色值转换为HEX颜色代码',
      enterRed: '输入红色值 (0-255)',
      enterGreen: '输入绿色值 (0-255)',
      enterBlue: '输入蓝色值 (0-255)',
      enterHex: '输入HEX颜色代码',
      copyColor: '复制颜色代码',
      colorPreview: '颜色预览'
    },
    colorPicker: {
      title: '在线颜色选择器工具',
      description: '专业颜色选择器，支持HSL控制和颜色历史',
      hueLabel: '色相',
      saturationLabel: '饱和度',
      lightnessLabel: '亮度',
      colorHistory: '颜色历史',
      saveColor: '保存颜色',
      clearHistory: '清除历史'
    }
  }
};

export function useTranslation(lang: string = 'en') {
  const resolveLang = (preferred?: string) => {
    if (preferred) return preferred;
    if (typeof document !== 'undefined') {
      const docLang = document.documentElement.lang;
      if (docLang) return docLang;
    }
    return 'en';
  };

  const [currentLang, setCurrentLang] = useState(resolveLang(lang));
  const [t, setT] = useState<TranslationStrings>(translations[resolveLang(lang)] || translations.en);

  useEffect(() => {
    const resolved = resolveLang(lang);
    setCurrentLang(resolved);
    setT(translations[resolved] || translations.en);
  }, [lang]);

  useEffect(() => {
    setT(translations[currentLang] || translations.en);
  }, [currentLang]);

  const changeLanguage = (newLang: string) => {
    setCurrentLang(newLang);
  };

  return { t, changeLanguage, currentLang };
}
