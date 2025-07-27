import { HttpError } from '@/shared/types';
import { getServiceIdSchema } from '@/features/auth/model/schemas.ts';
import { API_PATH, YANDEX_API_URL, YANDEX_REDIRECT_URL } from '@/shared/const/api';
import { OAuthYandexRequestDto, ServiceId } from '../model/types';

const authUrl: string = `${YANDEX_API_URL}/oauth`;

const getYandexClientId = async (): Promise<ServiceId> => {
  const response = await fetch(`${authUrl}/yandex/service-id`);

  if (!response.ok) {
    throw new HttpError(response.status, response.statusText);
  }

  const data: unknown = await response.json();

  return getServiceIdSchema.parse(data);
};

const signInWithYandex = async (code: string): Promise<void> => {
  const body: OAuthYandexRequestDto = { code, redirect_uri: YANDEX_REDIRECT_URL };

  const response = await fetch(`${API_PATH}/auth/signin/yandex`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify(body)
  });

  if (!response.ok) {
    throw new HttpError(response.status, response.statusText);
  }
};

export const yandexOauthApi = { getYandexClientId, signInWithYandex };
