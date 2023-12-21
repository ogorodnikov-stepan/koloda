import { ReducerDispatch } from 'features/app/reducer/reducer-types';
import { State } from 'features/srs/decks/one/deck-reducer';
import DeckCardsEmpty from './deck-cards-empty';
import DeckCardsTable from './table/deck-cards-table';
import DeckCardsSlider from './slider/deck-cards-slider';

interface Props {
  state: State;
  dispatch: ReducerDispatch;
}

export default function DeckCardsContent({ state, dispatch }: Props) {
  const { data, status: { display, editbar: { mode } } } = state.cards;
  const { cards } = data || {};

  return (
    <div className="deck-cards__content">
      { (mode === 'view' && !cards?.length) ? (
        <DeckCardsEmpty />
      ) : (
        <>
          { display?.mode === 'table' && (
            <DeckCardsTable
              state={state}
              dispatch={dispatch}
            />
          )}
          { display?.mode === 'slider' && (
            <DeckCardsSlider
              state={state}
              dispatch={dispatch}
            />
          )}
        </>
      )}
    </div>
  );
}
