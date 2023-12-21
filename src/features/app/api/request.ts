import { requests, config } from 'config/fetch';
import { Domain, Operation } from 'features/app/app-types';
import AppError, { ErrorCode } from 'features/app/error/error';

export type Endpoint = string;

export type HTTPMethod = 'get' | 'post' | 'put' | 'PATCH' | 'delete';

export type HTTPBody = Record<string, any> | Array<any>;

export type HTTPParams = Record<string, any>;

export type Request = (p: HTTPParams, e: any) => Promise<any>;

export type Requests = Record<string, Request>;

export interface RequestExtra extends Record<string, any> {
  isDemo?: boolean;
  validationOnly?: boolean;
}

export function httpRequest(
  method: HTTPMethod,
  endpoint: Endpoint,
  params: HTTPParams = {},
) {
  const { body = null, headers = {}, ...extra } = params;
  const options = {
    method,
    headers: {
      ...config.headers(),
      ...headers,
    },
    body: body ? JSON.stringify(body) : undefined,
    ...extra,
  };

  return window.fetch(endpoint, options);
}

export function get(
  endpoint: Endpoint,
  extra: RequestExtra,
) {
  return httpRequest('get', endpoint, extra);
}

export function post(
  endpoint: Endpoint,
  body: HTTPBody,
  extra: RequestExtra,
) {
  return httpRequest('post', endpoint, { body, ...extra });
}

export function put(
  endpoint: Endpoint,
  body: HTTPBody,
  extra: RequestExtra,
) {
  return httpRequest('put', endpoint, { body, ...extra });
}

export function patch(
  endpoint: Endpoint,
  body: HTTPBody,
  extra: RequestExtra,
) {
  return httpRequest('PATCH', endpoint, { body, ...extra });
}

export function del(
  endpoint: Endpoint,
  extra: RequestExtra,
) {
  return httpRequest('delete', endpoint, { ...extra });
}

export function request(
  domain: Domain,
  operation: Operation,
  params: any,
  extra: RequestExtra,
) {
  const domains = extra.isDemo ? requests.storage : requests.backend;
  if (typeof domains[domain][operation] === 'function') {
    return domains[domain][operation](params, extra)
      .catch((error: Error) => {
        throw new AppError(
          'app',
          'request.fetch',
          { meta: { errorObject: error } },
        );
      });
  }
  throw new AppError(
    'app',
    'request.misssing',
    { meta: { domain, operation } },
  );
}

export function qs(values: Record<string, any>, keys?: Array<string>) {
  if (typeof values !== 'object' || !values) return '';

  const filtered = Array.isArray(keys)
    ? keys.reduce((acc, x) => ((x in values) ? { ...acc, [x]: values[x] } : acc), {})
    : values;

  const queryString = new URLSearchParams(filtered).toString();
  return queryString ? `?${queryString}` : '';
}

export class RequestError extends AppError {
  constructor(
    domain: Domain,
    code: ErrorCode,
    extra = {},
  ) {
    super(domain, code, extra);
  }
}
