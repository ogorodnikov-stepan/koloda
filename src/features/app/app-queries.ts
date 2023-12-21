import { useQuery, useMutation } from 'react-query';
import { validateMakeRequestCamelize as handle } from 'features/app/api/api';
import { ErrorInstance } from 'features/app/error/error';

const EXTRA = { isDemo: true };

export function useLanguagesQuery() {
  return useQuery(
    ['app', 'languages'],
    async (): Promise<any> => handle('app', 'languages_get', [200], {}),
  );
}

interface Params {
  language: string;
  name?: string;
  enabled?: boolean;
}

export function useDemoClearMutation() {
  return useMutation<any, ErrorInstance, any>(
    async (params: any) => handle('app', 'demo_clear', [200], params, EXTRA),
  );
}

export function useDemoQuery(params: Params) {
  return useQuery(
    ['app', 'demo', params.language],
    async (): Promise<any> => handle('app', 'demo_get', [200], params, EXTRA),
    { enabled: params.enabled },
  );
}

export function useDemoReppingQuery(params: Params) {
  return useQuery(
    ['app', 'demo', 'reppings', params.language, params.name],
    async (): Promise<any> => handle('app', 'demo_repping_get', [200], params, EXTRA),
    { enabled: !!params.name },
  );
}

export function useDemoDeckQuery(params: Params) {
  return useQuery(
    ['app', 'demo', 'decks', params.language, params.name],
    async (): Promise<any> => handle('app', 'demo_deck_get', [200], params, EXTRA),
    { enabled: !!params.name },
  );
}
