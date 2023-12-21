import { useEffect } from 'react';
import { ReducerDispatch } from 'features/app/reducer/reducer-types';
import { useUpdateCardsMutation } from 'features/srs/decks/decks-queries';
import { State } from 'features/srs/decks/one/deck-reducer';

const entity = 'cards';

interface Props {
  state: State;
  dispatch: ReducerDispatch;
}

export default function DeckCardsEdit({ state, dispatch }: Props) {
  const { meta: { isDemo }, cards: { data, status: { isSaving } } } = state;
  const save = useUpdateCardsMutation({ isDemo });

  useEffect(() => {
    if (isSaving && data) save.mutate(data);
  }, [isSaving, data]);

  useEffect(() => {
    if (save.isSuccess) dispatch(['savingCompleted', { entity, data: save.data }]);
  }, [save.isSuccess]);

  useEffect(() => {
    if (save.isError) dispatch(['savingFailed', { entity, error: save.error }]);
  }, [save.isError, save.error]);

  return null;
}
