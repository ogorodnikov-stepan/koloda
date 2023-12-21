import { useTranslation } from 'react-i18next';
import { ReducerDispatch } from 'features/app/reducer/reducer-types';
import { State } from 'features/srs/decks/one/deck-reducer';
import Feature from 'features/app/ui/feature/feature';
import Editbar from 'features/app/ui/editbar/editbar';
import DeckAboutSkeleton from './deck-about-skeleton';
import DeckAboutHandlers from './deck-about-handlers';
import DeckAboutContent from './deck-about-content';
import './deck-about.scss';

const PREFIX = 'srs:decks.one.about';

interface Props {
  state: State;
  dispatch: ReducerDispatch;
}

export default function DeckAbout({ state, dispatch }: Props) {
  const { t } = useTranslation('srs');
  const { data, status } = state.deck;
  const { mode } = status.editbar;

  return (
    <Feature.Section
      className="deck-about"
      mode={mode}
    >
      <Feature.SectionHeader
        className="deck-about__header"
        title={t(`${PREFIX}.title`)}
      >
        <Editbar
          className="deck-about"
          entity="deck"
          status={status}
          dispatch={dispatch}
        />
      </Feature.SectionHeader>
      { !data && (
        <DeckAboutSkeleton />
      )}
      { data && (mode === 'edit') && (
        <DeckAboutHandlers
          state={state}
          dispatch={dispatch}
        />
      )}
      { data && (
        <DeckAboutContent
          state={state}
          dispatch={dispatch}
        />
      )}
    </Feature.Section>
  );
}
