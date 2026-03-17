'use client';

import { Domain } from '@bigfive-org/results';
import { Card, CardBody, CardHeader, Progress, Chip } from '@nextui-org/react';
import {
  OpennessIcon,
  ConscientiousnessIcon,
  ExtraversionIcon,
  AgreeablenessIcon,
  NeuroticismIcon
} from '@/components/icons';
import { IconSvgProps } from '@/types';
import { useMemo } from 'react';

interface CareerRecommendationsProps {
  results: Domain[];
}

interface CareerData {
  domain: string;
  icon: React.ComponentType<IconSvgProps>;
  title: string;
  description: string;
  careers: {
    low: string[];
    medium: string[];
    high: string[];
  };
}

interface CareerMatch {
  name: string;
  matchScore: number;
  traits: {
    O: 'low' | 'medium' | 'high' | 'any';
    C: 'low' | 'medium' | 'high' | 'any';
    E: 'low' | 'medium' | 'high' | 'any';
    A: 'low' | 'medium' | 'high' | 'any';
    N: 'low' | 'medium' | 'high' | 'any';
  };
  description?: string;
}

// Comprehensive career database with trait requirements
const allCareers: CareerMatch[] = [
  // High Openness Careers
  { name: 'Artist', matchScore: 0, traits: { O: 'high', C: 'any', E: 'any', A: 'any', N: 'any' } },
  { name: 'Scientist', matchScore: 0, traits: { O: 'high', C: 'high', E: 'low', A: 'any', N: 'low' } },
  { name: 'Entrepreneur', matchScore: 0, traits: { O: 'high', C: 'medium', E: 'high', A: 'low', N: 'low' } },
  { name: 'Author', matchScore: 0, traits: { O: 'high', C: 'medium', E: 'low', A: 'any', N: 'any' } },
  { name: 'Professor', matchScore: 0, traits: { O: 'high', C: 'high', E: 'medium', A: 'medium', N: 'low' } },
  { name: 'Designer', matchScore: 0, traits: { O: 'high', C: 'medium', E: 'any', A: 'any', N: 'any' } },
  { name: 'Architect', matchScore: 0, traits: { O: 'high', C: 'high', E: 'any', A: 'any', N: 'low' } },
  { name: 'Researcher', matchScore: 0, traits: { O: 'high', C: 'high', E: 'low', A: 'any', N: 'low' } },
  { name: 'Consultant', matchScore: 0, traits: { O: 'high', C: 'medium', E: 'medium', A: 'any', N: 'low' } },
  { name: 'Innovation Manager', matchScore: 0, traits: { O: 'high', C: 'medium', E: 'medium', A: 'any', N: 'low' } },
  
  // High Conscientiousness Careers
  { name: 'Surgeon', matchScore: 0, traits: { O: 'any', C: 'high', E: 'any', A: 'medium', N: 'low' } },
  { name: 'Lawyer', matchScore: 0, traits: { O: 'any', C: 'high', E: 'medium', A: 'low', N: 'low' } },
  { name: 'Financial Planner', matchScore: 0, traits: { O: 'low', C: 'high', E: 'medium', A: 'any', N: 'low' } },
  { name: 'Data Scientist', matchScore: 0, traits: { O: 'high', C: 'high', E: 'low', A: 'any', N: 'low' } },
  { name: 'Engineer', matchScore: 0, traits: { O: 'medium', C: 'high', E: 'low', A: 'any', N: 'low' } },
  { name: 'Accountant', matchScore: 0, traits: { O: 'low', C: 'high', E: 'low', A: 'any', N: 'low' } },
  { name: 'Military Officer', matchScore: 0, traits: { O: 'any', C: 'high', E: 'medium', A: 'low', N: 'low' } },
  { name: 'Pharmacist', matchScore: 0, traits: { O: 'any', C: 'high', E: 'any', A: 'high', N: 'low' } },
  { name: 'Quality Assurance Manager', matchScore: 0, traits: { O: 'any', C: 'high', E: 'any', A: 'any', N: 'low' } },
  
  // Low Openness Careers
  { name: 'Bank Teller', matchScore: 0, traits: { O: 'low', C: 'high', E: 'any', A: 'high', N: 'low' } },
  { name: 'Data Entry Clerk', matchScore: 0, traits: { O: 'low', C: 'high', E: 'low', A: 'any', N: 'low' } },
  { name: 'Quality Control Inspector', matchScore: 0, traits: { O: 'low', C: 'high', E: 'any', A: 'any', N: 'low' } },
  { name: 'Security Guard', matchScore: 0, traits: { O: 'low', C: 'high', E: 'any', A: 'any', N: 'low' } },
  { name: 'Assembly Line Worker', matchScore: 0, traits: { O: 'low', C: 'medium', E: 'any', A: 'any', N: 'low' } },
  
  // High Extraversion Careers
  { name: 'Sales Manager', matchScore: 0, traits: { O: 'any', C: 'medium', E: 'high', A: 'low', N: 'low' } },
  { name: 'Public Relations Specialist', matchScore: 0, traits: { O: 'high', C: 'medium', E: 'high', A: 'high', N: 'low' } },
  { name: 'Event Coordinator', matchScore: 0, traits: { O: 'medium', C: 'medium', E: 'high', A: 'high', N: 'low' } },
  { name: 'Real Estate Agent', matchScore: 0, traits: { O: 'any', C: 'medium', E: 'high', A: 'medium', N: 'low' } },
  { name: 'Politician', matchScore: 0, traits: { O: 'high', C: 'medium', E: 'high', A: 'low', N: 'low' } },
  { name: 'Actor', matchScore: 0, traits: { O: 'high', C: 'any', E: 'high', A: 'any', N: 'any' } },
  { name: 'TV Host', matchScore: 0, traits: { O: 'high', C: 'any', E: 'high', A: 'high', N: 'low' } },
  { name: 'Recruiter', matchScore: 0, traits: { O: 'any', C: 'medium', E: 'high', A: 'high', N: 'low' } },
  { name: 'Tour Guide', matchScore: 0, traits: { O: 'high', C: 'low', E: 'high', A: 'high', N: 'low' } },
  { name: 'Motivational Speaker', matchScore: 0, traits: { O: 'high', C: 'medium', E: 'high', A: 'high', N: 'low' } },
  
  // Low Extraversion Careers
  { name: 'Software Developer', matchScore: 0, traits: { O: 'medium', C: 'high', E: 'low', A: 'any', N: 'low' } },
  { name: 'Writer', matchScore: 0, traits: { O: 'high', C: 'medium', E: 'low', A: 'any', N: 'any' } },
  { name: 'Lab Technician', matchScore: 0, traits: { O: 'any', C: 'high', E: 'low', A: 'any', N: 'low' } },
  { name: 'Archivist', matchScore: 0, traits: { O: 'low', C: 'high', E: 'low', A: 'any', N: 'low' } },
  { name: 'Librarian', matchScore: 0, traits: { O: 'medium', C: 'high', E: 'low', A: 'high', N: 'low' } },
  { name: 'Data Analyst', matchScore: 0, traits: { O: 'medium', C: 'high', E: 'low', A: 'any', N: 'low' } },
  { name: 'Graphic Designer', matchScore: 0, traits: { O: 'high', C: 'medium', E: 'low', A: 'any', N: 'any' } },
  { name: 'Translator', matchScore: 0, traits: { O: 'high', C: 'high', E: 'low', A: 'any', N: 'low' } },
  
  // High Agreeableness Careers
  { name: 'Nurse', matchScore: 0, traits: { O: 'any', C: 'high', E: 'medium', A: 'high', N: 'low' } },
  { name: 'Counselor', matchScore: 0, traits: { O: 'medium', C: 'medium', E: 'medium', A: 'high', N: 'any' } },
  { name: 'Social Worker', matchScore: 0, traits: { O: 'medium', C: 'medium', E: 'medium', A: 'high', N: 'low' } },
  { name: 'Teacher', matchScore: 0, traits: { O: 'medium', C: 'medium', E: 'medium', A: 'high', N: 'low' } },
  { name: 'Customer Service Representative', matchScore: 0, traits: { O: 'any', C: 'medium', E: 'medium', A: 'high', N: 'low' } },
  { name: 'Non-profit Worker', matchScore: 0, traits: { O: 'high', C: 'medium', E: 'medium', A: 'high', N: 'low' } },
  { name: 'Therapist', matchScore: 0, traits: { O: 'high', C: 'medium', E: 'medium', A: 'high', N: 'any' } },
  { name: 'Childcare Worker', matchScore: 0, traits: { O: 'medium', C: 'medium', E: 'high', A: 'high', N: 'low' } },
  { name: 'Rehabilitation Specialist', matchScore: 0, traits: { O: 'medium', C: 'high', E: 'medium', A: 'high', N: 'low' } },
  
  // Low Agreeableness Careers
  { name: 'Business Analyst', matchScore: 0, traits: { O: 'medium', C: 'high', E: 'any', A: 'low', N: 'low' } },
  { name: 'Financial Advisor', matchScore: 0, traits: { O: 'low', C: 'high', E: 'medium', A: 'low', N: 'low' } },
  { name: 'Negotiator', matchScore: 0, traits: { O: 'any', C: 'medium', E: 'high', A: 'low', N: 'low' } },
  { name: 'Judge', matchScore: 0, traits: { O: 'any', C: 'high', E: 'any', A: 'low', N: 'low' } },
  { name: 'Critic', matchScore: 0, traits: { O: 'high', C: 'medium', E: 'any', A: 'low', N: 'any' } },
  { name: 'Auditor', matchScore: 0, traits: { O: 'low', C: 'high', E: 'low', A: 'low', N: 'low' } },
  { name: 'Investment Banker', matchScore: 0, traits: { O: 'any', C: 'high', E: 'high', A: 'low', N: 'low' } },
  
  // Low Neuroticism (High Stability) Careers
  { name: 'Police Officer', matchScore: 0, traits: { O: 'any', C: 'high', E: 'medium', A: 'any', N: 'low' } },
  { name: 'Pilot', matchScore: 0, traits: { O: 'any', C: 'high', E: 'any', A: 'any', N: 'low' } },
  { name: 'Crisis Manager', matchScore: 0, traits: { O: 'any', C: 'high', E: 'high', A: 'any', N: 'low' } },
  { name: 'CEO', matchScore: 0, traits: { O: 'high', C: 'high', E: 'high', A: 'low', N: 'low' } },
  { name: 'Emergency Responder', matchScore: 0, traits: { O: 'any', C: 'high', E: 'high', A: 'high', N: 'low' } },
  { name: 'Air Traffic Controller', matchScore: 0, traits: { O: 'any', C: 'high', E: 'any', A: 'any', N: 'low' } },
  { name: 'Trial Lawyer', matchScore: 0, traits: { O: 'any', C: 'high', E: 'high', A: 'low', N: 'low' } },
  { name: 'Stock Trader', matchScore: 0, traits: { O: 'any', C: 'high', E: 'high', A: 'low', N: 'low' } },
  
  // Medium/Mixed Careers
  { name: 'Marketing Specialist', matchScore: 0, traits: { O: 'medium', C: 'medium', E: 'high', A: 'any', N: 'low' } },
  { name: 'HR Specialist', matchScore: 0, traits: { O: 'any', C: 'medium', E: 'medium', A: 'high', N: 'low' } },
  { name: 'Project Manager', matchScore: 0, traits: { O: 'medium', C: 'high', E: 'medium', A: 'medium', N: 'low' } },
  { name: 'Manager', matchScore: 0, traits: { O: 'any', C: 'high', E: 'medium', A: 'medium', N: 'low' } },
  { name: 'Mediator', matchScore: 0, traits: { O: 'any', C: 'medium', E: 'medium', A: 'high', N: 'low' } },
  { name: 'Customer Success Manager', matchScore: 0, traits: { O: 'any', C: 'medium', E: 'high', A: 'high', N: 'low' } },
  { name: 'HR Manager', matchScore: 0, traits: { O: 'any', C: 'medium', E: 'medium', A: 'high', N: 'low' } },
  { name: 'Operations Manager', matchScore: 0, traits: { O: 'any', C: 'high', E: 'medium', A: 'any', N: 'low' } },
  { name: 'Financial Analyst', matchScore: 0, traits: { O: 'low', C: 'high', E: 'low', A: 'any', N: 'low' } },
  { name: 'Trainer', matchScore: 0, traits: { O: 'medium', C: 'medium', E: 'high', A: 'high', N: 'low' } },
  { name: 'Coordinator', matchScore: 0, traits: { O: 'any', C: 'medium', E: 'medium', A: 'high', N: 'low' } },
  { name: 'Life Coach', matchScore: 0, traits: { O: 'high', C: 'medium', E: 'high', A: 'high', N: 'any' } },
  { name: 'Creative Director', matchScore: 0, traits: { O: 'high', C: 'medium', E: 'high', A: 'any', N: 'any' } },
  { name: 'Administrative Assistant', matchScore: 0, traits: { O: 'low', C: 'high', E: 'medium', A: 'high', N: 'low' } },
  { name: 'Freelance Artist', matchScore: 0, traits: { O: 'high', C: 'low', E: 'any', A: 'any', N: 'any' } },
  { name: 'Event Planner', matchScore: 0, traits: { O: 'medium', C: 'medium', E: 'high', A: 'high', N: 'low' } },
  { name: 'Creative Writer', matchScore: 0, traits: { O: 'high', C: 'medium', E: 'low', A: 'any', N: 'any' } },
  { name: 'Social Media Manager', matchScore: 0, traits: { O: 'high', C: 'low', E: 'high', A: 'any', N: 'any' } },
  { name: 'Adventure Guide', matchScore: 0, traits: { O: 'high', C: 'low', E: 'high', A: 'high', N: 'low' } },
];

const careerData: CareerData[] = [
  {
    domain: 'O',
    icon: OpennessIcon,
    title: 'Openness',
    description: 'This trait reflects imagination, creativity, and a preference for variety and new experiences.',
    careers: {
      low: ['Accountant', 'Bank Teller', 'Data Entry Clerk', 'Quality Control Inspector', 'Security Guard', 'Assembly Line Worker'],
      medium: ['Teacher', 'Marketing Specialist', 'Sales Representative', 'HR Specialist', 'Project Manager', 'Business Analyst'],
      high: ['Artist', 'Scientist', 'Entrepreneur', 'Author', 'Professor', 'Designer', 'Architect', 'Researcher', 'Consultant', 'Innovation Manager']
    }
  },
  {
    domain: 'C',
    icon: ConscientiousnessIcon,
    title: 'Conscientiousness',
    description: 'This trait measures organization, discipline, and goal-oriented behavior.',
    careers: {
      low: ['Freelance Artist', 'Tour Guide', 'Event Planner', 'Creative Writer', 'Social Media Manager', 'Adventure Guide'],
      medium: ['Teacher', 'Nurse', 'Social Worker', 'Sales Representative', 'Customer Service Representative', 'Administrative Assistant'],
      high: ['Surgeon', 'Architect', 'Lawyer', 'Financial Planner', 'Data Scientist', 'Engineer', 'Accountant', 'Military Officer', 'Pharmacist', 'Quality Assurance Manager']
    }
  },
  {
    domain: 'E',
    icon: ExtraversionIcon,
    title: 'Extraversion',
    description: 'This trait indicates how you gain energy—from social interaction or solitude.',
    careers: {
      low: ['Software Developer', 'Writer', 'Lab Technician', 'Archivist', 'Researcher', 'Librarian', 'Data Analyst', 'Accountant', 'Graphic Designer', 'Translator'],
      medium: ['Teacher', 'Nurse', 'Human Resources Specialist', 'Marketing Specialist', 'Project Manager', 'Consultant', 'Trainer'],
      high: ['Sales Manager', 'Public Relations Specialist', 'Event Coordinator', 'Real Estate Agent', 'Politician', 'Actor', 'TV Host', 'Recruiter', 'Tour Guide', 'Motivational Speaker']
    }
  },
  {
    domain: 'A',
    icon: AgreeablenessIcon,
    title: 'Agreeableness',
    description: 'This trait reflects your tendency to be cooperative, empathetic, and considerate of others.',
    careers: {
      low: ['Business Analyst', 'Financial Advisor', 'Negotiator', 'Lawyer', 'Judge', 'Military Officer', 'Critic', 'Auditor', 'Investment Banker'],
      medium: ['Manager', 'Mediator', 'Customer Success Manager', 'HR Manager', 'Social Worker', 'Teacher', 'Counselor', 'Coordinator'],
      high: ['Nurse', 'Counselor', 'Social Worker', 'Teacher', 'Customer Service Representative', 'Non-profit Worker', 'Therapist', 'Childcare Worker', 'Rehabilitation Specialist']
    }
  },
  {
    domain: 'N',
    icon: NeuroticismIcon,
    title: 'Neuroticism',
    description: 'This trait measures emotional stability and resilience to stress. A low score indicates high stability.',
    careers: {
      low: ['Surgeon', 'Police Officer', 'Pilot', 'Crisis Manager', 'CEO', 'Military Officer', 'Emergency Responder', 'Air Traffic Controller', 'Trial Lawyer', 'Stock Trader'],
      medium: ['Manager', 'Teacher', 'Nurse', 'Engineer', 'Accountant', 'Project Manager', 'Financial Analyst', 'Operations Manager', 'HR Manager', 'Marketing Specialist'],
      high: ['Writer', 'Artist', 'Musician', 'Actor', 'Therapist', 'Counselor', 'Social Worker', 'Designer', 'Creative Director', 'Life Coach']
    }
  }
];

function getLevel(score: number): 'low' | 'medium' | 'high' {
  const normalizedScore = (score / 120) * 100;
  if (normalizedScore < 40) return 'low';
  if (normalizedScore < 70) return 'medium';
  return 'high';
}

function getLevelLabel(score: number, domain: string): string {
  const level = getLevel(score);
  if (domain === 'N') {
    if (level === 'low') return 'Low (High Stability)';
    if (level === 'medium') return 'Medium';
    return 'High';
  }
  return level.charAt(0).toUpperCase() + level.slice(1);
}

function getLevelDescription(score: number, domain: string): string {
  const level = getLevel(score);
  
  if (domain === 'O') {
    if (level === 'low') return 'Prefers routine, practical, and structured approaches.';
    if (level === 'medium') return 'Balances creativity with practicality; open to new ideas but values structure.';
    return 'Highly creative, imaginative, curious, and values variety.';
  }
  
  if (domain === 'C') {
    if (level === 'low') return 'Flexible, spontaneous, and adaptable to change.';
    if (level === 'medium') return 'Moderately organized with some planning and discipline.';
    return 'Detail-oriented, organized, disciplined, thrives on planning.';
  }
  
  if (domain === 'E') {
    if (level === 'low') return 'Gains energy from solitude; prefers deep, independent work.';
    if (level === 'medium') return 'Enjoys both social interaction and alone time in balance.';
    return 'Gains energy from social interaction; outgoing and enthusiastic.';
  }
  
  if (domain === 'A') {
    if (level === 'low') return 'Competitive, assertive, and direct in communication.';
    if (level === 'medium') return 'Cooperative but can be assertive; able to see multiple perspectives.';
    return 'Highly cooperative, empathetic, and considerate of others.';
  }
  
  if (domain === 'N') {
    if (level === 'low') return 'Calm, resilient, and handles high-stress situations well.';
    if (level === 'medium') return 'Generally stable but can experience some stress in challenging situations.';
    return 'More sensitive to stress and may experience emotional fluctuations.';
  }
  
  return '';
}

function calculateCareerMatchScore(
  career: CareerMatch,
  userTraits: { O: number; C: number; E: number; A: number; N: number }
): number {
  let score = 0;
  let maxPossibleScore = 0;
  const traitMap = { O: 'O', C: 'C', E: 'E', A: 'A', N: 'N' } as const;
  
  Object.entries(traitMap).forEach(([key, trait]) => {
    const userLevel = getLevel(userTraits[trait]);
    const requiredLevel = career.traits[trait];
    
    // Maximum possible score per trait is 2 (for perfect match)
    maxPossibleScore += 2;
    
    if (requiredLevel === 'any') {
      score += 1; // Neutral match - counts as partial
    } else if (userLevel === requiredLevel) {
      score += 2; // Perfect match
    } else {
      // Partial match based on proximity
      const levels: ('low' | 'medium' | 'high')[] = ['low', 'medium', 'high'];
      const userIndex = levels.indexOf(userLevel);
      const requiredIndex = levels.indexOf(requiredLevel);
      const distance = Math.abs(userIndex - requiredIndex);
      
      if (distance === 1) {
        score += 1; // Adjacent level - partial match
      } else {
        score += 0; // No match
      }
    }
  });
  
  // Return percentage score (0-100)
  return (score / maxPossibleScore) * 100;
}

export function CareerRecommendations({ results }: CareerRecommendationsProps) {
  // Create domain map memoized to avoid recreation on every render
  const domainMap = useMemo(() => {
    return new Map(results.map(r => [r.domain, r]));
  }, [results]);

  // Get user trait scores
  const userTraits = useMemo(() => {
    const O = domainMap.get('O')?.score || 60;
    const C = domainMap.get('C')?.score || 60;
    const E = domainMap.get('E')?.score || 60;
    const A = domainMap.get('A')?.score || 60;
    const N = domainMap.get('N')?.score || 60;
    return { O, C, E, A, N };
  }, [domainMap]);

  // Calculate match scores for all careers
  const careerMatches = useMemo(() => {
    return allCareers.map(career => ({
      ...career,
      matchScore: calculateCareerMatchScore(career, userTraits)
    })).sort((a, b) => b.matchScore - a.matchScore);
  }, [userTraits]);

  // Get top 15 overall career matches
  const topCareers = useMemo(() => {
    return careerMatches.slice(0, 15);
  }, [careerMatches]);

  return (
    <div className='space-y-8'>
      {/* Top Career Matches Section */}
      <Card className='bg-gradient-to-br from-primary-50 to-primary-100 dark:from-primary-900/20 dark:to-primary-800/20 border-2 border-primary-200 dark:border-primary-800'>
        <CardHeader className='pb-4'>
          <div className='w-full'>
            <h2 className='text-2xl font-bold mb-2'>Top Career Matches for Your Personality</h2>
            <p className='text-default-600 dark:text-default-400 text-sm'>
              These careers are matched based on your complete personality profile across all traits.
            </p>
          </div>
        </CardHeader>
        <CardBody className='pt-0'>
          <div className='flex flex-wrap gap-3'>
            {topCareers.map((career, index) => {
              const matchPercentage = Math.round(career.matchScore);
              return (
                <div
                  key={career.name}
                  className='flex items-center gap-2 bg-white dark:bg-gray-800 px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm'
                >
                  <span className='text-sm font-medium text-primary-600 dark:text-primary-400'>
                    #{index + 1}
                  </span>
                  <Chip
                    variant='flat'
                    color={matchPercentage >= 80 ? 'success' : matchPercentage >= 60 ? 'warning' : 'default'}
                    className='text-sm font-semibold'
                  >
                    {career.name}
                  </Chip>
                  <span className='text-xs text-default-500'>
                    {matchPercentage}% match
                  </span>
                </div>
              );
            })}
          </div>
        </CardBody>
      </Card>

      {/* Individual Trait Sections */}
      {careerData.map((career) => {
        const domain = domainMap.get(career.domain);
        if (!domain) return null;

        const score = domain.score;
        const normalizedScore = Math.round((score / 120) * 100);
        const level = getLevel(score);
        const levelLabel = getLevelLabel(score, career.domain);
        const levelDescription = getLevelDescription(score, career.domain);
        const careers = career.careers[level];

        // Get top matching careers for this specific trait
        // Prioritize careers that specifically require this trait level
        const traitSpecificCareers = careerMatches
          .filter(c => {
            const requiredLevel = c.traits[career.domain as keyof typeof c.traits];
            // Only include careers that match this trait level (not 'any')
            return requiredLevel === level;
          })
          .slice(0, 6)
          .map(c => c.name);

        // Also include some high-scoring careers that have 'any' for this trait
        const flexibleCareers = careerMatches
          .filter(c => {
            const requiredLevel = c.traits[career.domain as keyof typeof c.traits];
            return requiredLevel === 'any' && c.matchScore >= 60;
          })
          .slice(0, 4)
          .map(c => c.name);

        // Combine: static list, trait-specific matches, then flexible matches
        const displayCareers = Array.from(new Set([
          ...careers.slice(0, 6), // Prioritize static recommendations
          ...traitSpecificCareers,
          ...flexibleCareers
        ])).slice(0, 10);

        const percentage = normalizedScore;
        const IconComponent = career.icon;

        return (
          <Card key={career.domain} className='bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700'>
            <CardHeader className='pb-4'>
              <div className='flex items-start gap-4 w-full'>
                <div className='flex-shrink-0 w-12 h-12 rounded-lg bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center'>
                  <IconComponent size={28} className='text-primary-600 dark:text-primary-400' />
                </div>
                <div className='flex-grow'>
                  <h2 className='text-2xl font-bold mb-2'>{career.title}</h2>
                  <p className='text-default-600 dark:text-default-400 text-sm'>
                    {career.description}
                  </p>
                </div>
              </div>
            </CardHeader>
            <CardBody className='pt-0'>
              {/* Score Display */}
              <div className='mb-6'>
                <div className='flex items-center justify-between mb-2'>
                  <span className='text-2xl font-bold'>
                    {normalizedScore} / 100
                  </span>
                  <Chip 
                    color={level === 'high' ? 'success' : level === 'medium' ? 'warning' : 'default'}
                    variant='flat'
                  >
                    {levelLabel}
                  </Chip>
                </div>
                
                {/* Progress Bar */}
                <Progress
                  value={percentage}
                  color={level === 'high' ? 'success' : level === 'medium' ? 'warning' : 'default'}
                  className='mb-2'
                  size='lg'
                  maxValue={100}
                />
                
                {/* Level Indicators */}
                <div className='flex justify-between text-xs text-default-500 mb-2'>
                  <span>Low</span>
                  <span>Medium</span>
                  <span>High</span>
                </div>
                
                {/* Level Description */}
                <p className='text-default-600 dark:text-default-400 mt-3'>
                  <span className='font-semibold'>Your Level: {levelLabel}</span>
                  <br />
                  {levelDescription}
                </p>
              </div>

              {/* Career Recommendations */}
              <div className='mt-6 pt-6 border-t border-gray-200 dark:border-gray-700'>
                <h3 className='text-lg font-semibold mb-4'>Potential Career Paths</h3>
                <div className='flex flex-wrap gap-2'>
                  {displayCareers.map((careerName, index) => {
                    const match = careerMatches.find(c => c.name === careerName);
                    const matchPercentage = match ? Math.round(match.matchScore) : null;
                    return (
                      <Chip
                        key={index}
                        variant='flat'
                        color={matchPercentage && matchPercentage >= 80 ? 'success' : 'primary'}
                        className='text-sm'
                      >
                        {careerName}
                        {matchPercentage && matchPercentage >= 80 && (
                          <span className='ml-1 text-xs'>⭐</span>
                        )}
                      </Chip>
                    );
                  })}
                </div>
              </div>
            </CardBody>
          </Card>
        );
      })}
    </div>
  );
}
