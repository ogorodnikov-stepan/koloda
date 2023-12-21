import { useEffect } from 'react';
import { useDebounce } from 'react-use';
import { useStore, isDemoSelector } from 'features/app/app-store';
import { ReducerDispatch } from 'features/app/reducer/reducer-types';
import { useUpdateDivelMutation } from 'features/srs/reppings/reppings-queries';
import { Repping, Divel } from 'features/srs/srs-types';
import { State } from './divel-reducer';

const entity = 'phases';
const DELAY = 100;

interface Props {
  state: State;
  dispatch: ReducerDispatch;
  reppingId: Repping['id'];
  divelId: Divel['id'];
}

export default function DivelEdit({ state, dispatch, reppingId, divelId }: Props) {
  const isDemo = useStore(isDemoSelector);
  const val = useUpdateDivelMutation({ isDemo, validationOnly: true });
  const save = useUpdateDivelMutation({ isDemo });
  const { data, status: { isSaved, isSaving } } = state.phases;

  useDebounce(
    () => { if (!isSaved) val.mutate({ phases: data, reppingId, id: divelId }); },
    DELAY,
    [isSaved, data, reppingId, divelId],
  );

  useEffect(() => {
    if (val.isSuccess) dispatch(['validationCompleted', { entity }]);
  }, [val.isSuccess]);

  useEffect(() => {
    if (val.isError) dispatch(['validationFailed', { entity, error: val.error }]);
  }, [val.isError, val.error]);

  useEffect(() => {
    if (isSaving) save.mutate({ phases: data, reppingId, id: divelId });
  }, [isSaving, data, reppingId, divelId]);

  useEffect(() => {
    if (save.isSuccess) dispatch(['savingCompleted', { entity }]);
  }, [save.isSuccess]);

  useEffect(() => {
    if (save.isError) dispatch(['savingFailed', { entity, error: save.error }]);
  }, [save.isError, save.error]);

  return null;
}
