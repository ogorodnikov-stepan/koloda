import { camelizeKeys, decamelizeKeys } from 'humps';
import { Domain, Operation } from 'features/app/app-types';
import validate from './validation';
import { request, RequestError, RequestExtra } from './request';

export async function validateMakeRequestCamelize(
  domain: Domain,
  operation: string,
  statusCodes: number[],
  params: object,
  extra: RequestExtra = {},
) : Promise<Record<string, any>> {
  if (extra.validationOnly) {
    return validate(domain, operation, decamelizeKeys(params));
  }
  return validateMakeRequest(domain, operation, statusCodes, params, extra)
    .then((r) => (r.ok ? r.json() : {}))
    .then(camelizeKeys);
}

export async function validateMakeRequest(
  domain: Domain,
  operation: Operation,
  statusCodes: number[],
  params: object,
  extra: RequestExtra = {},
) {
  return validate(domain, operation, decamelizeKeys(params))
    .then((validated) => {
      const requestParams = extra.isDemo ? camelizeKeys(validated) : validated;
      return request(domain, operation, requestParams, extra);
    })
    .then((response) => {
      if (statusCodes.includes(response.status)) {
        return response;
      }
      throw new RequestError(
        domain,
        `request.${operation}`,
        {
          status: response.status,
          meta: { responseObject: response },
        },
      );
    });
}
