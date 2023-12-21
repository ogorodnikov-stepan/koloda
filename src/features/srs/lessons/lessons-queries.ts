import { useQuery, useMutation } from 'react-query';
import { QUERY_SETTINGS_NO_FETCH } from 'config/query';
import { validateMakeRequestCamelize as handle } from 'features/app/api/api';
import { HTTPParams, RequestExtra } from 'features/app/api/request';
import { ErrorInstance } from 'features/app/error/error';

export function useLessonQuery(params: HTTPParams, extra: RequestExtra) {
  return useQuery<any, ErrorInstance, any>(
    ['lesson', 'plan', params],
    async (): Promise<any> => handle('srs', 'lesson_get', [200, 404], params, extra),
  );
}

export function useLessonDeckQuery(params: HTTPParams, extra: RequestExtra) {
  return useQuery<any, ErrorInstance, any>(
    ['lesson', 'deck', params],
    async (): Promise<any> => handle('srs', 'lesson_deck_get', [200, 404], params, extra),
    { ...QUERY_SETTINGS_NO_FETCH, enabled: !!params.id },
  );
}

export function useLessonReppingQuery(params: HTTPParams, extra: RequestExtra) {
  return useQuery<any, ErrorInstance, any>(
    ['lesson', 'repping', params],
    async (): Promise<any> => handle('srs', 'lesson_repping_get', [200, 404], params, extra),
    { enabled: !!params.id },
  );
}

export function useLessonResultsMutation(extra: RequestExtra) {
  return useMutation<any, ErrorInstance, any>(
    async (params: any) => handle('srs', 'lesson_results_set', [204], params, extra),
  );
}
