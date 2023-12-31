import { ApiError, ApiErrors, CoreError } from '../core/errors';
import { AuthRepository } from './auth-repository';
import { ManageableStore } from '../core/manageable-store';

/**
 * This is some syntax sugar for all api stores
 * Basically, class is responsible for processing fetch results
 * and transforming it into eatable form
 */

export function isFormData(data: any): data is FormData {
  return data instanceof FormData;
}

interface IAppError {
  code: string;
  status: number;
  message: string;
  moreInfo?: string;
  stack?: string;
  data?: any;
}

const apiServer = process.env.NX_API_SERVER;

export abstract class ApiRepository extends ManageableStore {
  static storeName = 'ApiRepository';

  fetch<T>(params: {
    url: string;
    method?: string;
    body?: object | FormData;
    responseTypeCheck?: ((a: any) => boolean)[];
  }): Promise<T> {
    const { url, method = 'GET', body, responseTypeCheck = null } = params;
    const data: FormData | string = isFormData(body) ? body : JSON.stringify(body);
    return window
      .fetch(`${apiServer}${url}`, {
        headers: this.headers(isFormData(body)),
        method,
        body: data,
        credentials: 'include',
      })
      .then((response: Response) => {
        if (!response.ok) {
          return this.processError(response);
        }

        const contentType = response.headers.has('Content-Type') && response.headers.get('Content-Type');
        if (contentType && contentType.indexOf('application/json') > -1) {
          return Array.isArray(responseTypeCheck)
            ? response.json().then(json => {
                return responseTypeCheck.find(isResponse => !isResponse)
                  ? Promise.reject(new CoreError(`Bad response form API ${JSON.stringify(json)}`))
                  : json;
              })
            : response.json();
        }
        return response.text();
      });
  }

  private headers(isFormData: boolean) {
    const authRepository = this.getStore(AuthRepository);

    const headers: { [key: string]: string } = !isFormData
      ? {
          'Content-Type': 'application/json',
        }
      : {};

    if (authRepository.hasAuth) {
      headers['Authorization'] = `Bearer ${authRepository.accessToken}`;
    }

    return headers;
  }

  private processError(response: any): any {
    if (!response.ok) {
      for (const errorClass in ApiErrors) {
        const apiClass = (ApiErrors as any)[errorClass];
        if (apiClass.status === response.status) {
          const apiErrorClass = (ApiErrors as any)[errorClass];
          return response.json().then(({ error }: { error: IAppError }) => {
            if (
              apiErrorClass.status === 401 &&
              [
                //
                'jsonWebTokenError',
                'sessionClosed',
                'sessionNotFound',
                'sessionTimeout',
              ].includes(error.code)
            ) {
              this.getStore(AuthRepository).clearAuth();
              switch (error.code) {
                case 'sessionTimeout': {
                  throw new Error('Session Timeout');
                }
                case 'sessionClosed': {
                  throw new Error('Session closed');
                }
                case 'sessionNotFound': {
                  throw new Error('Session not found');
                }
                case 'jsonWebTokenError': {
                  throw new Error('Invalid authorization');
                }
              }
            }
            throw new apiErrorClass(error.message, error.code, error.data);
          });
        }
      }

      if (response instanceof TypeError && response.message === 'Network request failed') {
        throw new ApiErrors.NetworkError(response.message, '0');
      }

      return response.json().then((error: IAppError) => {
        throw new ApiError(error.status, error.message, error.data);
      });
    }

    return response;
  }

  clear(): void {}
}
