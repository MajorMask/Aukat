import { UserInput, AukatResults, CountryData } from '@/types';

export class AukatCalculator {
  private countryData: CountryData[];
  private globalIncomePercentiles: number[];

  constructor(countryData: CountryData[]) {
    this.countryData = countryData;
    this.globalIncomePercentiles = this.generateIncomePercentiles();
  }

  calculateAukat(input: UserInput): AukatResults {
    const countryInfo = this.getCountryData(input.country);
    
    return {
      globalRankings: {
        income: this.calculateIncomePercentile(input.annualIncomeUsd, 'global'),
        happiness: this.calculateHappinessPercentile(input, countryInfo),
        health: this.calculateHealthPercentile(input, countryInfo),
        education: this.calculateEducationPercentile(input.educationLevel),
        freedom: this.calculateFreedomPercentile(countryInfo),
      },
      countryRankings: {
        income: this.calculateIncomePercentile(input.annualIncomeUsd, input.country),
        happiness: this.calculateHappinessPercentile(input, countryInfo, true),
        health: this.calculateHealthPercentile(input, countryInfo, true),
        education: this.calculateEducationPercentile(input.educationLevel, input.country),
        freedom: this.calculateFreedomPercentile(countryInfo, true),
      },
      compositeScore: 0, // Will calculate based on weighted average
      improvementSuggestions: this.generateSuggestions(input, countryInfo),
    };
  }

  private calculateIncomePercentile(income: number, scope: string): number {
    // Simplified calculation - in production, use real percentile data
    if (scope === 'global') {
      if (income < 1000) return 10;
      if (income < 5000) return 25;
      if (income < 15000) return 50;
      if (income < 50000) return 75;
      return 90;
    }
    // Country-specific calculation would go here
    return 50; // Placeholder
  }

  private calculateHappinessPercentile(input: UserInput, country: CountryData, isCountryScope = false): number {
    // Base happiness on country score + personal factors
    const baseScore = country.happinessScore || 5.0;
    const ageAdjustment = input.age < 30 ? 0.5 : input.age > 60 ? -0.3 : 0;
    
    const personalScore = baseScore + ageAdjustment;
    return Math.min(100, Math.max(0, (personalScore / 10) * 100));
  }

  private calculateHealthPercentile(input: UserInput, country: CountryData, isCountryScope = false): number {
    const baseHealth = country.lifeExpectancy || 70;
    const ageScore = Math.max(0, 100 - (input.age * 1.2));
    
    return (ageScore + (baseHealth - 60) * 2) / 2;
  }

  private calculateEducationPercentile(level: string, country?: string): number {
    const educationScores = {
      'primary': 20,
      'secondary': 40,
      'bachelor': 70,
      'master': 85,
      'doctorate': 95
    };
    
    return educationScores[level as keyof typeof educationScores] || 50;
  }

  private calculateFreedomPercentile(country: CountryData, isCountryScope = false): number {
    return (country.freedomScore || 5) * 10;
  }

  private generateSuggestions(input: UserInput, country: CountryData): string[] {
    const suggestions: string[] = [];
    
    if (input.annualIncomeUsd < 15000) {
      suggestions.push("Consider skill development or career advancement to increase income");
    }
    
    if (country.happinessScore && country.happinessScore < 6) {
      suggestions.push("Focus on mental health, social connections, and work-life balance");
    }
    
    return suggestions;
  }

  private getCountryData(countryName: string): CountryData {
    return this.countryData.find(c => c.name === countryName) || {
      name: countryName,
      isoCode: 'XX',
      gdpPerCapita: 10000,
      happinessScore: 5.0,
      lifeExpectancy: 70,
      educationIndex: 0.5,
      freedomScore: 5.0,
    };
  }

  private generateIncomePercentiles(): number[] {
    // Simplified global income distribution
    return Array.from({ length: 101 }, (_, i) => Math.pow(i / 100, 2) * 100000);
  }
}
