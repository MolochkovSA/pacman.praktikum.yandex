import { HttpError, User } from '@/shared/types';
import { SERVER_API_URL } from '@/shared/consts';

export class AuthorizationService {
  private _URL: string;

  get URL(): string {
    return `${this._URL}/api/v2/auth`;
  }

  constructor() {
    this._URL = SERVER_API_URL;
  }

  getUser(): Promise<User> {
    return fetch(`${this.URL}/user`, { method: 'GET' }).then((response) => {
      if (response.ok) {
        return response.json() as Promise<User>;
      }
      throw new HttpError(response.status, response.statusText);
    });
  }
}
