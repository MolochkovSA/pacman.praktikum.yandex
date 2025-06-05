import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import { HttpError } from '@/shared/types';
import { useAppDispatch, useAppSelector } from '@/shared/model/redux';
import { useNotification } from '@/entities/notification';
import { fetchUserThunk, userActions, userSelectors } from '@/entities/user';
import { SignInDto, SignUpRequestDto } from '../model/types';
import { authApi } from '../api/authApi';

export const useAuth = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const user = useAppSelector(userSelectors.selectUser);
  const status = useAppSelector(userSelectors.selectStatus);
  const { notify } = useNotification();

  const signIn = useCallback(
    async (args: SignInDto): Promise<void> => {
      try {
        await authApi.signIn(args);
        dispatch(fetchUserThunk());
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
    [dispatch, navigate, notify]
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
    dispatch(userActions.clearState());
    navigate('/auth/login');
  }, [navigate, dispatch]);

  return { status, user, isAuth: Boolean(user), signIn, signUp, logout };
};
