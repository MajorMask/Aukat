export interface UserInput {
  country: string;
  age: number;
  annualIncomeUsd: number;
  educationLevel: 'primary' | 'secondary' | 'bachelor' | 'master' | 'doctorate';
  lifestyle?: {
    dietType?: 'omnivore' | 'vegetarian' | 'vegan';
    exerciseHours?: number;
    screenTimeHours?: number;
  };
}

export interface AukatResults {
  globalRankings: {
    income: number;
    happiness: number;
    health: number;
    education: number;
    freedom: number;
  };
  countryRankings: {
    income: number;
    happiness: number;
    health: number;
    education: number;
    freedom: number;
  };
  compositeScore: number;
  improvementSuggestions: string[];
}

export interface CountryData {
  name: string;
  isoCode: string;
  gdpPerCapita: number;
  happinessScore: number;
  lifeExpectancy: number;
  educationIndex: number;
  freedomScore: number;
}
