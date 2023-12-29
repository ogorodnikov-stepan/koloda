import { ReducerDispatch } from 'features/app/reducer/reducer-types';
import { State } from './demo-reducer';
import DemoSetupLoad from './demo-setup-load';
import DemoSetupClear from './demo-setup-clear';
import DemoSetupUser from './demo-setup-user';
import DemoSetupReppings from './demo-setup-reppings';
import DemoSetupDecks from './demo-setup-decks';

interface Props {
  state: State;
  dispatch: ReducerDispatch;
}

export default function DemoSetup({ state, dispatch }: Props) {
  return (
    <>
      <DemoSetupLoad
        state={state}
        dispatch={dispatch}
      />
      <DemoSetupClear
        state={state}
        dispatch={dispatch}
      />
      <DemoSetupUser
        state={state}
        dispatch={dispatch}
      />
      <DemoSetupReppings
        state={state}
        dispatch={dispatch}
      />
      <DemoSetupDecks
        state={state}
        dispatch={dispatch}
      />
    </>
  );
}
