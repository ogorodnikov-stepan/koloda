import { RequestExtra } from 'features/app/api/request';
import { UID_KEY, UID_DEMO_KEY, TOKEN_KEY } from 'features/auth/auth-constants';

export interface LoginData {
  token: string;
  id: string;
}

export function login({ token, id }: LoginData, { isDemo }: RequestExtra) {
  if (isDemo) {
    localStorage.setItem(UID_DEMO_KEY, id);
  } else {
    localStorage.setItem(TOKEN_KEY, token);
    localStorage.setItem(UID_KEY, id);
  }
}

export function logout({ isDemo }: RequestExtra) {
  if (!isDemo) localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(isDemo ? UID_DEMO_KEY : UID_KEY);
}
