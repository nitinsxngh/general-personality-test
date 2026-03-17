import { Report, getTestResult } from '@/actions';
import { getTranslations } from 'next-intl/server';
import { Alert } from '@/components/alert';
import { supportEmail } from '@/config/site';
import { CareerRecommendations } from './career-recommendations';
import { title } from '@/components/primitives';
import { BackButton } from './back-button';

export async function generateMetadata({
  params: { locale }
}: {
  params: { locale: string };
}) {
  const t = await getTranslations({ locale, namespace: 'results' });
  return {
    title: 'Career Recommendations - ILC Assessment',
    description: 'Personalized career recommendations based on your personality test results'
  };
}

interface CareerPageParams {
  params: { id: string; locale: string };
  searchParams: { lang?: string };
}

export default async function CareerPage({
  params,
  searchParams
}: CareerPageParams) {
  let report;

  try {
    report = await getTestResult(params.id.substring(0, 24), searchParams.lang);
  } catch (error) {
    throw new Error('Could not retrieve report');
  }

  if (!report)
    return (
      <Alert title='Could not retrieve report'>
        <>
          <p>We could not retrieve the following id {params.id}.</p>
          <p>Please check that it is correct or contact us at {supportEmail}</p>
        </>
      </Alert>
    );

  return (
    <div className='max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
      {/* Back Button */}
      <div className='mb-6'>
        <BackButton resultId={params.id} />
      </div>

      {/* Header */}
      <div className='text-center mb-8'>
        <h1 className={title()}>ILC Career Recommendation</h1>
        <p className='text-default-600 dark:text-default-400 mt-4 text-lg max-w-3xl mx-auto'>
          This report analyzes your Big 5 OCEAN personality traits to provide insights into your unique character and suggest potential career paths that align with your natural strengths.
        </p>
      </div>

      {/* Career Recommendations */}
      <CareerRecommendations results={report.results} />
    </div>
  );
}

