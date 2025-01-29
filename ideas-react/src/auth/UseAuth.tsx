// Custom hook for easy access to auth state
import { useContext } from 'react';
import { AuthContext } from './AuthContext.tsx';

export const useAuth = () => useContext(AuthContext);