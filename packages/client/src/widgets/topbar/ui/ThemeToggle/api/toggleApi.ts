import { HttpError } from '@/shared/types';
import { PACMAN_API_URL } from '@/shared/const/api';
import { UserId } from '@/entities/user';
import { ThemeName, UserThemeDto, UserThemeResponseDto } from '../types';

const THEME_API_URL = `${PACMAN_API_URL}/user/theme`;

export const getUserTheme = async (userId: UserId): Promise<UserThemeResponseDto> => {
  const response = await fetch(`${THEME_API_URL}/${userId}`, {
    method: 'get',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    }
  });

  if (!response.ok) {
    throw await HttpError.setMessage(response);
  }

  const data = await response.json();

  return data;
};

export const setUserTheme = async (theme: ThemeName, id: UserId) => {
  const body: UserThemeDto = {
    externalUserId: String(id),
    themeId: theme === 'light' ? 1 : 2
  };
  const response = await fetch(`${THEME_API_URL}`, {
    method: 'post',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify(body)
  });

  if (!response.ok) {
    throw await HttpError.setMessage(response);
  }

  const data = await response.json();

  return data;
};
