import React, { useCallback, useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, onAuthStateChanged, signOut, User } from 'firebase/auth';
import { auth } from '../config/firebase.ts';
import { AuthContext } from './AuthContext.tsx';

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const logout = useCallback(async () => {
    await signOut(auth);
  }, []);

  const fetchAuthed = useCallback(async (url: string, config?: RequestInit) => {
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
          ...config?.headers,
          Authorization: `Bearer ${idToken}`,
        }
      });
    } catch (error) {
      await logout();
      return null;
    }

  }, [logout, user]);

  const signup = useCallback(async (email: string, password: string) => {
    if (user) {
      throw new Error("You are already logged in.");
    }

    await createUserWithEmailAndPassword(auth, email, password);
  }, [user]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe(); // Cleanup function to prevent memory leaks
  }, []);

  return <AuthContext.Provider value={{ user, loading, fetchAuthed, signup, logout }}>{children}</AuthContext.Provider>;
};
