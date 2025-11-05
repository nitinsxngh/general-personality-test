'use client';

import { Button } from '@nextui-org/button';
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader
} from '@nextui-org/modal';
import { Link } from '@nextui-org/link';
import { useEffect, useState } from 'react';
import { SettingsIcon } from './icons';
import { CookieConsentSettings } from './cookie-consent-settings';

export default function CookieBanner() {
  const [showBanner, setShowBanner] = useState(false);
  const [showCookieConsentSettings, setShowCookieConsentSettings] =
    useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Ensure this only runs on the client side
    setMounted(true);
    
    // Check for cookie consent after component mounts
    const checkCookieConsent = () => {
      if (typeof window !== 'undefined') {
        const storedCookieConsent = localStorage.getItem('cookie_consent');
        if (!storedCookieConsent) {
          // Small delay to ensure proper rendering
          setTimeout(() => {
            setShowBanner(true);
          }, 300);
        }
      }
    };

    checkCookieConsent();
  }, []);

  const handleAllowCookies = () => {
    localStorage.setItem('cookie_consent', 'accepted');
    setShowBanner(false);
  };

  const handleDeclineCookies = () => {
    localStorage.setItem('cookie_consent', 'declined');
    setShowBanner(false);
  };

  const handleSettings = () => {
    setShowBanner(false);
    setShowCookieConsentSettings(true);
  };

  // Don't render until mounted to avoid SSR issues
  if (!mounted) {
    return null;
  }

  return (
    <>
      <Modal
        isOpen={showBanner}
        placement='bottom'
        onOpenChange={setShowBanner}
        isDismissable={false}
        isKeyboardDismissDisabled
        hideCloseButton
        backdrop='opaque'
      >
        <ModalContent>
          <ModalHeader className='flex flex-col gap-1'>
            Cookie consent
          </ModalHeader>
          <ModalBody>
            <p>We use cookies on our site.</p>
            <p>
              Read more in our <Link href='/privacy'>privacy policy</Link>.
            </p>
          </ModalBody>
          <ModalFooter className='justify-start'>
            <div className='grow'>
              <Button
                variant='flat'
                startContent={<SettingsIcon />}
                onPress={handleSettings}
              >
                Preferences
              </Button>
            </div>
            <Button
              color='danger'
              variant='light'
              onPress={handleDeclineCookies}
            >
              Decline
            </Button>
            <Button color='primary' onPress={handleAllowCookies}>
              Accept all
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <CookieConsentSettings
        showCookieConsentSettings={showCookieConsentSettings}
        setShowCookieConsentSettings={setShowCookieConsentSettings}
      />
    </>
  );
}
