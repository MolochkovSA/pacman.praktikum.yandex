import { HttpError } from '@/shared/types';
import { API_PATH } from '@/shared/const/api';
import { SignInDto, SignUpRequestDto, SignUpResponseDto } from '../model/types';
import { signUpResponseDtoSchema } from '../model/schemas';

const authUrl: string = `${API_PATH}/auth`;

const signUp = async (args: SignUpRequestDto): Promise<SignUpResponseDto> => {
  const response = await fetch(`${authUrl}/signup`, {
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

  const data: unknown = await response.json();

  return signUpResponseDtoSchema.parse(data);
};

const signIn = async (args: SignInDto): Promise<void> => {
  const response = await fetch(`${authUrl}/signin`, {
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

const logout = async (): Promise<void> => {
  const response = await fetch(`${authUrl}/logout`, {
    credentials: 'include',
    method: 'POST'
  });

  if (!response.ok) {
    throw new HttpError(response.status, response.statusText);
  }
};

export const authApi = { signUp, signIn, logout };
