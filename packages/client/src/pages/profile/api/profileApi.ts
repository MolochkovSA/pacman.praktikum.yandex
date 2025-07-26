import { API_PATH } from '@/shared/const/api';
import { User, userSchema } from '@/entities/user';
import { HttpError } from '@/shared/types';
import { PasswordRequestDto, Profile } from '../model/types';

const userUrl: string = `${API_PATH}/user`;

const editProfile = async (profile: Profile): Promise<User> => {
  const response = await fetch(`${userUrl}/profile`, {
    method: 'PUT',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify(profile)
  });

  if (!response.ok) {
    throw await HttpError.setMessage(response);
  }

  const data: unknown = await response.json();

  return userSchema.parse(data);
};

const changePassword = async (data: PasswordRequestDto): Promise<void> => {
  const response = await fetch(`${userUrl}/password`, {
    method: 'PUT',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify(data)
  });

  if (!response.ok) {
    throw await HttpError.setMessage(response);
  }
};

const updateAvatar = async (file: File): Promise<User> => {
  const formData = new FormData();
  formData.append('avatar', file);

  const response = await fetch(`${userUrl}/profile/avatar`, {
    method: 'PUT',
    credentials: 'include',
    body: formData
  });

  if (!response.ok) {
    throw await HttpError.setMessage(response);
  }

  const data: unknown = await response.json();

  return userSchema.parse(data);
};

export const profileApi = { editProfile, changePassword, updateAvatar };
