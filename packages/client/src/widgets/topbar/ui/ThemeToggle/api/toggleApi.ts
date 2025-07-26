import { HttpError } from '@/shared/types';
import { API_PATH } from '@/shared/const/api';
import { UserId } from '@/entities/user';
import { UserThemeDto, UserThemeResponseDto } from '../types';
import { Theme } from '@/app/providers/ThemeProvider/ThemeContext';

const THEME_API_URL = `${API_PATH}/user/theme`;

export const getUserTheme = async (userId: UserId): Promise<UserThemeResponseDto> => {
  const response = await fetch(`${THEME_API_URL}/${userId}`, {
    credentials: 'include'
  });

  if (!response.ok) {
    throw await HttpError.setMessage(response);
  }

  const data = await response.json();

  return data;
};

export const setUserTheme = async (theme: Theme, id: UserId): Promise<UserThemeResponseDto> => {
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

  const data: UserThemeResponseDto = await response.json();

  return data;
};
