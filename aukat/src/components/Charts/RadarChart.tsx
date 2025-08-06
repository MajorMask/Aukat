'use client';

import { Radar, RadarChart as RechartsRadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';

interface RadarChartProps {
  data: {
    income: number;
    happiness: number;
    health: number;
    education: number;
    freedom: number;
  };
}

export function RadarChart({ data }: RadarChartProps) {
  // Transform the data for Recharts RadarChart
  const chartData = [
    {
      category: 'Income',
      value: data.income,
      fullMark: 100,
    },
    {
      category: 'Happiness',
      value: data.happiness,
      fullMark: 100,
    },
    {
      category: 'Health',
      value: data.health,
      fullMark: 100,
    },
    {
      category: 'Education',
      value: data.education,
      fullMark: 100,
    },
    {
      category: 'Freedom',
      value: data.freedom,
      fullMark: 100,
    },
  ];

  return (
    <div className="w-full h-80">
      <ResponsiveContainer width="100%" height="100%">
        <RechartsRadarChart data={chartData} margin={{ top: 20, right: 80, bottom: 20, left: 80 }}>
          <PolarGrid />
          <PolarAngleAxis 
            dataKey="category"
            tick={{ fontSize: 12, fill: 'hsl(var(--foreground))' }}
          />
          <PolarRadiusAxis 
            angle={90} 
            domain={[0, 100]}
            tick={{ fontSize: 10, fill: 'hsl(var(--muted-foreground))' }}
          />
          <Radar
            name="Your Aukat"
            dataKey="value"
            stroke="hsl(var(--chart-1))"
            fill="hsl(var(--chart-1))"
            fillOpacity={0.3}
            strokeWidth={2}
          />
        </RechartsRadarChart>
      </ResponsiveContainer>
    </div>
  );
}
