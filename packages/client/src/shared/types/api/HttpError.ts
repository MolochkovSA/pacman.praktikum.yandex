export class HttpError extends Error {
  status: number;

  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }

  static async setMessage(response: Response): Promise<HttpError> {
    let reason;

    const data = await response.json();
    if (data?.reason) {
      console.log(data);
      reason = data.reason;
    } else {
      reason = response.statusText || 'Unknown error';
    }
    console.log(reason);
    return new HttpError(response.status, reason);
  }
}
