import { HeartBoldIcon } from '@/components/icons';
import { title } from '@/components/primitives';
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';
import Feedback from './feedback';
import { Link } from '@/navigation';

interface Props {
  params: { locale: string };
}

export async function generateMetadata({
  params: { locale }
}: {
  params: { locale: string };
}) {
  const t = await getTranslations({ locale, namespace: 'about' });
  return {
    title: t('seo.title'),
    description: t('seo.description')
  };
}

export default function AboutPage({ params: { locale } }: Props) {
  unstable_setRequestLocale(locale);

  return (
    <>
      <div className='text-center justify-center mt-10'>
        <h1 className={title()}>About</h1>
      </div>
      <div className='mt-2 text-medium lg:mt-4 lg:text-large'>
        <p>
          Welcome to ILC Personality Assessment, your comprehensive platform for 
          career guidance and personality analysis. We combine scientifically 
          validated ILC personality assessment with AI-powered career matching 
          to help individuals discover their ideal career paths and assist 
          recruiters in finding the perfect candidates.
        </p>
        <br />
        <p>
          Our advanced assessment analyzes five key personality dimensions: 
          Openness to Experience, Conscientiousness, Extraversion, Agreeableness, 
          and Neuroticism. Each dimension is carefully evaluated to provide 
          detailed insights into your personality traits and how they align with 
          different career opportunities.
        </p>
        <br />
        <p>
          <strong>For Individuals:</strong> Discover your ideal career path through 
          our comprehensive personality test and resume analysis. Get personalized 
          career recommendations, resume optimization tips, and interview preparation 
          guidance tailored to your unique personality profile.
        </p>
        <br />
        <p>
          <strong>For Recruiters:</strong> Find the perfect candidates by matching 
          personality traits with your company culture and job requirements. Reduce 
          hiring time, improve employee retention, and build stronger teams with 
          candidates who are truly aligned with your organization's values.
        </p>
        <br />
        <p>
          As part of the ILC ecosystem, we also offer Resume Builder for professional 
          resume creation, Student Assessment for educational institutions, and ILC 
          Forum for community discussions. Our platform bridges the gap between 
          personality science and professional success.
        </p>
        <br />
        <p>
          If you have questions please read through the{' '}
          <Link href='/faq' className='underline'>
            FAQ
          </Link>{' '}
          first. If you can&apos;t find an answer there, feel free to contact us
          at support@ilc.limited.
        </p>
      </div>
      <section>
        <div className='text-center justify-center mt-20'>
          <h2 className={title()}>We love feedback!&nbsp;</h2>
          <div className='flex md:inline-flex flex-col md:flex-row items-center'>
            <HeartBoldIcon
              className='text-pink-500 animate-heartbeat'
              size={50}
              style={{
                animationDuration: '2.5s'
              }}
            />
          </div>
          <div className='mt-2 text-medium lg:mt-4 lg:text-large'>
            Send us feedback about how our features can be improved or specific
            issues.
          </div>
        </div>
        <Feedback />
      </section>
    </>
  );
}
