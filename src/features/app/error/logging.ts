import { ErrorInstance } from 'features/app/error/error';

/* eslint-disable no-console */
export function logToConsole(error: ErrorInstance) {
  if (process.env.NODE_ENV === 'development') {
    console.log(error);
    if (error.meta) console.log(error.meta);
  }
}
