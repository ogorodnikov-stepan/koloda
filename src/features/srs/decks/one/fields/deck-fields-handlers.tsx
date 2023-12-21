import { useEffect } from 'react';
import { useDebounce } from 'react-use';
import { useStore, isDemoSelector } from 'features/app/app-store';
import { ReducerDispatch } from 'features/app/reducer/reducer-types';
import { useUpdateFieldsMutation } from 'features/srs/decks/decks-queries';
import { State } from 'features/srs/decks/one/deck-reducer';

const entity = 'fields';
const DELAY = 100;

interface Props {
  state: State;
  dispatch: ReducerDispatch;
}

export default function DeckFieldsHandlers({ state, dispatch }: Props) {
  const isDemo = useStore(isDemoSelector);
  const val = useUpdateFieldsMutation({ isDemo, validationOnly: true });
  const save = useUpdateFieldsMutation({ isDemo });
  const { data, status: { isSaved, isSaving } } = state.fields;

  useDebounce(
    () => { if (!isSaved) val.mutate(data); },
    DELAY,
    [isSaved, data],
  );

  useEffect(() => {
    if (val.isSuccess) dispatch(['validationCompleted', { entity }]);
  }, [val.isSuccess]);

  useEffect(() => {
    if (val.isError) dispatch(['validationFailed', { entity, error: val.error }]);
  }, [val.isError, val.error]);

  useEffect(() => {
    if (isSaving) save.mutate(data);
  }, [isSaving, data]);

  useEffect(() => {
    if (save.isSuccess) dispatch(['savingCompleted', { entity, data: save.data }]);
  }, [save.isSuccess]);

  useEffect(() => {
    if (save.isError) dispatch(['savingFailed', { entity, error: save.error }]);
  }, [save.isError, save.error]);

  return null;
}
