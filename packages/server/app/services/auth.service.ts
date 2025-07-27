import { SignInDto, SignInWithYandexRequestDto, SignUpRequestDto } from '../dto/auth.dto';

const API_URL: string = process.env.YANDEX_API_URL || '';
const authUrl: string = `${API_URL}/auth`;

const me = ({ authCookie, uuid }: { authCookie: string; uuid: string }): Promise<Response> => {
  return fetch(`${authUrl}/user`, {
    credentials: 'include',
    headers: {
      Cookie: `authCookie=${authCookie}; uuid=${uuid}`
    }
  });
};

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

const signUp = (args: SignUpRequestDto): Promise<Response> => {
  return fetch(`${authUrl}/signup`, {
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

const signInWithYandex = async (args: SignInWithYandexRequestDto): Promise<Response> => {
  return fetch(`${API_URL}/oauth/yandex`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify(args)
  });
};

export const authService = { signIn, signUp, logout, me, signInWithYandex };
