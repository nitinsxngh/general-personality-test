'use client';

import { useState, useEffect } from 'react';

interface SimpleChartProps {
  max: number;
  results: any[];
  title?: string;
}

export const SimpleChart = ({ max, results, title = "Personality Results" }: SimpleChartProps) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return (
      <div className="flex items-center justify-center h-[350px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500 mx-auto mb-2"></div>
          <p className="text-sm text-default-500">Loading results...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-[350px] flex flex-col items-center justify-center space-y-4 p-4">
      <div className="text-center mb-6">
        <h3 className="text-xl font-semibold text-default-700 mb-2">{title}</h3>
        <p className="text-sm text-default-500">Your personality assessment results</p>
      </div>
      
      <div className="w-full max-w-2xl space-y-4">
        {results.map((result: any, index: number) => {
          const percentage = (result.score / max) * 100;
          const colorClass = percentage >= 80 ? 'bg-green-500' : 
                           percentage >= 60 ? 'bg-primary-500' : 
                           percentage >= 40 ? 'bg-yellow-500' : 'bg-red-500';
          
          return (
            <div key={index} className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="font-medium text-sm text-default-700">{result.title}</span>
                <span className="text-sm font-semibold text-primary-600">{result.score}/{max}</span>
              </div>
              
              <div className="w-full bg-default-200 rounded-full h-3">
                <div 
                  className={`h-3 rounded-full transition-all duration-500 ${colorClass}`}
                  style={{ width: `${percentage}%` }}
                ></div>
              </div>
              
              <div className="flex justify-between text-xs text-default-500">
                <span>Low</span>
                <span className="font-medium">{percentage.toFixed(1)}%</span>
                <span>High</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
