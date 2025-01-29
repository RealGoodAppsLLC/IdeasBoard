import React, { useCallback, useEffect, useState } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth } from '../config/firebase.ts';
import { AuthContext } from './AuthContext.tsx';

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchAuthed = useCallback(async (url: string, config: RequestInit) => {
    if (!user) {
      throw new Error("You must check that a user is being returned from useAuth() before attempting to make an authenticated API call.");
    }

    try {
      const idToken = await user.getIdToken();

      return fetch(url, {
        ...config,
        headers: {
          'Content-Type': 'application/json',
          'Accept': '*/*',
          ...config.headers,
          Authorization: `Bearer ${idToken}`,
        }
      });
    } catch (error) {
      console.warn("This person should be logged out, they are clearly no longer refreshing properly.", error);
      // auth.logout();
      return null;
    }

  }, [user]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe(); // Cleanup function to prevent memory leaks
  }, []);

  return <AuthContext.Provider value={{ user, loading, fetchAuthed }}>{children}</AuthContext.Provider>;
};
