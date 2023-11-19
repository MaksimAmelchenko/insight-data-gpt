import { CustomError } from './custom-error';

export class BadGatewayError extends CustomError {
  static status = 502;
  static code = 'badGateway';

  constructor();
  constructor(message: string);
  constructor(params: Record<string, unknown>);
  constructor(message: string, params: Record<string, unknown>);
  constructor(messageOrParams?: string | Record<string, unknown>, params?: Record<string, unknown>) {
    super(BadGatewayError.status, BadGatewayError.code, messageOrParams, params);
  }
}
