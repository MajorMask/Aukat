import { NextRequest, NextResponse } from 'next/server';
import { AukatCalculator } from '@/lib/calculations';
import { UserInput } from '@/types';

// Mock country data - replace with database queries in production
const mockCountryData = [
  {
    name: 'India',
    isoCode: 'IN',
    gdpPerCapita: 2100,
    happinessScore: 3.8,
    lifeExpectancy: 69.4,
    educationIndex: 0.554,
    freedomScore: 5.5,
  },
  {
    name: 'United States',
    isoCode: 'US',
    gdpPerCapita: 63593,
    happinessScore: 6.9,
    lifeExpectancy: 78.9,
    educationIndex: 0.890,
    freedomScore: 8.5,
  },
  // Add more countries...
];

export async function POST(request: NextRequest) {
  try {
    const input: UserInput = await request.json();
    
    // Validate input
    if (!input.country || !input.age || input.annualIncomeUsd === undefined) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const calculator = new AukatCalculator(mockCountryData);
    const results = calculator.calculateAukat(input);

    // Optionally save to database
    // await saveCalculation(input, results);

    return NextResponse.json(results);
  } catch (error) {
    console.error('Calculation error:', error);
    return NextResponse.json(
      { error: 'Calculation failed' },
      { status: 500 }
    );
  }
}
