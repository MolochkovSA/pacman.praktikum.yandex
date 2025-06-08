import { useNavigate } from 'react-router-dom';
import { useNotification } from '@/entities/notification';
import { useCallback } from 'react';
import { HttpError } from '@/shared/types';
import { useAuth } from '@/features/auth';
import { RoutePath } from '@/shared/config/routeConfig.ts';
import { yandexOauthApi } from '@/features/auth/api/yandexOauthApi.ts';
import { authApi } from '@/features/auth/api/authApi.ts';

export const useYandexAuth = () => {
  const navigate = useNavigate();
  const { me } = useAuth();
  const { notify } = useNotification();

  const URL = (CLIENT_ID: string) => {
    return `https://oauth.yandex.ru/authorize?response_type=code&client_id=${CLIENT_ID}&redirect_uri=${yandexOauthApi.redirectUri}`;
  };

  const redirectOnYandexOauth = useCallback(async () => {
    try {
      const response = await yandexOauthApi.getYandexClientId();
      document.location.href = URL(response.service_id);
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
        await yandexOauthApi.signInWithYandex({ code, redirect_uri: yandexOauthApi.redirectUri });
        await me();
      } catch (error) {
        if (error instanceof HttpError) {
          if (error.status === 401) {
            notify('Неправильный логин или пароль');
          } else if (error.status === 400) {
            notify('Такого redirect uri нет или указан неверный код');
            authApi.logout().then(() => navigate(RoutePath.AUTH.LOGIN));
          } else if (error.status / 100 === 5) {
            notify('Ошибка сервера');
            navigate(RoutePath.SERVER_ERROR);
          }
        }
      }
    },
    [me, navigate, notify]
  );

  return { redirectOnYandexOauth, signInWithYandex };
};
