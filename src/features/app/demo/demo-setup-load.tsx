import { useEffect } from 'react';
import { ReducerDispatch } from 'features/app/reducer/reducer-types';
import { useDemoQuery } from 'features/app/app-queries';
import { State } from './demo-reducer';

interface Props {
  state: State;
  dispatch: ReducerDispatch;
}

export default function DemoSetupLoad({ state, dispatch }: Props) {
  const { meta: { isLoaded }, language } = state;
  const { data, isError } = useDemoQuery({ language, enabled: !isLoaded });

  useEffect(() => {
    if (data) dispatch(['dataReceived', data]);
  }, [data]);

  useEffect(() => {
    if (isError) dispatch(['errorReceived', {}]);
  }, [isError]);

  return null;
}
