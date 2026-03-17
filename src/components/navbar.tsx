'use client';

import {
  Navbar as NextUINavbar,
  NavbarContent,
  NavbarMenu,
  NavbarMenuToggle,
  NavbarBrand,
  NavbarItem,
  NavbarMenuItem
} from '@nextui-org/navbar';
import LocaleSwitcher from '@/components/locale-switcher';
import LocaleSwitcherFull from '@/components/locale-switcher-full';
import { Link } from '@nextui-org/link';

import { link as linkStyles } from '@nextui-org/theme';

import { siteConfig } from '@/config/site';
import clsx from 'clsx';

import { ThemeSwitch } from '@/components/theme-switch';
import { Logo } from '@/components/icons';
import { Link as NextLink } from '../navigation';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { useLocale } from 'next-intl';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@nextui-org/button';
import { AuthModal } from './auth-modal';

interface NavbarProps {
  navItems: { label: string; href: string }[];
  navMenuItems: { label: string; href: string }[];
}

export const Navbar = ({ navItems, navMenuItems }: NavbarProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const pathname = usePathname();
  const locale = useLocale();
  const { user, logout } = useAuth();

  const isCurrentPath = (link: string): boolean => {
    if (link === '/') {
      return pathname === '/' || pathname === `/${locale}`;
    } else {
      return pathname.includes(link);
    }
  };

  // Filter nav items based on authentication status
  const getVisibleNavItems = () => {
    return navItems.filter(item => {
      if (item.label === 'dashboard') {
        return !!user; // Only show dashboard for authenticated users
      }
      return true;
    });
  };

  return (
    <NextUINavbar
      maxWidth='xl'
      position='sticky'
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
    >
      <NavbarContent className='basis-1/5 sm:basis-full' justify='start'>
        <NavbarBrand as='li' className='gap-3 max-w-fit'>
          <NextLink
            className='flex justify-start items-center gap-1'
            href='/'
            aria-label='Home'
          >
            <Logo />
          </NextLink>
        </NavbarBrand>
        <div className='hidden md:flex gap-4 justify-start ml-2'>
          {getVisibleNavItems().map((item) => (
            <NavbarItem key={item.href}>
              <NextLink
                className={clsx(
                  linkStyles({ color: 'foreground' }),
                  'data-[active=true]:text-danger data-[active=true]:font-medium'
                )}
                data-active={isCurrentPath(item.href)}
                color='foreground'
                href={item.href}
              >
                {item.label}
              </NextLink>
            </NavbarItem>
          ))}
          {siteConfig.ilcEcosystem.map((item, index) => (
            <NavbarItem key={`ecosystem-${index}`}>
              <Link
                href={item.href}
                isExternal
                className={clsx(
                  linkStyles({ color: 'foreground' }),
                  'flex items-center gap-1'
                )}
                color='foreground'
              >
                {item.label}
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </Link>
            </NavbarItem>
          ))}
        </div>
      </NavbarContent>

      <NavbarContent
        className='hidden md:flex basis-1/5 sm:basis-full'
        justify='end'
      >
        <NavbarItem className='hidden sm:flex gap-2'>
          {user ? (
            <div className="flex items-center gap-2">
              <span className="text-sm text-default-600">
                {user.email}
              </span>
              <Button
                size="sm"
                variant="light"
                color="danger"
                onClick={logout}
              >
                Logout
              </Button>
            </div>
          ) : (
            <Button
              size="sm"
              color="primary"
              variant="solid"
              onClick={() => setShowAuthModal(true)}
            >
              Sign In
            </Button>
          )}
        </NavbarItem>
        <NavbarItem className='hidden sm:flex gap-2'>
          <ThemeSwitch />
        </NavbarItem>
        {/* Temporarily removed language switcher */}
        {/* <NavbarItem>
          <LocaleSwitcherFull />
        </NavbarItem> */}
      </NavbarContent>

      <NavbarContent className='md:hidden basis-1 pl-4' justify='end'>
        <NavbarItem>
          {user ? (
            <Button
              size="sm"
              variant="light"
              color="danger"
              onClick={logout}
            >
              Logout
            </Button>
          ) : (
            <Button
              size="sm"
              color="primary"
              variant="solid"
              onClick={() => setShowAuthModal(true)}
            >
              Sign In
            </Button>
          )}
        </NavbarItem>
        {/* Temporarily removed mobile language switcher */}
        {/* <NavbarItem>
          <LocaleSwitcher />
        </NavbarItem> */}
        <NavbarItem>
          <ThemeSwitch />
        </NavbarItem>
        <NavbarItem className='w-10 h-full'>
          <NavbarMenuToggle
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          />
        </NavbarItem>
      </NavbarContent>

      <NavbarMenu>
        <div className='mx-4 mt-2 flex flex-col gap-2'>
          {getVisibleNavItems().map((item, index) => (
            <NavbarMenuItem key={`${item}-${index}`}>
              <NextLink
                onClick={() => setIsMenuOpen(false)}
                href={item.href}
                data-active={isCurrentPath(item.href)}
                className={clsx(
                  linkStyles({ color: 'foreground' }),
                  'data-[active=true]:text-danger data-[active=true]:font-medium !text-3xl py-2'
                )}
              >
                {item.label}
              </NextLink>
            </NavbarMenuItem>
          ))}
          <hr className="my-4 border-gray-200 dark:border-gray-700" />
          <div className="text-lg font-semibold text-primary-600 dark:text-primary-400 mb-2">ILC Ecosystem</div>
          {siteConfig.ilcEcosystem.map((item, index) => (
            <NavbarMenuItem key={`ecosystem-${index}`}>
              <Link
                onClick={() => setIsMenuOpen(false)}
                href={item.href}
                isExternal
                className="!text-xl py-2 text-default-600 hover:text-primary-600 flex items-center gap-2"
              >
                {item.label}
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </Link>
            </NavbarMenuItem>
          ))}
        </div>
      </NavbarMenu>

      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onSuccess={() => {
          setShowAuthModal(false);
        }}
      />
    </NextUINavbar>
  );
};
