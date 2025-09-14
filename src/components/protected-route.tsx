'use client';

import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { AuthModal } from './auth-modal';
import { Button } from '@nextui-org/react';
import { ArrowRightIcon } from './icons';

interface ProtectedRouteProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  fallback 
}) => {
  const { user, loading } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mx-auto mb-4"></div>
          <p className="text-default-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    if (fallback) {
      return <>{fallback}</>;
    }

    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-primary-50 to-primary-100 dark:from-primary-900 dark:to-primary-800">
        <div className="max-w-md mx-auto p-8 text-center">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-primary-600 mb-4">
              Authentication Required
            </h1>
            <p className="text-default-600 mb-6">
              Please sign in or create an account to access the personality assessment.
            </p>
          </div>
          
          <Button
            color="primary"
            size="lg"
            className="w-full mb-4"
            onClick={() => setShowAuthModal(true)}
            endContent={<ArrowRightIcon />}
          >
            Sign In / Create Account
          </Button>
          
          <p className="text-sm text-default-500">
            Your data is secure and will only be used for personalized career recommendations.
          </p>
        </div>

        <AuthModal
          isOpen={showAuthModal}
          onClose={() => setShowAuthModal(false)}
          onSuccess={() => {
            // User successfully authenticated
            setShowAuthModal(false);
          }}
        />
      </div>
    );
  }

  return <>{children}</>;
};
