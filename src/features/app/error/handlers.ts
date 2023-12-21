import { logToConsole } from './logging';

type Handlers = Record<string, Function>;

export const handlers: Handlers = {
  AppError: (error: any) => {
    logToConsole(error);
    return { t: error.code };
  },
  ValidationError: (error: any) => {
    logToConsole(error);
    return {};
  },
  RequestError: (error: any) => {
    logToConsole(error);
    return { t: `${error.code}.${error.status}` };
  },
};
