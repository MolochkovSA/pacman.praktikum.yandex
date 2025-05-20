import { SERVER_API_URL } from '@/shared/consts';
import { UserDto } from '@/entities/user/model/dto.ts';
import { HttpError } from '@/shared/types';
import { User } from '@/entities/user';
import { SignInProps, SignUpProps } from '@/entities/user/model/types.ts';

export class AuthorizationService {
  private _URL: string;

  get URL(): string {
    return `${this._URL}/api/v2/auth`;
  }

  constructor() {
    this._URL = SERVER_API_URL;
  }

  getUser(): Promise<User> {
    return fetch(`${this.URL}/user`, { method: 'GET', credentials: 'include' }).then((response) => {
      if (response.ok) {
        return response.json().then((res) => UserDto.parse(res));
      }
      throw new HttpError(response.status, response.statusText);
    });
  }

  signUp(user: SignUpProps) {
    return fetch(`${this.URL}/signup`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify(user)
    }).then((response) => {
      if (response.ok) {
        return response.json() as Promise<{ id: number }>;
      }
      throw new HttpError(response.status, response.statusText);
    });
  }

  signIn(user: SignInProps) {
    return fetch(`${this.URL}/signin`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify(user)
    }).then((response) => {
      if (response.ok) {
        return response;
      }
      throw new HttpError(response.status, response.statusText);
    });
  }

  logout() {
    return fetch(`${this.URL}/logout`, {
      credentials: 'include',
      method: 'POST'
    }).then((response) => {
      if (response.ok) {
        return response;
      }
      throw new HttpError(response.status, response.statusText);
    });
  }
}

export const authService = new AuthorizationService();
