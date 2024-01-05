import { useQuery, useInfiniteQuery, useMutation } from 'react-query';
import { QUERY_SETTINGS_DEFAULT } from 'config/query';
import { validateMakeRequestCamelize as handle } from 'features/app/api/api';
import { RequestExtra } from 'features/app/api/request';
import { ErrorInstance } from 'features/app/error/error';
import { Deck } from 'features/srs/srs-types';
import { State } from 'features/srs/decks/many/decks-reducer';

interface LanguageProps {
  language: string;
}

export function useSubjectsQuery({ language }: LanguageProps) {
  return useQuery(
    ['subjects', language],
    async (): Promise<any> => handle('srs', 'subjects_get', [200], { language }),
    { enabled: !!language },
  );
}

export function useLanguagesQuery({ language }: LanguageProps) {
  return useQuery(
    ['languages', language],
    async (): Promise<any> => handle('srs', 'languages_get', [200], { language }),
    { enabled: !!language },
  );
}

export function useDecksPaginatedQuery(params: State['params'], extra: RequestExtra) {
  return useInfiniteQuery(
    ['decks', 'many', params],
    async ({ pageParam }): Promise<any> => (
      handle('srs', 'decks_get', [200], { ...params, offset: pageParam }, extra)
    ),
    { getNextPageParam: (r) => (r.meta.pagination.nextOffset) },
  );
}

export function useImportDeckMutation(extra: RequestExtra) {
  return useMutation<any, ErrorInstance, any>(
    async (params: any) => handle('srs', 'deck_import', [201], params, extra),
  );
}

export function useExportDeckMutation(extra: RequestExtra) {
  return useMutation<any, ErrorInstance, any>(
    async (params: any) => handle('srs', 'deck_export', [200], params, extra),
  );
}

export function useAddDeckMutation(extra: RequestExtra) {
  return useMutation<any, ErrorInstance, any>(
    async (params: any) => handle('srs', 'deck_add', [201], params, extra),
  );
}

export function useFieldsMutation() {
  return useMutation<any, ErrorInstance, any>(
    async (params: any) => handle('srs', 'fields_set', [204], params),
  );
}

interface DeckQueryProps {
  id?: Deck['id'];
}

export function useDeckQuery({ id }: DeckQueryProps, extra: RequestExtra) {
  return useQuery<any, ErrorInstance, any>(
    ['decks', 'one', id],
    async (): Promise<any> => handle('srs', 'deck_get', [200], { id }, extra),
    QUERY_SETTINGS_DEFAULT,
  );
}

interface CardsQueryProps {
  deckId?: Deck['id'];
}

export function useCardsQuery({ deckId }: CardsQueryProps, extra: RequestExtra) {
  return useQuery(
    ['cards', 'many', deckId],
    async () => handle('srs', 'cards_get', [200], { deckId }, extra),
  );
}

export function useUpdateDeckMutation(extra: RequestExtra) {
  return useMutation<any, ErrorInstance, any>(
    async (params: any) => handle('srs', 'deck_update', [200], params, extra),
  );
}

export function useDeleteDeckMutation(extra: RequestExtra) {
  return useMutation<any, ErrorInstance, any>(
    async (params: any) => handle('srs', 'deck_delete', [204], params, extra),
  );
}

export function useUpdateFieldsMutation(extra: RequestExtra) {
  return useMutation<any, ErrorInstance, any>(
    async (params: any) => handle('srs', 'fields_set', [200], params, extra),
  );
}

export function useUpdateCardsMutation(extra: RequestExtra) {
  return useMutation<any, ErrorInstance, any>(
    async (params: any) => handle('srs', 'cards_set', [200], params, extra),
  );
}
