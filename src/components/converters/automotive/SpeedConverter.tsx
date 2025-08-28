'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export function SpeedConverter() {
  const [mph, setMph] = useState<string>('');
  const [kph, setKph] = useState<string>('');

  const convertMPHToKPH = (mphValue: string) => {
    setMph(mphValue);
    if (mphValue && !isNaN(Number(mphValue))) {
      const result = Number(mphValue) * 1.60934;
      setKph(result.toFixed(2));
    } else {
      setKph('');
    }
  };

  const convertKPHToMPH = (kphValue: string) => {
    setKph(kphValue);
    if (kphValue && !isNaN(Number(kphValue))) {
      const result = Number(kphValue) / 1.60934;
      setMph(result.toFixed(2));
    } else {
      setMph('');
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        {/* MPH to KPH */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              🏁 MPH to KPH
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="mph-input">Miles per Hour (MPH)</Label>
              <Input
                id="mph-input"
                type="number"
                value={mph}
                onChange={(e) => convertMPHToKPH(e.target.value)}
                placeholder="Enter MPH"
                className="text-lg"
              />
            </div>
            <div>
              <Label htmlFor="kph-output">Kilometers per Hour (KPH)</Label>
              <Input
                id="kph-output"
                type="text"
                value={kph}
                readOnly
                className="text-lg font-semibold bg-gray-50"
              />
            </div>
          </CardContent>
        </Card>

        {/* KPH to MPH */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              🏁 KPH to MPH
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="kph-input">Kilometers per Hour (KPH)</Label>
              <Input
                id="kph-input"
                type="number"
                value={kph}
                onChange={(e) => convertKPHToMPH(e.target.value)}
                placeholder="Enter KPH"
                className="text-lg"
              />
            </div>
            <div>
              <Label htmlFor="mph-output">Miles per Hour (MPH)</Label>
              <Input
                id="mph-output"
                type="text"
                value={mph}
                readOnly
                className="text-lg font-semibold bg-gray-50"
              />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Common Speed Limits */}
      <Card>
        <CardHeader>
          <CardTitle>Common Speed Limits</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="space-y-2">
              <h4 className="font-semibold text-sm text-gray-700">US Speed Limits</h4>
              <div className="text-sm space-y-1">
                <div className="flex justify-between">
                  <span>School Zone</span>
                  <span>15-25 MPH</span>
                </div>
                <div className="flex justify-between">
                  <span>Residential</span>
                  <span>25-35 MPH</span>
                </div>
                <div className="flex justify-between">
                  <span>City Streets</span>
                  <span>35-45 MPH</span>
                </div>
                <div className="flex justify-between">
                  <span>Highway</span>
                  <span>55-65 MPH</span>
                </div>
                <div className="flex justify-between">
                  <span>Interstate</span>
                  <span>65-80 MPH</span>
                </div>
              </div>
            </div>
            
            <div className="space-y-2">
              <h4 className="font-semibold text-sm text-gray-700">International Limits</h4>
              <div className="text-sm space-y-1">
                <div className="flex justify-between">
                  <span>Germany Autobahn</span>
                  <span>No limit*</span>
                </div>
                <div className="flex justify-between">
                  <span>UK Motorway</span>
                  <span>70 MPH (113 KPH)</span>
                </div>
                <div className="flex justify-between">
                  <span>Canada Highway</span>
                  <span>100 KPH (62 MPH)</span>
                </div>
                <div className="flex justify-between">
                  <span>Australia Highway</span>
                  <span>110 KPH (68 MPH)</span>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="font-semibold text-sm text-gray-700">Racing Speeds</h4>
              <div className="text-sm space-y-1">
                <div className="flex justify-between">
                  <span>NASCAR</span>
                  <span>200+ MPH</span>
                </div>
                <div className="flex justify-between">
                  <span>Formula 1</span>
                  <span>230+ MPH</span>
                </div>
                <div className="flex justify-between">
                  <span>IndyCar</span>
                  <span>240+ MPH</span>
                </div>
                <div className="flex justify-between">
                  <span>Top Fuel Dragster</span>
                  <span>330+ MPH</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Reference Table */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Reference Table</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <h4 className="font-semibold text-gray-700">Common Converterss</h4>
              <div className="text-sm space-y-1">
                <div className="flex justify-between font-mono">
                  <span>10 MPH</span>
                  <span>16.1 KPH</span>
                </div>
                <div className="flex justify-between font-mono">
                  <span>25 MPH</span>
                  <span>40.2 KPH</span>
                </div>
                <div className="flex justify-between font-mono">
                  <span>35 MPH</span>
                  <span>56.3 KPH</span>
                </div>
                <div className="flex justify-between font-mono">
                  <span>45 MPH</span>
                  <span>72.4 KPH</span>
                </div>
                <div className="flex justify-between font-mono">
                  <span>55 MPH</span>
                  <span>88.5 KPH</span>
                </div>
                <div className="flex justify-between font-mono">
                  <span>65 MPH</span>
                  <span>104.6 KPH</span>
                </div>
                <div className="flex justify-between font-mono">
                  <span>75 MPH</span>
                  <span>120.7 KPH</span>
                </div>
                <div className="flex justify-between font-mono">
                  <span>85 MPH</span>
                  <span>136.8 KPH</span>
                </div>
              </div>
            </div>
            
            <div className="space-y-2">
              <h4 className="font-semibold text-gray-700">Metric Converterss</h4>
              <div className="text-sm space-y-1">
                <div className="flex justify-between font-mono">
                  <span>50 KPH</span>
                  <span>31.1 MPH</span>
                </div>
                <div className="flex justify-between font-mono">
                  <span>60 KPH</span>
                  <span>37.3 MPH</span>
                </div>
                <div className="flex justify-between font-mono">
                  <span>80 KPH</span>
                  <span>49.7 MPH</span>
                </div>
                <div className="flex justify-between font-mono">
                  <span>100 KPH</span>
                  <span>62.1 MPH</span>
                </div>
                <div className="flex justify-between font-mono">
                  <span>120 KPH</span>
                  <span>74.6 MPH</span>
                </div>
                <div className="flex justify-between font-mono">
                  <span>140 KPH</span>
                  <span>87.0 MPH</span>
                </div>
                <div className="flex justify-between font-mono">
                  <span>160 KPH</span>
                  <span>99.4 MPH</span>
                </div>
                <div className="flex justify-between font-mono">
                  <span>200 KPH</span>
                  <span>124.3 MPH</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Formula Information */}
      <Card>
        <CardHeader>
          <CardTitle>Converters Formulas</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold mb-2">MPH to KPH:</h4>
              <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded">
                KPH = MPH × 1.60934
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">KPH to MPH:</h4>
              <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded">
                MPH = KPH ÷ 1.60934
              </p>
            </div>
            <div className="text-sm text-gray-600">
              <p>
                <strong>Note:</strong> The Converters factor 1.60934 comes from the fact that 
                1 mile = 1.60934 kilometers. This is an exact Converters based on the international 
                definition of the mile and kilometer.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
