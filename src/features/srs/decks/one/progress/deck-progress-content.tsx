import { ReducerDispatch } from 'features/app/reducer/reducer-types';
import { State } from 'features/srs/decks/one/deck-reducer';
import DeckProgressRequirements from './deck-progress-requirements';
import DeckProgressNotLearning from './deck-progress-not-learning';
import DeckProgressLearning from './deck-progress-learning';

interface Props {
  state: State;
  dispatch: ReducerDispatch;
}

export default function DeckProgressContent({ state, dispatch }: Props) {
  const { isEligible } = state.deck.data!;
  const reppings = state.reppings.data || [];

  if (state.learning.data?.repping) {
    return (
      <DeckProgressLearning
        state={state}
        dispatch={dispatch}
      />
    );
  }

  if (!isEligible || !reppings.length) {
    return (
      <DeckProgressRequirements
        state={state}
      />
    );
  }

  return (
    <DeckProgressNotLearning
      state={state}
      dispatch={dispatch}
    />
  );
}
