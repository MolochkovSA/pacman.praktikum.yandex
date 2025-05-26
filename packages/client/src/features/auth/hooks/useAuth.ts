import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { HttpError, User } from '@/shared/types';
import { useNotification } from '@/entities/notification';
import { userActions, userSelectors } from '@/entities/user';
import { SignInDto, SignUpRequestDto } from '../model/types';
import { authApi } from '../api/authApi';
import { useCallback } from 'react';

export const useAuth = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector(userSelectors.selectUser);
  const status = useSelector(userSelectors.selectStatus);
  const { notify } = useNotification();

  const me = useCallback(async (): Promise<Nullable<User>> => {
    if (user) return user;

    dispatch(userActions.setPendingStatus());

    try {
      const user = await authApi.me();
      dispatch(userActions.setUser(user));
      dispatch(userActions.setSucceededStatus());
    } catch (error) {
      dispatch(userActions.setFailedStatus());
      console.error(error);
      return null;
    }
  }, [dispatch, user]);

  const signIn = useCallback(
    async (args: SignInDto): Promise<void> => {
      try {
        await authApi.signIn(args);
        await me();
      } catch (error) {
        if (error instanceof HttpError) {
          if (error.status === 401) {
            notify('Неправильный логин или пароль');
          } else if (error.status === 400) {
            notify('Пользователь уже авторизован');
            authApi.logout().then(() => navigate('/auth/login'));
          } else if (error.status / 100 === 5) {
            notify('Ошибка сервера');
            navigate('/500');
          }
        }
      }
    },
    [me, navigate, notify]
  );

  const signUp = useCallback(
    async (data: SignUpRequestDto) => {
      await authApi.signUp(data);
      navigate('/');
    },
    [navigate]
  );

  const logout = useCallback(async () => {
    await authApi.logout();
    dispatch(userActions.setUser(null));
    navigate('/auth/login');
  }, [navigate, dispatch]);

  return { status, user, isAuth: Boolean(user), me, signIn, signUp, logout };
};
