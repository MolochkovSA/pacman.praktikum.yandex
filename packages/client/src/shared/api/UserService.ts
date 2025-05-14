import { HttpError, User, PasswordProps } from '../types';
import { SERVER_API_URL } from '@/shared/consts';

export class UserService {
  private _URL: string;

  get URL(): string {
    return `${this._URL}/api/v2/user`;
  }

  constructor() {
    this._URL = SERVER_API_URL;
  }

  changePassword(data: PasswordProps) {
    return fetch(`${this.URL}/password`, {
      method: 'PUT',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify(data)
    }).then(async (response) => {
      if (response.ok) {
        return response;
      }
      throw await HttpError.setMessage(response);
    });
  }

  updateAvatar(file: File): Promise<User> {
    const formData = new FormData();
    formData.append('avatar', file);

    return fetch(`${this.URL}/profile/avatar`, {
      method: 'PUT',
      credentials: 'include',
      body: formData
    }).then(async (response) => {
      if (response.ok) {
        return response.json() as Promise<User>;
      }
      throw await HttpError.setMessage(response);
    });
  }
}

export const userService = new UserService();
