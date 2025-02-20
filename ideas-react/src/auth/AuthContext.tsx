import { User } from 'firebase/auth';
import { createContext } from 'react';

interface AuthContextType {
  user: User | null;
  fetchAuthed: (url: string, config?: RequestInit) => Promise<Response | null>;
  loading: boolean;
  signup: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  fetchAuthed: () => {
    return Promise.resolve(null);
  },
  signup: () => {
    return Promise.resolve();
  },
  logout: () => {
    return Promise.resolve();
  }
});

