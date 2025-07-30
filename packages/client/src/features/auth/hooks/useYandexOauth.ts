import { useNavigate } from 'react-router-dom';
import { useNotification } from '@/entities/notification';
import { useCallback } from 'react';
import { HttpError } from '@/shared/types';
import { useAuth } from '@/features/auth';
import { RoutePath } from '@/shared/config/routeConfig.ts';
import { yandexOauthApi } from '@/features/auth/api/yandexOauthApi.ts';
import { YANDEX_REDIRECT_URL } from '@/shared/const/api';
import { useAppDispatch } from '@/shared/model/redux';
import { fetchUserThunk } from '@/entities/user';

export const useYandexAuth = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { logout } = useAuth();
  const { notify } = useNotification();

  const redirectOnYandexOauth = useCallback(async () => {
    try {
      const response = await yandexOauthApi.getYandexClientId();
      console.log('clientId', response.service_id);
      const encodedRedirectUri = encodeURIComponent(YANDEX_REDIRECT_URL);

      document.location.href = `https://oauth.yandex.ru/authorize?response_type=code&client_id=${response.service_id}&redirect_uri=${encodedRedirectUri}`;
    } catch (error) {
      if (error instanceof HttpError) {
        if (error.status === 400) {
          notify('Такой redirect uri не зарегестрирован');
        } else if (error.status / 100 === 5) {
          notify('Ошибка сервера');
          navigate(RoutePath.SERVER_ERROR);
        }
      }
    }
  }, [navigate, notify]);

  const signInWithYandex = useCallback(
    async (code: string) => {
      try {
        await yandexOauthApi.signInWithYandex(code);
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
            notify('Такого redirect uri нет или указан неверный код');
            await logout();
          } else if (error.status / 100 === 5) {
            notify('Ошибка сервера');
            navigate(RoutePath.SERVER_ERROR);
          }
        }
      }
    },
    [navigate, notify, logout, dispatch]
  );

  return { redirectOnYandexOauth, signInWithYandex };
};
