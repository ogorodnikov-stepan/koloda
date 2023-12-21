import { ReducerDispatch } from 'features/app/reducer/reducer-types';
import { State } from 'features/srs/decks/one/deck-reducer';
import Feature from 'features/app/ui/feature/feature';
import DeckAboutContentView from './deck-about-content-view';
import DeckAboutContentEdit from './deck-about-content-edit';

interface Props {
  state: State;
  dispatch: ReducerDispatch;
}

export default function DeckAboutContent({ state, dispatch }: Props) {
  const { status: { editbar: { mode } } } = state.deck;

  return (
    <Feature.SectionContent className="deck-about__content">
      { mode === 'view' && (
        <DeckAboutContentView
          state={state}
          dispatch={dispatch}
        />
      )}
      { mode === 'edit' && (
        <DeckAboutContentEdit
          state={state}
          dispatch={dispatch}
        />
      )}
    </Feature.SectionContent>
  );
}
