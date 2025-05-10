import { User } from '@/shared/types';

class UserStoreService {
  private _user: User | null = null;

  get user(): User | null {
    return this._user;
  }

  set user(user: User | null) {
    this._user = user;
  }

  isAuthenticated() {
    return !!this._user;
  }
}

export const userStoreService = new UserStoreService();
