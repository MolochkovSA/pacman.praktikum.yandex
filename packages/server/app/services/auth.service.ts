import { SignInDto } from '../dto/auth.dto';

const API_URL: string = process.env.YANDEX_API_URL || '';
const authUrl: string = `${API_URL}/auth`;

const signIn = async (args: SignInDto): Promise<void> => {
  const res = await fetch(`${authUrl}/signin`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify(args)
  });

  console.log(res);
};

const logout = (): Promise<Response> => {
  return fetch(`${authUrl}/logout`, {
    credentials: 'include',
    method: 'POST'
  });
};

export const authService = { signIn, logout };
