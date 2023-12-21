// import { useReducer, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { ReducerDispatch } from 'features/app/reducer/reducer-types';
import { State } from 'features/srs/decks/one/deck-reducer';
import Feature from 'features/app/ui/feature/feature';
import Editbar from 'features/app/ui/editbar/editbar';
import DeckCardsNoFields from './deck-cards-no-fields';
// import DeckCardsToolbar from './deck-cards-toolbar';
import DeckCardsSkeleton from './deck-cards-skeleton';
import DeckCardsHandlers from './deck-cards-handlers';
import DeckCardsContent from './deck-cards-content';
import './deck-cards.scss';
import DeckCardsDisplayModes from './deck-cards-display-modes';

const PREFIX = 'srs:decks.one.cards.many';

interface Props {
  state: State;
  dispatch: ReducerDispatch;
}

export default function DeckCards({ state, dispatch }: Props) {
  const { t } = useTranslation();
  const { data: { cards } = {}, status: { editbar: { mode } } } = state.cards;
  const hasFields = state.deck?.data?.fieldsTotal > 0;

  return (
    <Feature.Section
      className="deck-cards"
      mode={mode}
    >
      <Feature.SectionHeader
        className="deck-cards__header"
        title={t(`${PREFIX}.title`)}
      >
        { hasFields && (
          <>
            <DeckCardsDisplayModes
              state={state}
              dispatch={dispatch}
            />
            <Editbar
              className="deck-cards"
              entity="cards"
              status={state.cards.status}
              dispatch={dispatch}
            />
          </>
        )}
      </Feature.SectionHeader>
      { !hasFields && (
        <DeckCardsNoFields />
      )}
      { (hasFields && !cards) && (
        <DeckCardsSkeleton />
      )}
      { (hasFields && cards && mode === 'edit') && (
        <DeckCardsHandlers
          state={state}
          dispatch={dispatch}
        />
      )}
      { (hasFields && cards) && (
        <DeckCardsContent
          state={state}
          dispatch={dispatch}
        />
      )}
    </Feature.Section>
  );
}
