import { useQuery, useInfiniteQuery, useMutation } from 'react-query';
import { QUERY_SETTINGS_DEFAULT } from 'config/query';
import { validateMakeRequestCamelize as handle } from 'features/app/api/api';
import { RequestExtra } from 'features/app/api/request';
import { ErrorInstance } from 'features/app/error/error';
import { Repping } from 'features/srs/srs-types';

interface ReppingsQueryProps {
  sort: string;
}

export function useReppingsQuery(params: ReppingsQueryProps, extra: RequestExtra) {
  return useQuery<any, ErrorInstance, any>(
    ['reppings', 'many'],
    async (): Promise<any> => handle('srs', 'reppings_get', [200], params, extra),
    QUERY_SETTINGS_DEFAULT,
  );
}

interface ReppingsPaginatedProps {
  sort: string;
  limit?: number;
}

export function useReppingsPaginatedQuery(params: ReppingsPaginatedProps, extra: RequestExtra) {
  return useInfiniteQuery(
    ['reppings', 'paginated', params],
    async ({ pageParam }): Promise<any> => (
      handle('srs', 'reppings_get', [200], { ...params, offset: pageParam }, extra)
    ),
    { getNextPageParam: (r) => (r.meta.pagination.nextOffset) },
  );
}

interface ReppingQueryProps {
  id?: Repping['id'];
}

export function useReppingQuery({ id }: ReppingQueryProps, extra: RequestExtra) {
  return useQuery<any, ErrorInstance, any>(
    ['reppings', 'one', id],
    async (): Promise<any> => handle('srs', 'repping_get', [200], { id }, extra),
    QUERY_SETTINGS_DEFAULT,
  );
}

interface DivelsQueryProps {
  reppingId?: Repping['id'];
}

export function useDivelsQuery({ reppingId }: DivelsQueryProps, extra: RequestExtra) {
  return useQuery(
    ['divels', 'many', reppingId],
    async () => handle('srs', 'divels_get', [200], { reppingId }, extra),
  );
}

interface DivelQueryProps {
  reppingId?: any;
  id?: any;
}

export function useDivelQuery({ reppingId, id }: DivelQueryProps, extra: RequestExtra) {
  return useQuery(
    ['divels', 'one', { id, reppingId }],
    async () => handle('srs', 'divel_get', [200], { reppingId, id }, extra),
  );
}

export function useAddReppingMutation(extra: RequestExtra) {
  return useMutation<any, ErrorInstance, any>(
    async (params: any) => handle('srs', 'repping_add', [201], params, extra),
  );
}

export function useImportReppingMutation(extra: RequestExtra) {
  return useMutation<any, ErrorInstance, any>(
    async (params: any) => handle('srs', 'repping_import', [201], params, extra),
  );
}

export function useExportReppingMutation(extra: RequestExtra) {
  return useMutation<any, ErrorInstance, any>(
    async (params: any) => handle('srs', 'repping_export', [200], params, extra),
  );
}

export function useUpdateReppingMutation(extra: RequestExtra) {
  return useMutation<any, ErrorInstance, any>(
    async (params: any) => handle('srs', 'repping_update', [200], params, extra),
  );
}

export function useDeleteReppingMutation(extra: RequestExtra) {
  return useMutation<any, ErrorInstance, any>(
    async (params: any) => handle('srs', 'repping_delete', [204], params, extra),
  );
}

export function useUpdateDivelsMutation(extra: RequestExtra) {
  return useMutation<any, ErrorInstance, any>(
    async (params: any) => handle('srs', 'divels_update', [200], params, extra),
  );
}

export function useUpdateDivelMutation(extra: RequestExtra) {
  return useMutation<any, ErrorInstance, any>(
    async (params: any) => handle('srs', 'divel_update', [204], params, extra),
  );
}
