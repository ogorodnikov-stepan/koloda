import { useEffect } from 'react';
import { useDebounce } from 'react-use';
import { useStore, isDemoSelector } from 'features/app/app-store';
import { ReducerDispatch } from 'features/app/reducer/reducer-types';
import { State } from 'features/srs/reppings/one/repping-reducer';
import { useUpdateReppingMutation } from 'features/srs/reppings/reppings-queries';

const entity = 'repping';
const DELAY = 500;

interface Props {
  state: State;
  dispatch: ReducerDispatch;
}

export default function ReppingAboutHandlers({ state, dispatch }: Props) {
  const isDemo = useStore(isDemoSelector);
  const val = useUpdateReppingMutation({ isDemo, validationOnly: true });
  const save = useUpdateReppingMutation({ isDemo });
  const { data, status: { isSaved, isSaving } } = state[entity];

  useDebounce(
    () => { if (!isSaved) val.mutate(data); },
    DELAY,
    [data, isSaved],
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
