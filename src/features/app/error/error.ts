/* eslint-disable no-prototype-builtins */
/* eslint-disable no-restricted-syntax */
import { Domain } from 'features/app/app-types';
import { handlers } from './handlers';

export type ErrorInstance = Record<string, any>;
export type ErrorCode = string;
export type ErrorExtra = Record<string, any>;

export default class AppError extends Error {
  [x: string]: unknown;

  constructor(
    domain: Domain,
    code: ErrorCode,
    extra: ErrorExtra = {},
  ) {
    const message = code || '';
    super(message);
    this.name = this.constructor.name;
    this.domain = domain;
    this.code = code;
    // preserving stack trace
    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, this.constructor);
    } else {
      this.stack = (new Error(message)).stack;
    }
    // applying properties from args
    for (const prop in extra) {
      if (extra.hasOwnProperty(prop)) this[prop] = extra[prop];
    }
    // applying properties returned from handling
    const handleOutput = handlers?.[this.name](this);
    if (typeof handleOutput === 'object' && handleOutput) {
      for (const prop in handleOutput) {
        if (handleOutput.hasOwnProperty(prop)) this[prop] = handleOutput[prop];
      }
    }
  }
}
