'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

// Create a more robust dynamic import with error handling
const ApexChart = dynamic(() => import('react-apexcharts'), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center h-[350px]">
      <div className="text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500 mx-auto mb-2"></div>
        <p className="text-sm text-default-500">Loading chart...</p>
      </div>
    </div>
  ),
});

interface ChartWrapperProps {
  type: 'bar' | 'line' | 'area' | 'pie';
  options: any;
  series: any;
  height?: number;
  width?: string;
}

export const ChartWrapper = ({ 
  type, 
  options, 
  series, 
  height = 350, 
  width = '100%' 
}: ChartWrapperProps) => {
  const [isClient, setIsClient] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleError = () => {
    console.error('Chart loading failed, retrying...');
    setHasError(true);
    
    // Retry after a short delay
    setTimeout(() => {
      setRetryCount(prev => prev + 1);
      setHasError(false);
    }, 1000);
  };

  // Fallback component for when chart completely fails
  const FallbackComponent = () => (
    <div className="h-[350px] flex flex-col items-center justify-center space-y-4 p-4">
      <div className="text-center">
        <div className="w-16 h-16 bg-danger-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-danger-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-default-700 mb-2">Chart Loading Failed</h3>
        <p className="text-sm text-default-500 mb-4">
          Unable to load the interactive chart. This might be due to network issues.
        </p>
        <button
          onClick={() => {
            setHasError(false);
            setRetryCount(prev => prev + 1);
          }}
          className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
        >
          Retry Loading Chart
        </button>
      </div>
    </div>
  );

  if (!isClient) {
    return (
      <div className="flex items-center justify-center h-[350px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500 mx-auto mb-2"></div>
          <p className="text-sm text-default-500">Initializing chart...</p>
        </div>
      </div>
    );
  }

  if (hasError && retryCount > 2) {
    return <FallbackComponent />;
  }

  return (
    <div className="w-full" key={retryCount}>
      <ApexChart
        type={type}
        options={options}
        series={series}
        height={height}
        width={width}
        onError={handleError}
      />
    </div>
  );
};
