import { Report, getTestResult } from '@/actions';
import { Snippet } from '@nextui-org/snippet';
import { useTranslations } from 'next-intl';
import { title } from '@/components/primitives';
import { DomainPage } from './domain';
import { Domain } from '@bigfive-org/results';
import { getTranslations } from 'next-intl/server';
import { BarChart } from '@/components/bar-chart';
import { Link } from '@/navigation';
import { ReportLanguageSwitch } from './report-language-switch';
import { Alert } from '@/components/alert';
import { supportEmail } from '@/config/site';
import ShareBar from '@/components/share-bar';
import { DomainTabs } from './domain-tabs';
import { Chip } from '@nextui-org/react';

export async function generateMetadata({
  params: { locale }
}: {
  params: { locale: string };
}) {
  const t = await getTranslations({ locale, namespace: 'results' });
  return {
    title: t('seo.title'),
    description: t('seo.description')
  };
}

interface ResultPageParams {
  params: { id: string };
  searchParams: { lang: string; showExpanded?: boolean };
}

export default async function ResultPage({
  params,
  searchParams
}: ResultPageParams) {
  let report;

  try {
    report = await getTestResult(params.id.substring(0, 24), searchParams.lang);
  } catch (error) {
    throw new Error('Could not retrieve report');
  }

  if (!report)
    return (
      <Alert title='Could not retrive report'>
        <>
          <p>We could not retrive the following id {params.id}.</p>
          <p>Please check that it is correct or contact us at {supportEmail}</p>
        </>
      </Alert>
    );

  return <Results report={report} showExpanded={searchParams.showExpanded} />;
}

interface ResultsProps {
  report: Report;
  showExpanded?: boolean;
}

const Results = ({ report, showExpanded }: ResultsProps) => {
  const t = useTranslations('results');

  return (
    <div className='max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
      {/* Header Section */}
      <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6'>
        <div className='flex-grow'>
          <ReportLanguageSwitch
            language={report.language}
            availableLanguages={report.availableLanguages}
          />
        </div>
        <Chip className='self-start sm:self-auto'>{new Date(report.timestamp).toLocaleDateString()}</Chip>
      </div>

      {/* Important Notice - Commented out */}
      {/* <div className='text-center mb-6 p-4 bg-primary-50 dark:bg-primary-900/20 rounded-lg'>
        <span className='font-bold text-primary-700 dark:text-primary-300'>{t('important')}</span> &nbsp;
        <span className='text-default-600 dark:text-default-400'>{t('saveResults')}</span> &nbsp;
        <Link href={`/compare/?id=${report.id}`} className='underline text-primary-600 hover:text-primary-800 dark:text-primary-400 dark:hover:text-primary-200'>
          {t('compare')}
        </Link>{' '}
        &nbsp;
        <span className='text-default-600 dark:text-default-400'>{t('toOthers')}</span>
      </div> */}

      {/* Report ID */}
      <div className='flex justify-center mb-6'>
        <Snippet
          hideSymbol
          color='danger'
          className='w-full max-w-md justify-center'
          size='lg'
        >
          {report.id}
        </Snippet>
      </div>

      {/* Share Bar */}
      <div className='flex justify-end w-full mb-8 print:hidden'>
        <ShareBar report={report} />
      </div>

      {/* Main Title */}
      <div className='text-center mb-8'>
        <h1 className={title()}>{t('theILCAssessment')}</h1>
      </div>

      {/* Chart Section */}
      <div className='mb-12'>
        <BarChart max={120} results={report.results} />
      </div>

      {/* Domain Tabs */}
      <DomainTabs
        results={report.results}
        showExpanded={!!showExpanded}
        scoreText={t('score')}
      />
    </div>
  );
};
