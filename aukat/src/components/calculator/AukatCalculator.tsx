'use client';

import { useState } from 'react';
import { UserInput, AukatResults } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadarChart } from '@/components/Charts/RadarChart';

export default function AukatCalculator() {
  const [input, setInput] = useState<UserInput>({
    country: '',
    age: 25,
    annualIncomeUsd: 0,
    educationLevel: 'bachelor',
  });
  
  const [results, setResults] = useState<AukatResults | null>(null);
  const [loading, setLoading] = useState(false);

  const handleCalculate = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/calculate-aukat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(input),
      });
      
      const data = await response.json();
      setResults(data);
    } catch (error) {
      console.error('Calculation failed:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            Know Your Aukat
          </CardTitle>
          <p className="text-center text-gray-600">
            Discover where you stand globally and how to level up
          </p>
        </CardHeader>
        
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Country</label>
              <Select value={input.country} onValueChange={(value) => setInput({...input, country: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Select your country" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="India">India</SelectItem>
                  <SelectItem value="United States">United States</SelectItem>
                  <SelectItem value="Germany">Germany</SelectItem>
                  <SelectItem value="Japan">Japan</SelectItem>
                  <SelectItem value="Brazil">Brazil</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Age</label>
              <Input
                type="number"
                value={input.age}
                onChange={(e) => setInput({...input, age: parseInt(e.target.value)})}
                min="18"
                max="100"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Annual Income (USD)</label>
              <Input
                type="number"
                value={input.annualIncomeUsd}
                onChange={(e) => setInput({...input, annualIncomeUsd: parseInt(e.target.value)})}
                min="0"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Education Level</label>
              <Select 
                value={input.educationLevel} 
                onValueChange={(value: any) => setInput({...input, educationLevel: value})}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="primary">Primary School</SelectItem>
                  <SelectItem value="secondary">High School</SelectItem>
                  <SelectItem value="bachelor">Bachelor's Degree</SelectItem>
                  <SelectItem value="master">Master's Degree</SelectItem>
                  <SelectItem value="doctorate">Doctorate</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <Button 
            onClick={handleCalculate} 
            disabled={loading || !input.country}
            className="w-full"
          >
            {loading ? 'Calculating...' : 'Calculate My Aukat'}
          </Button>
        </CardContent>
      </Card>

      {results && (
        <Card>
          <CardHeader>
            <CardTitle>Your Global Position</CardTitle>
          </CardHeader>
          <CardContent>
            <RadarChart data={results.globalRankings} />
            <div className="mt-6 space-y-2">
              <h3 className="font-semibold">Improvement Suggestions:</h3>
              <ul className="list-disc list-inside space-y-1">
                {results.improvementSuggestions.map((suggestion, index) => (
                  <li key={index} className="text-gray-700">{suggestion}</li>
                ))}
              </ul>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
