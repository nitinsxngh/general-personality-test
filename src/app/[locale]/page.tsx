import { useTranslations } from 'next-intl';
import { Link } from '@nextui-org/link';
import { button as buttonStyles } from '@nextui-org/theme';
import { title, subtitle } from '@/components/primitives';
import clsx from 'clsx';
import { FeaturesGrid } from '@/components/features-grid';
import {
  ExperimentIcon,
  GithubIcon,
  LanguageIcon,
  LogosOpensource,
  MoneyIcon,
  PlusLinearIcon,
  ArrowRightIcon
} from '@/components/icons';
import { siteConfig } from '@/config/site';
import { compareDesc } from 'date-fns';
import { allPosts } from 'contentlayer/generated';
import { PostCard } from '@/components/post-card';
import { SonarPulse } from '@/components/sonar-pulse';
import { Button, Card, CardBody, CardHeader, Divider } from '@nextui-org/react';
import { unstable_setRequestLocale } from 'next-intl/server';
import { Chip, Tooltip } from '@nextui-org/react';
import NextLink from 'next/link';

interface Props {
  params: { locale: string };
}

export default function Home({ params: { locale } }: Props) {
  unstable_setRequestLocale(locale);
  const t = useTranslations('frontpage');

  const features = [
    {
      title: 'MBTI Assessment',
      description: 'Uncover your core personality type with the Myers-Briggs Type Indicator to understand how you process information and make decisions.',
      icon: ExperimentIcon({})
    },
    {
      title: 'Big 5 Personality Test',
      description: 'Measure your unique traits across five key dimensions: Openness, Conscientiousness, Extraversion, Agreeableness, and Neuroticism.',
      icon: LogosOpensource({})
    },
    {
      title: 'RIASEC Career Interests',
      description: 'Identify your career interests and find the perfect job matches based on your personality and professional preferences.',
      icon: MoneyIcon({})
    },
    {
      title: 'Scientific & Reliable',
      description: 'Our psychometric tests are scientifically validated and provide easy-to-understand results with personalized career guidance.',
      icon: LanguageIcon({})
    }
  ];

  const benefitsForIndividuals = [
    {
      title: 'Discover Your Ideal Career',
      description: 'Get personalized career recommendations based on your personality traits and interests.'
    },
    {
      title: 'Resume Optimization',
      description: 'Learn how to highlight your strengths and improve your resume for better job prospects.'
    },
    {
      title: 'Interview Preparation',
      description: 'Understand your personality better to ace interviews and showcase your unique qualities.'
    }
  ];

  const benefitsForRecruiters = [
    {
      title: 'Find Perfect Candidates',
      description: 'Match candidates based on personality fit, not just skills and experience.'
    },
    {
      title: 'Reduce Hiring Time',
      description: 'Quickly identify candidates who align with your company culture and values.'
    },
    {
      title: 'Improve Retention',
      description: 'Hire candidates who are more likely to stay and thrive in your organization.'
    }
  ];

  return (
    <section className='relative'>
      {/* Hero Section */}
      <div className='min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 to-primary-100 dark:from-primary-900 dark:to-primary-800'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='text-center'>
            <h1 className={title({ size: 'lg' })}>
              Discover Yourself with{' '}
              <span className={title({ color: 'violet', size: 'lg' })}>
                Psychometric Tests
              </span>
            </h1>
            <p className={subtitle({ class: 'mt-6 max-w-3xl mx-auto text-xl' })}>
              "Because the first step to success is knowing who you are."
            </p>
            <p className={subtitle({ class: 'mt-4 max-w-3xl mx-auto' })}>
              Before we teach skills, we help you understand your strengths. 
              Psychometric assessments uncover your personality, aptitude, and hidden potential 
              — so your career path isn't guesswork, it's clarity.
            </p>
            
            <div className='flex flex-col sm:flex-row gap-4 justify-center mt-10'>
              <Button
                as={Link}
                href='/test'
                size='lg'
                color='primary'
                className='px-8 py-6 text-lg font-semibold'
                endContent={<ArrowRightIcon />}
              >
                Take Free Personality Test
              </Button>
              <Button
                as='a'
                href='tel:+917303031659'
                size='lg'
                variant='bordered'
                className='px-8 py-6 text-lg font-semibold'
              >
                For Recruiters
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className='py-20 bg-default-50'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='text-center mb-16'>
            <h2 className={title({ size: 'md' })}>What We Test</h2>
            <p className={subtitle({ class: 'mt-4 max-w-2xl mx-auto' })}>
              Comprehensive psychometric assessments to unlock your true potential
            </p>
          </div>
          <FeaturesGrid features={features} />
        </div>
      </div>

      {/* ILC Advantage Section */}
      <div className='py-20 bg-gradient-to-r from-primary-50 to-primary-100 dark:from-primary-900 dark:to-primary-800'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='text-center mb-16'>
            <h2 className={title({ size: 'md' })}>The ILC Advantage</h2>
            <p className={subtitle({ class: 'mt-4 max-w-2xl mx-auto' })}>
              "Don't just choose a career — choose the one made for you."
            </p>
          </div>
          
          <div className='grid md:grid-cols-3 gap-8 max-w-4xl mx-auto'>
            <div className='text-center'>
              <div className='w-16 h-16 bg-primary-500 rounded-full flex items-center justify-center mx-auto mb-4'>
                <span className='text-white text-2xl'>✓</span>
              </div>
              <h3 className='text-xl font-semibold mb-2'>Scientific & Reliable Testing</h3>
              <p className='text-default-600'>
                Our assessments are based on proven psychological frameworks and validated research
              </p>
            </div>
            
            <div className='text-center'>
              <div className='w-16 h-16 bg-primary-500 rounded-full flex items-center justify-center mx-auto mb-4'>
                <span className='text-white text-2xl'>✓</span>
              </div>
              <h3 className='text-xl font-semibold mb-2'>Easy-to-Understand Results</h3>
              <p className='text-default-600'>
                Get clear, actionable insights that you can immediately apply to your career decisions
              </p>
            </div>
            
            <div className='text-center'>
              <div className='w-16 h-16 bg-primary-500 rounded-full flex items-center justify-center mx-auto mb-4'>
                <span className='text-white text-2xl'>✓</span>
              </div>
              <h3 className='text-xl font-semibold mb-2'>Personalized Career Guidance</h3>
              <p className='text-default-600'>
                Receive tailored recommendations and guidance based on your unique personality profile
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Two-Column Benefits Section */}
      <div className='py-20'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 lg:gap-12'>
            {/* For Individuals */}
            <Card className='p-4 sm:p-6 lg:p-8 h-full flex flex-col'>
              <CardHeader className='text-center pb-4 sm:pb-6 flex-shrink-0'>
                <h3 className={title({ size: 'md' })}>For Individuals</h3>
                <p className={subtitle({ class: 'mt-2' })}>
                  Discover your ideal career path and unlock your potential
                </p>
              </CardHeader>
              <CardBody className='space-y-4 sm:space-y-6 flex-1 flex flex-col'>
                <div className='space-y-4 sm:space-y-6 flex-1'>
                  {benefitsForIndividuals.map((benefit, index) => (
                    <div key={index} className='flex gap-3 sm:gap-4'>
                      <div className='flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 bg-primary-100 dark:bg-primary-800 rounded-full flex items-center justify-center'>
                        <span className='text-primary-600 dark:text-primary-300 font-bold text-sm sm:text-lg'>{index + 1}</span>
                      </div>
                      <div className='flex-1 min-w-0'>
                        <h4 className='font-semibold text-base sm:text-lg mb-1 sm:mb-2'>{benefit.title}</h4>
                        <p className='text-default-600 leading-relaxed text-sm sm:text-base'>{benefit.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className='pt-4 sm:pt-6 mt-auto'>
                  <Button
                    as={Link}
                    href='/test'
                    color='primary'
                    size='lg'
                    className='w-full'
                    endContent={<ArrowRightIcon />}
                  >
                    Start Your Assessment
                  </Button>
                </div>
              </CardBody>
            </Card>

            {/* For Recruiters */}
            <Card className='p-4 sm:p-6 lg:p-8 h-full flex flex-col'>
              <CardHeader className='text-center pb-4 sm:pb-6 flex-shrink-0'>
                <h3 className={title({ size: 'md' })}>For Recruiters</h3>
                <p className={subtitle({ class: 'mt-2' })}>
                  Find the perfect candidates who fit your company culture
                </p>
              </CardHeader>
              <CardBody className='space-y-4 sm:space-y-6 flex-1 flex flex-col'>
                <div className='space-y-4 sm:space-y-6 flex-1'>
                  {benefitsForRecruiters.map((benefit, index) => (
                    <div key={index} className='flex gap-3 sm:gap-4'>
                      <div className='flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 bg-primary-100 dark:bg-primary-800 rounded-full flex items-center justify-center'>
                        <span className='text-primary-600 dark:text-primary-300 font-bold text-sm sm:text-lg'>{index + 1}</span>
                      </div>
                      <div className='flex-1 min-w-0'>
                        <h4 className='font-semibold text-base sm:text-lg mb-1 sm:mb-2'>{benefit.title}</h4>
                        <p className='text-default-600 leading-relaxed text-sm sm:text-base'>{benefit.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className='pt-4 sm:pt-6 mt-auto'>
                  <Button
                    color='primary'
                    size='lg'
                    className='w-full'
                    isDisabled
                  >
                    Coming Soon
                  </Button>
                </div>
              </CardBody>
            </Card>
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div className='py-20 bg-gradient-to-r from-primary-50 to-primary-100 dark:from-primary-900 dark:to-primary-800'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='text-center mb-16'>
            <h2 className={title({ size: 'md' })}>How It Works</h2>
            <p className={subtitle({ class: 'mt-4 max-w-2xl mx-auto' })}>
              Simple steps to find your perfect career match
            </p>
          </div>
          
          <div className='grid md:grid-cols-3 gap-8'>
            <div className='text-center'>
              <div className='w-16 h-16 bg-primary-500 rounded-full flex items-center justify-center mx-auto mb-4'>
                <span className='text-white text-2xl font-bold'>1</span>
              </div>
              <h3 className='text-xl font-semibold mb-2'>Take the Test</h3>
              <p className='text-default-600'>
                Complete our comprehensive personality assessment in just 10 minutes
              </p>
            </div>
            
            <div className='text-center'>
              <div className='w-16 h-16 bg-primary-500 rounded-full flex items-center justify-center mx-auto mb-4'>
                <span className='text-white text-2xl font-bold'>2</span>
              </div>
              <h3 className='text-xl font-semibold mb-2'>Upload Resume</h3>
              <p className='text-default-600'>
                Add your resume to get personalized career recommendations
              </p>
            </div>
            
            <div className='text-center'>
              <div className='w-16 h-16 bg-primary-500 rounded-full flex items-center justify-center mx-auto mb-4'>
                <span className='text-white text-2xl font-bold'>3</span>
              </div>
              <h3 className='text-xl font-semibold mb-2'>Get Matched</h3>
              <p className='text-default-600'>
                Receive detailed career suggestions and job opportunities
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className='py-20 text-center'>
        <div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8'>
          <h2 className={title({ size: 'md' })}>
            Ready to Discover Your True Potential?
          </h2>
          <p className={subtitle({ class: 'mt-4 mb-8' })}>
            Take our comprehensive psychometric tests and unlock the career path that's truly made for you
          </p>
          
          <div className='flex flex-col sm:flex-row gap-4 justify-center'>
            <Button
              as={Link}
              href='/test'
              size='lg'
              color='primary'
              className='px-8 py-6 text-lg font-semibold'
              endContent={<ArrowRightIcon />}
            >
              Start Free Assessment
            </Button>
            <Button
              as='a'
              href='tel:+917303031659'
              size='lg'
              variant='bordered'
              className='px-8 py-6 text-lg font-semibold'
            >
              For Recruiters
            </Button>
          </div>
        </div>
      </div>

    </section>
  );
}
