export class CoreError implements Error {
  name = '';
  message: string;

  constructor(protected description: string) {
    this.message = description;
  }

  public getErrorType(): string {
    return 'CoreError';
  }

  toString() {
    return `${this.getErrorType()}: ${this.description}`;
  }
}

export class ApiError extends CoreError {
  static readonly status: number = 0;

  constructor(
    protected httpStatus: number,
    protected override description: string,
    public code?: string,
    public data?: any,
  ) {
    super(`${httpStatus} ${description}`);
  }

  override getErrorType(): string {
    return 'ApiError';
  }
}

export const ApiErrors = {
  NetworkError: class NetworkError extends ApiError {
    constructor(description: string, code: string) {
      super(0, `NetworkError: ${description}`, code);
    }
  },
  InvalidRequest: class InvalidRequest extends ApiError {
    static override readonly status = 400;

    constructor(description: string, code: string, data: any) {
      super(InvalidRequest.status, description, code, data);
    }
  },

  Unauthorized: class Unauthorized extends ApiError {
    static override readonly status = 401;

    constructor(description: string, code: string) {
      super(Unauthorized.status, description, code);
    }
  },

  Forbidden: class Forbidden extends ApiError {
    static override readonly status = 403;

    constructor(description: string, code: string) {
      super(Forbidden.status, description, code);
    }
  },

  NotFound: class NotFound extends ApiError {
    static override readonly status = 404;

    constructor(description: string, code: string, data: any) {
      super(NotFound.status, description, code, data);
    }
  },

  Expired: class Expired extends ApiError {
    static override readonly status = 410;

    constructor(description: string, code: string) {
      super(Expired.status, description, code);
    }
  },

  ConflictError: class ConflictError extends ApiError {
    static override readonly status = 409;

    constructor(description: string, code: string, data: any) {
      super(ConflictError.status, description, code, data);
    }
  },

  ServerError: class ServerError extends ApiError {
    static override readonly status = 500;

    constructor(description: string, code: string, data: any) {
      super(ServerError.status, description, code, data);
    }
  },

  ServiceUnavailableError: class ServiceUnavailableError extends ApiError {
    static override readonly status = 503;

    constructor(description: string, code: string) {
      super(ServiceUnavailableError.status, description, code);
    }
  },
};
