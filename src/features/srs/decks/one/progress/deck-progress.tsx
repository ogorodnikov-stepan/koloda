import { useTranslation } from 'react-i18next';
import { ReducerDispatch } from 'features/app/reducer/reducer-types';
import { State } from 'features/srs/decks/one/deck-reducer';
import Feature from 'features/app/ui/feature/feature';
import Editbar from 'features/app/ui/editbar/editbar';
import DeckProgressSkeleton from './deck-progress-skeleton';
import DeckProgressHandlers from './deck-progress-handlers';
import DeckProgressContent from './deck-progress-content';
import './deck-progress.scss';

const PREFIX = 'srs:decks.one.progress';

interface Props {
  state: State;
  dispatch: ReducerDispatch;
}

export default function DeckProgress({ state, dispatch }: Props) {
  const { t } = useTranslation();
  const { data: learning, status } = state.learning;
  const { mode } = status.editbar;
  const deck = state.deck.data;

  return (
    <Feature.Section
      className="deck-progress"
      mode={status.editbar.mode}
    >
      <Feature.SectionHeader
        className="deck-progress__header"
        title={t(`${PREFIX}.title`)}
      >
        { (deck && learning?.repping) && (
          <Editbar
            className="deck-progress"
            entity="learning"
            status={status}
            dispatch={dispatch}
          />
        )}
      </Feature.SectionHeader>
      <Feature.SectionContent
        className="deck-progress__content"
      >
        { !deck && (
          <DeckProgressSkeleton />
        )}
        { deck && learning && (mode === 'edit') && (
          <DeckProgressHandlers
            state={state}
            dispatch={dispatch}
          />
        )}
        { deck && (
          <DeckProgressContent
            state={state}
            dispatch={dispatch}
          />
        )}
      </Feature.SectionContent>
    </Feature.Section>
  );
}
