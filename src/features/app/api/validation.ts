import Ajv, { DefinedError } from 'ajv';
import addFormats from 'ajv-formats';
import { domains, config } from 'config/jsonschema';
import get from 'lodash.get';
import set from 'lodash.set';

import AppError, { ErrorCode, ErrorExtra } from 'features/app/error/error';
import { Domain, Entity, Schema } from 'features/app/app-types';

export class ValidationError extends AppError {
  constructor(
    domain: Domain,
    code: ErrorCode,
    extra: ErrorExtra = {},
  ) {
    super(domain, code, extra);
  }
}

export default function validateSchema(domain: Domain, entity: Entity, params: any) : Promise<any> {
  return new Promise((resolve, reject) => {
    try {
      const [isValid, errors, data] = compileAndValidate(domains[domain], entity, params);
      if (isValid) {
        resolve(data);
      } else {
        reject(
          new ValidationError(
            domain,
            `validation.${entity}`,
            { meta: { errors: mapErrors(errors) } },
          ),
        );
      }
    } catch (error: any) {
      reject(
        new AppError(
          'app',
          'validation.schema.invalid',
          { message: error.message },
        ),
      );
    }
  });
}

function compileAndValidate(schema: Schema, entity: Entity, params: any) {
  const ajv = new Ajv(config);
  addFormats(ajv);
  const validateFunction = ajv.compile(schema);
  const data = { [entity]: params };
  const isValid = validateFunction(data);
  return [isValid, validateFunction.errors, data[entity]];
}

export function mapErrors(errors: DefinedError[] | null | undefined) {
  const reducer = (acc: object, x: DefinedError) => {
    const [, ...path] = x.instancePath.split('/');
    if (x.keyword === 'required') path.push(x.params.missingProperty);
    const value = get(acc, path) || [];
    value.push(x.keyword);
    set(acc, path, value);
    return acc;
  };
  return errors && errors.reduce(reducer, {});
}
