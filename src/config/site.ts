import { getTranslations } from 'next-intl/server';

export type SiteConfig = typeof siteConfig;

export const basePath = 'https://ilc.limited';

export const supportEmail = 'support@ilc.limited';

export type Language = {
  code: string;
  name: string;
  countryCode?: string;
  map?: string[];
};

export const languages: Language[] = [
  { code: 'en', name: 'English', countryCode: 'us', map: ['en-GB'] },
  { code: 'hi', name: 'Hindi', countryCode: 'in' }
];

export const locales = languages.map((lang) => lang.code) as string[];

export const siteConfig = {
  name: 'ILC Personality Assessment',
  creator: '@ilc',
  description:
    'Discover your personality traits with ILC\'s comprehensive personality assessment.',
  navItems: [
    {
      label: 'home',
      href: '/'
    },
    {
      label: 'dashboard',
      href: '/dashboard'
    },
    // {
    //   label: 'result',
    //   href: '/result'
    // },
    // {
    //   label: 'compare',
    //   href: '/compare'
    // },
    // {
    //   label: 'articles',
    //   href: '/articles'
    // },
    {
      label: 'about',
      href: '/about'
    }
  ],
  ilcEcosystem: [
    {
      label: 'Resume Builder',
      href: 'https://resumebuilder.ilc.limited/',
      description: 'Build professional resumes with AI assistance'
    },
    {
      label: 'Student Assessment',
      href: 'https://assessment.ilc.limited/',
      description: 'Personality tests for students (Class 1-8)'
    },
    {
      label: 'ILC Forum',
      href: 'https://forum.ilc.limited/',
      description: 'Join our community discussions'
    }
  ],
  navMenuItems: [
    {
      label: 'home',
      href: '/'
    },
    // {
    //   label: 'see_results',
    //   href: '/result'
    // },
    // {
    //   label: 'compare_with',
    //   href: '/compare'
    // },
    // {
    //   label: 'articles',
    //   href: '/articles'
    // },
    {
      label: 'privacy',
      href: '/privacy'
    },
    {
      label: 'about',
      href: '/about'
    },
    {
      label: 'faq',
      href: '/faq'
    }
  ],
  footerLinks: [
    {
      label: 'home',
      href: '/'
    },
    // {
    //   label: 'articles',
    //   href: '/articles'
    // },
    {
      label: 'privacy',
      href: '/privacy'
    },
    {
      label: 'about',
      href: '/about'
    },
    {
      label: 'faq',
      href: '/faq'
    }
  ],
  links: {
    instagram: 'https://www.instagram.com/integratedlearningcircle/',
    twitter: 'https://x.com/innovativeILC',
    youtube: 'https://www.youtube.com/@IntegratedLearningCircle',
    facebook: 'https://www.facebook.com/share/1BDPwwhx49/?mibextid=wwXIfr'
  }
};

export const getNavItems = async ({
  locale,
  linkType
}: {
  locale: string;
  linkType: 'navItems' | 'navMenuItems' | 'footerLinks';
}) => {
  const t = await getTranslations({ locale, namespace: 'toolbar' });
  return siteConfig[linkType].map((link) => ({
    label: t(`${link.label}`),
    href: link.href
  }));
};
