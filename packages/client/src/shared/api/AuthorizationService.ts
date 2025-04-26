export class AuthorizationService {
  private _URL: string;

  get URL(): string {
    return `${this._URL}api/v2/auth`;
  }

  constructor() {
    this._URL = SERVER_API_URL;
  }
}
