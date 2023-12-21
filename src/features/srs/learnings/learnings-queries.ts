import { useQuery, useInfiniteQuery, useMutation } from 'react-query';
import { validateMakeRequestCamelize as handle } from 'features/app/api/api';
import { RequestExtra } from 'features/app/api/request';
import { ErrorInstance } from 'features/app/error/error';
import { Learning } from 'features/srs/srs-types';
import { State } from 'features/srs/learnings/many/learnings-reducer';

export function useLearningsPaginatedQuery(params: State['params'], extra: RequestExtra) {
  return useInfiniteQuery(
    ['learnings', 'paginated', params],
    async ({ pageParam }): Promise<any> => (
      handle('srs', 'learnings_get', [200], { ...params, offset: pageParam }, extra)
    ),
    { getNextPageParam: (r) => (r.meta.pagination.nextOffset) },
  );
}

interface LearningQueryProps {
  deckId: Learning['deckId'];
}

export function useLearningQuery(params: LearningQueryProps, extra: RequestExtra) {
  return useQuery<any, ErrorInstance, any>(
    ['learnings', 'one'],
    async (): Promise<any> => handle('srs', 'learning_get', [200, 404], params, extra),
  );
}

export function useAddLearningMutation(extra: RequestExtra) {
  return useMutation<any, ErrorInstance, any>(
    async (params: any) => handle('srs', 'learning_add', [200], params, extra),
  );
}

export function useUpdateLearningMutation(extra: RequestExtra) {
  return useMutation<any, ErrorInstance, any>(
    async (params: any) => handle('srs', 'learning_update', [200], params, extra),
  );
}

export function useDeleteLearningMutation(extra: RequestExtra) {
  return useMutation<any, ErrorInstance, any>(
    async (params: any) => handle('srs', 'learning_delete', [204], params, extra),
  );
}
