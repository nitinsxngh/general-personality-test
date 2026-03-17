'use client';

import { useState, useEffect } from 'react';
import { SimpleChart } from './simple-chart';

interface BarChartProps {
  max: number;
  results: any;
}

export const BarChart = ({ max, results }: BarChartProps) => {
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
    return <SimpleChart max={max} results={results} title="Personality Results" />;
  }

  // If ApexCharts loaded successfully, use it
  const ApexChart = ChartComponent;
  
  const options = {
    theme: {
      mode: 'light'
    },
    legend: {
      show: false
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
      categories: results.map((result: any) => result.title),
      labels: {
        style: {
          fontFamily: 'Inter, sans-serif'
        }
      }
    },
    plotOptions: {
      bar: {
        distributed: true
      }
    },
    fill: {
      colors: ['#a47c38', '#8a6a2f', '#6d5225', '#f31260', '#f5a524', '#17c964']
    }
  };

  const series = [
    {
      name: 'You',
      data: results.map((result: any) => result.score)
    }
  ];

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
