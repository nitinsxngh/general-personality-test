'use client';

import { useState, useEffect } from 'react';

interface BarChartCompareProps {
  max: number;
  categories: string[];
  series: Scores[];
}

type Scores = {
  name: string;
  data: number[];
};

export const BarChartCompare = ({
  max,
  series,
  categories
}: BarChartCompareProps) => {
  const [ChartComponent, setChartComponent] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const loadChart = async () => {
      try {
        setIsLoading(true);
        setHasError(false);
        
        // Try to dynamically import ApexCharts
        const { default: ApexChart } = await import('react-apexcharts');
        setChartComponent(() => ApexChart);
      } catch (error) {
        console.warn('Failed to load ApexCharts, using fallback:', error);
        setHasError(true);
      } finally {
        setIsLoading(false);
      }
    };

    loadChart();
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[350px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500 mx-auto mb-2"></div>
          <p className="text-sm text-default-500">Loading chart...</p>
        </div>
      </div>
    );
  }

  if (hasError || !ChartComponent) {
    // Fallback UI for comparison charts
    return (
      <div className="h-[350px] flex flex-col items-center justify-center space-y-4 p-4">
        <div className="text-center mb-6">
          <h3 className="text-xl font-semibold text-default-700 mb-2">Comparison Results</h3>
          <p className="text-sm text-default-500">Chart loading failed, showing results as text</p>
        </div>
        <div className="w-full max-w-2xl space-y-4">
          {series.map((s, seriesIndex) => (
            <div key={seriesIndex} className="space-y-3">
              <h4 className="font-medium text-sm text-primary-600">{s.name}</h4>
              <div className="grid grid-cols-1 gap-2">
                {categories.map((category, index) => {
                  const percentage = (s.data[index] / max) * 100;
                  return (
                    <div key={index} className="flex justify-between items-center p-3 bg-default-100 rounded-lg">
                      <span className="text-sm font-medium">{category}</span>
                      <div className="flex items-center space-x-3">
                        <div className="w-24 bg-default-200 rounded-full h-2">
                          <div 
                            className="bg-primary-500 h-2 rounded-full" 
                            style={{ width: `${percentage}%` }}
                          ></div>
                        </div>
                        <span className="text-sm font-semibold text-primary-600 w-8 text-right">{s.data[index]}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // If ApexCharts loaded successfully, use it
  const ApexChart = ChartComponent;
  
  const options = {
    theme: {
      mode: 'light'
    },
    legend: {
      show: true
    },
    chart: {
      toolbar: {
        show: false
      },
      fontFamily: 'Inter, sans-serif',
      background: 'transparent'
    },
    yaxis: {
      max
    },
    xaxis: {
      categories,
      labels: {
        style: {
          fontFamily: 'Inter, sans-serif'
        }
      }
    },
    plotOptions: {
      bar: {
        distributed: false
      }
    }
  };

  return (
    <div className="w-full">
      <ApexChart
        type="bar"
        options={options}
        series={series}
        height={350}
        width="100%"
      />
    </div>
  );
};
