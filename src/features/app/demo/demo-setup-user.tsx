import { useEffect } from 'react';
import { ReducerDispatch } from 'features/app/reducer/reducer-types';
import { useSignUpDemoMutation } from 'features/auth/auth-queries';
import { State } from './demo-reducer';

interface Props {
  state: State;
  dispatch: ReducerDispatch;
}

export default function DemoSetupUser({ state, dispatch }: Props) {
  const { user: { add } } = state;
  const { mutate } = useSignUpDemoMutation({ isDemo: true });

  useEffect(() => {
    if (add) {
      mutate(add, {
        onSuccess: (d) => { dispatch(['userAdded', d]); },
        onError: () => { dispatch(['errorReceived', {}]); },
      });
    }
  }, [add]);

  return null;
}
