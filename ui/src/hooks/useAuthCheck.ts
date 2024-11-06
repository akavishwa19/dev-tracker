import { useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';

export const useAuthCheck = () => {
  const { loadUser } = useAuth();

  useEffect(() => {
    loadUser();
  }, [loadUser]);
};
