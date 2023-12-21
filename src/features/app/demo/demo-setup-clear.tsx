import { useEffect } from 'react';
import { ReducerDispatch } from 'features/app/reducer/reducer-types';
import { useDemoClearMutation } from 'features/app/app-queries';
import { State } from './demo-reducer';

interface Props {
  state: State;
  dispatch: ReducerDispatch;
}

export default function DemoSetupClear({ state, dispatch }: Props) {
  const { meta: { isLoaded, isCleared } } = state;
  const { mutate } = useDemoClearMutation();

  useEffect(() => {
    if (isLoaded && !isCleared) {
      mutate({}, {
        onSuccess: () => { dispatch(['dataCleared', {}]); },
        onError: () => { dispatch(['errorReceived', {}]); },
      });
    }
  }, [isLoaded, isCleared]);

  return null;
}
