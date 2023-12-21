import { useEffect } from 'react';
import { ReducerDispatch } from 'features/app/reducer/reducer-types';
import { useDemoReppingQuery } from 'features/app/app-queries';
import { useImportReppingMutation } from 'features/srs/reppings/reppings-queries';
import { State } from './demo-reducer';

interface Props {
  state: State;
  dispatch: ReducerDispatch;
}

export default function DemoSetupReppings({ state, dispatch }: Props) {
  const { reppings: { load, add }, language } = state;
  const { data, isError } = useDemoReppingQuery({ language, name: load });
  const { mutate } = useImportReppingMutation({ isDemo: true });

  useEffect(() => {
    if (data) dispatch(['reppingReceived', data]);
  }, [data]);

  useEffect(() => {
    if (add) {
      mutate(add, {
        onSuccess: (d) => { dispatch(['reppingAdded', d]); },
        onError: () => { dispatch(['errorReceived', {}]); },
      });
    }
  }, [add]);

  useEffect(() => {
    if (isError) dispatch(['errorReceived', {}]);
  }, [isError]);

  return null;
}
