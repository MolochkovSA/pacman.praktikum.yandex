import { FC, useEffect } from 'react';
import { Navigate } from 'react-router-dom';

import { RoutePath } from '@/shared/config/routeConfig';
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

    if (block && isAuth) return <Navigate to={RoutePath.MAIN} />;

    if (!block && !isAuth) return <Navigate to={RoutePath.AUTH.LOGIN} />;

    return <Component {...props} />;
  };
};
