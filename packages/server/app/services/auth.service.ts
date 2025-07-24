import { SignInDto } from '../dto/auth.dto';

const API_URL: string = process.env.YANDEX_API_URL || '';
const authUrl: string = `${API_URL}/auth`;

const signIn = (args: SignInDto): Promise<Response> => {
  return fetch(`${authUrl}/signin`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify(args)
  });
};

const logout = ({ authCookie, uuid }: { authCookie: string; uuid: string }): Promise<Response> => {
  return fetch(`${authUrl}/logout`, {
    credentials: 'include',
    method: 'POST',
    headers: {
      Cookie: `authCookie=${authCookie}; uuid=${uuid}`
    }
  });
};

export const authService = { signIn, logout };
