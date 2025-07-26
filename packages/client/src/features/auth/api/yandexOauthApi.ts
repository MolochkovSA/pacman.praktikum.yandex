import { HttpError } from '@/shared/types';
import { getServiceIdSchema } from '@/features/auth/model/schemas.ts';

const apiUrl: string = import.meta.env.VITE_YANDEX_API_URL;
const redirectUri: string = import.meta.env.VITE_HOST_URL;
const authUrl: string = `${apiUrl}/oauth`;

const getYandexClientId = async (): Promise<{ service_id: string }> => {
  const response = await fetch(`${authUrl}/yandex/service-id`, {
    method: 'GET'
  });

  if (!response.ok) {
    throw new HttpError(response.status, response.statusText);
  }

  const data: unknown = await response.json();

  return getServiceIdSchema.parse(data);
};

const signInWithYandex = async (args: { code: string; redirect_uri: string }): Promise<void> => {
  const response = await fetch(`${authUrl}/yandex`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify(args)
  });

  if (!response.ok) {
    throw new HttpError(response.status, response.statusText);
  }
};

export const yandexOauthApi = { getYandexClientId, redirectUri, signInWithYandex };
