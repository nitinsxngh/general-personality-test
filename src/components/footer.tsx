import { Link as NextUILink } from '@nextui-org/link';
import { Link } from '../navigation';

import {
  TwitterIcon,
  InstagramIcon,
  YouTubeIcon,
  FacebookIcon,
  Logo
} from '@/components/icons';
import { siteConfig } from '@/config/site';

interface FooterProps {
  footerLinks: {
    label: string;
    href: string;
  }[];
}

export default function Footer({ footerLinks }: FooterProps) {
  const year = new Date().getFullYear();
  return (
    <footer className='container mx-auto max-w-7xl py-24 px-12'>
      <div className='container mx-auto flex justify-between'>
        <div className='w-1/2'>
          <span className='text-center'>
            <Logo />
          </span>
        </div>
        <div className='w-1/2 flex justify-end gap-4'>
          <NextUILink
            isExternal
            href={siteConfig.links.instagram}
            aria-label='Instagram'
          >
            <InstagramIcon size={48} className='text-default-500 hover:text-primary-600' />
          </NextUILink>
          <NextUILink
            isExternal
            href={siteConfig.links.twitter}
            aria-label='Twitter'
          >
            <TwitterIcon size={48} className='text-default-500 hover:text-primary-600' />
          </NextUILink>
          <NextUILink
            isExternal
            href={siteConfig.links.youtube}
            aria-label='YouTube'
          >
            <YouTubeIcon size={48} className='text-default-500 hover:text-primary-600' />
          </NextUILink>
          <NextUILink
            isExternal
            href={siteConfig.links.facebook}
            aria-label='Facebook'
          >
            <FacebookIcon size={48} className='text-default-500 hover:text-primary-600' />
          </NextUILink>
        </div>
      </div>

      <div className='w-full flex justify-center mt-12'>
        <ul className='flex flex-wrap justify-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0 gap-4 md:gap-6'>
          {footerLinks.map((item, index) => (
            <li key={index}>
              <Link href={item.href} className='hover:underline'>
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* ILC Ecosystem Links */}
      <div className='w-full flex justify-center mt-8'>
        <div className='text-center'>
          <h3 className='text-lg font-semibold text-primary-600 dark:text-primary-400 mb-4'>
            ILC Ecosystem
          </h3>
          <ul className='flex flex-wrap justify-center gap-4 md:gap-6 text-sm font-medium text-gray-500 dark:text-gray-400'>
            {siteConfig.ilcEcosystem.map((item, index) => (
              <li key={index}>
                <NextUILink 
                  href={item.href} 
                  isExternal
                  className='hover:underline hover:text-primary-600 dark:hover:text-primary-400'
                >
                  {item.label}
                </NextUILink>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className='flex text-sm text-gray-500 sm:ml-4 sm:pl-4 sm:py-2 mt-14 justify-center'>
        © {year} — ILC Limited - all rights reserved.
      </div>
    </footer>
  );
}
