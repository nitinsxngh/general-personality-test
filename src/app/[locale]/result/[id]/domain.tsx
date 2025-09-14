'use client';

import { subtitle, heading } from '@/components/primitives';
import Link from 'next/link';
import { Facet, Domain } from '@bigfive-org/results';
import { BarChart } from '@/components/bar-chart';
import ReadMore from '@/components/read-more';

interface DomainProps {
  domain: Domain;
  scoreText: string;
  showExpanded?: boolean;
}

export const DomainPage = ({
  domain,
  scoreText,
  showExpanded
}: DomainProps) => {
  return (
    <div className='bg-white dark:bg-gray-900 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 lg:p-8'>
      {/* Domain Header */}
      <div className='mb-6'>
        <Link href={`#${domain.title}`}>
          <h2 className={heading()} id={domain.title}>
            {domain.title}
          </h2>
        </Link>
        <p className='text-default-600 dark:text-default-400 mt-2 text-lg leading-relaxed'>
          {domain.shortDescription}
        </p>
      </div>

      {/* Domain Description */}
      <div className='mb-6'>
        <ReadMore showExpanded={showExpanded}>
          <div 
            className='text-default-700 dark:text-default-300 leading-relaxed prose prose-gray dark:prose-invert max-w-none'
            dangerouslySetInnerHTML={{ __html: domain.description }} 
          />
        </ReadMore>
      </div>

      {/* Domain Text */}
      <div className='mb-8'>
        <p className='text-default-700 dark:text-default-300 leading-relaxed text-lg'>
          {domain.text}
        </p>
      </div>

      {/* Facets Chart */}
      <div className='mb-8'>
        <BarChart max={20} results={domain.facets} />
      </div>

      {/* Facets Details */}
      <div className='space-y-8'>
        {domain.facets.map((facet: Facet, index: number) => (
          <div key={index} className='border-l-4 border-primary-200 dark:border-primary-800 pl-6 py-4'>
            <Link href={`#${facet.title}`}>
              <h3 className={subtitle()} id={facet.title}>
                {facet.title}
              </h3>
            </Link>
            <div className='font-semibold text-primary-600 dark:text-primary-400 mt-2 mb-3'>
              {scoreText}: {facet.score} ({facet.scoreText})
            </div>
            <p className='text-default-700 dark:text-default-300 leading-relaxed'>
              {facet.text}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
