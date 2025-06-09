import { FC, useEffect } from 'react';
import { Navigate } from 'react-router-dom';

import { Spinner } from '@/shared/ui';
import { useAppDispatch } from '@/shared/model/redux';
import { fetchUserThunk } from '@/entities/user';
import { useAuth } from '../hooks/useAuth';

export const withAuthGuard = <P extends object>(Component: FC<P>, block?: boolean): FC<P> => {
  return function ComponentWithAuth(props: P) {
    const dispatch = useAppDispatch();
    const { status, isAuth } = useAuth();

    useEffect(() => {
      if (!isAuth) dispatch(fetchUserThunk());
    }, [isAuth, dispatch]);

    if (status === 'idle' || status === 'pending') return <Spinner />;

    if (block && isAuth) {
      console.log('go to home');
      return <Navigate to="/" />;
    }

    if (!block && !isAuth) {
      console.log('go to login');

      return <Navigate to="/auth/login" />;
    }

    return <Component {...props} />;
  };
};
