'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Truck, Calculator, DollarSign } from 'lucide-react';

export default function MovingCostCalculator() {
  const [distance, setDistance] = useState<string>('');
  const [homeSize, setHomeSize] = useState<string>('');
  const [movingType, setMovingType] = useState<string>('');
  const [packingService, setPackingService] = useState<boolean>(false);
  const [storageService, setStorageService] = useState<boolean>(false);
  const [insuranceService, setInsuranceService] = useState<boolean>(false);
  const [results, setResults] = useState<{
    baseCost: number;
    additionalServices: number;
    totalCost: number;
    breakdown: Array<{ service: string; cost: number }>;
  } | null>(null);

  const calculateMovingCost = () => {
    if (!distance || !homeSize || !movingType) return;

    const distanceValue = parseFloat(distance);
    
    // 基础费用计算
    const homeSizeMultipliers = {
      'studio': 1.0,
      '1bedroom': 1.3,
      '2bedroom': 1.6,
      '3bedroom': 2.0,
      '4bedroom': 2.5,
      '5bedroom': 3.0
    };

    const movingTypeRates = {
      'local': 100, // 每小时基础费用
      'longdistance': 1.5, // 每英里费用
      'international': 3.0 // 每英里费用
    };

    const sizeMultiplier = homeSizeMultipliers[homeSize as keyof typeof homeSizeMultipliers] || 1.0;
    
    let baseCost = 0;
    if (movingType === 'local') {
      // 本地搬家：按小时计费
      const estimatedHours = 4 + (sizeMultiplier - 1) * 2;
      baseCost = movingTypeRates.local * estimatedHours * sizeMultiplier;
    } else {
      // 长途搬家：按距离计费
      const ratePerMile = movingTypeRates[movingType as keyof typeof movingTypeRates] || 1.5;
      baseCost = distanceValue * ratePerMile * sizeMultiplier;
    }

    // 附加服务费用
    const breakdown: Array<{ service: string; cost: number }> = [
      { service: '基础搬运费用', cost: baseCost }
    ];

    let additionalServices = 0;

    if (packingService) {
      const packingCost = baseCost * 0.3; // 打包服务为基础费用的30%
      additionalServices += packingCost;
      breakdown.push({ service: '打包服务', cost: packingCost });
    }

    if (storageService) {
      const storageCost = 200 * sizeMultiplier; // 存储服务按房屋大小计费
      additionalServices += storageCost;
      breakdown.push({ service: '临时存储', cost: storageCost });
    }

    if (insuranceService) {
      const insuranceCost = baseCost * 0.05; // 保险为基础费用的5%
      additionalServices += insuranceCost;
      breakdown.push({ service: '搬运保险', cost: insuranceCost });
    }

    const totalCost = baseCost + additionalServices;

    setResults({
      baseCost: Math.round(baseCost),
      additionalServices: Math.round(additionalServices),
      totalCost: Math.round(totalCost),
      breakdown
    });
  };

  const getHomeSizeText = (size: string) => {
    const sizes = {
      'studio': '单间公寓',
      '1bedroom': '一室一厅',
      '2bedroom': '两室一厅',
      '3bedroom': '三室一厅',
      '4bedroom': '四室一厅',
      '5bedroom': '五室及以上'
    };
    return sizes[size as keyof typeof sizes] || size;
  };

  const getMovingTypeText = (type: string) => {
    const types = {
      'local': '本地搬家 (同城)',
      'longdistance': '长途搬家 (跨城)',
      'international': '国际搬家'
    };
    return types[type as keyof typeof types] || type;
  };

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Truck className="h-5 w-5 text-blue-500" />
            搬家费用计算器
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="distance">搬运距离 (公里)</Label>
              <Input
                id="distance"
                type="number"
                min="1"
                value={distance}
                onChange={(e) => setDistance(e.target.value)}
                placeholder="输入搬运距离"
              />
            </div>
            
            <div className="space-y-2">
              <Label>房屋大小</Label>
              <Select value={homeSize} onValueChange={setHomeSize}>
                <SelectTrigger>
                  <SelectValue placeholder="选择房屋大小" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="studio">单间公寓</SelectItem>
                  <SelectItem value="1bedroom">一室一厅</SelectItem>
                  <SelectItem value="2bedroom">两室一厅</SelectItem>
                  <SelectItem value="3bedroom">三室一厅</SelectItem>
                  <SelectItem value="4bedroom">四室一厅</SelectItem>
                  <SelectItem value="5bedroom">五室及以上</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label>搬家类型</Label>
            <Select value={movingType} onValueChange={setMovingType}>
              <SelectTrigger>
                <SelectValue placeholder="选择搬家类型" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="local">本地搬家 (同城)</SelectItem>
                <SelectItem value="longdistance">长途搬家 (跨城)</SelectItem>
                <SelectItem value="international">国际搬家</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-3">
            <Label>附加服务</Label>
            
            <div className="flex items-center space-x-2">
              <Checkbox
                id="packing"
                checked={packingService}
                onCheckedChange={setPackingService}
              />
              <Label htmlFor="packing" className="text-sm font-normal">
                打包服务 (+30% 基础费用)
              </Label>
            </div>
            
            <div className="flex items-center space-x-2">
              <Checkbox
                id="storage"
                checked={storageService}
                onCheckedChange={setStorageService}
              />
              <Label htmlFor="storage" className="text-sm font-normal">
                临时存储服务 (按房屋大小计费)
              </Label>
            </div>
            
            <div className="flex items-center space-x-2">
              <Checkbox
                id="insurance"
                checked={insuranceService}
                onCheckedChange={setInsuranceService}
              />
              <Label htmlFor="insurance" className="text-sm font-normal">
                搬运保险 (+5% 基础费用)
              </Label>
            </div>
          </div>
          
          <Button 
            onClick={calculateMovingCost} 
            className="w-full"
            disabled={!distance || !homeSize || !movingType}
          >
            <Calculator className="mr-2 h-4 w-4" />
            计算搬家费用
          </Button>
        </CardContent>
      </Card>

      {results && (
        <Card>
          <CardHeader>
            <CardTitle>费用估算</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-sm text-muted-foreground mb-1">基础费用</div>
                <div className="text-2xl font-bold text-blue-600">
                  ¥{results.baseCost.toLocaleString()}
                </div>
              </div>
              
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-sm text-muted-foreground mb-1">附加服务</div>
                <div className="text-2xl font-bold text-green-600">
                  ¥{results.additionalServices.toLocaleString()}
                </div>
              </div>
              
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <div className="text-sm text-muted-foreground mb-1">总费用</div>
                <div className="text-2xl font-bold text-purple-600">
                  ¥{results.totalCost.toLocaleString()}
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="font-medium flex items-center gap-2">
                <DollarSign className="h-4 w-4" />
                费用明细
              </h3>
              
              <div className="space-y-2">
                {results.breakdown.map((item, index) => (
                  <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="text-sm font-medium">{item.service}</span>
                    <span className="text-sm font-semibold">¥{Math.round(item.cost).toLocaleString()}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div className="p-3 bg-yellow-50 rounded-lg">
                <div className="text-sm font-medium text-yellow-800 mb-1">房屋大小</div>
                <div className="text-sm text-yellow-700">
                  {getHomeSizeText(homeSize)}
                </div>
              </div>
              
              <div className="p-3 bg-orange-50 rounded-lg">
                <div className="text-sm font-medium text-orange-800 mb-1">搬家类型</div>
                <div className="text-sm text-orange-700">
                  {getMovingTypeText(movingType)}
                </div>
              </div>
            </div>
            
            <div className="text-xs text-muted-foreground mt-4 p-3 bg-gray-50 rounded">
              <strong>注意：</strong>此费用为估算值，实际费用可能因具体情况而有所不同。
              建议联系多家搬家公司获取详细报价进行比较。
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
