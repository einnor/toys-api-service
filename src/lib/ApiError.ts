export class ApiError extends Error {
  public data: any;
  public type?: string;
  public shouldAlert?: boolean;
  public responseStatus: 400 | 404 | 500 = 500;

  constructor(message: string, data?: any, responseStatus: 400 | 404 | 500 = 500, shouldAlert: boolean = true) {
    super(message);

    this.data = data;
    this.name = this.constructor.name;
    this.responseStatus = responseStatus;
    this.shouldAlert = shouldAlert;

    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, this.constructor);
    } else {
      this.stack = new Error(message).stack;
    }
  }

  public toString() {
    return this.message;
  }
}
