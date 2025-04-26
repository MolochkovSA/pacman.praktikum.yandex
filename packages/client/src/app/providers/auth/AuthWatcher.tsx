import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { userStoreService } from '@/shared/lib';

export function AuthWatcher() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!userStoreService.isAuthenticated() && location.pathname !== '/login' && location.pathname !== '/signup') {
      navigate('/login');
    }
  }, [navigate, location]);

  return null;
}
