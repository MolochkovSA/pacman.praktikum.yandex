import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { RoutePath } from '@/shared/config/routeConfig';
import { useAppDispatch, useAppSelector } from '@/shared/model/redux';
import { HttpError } from '@/shared/types';
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
        const resultAction = await dispatch(fetchUserThunk());

        if (fetchUserThunk.fulfilled.match(resultAction)) {
          navigate(RoutePath.MAIN);
        } else {
          navigate(RoutePath.AUTH.LOGIN);
        }
      } catch (error) {
        if (error instanceof HttpError) {
          if (error.status === 401) {
            notify('Неправильный логин или пароль');
          } else if (error.status === 400) {
            notify('Пользователь уже авторизован');
            authApi.logout().then(() => navigate(RoutePath.AUTH.LOGIN));
          } else if (error.status / 100 === 5) {
            notify('Ошибка сервера');
            navigate(RoutePath.SERVER_ERROR);
          }
        }
      }
    },
    [dispatch, navigate, notify]
  );

  const signUp = useCallback(
    async (data: SignUpRequestDto) => {
      await authApi.signUp(data);
      navigate(RoutePath.MAIN);
    },
    [navigate]
  );

  const logout = useCallback(async () => {
    await authApi.logout();
    dispatch(userActions.clearState());
    navigate(RoutePath.AUTH.LOGIN);
  }, [navigate, dispatch]);

  return { status, user, isAuth: Boolean(user), signIn, signUp, logout };
};
