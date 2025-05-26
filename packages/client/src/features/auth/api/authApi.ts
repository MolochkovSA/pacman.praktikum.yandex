import { HttpError } from '@/shared/types';
import { User, userSchema } from '@/entities/user';
import { SignInDto, SignUpRequestDto, SignUpResponseDto } from '../model/types';
import { signUpResponseDtoSchema } from '../model/schemas';

const apiUrl: string = import.meta.env.VITE_API_URL;
const authUrl: string = `${apiUrl}/auth`;

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

const me = async (): Promise<User> => {
  const response = await fetch(`${authUrl}/user`, {
    credentials: 'include',
    method: 'GET'
  });

  if (!response.ok) {
    throw new HttpError(response.status, response.statusText);
  }

  const data: unknown = await response.json();

  return userSchema.parse(data);
};

export const authApi = { signUp, signIn, logout, me };
