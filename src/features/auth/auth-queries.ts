import { useQuery, useMutation } from 'react-query';
import { validateMakeRequestCamelize as handle } from 'features/app/api/api';
import { RequestExtra } from 'features/app/api/request';
import { ErrorInstance } from 'features/app/error/error';
import { UID_KEY, UID_DEMO_KEY } from 'features/auth/auth-constants';
import { User } from 'features/auth/auth-types';
import { login, logout } from 'features/auth/auth-domain';

export interface CurrentUser extends User {
  token?: string;
}

export function useCurrentUserQuery(extra: RequestExtra) {
  return useQuery<any, ErrorInstance, any>(
    ['users', 'current'],
    async () => {
      const uid = localStorage.getItem(extra.isDemo ? UID_DEMO_KEY : UID_KEY);
      return handle('auth', 'user_get', [200, 400, 401, 404], { uid }, extra);
    },
    {
      enabled: extra.isDemo !== undefined,
      staleTime: Infinity,
      retry: false,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
    },
  );
}

export interface ProfileQueryProps {
  uid?: string;
}

export function useProfileQuery({ uid }: ProfileQueryProps, extra: RequestExtra) {
  return useQuery(
    ['profiles', uid],
    async (): Promise<any> => handle('auth', 'user_profile_get', [200], { uid }, extra),
    { enabled: !!uid, retry: false },
  );
}

export function useSignUpDemoMutation(extra: RequestExtra) {
  return useMutation<any, ErrorInstance, any>(
    async (params: any) => handle('auth', 'signup_demo', [201], params, extra),
    { onSuccess: (data) => login(data, { isDemo: true }) },
  );
}

export function useLoginMutation(extra: RequestExtra) {
  return useMutation<any, ErrorInstance, any>(
    async (params: any) => handle('auth', 'login', [200], params, extra),
    { onSuccess: (data) => login(data, extra) },
  );
}

export function useLogoutMutation(extra: RequestExtra) {
  return useMutation<any, ErrorInstance, any>(
    async () => { logout(extra); },
  );
}

export function useUpdateUserMutation(extra: RequestExtra) {
  return useMutation<any, ErrorInstance, any>(
    async (params: any) => handle('auth', 'user_update', [200], params, extra),
  );
}

export function useUpdateUserTutorialMutation(extra: RequestExtra) {
  return useMutation<any, ErrorInstance, any>(
    async (params: any) => handle('auth', 'user_tutorial_update', [200], params, extra),
  );
}
