'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { 
  User, 
  signInWithCustomToken,
  signOut, 
  onAuthStateChanged 
} from 'firebase/auth';
import { auth } from '@/lib/firebase';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  beginLogin: (returnTo?: string) => void;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let attemptedSso = false;
    const authInitTimeout = window.setTimeout(() => setLoading(false), 6000);

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      window.clearTimeout(authInitTimeout);
      setUser(user);

      if (!user && !attemptedSso) {
        attemptedSso = true;
        try {
          const controller = new AbortController();
          const timeout = window.setTimeout(() => controller.abort(), 4000);

          const res = await fetch('/api/auth/customToken', {
            method: 'POST',
            credentials: 'include',
            signal: controller.signal
          }).finally(() => window.clearTimeout(timeout));

          const data = await res.json();
          if (res.ok && data?.customToken) {
            await signInWithCustomToken(auth, data.customToken);
            return;
          }
        } catch {
          // ignore
        }
      }

      setLoading(false);
    });

    return () => {
      window.clearTimeout(authInitTimeout);
      unsubscribe();
    };
  }, []);

  const beginLogin = (returnTo?: string) => {
    if (typeof window === 'undefined') return;
    const rt = returnTo || window.location.href;
    window.location.assign(
      `https://auth.ilc.limited/login?returnTo=${encodeURIComponent(rt)}`
    );
  };

  const logout = async () => {
    // Clear local Firebase state, then clear the shared session cookie via ilc-auth.
    await signOut(auth);
    if (typeof window !== 'undefined') {
      const returnTo = window.location.origin;
      window.location.assign(
        `https://auth.ilc.limited/logout?returnTo=${encodeURIComponent(returnTo)}`
      );
    }
  };

  const value = {
    user,
    loading,
    beginLogin,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
