import { FC } from 'react';
import { Navigate } from 'react-router-dom';

import { Spinner } from '@/shared/ui';
import { useAuth } from '../hooks/useAuth';

export const withAuthGuard = <P extends object>(Component: FC<P>, block?: boolean): FC<P> => {
  return function ComponentWithAuth(props: P) {
    const { status, isAuth } = useAuth();

    if (status === 'idle' || status === 'pending') return <Spinner />;

    if (block && isAuth) return <Navigate to="/" />;

    if (!block && !isAuth) return <Navigate to="/auth/login" />;

    return <Component {...props} />;
  };
};
