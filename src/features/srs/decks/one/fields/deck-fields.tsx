import { useTranslation } from 'react-i18next';
import { ReducerDispatch } from 'features/app/reducer/reducer-types';
import { State } from 'features/srs/decks/one/deck-reducer';
import Feature from 'features/app/ui/feature/feature';
import Editbar from 'features/app/ui/editbar/editbar';
import DeckFieldsSkeleton from './deck-fields-skeleton';
import DeckFieldsTable from './deck-fields-table';
import DeckFieldsHandlers from './deck-fields-handlers';
import './deck-fields.scss';

const PREFIX = 'srs:decks.one.fields.many';

interface Props {
  state: State;
  dispatch: ReducerDispatch;
}

export default function DeckFields({ state, dispatch }: Props) {
  const { t } = useTranslation();
  const { data, status: { isLoaded, editbar: { mode } } } = state.fields;

  return (
    <Feature.Section
      className="deck-fields"
      mode={mode}
    >
      <Feature.SectionHeader
        className="deck-progress__header"
        title={t(`${PREFIX}.title`)}
      >
        <Editbar
          className="deck-fields"
          entity="fields"
          status={state.fields.status}
          dispatch={dispatch}
        />
      </Feature.SectionHeader>
      { !isLoaded && (
        <DeckFieldsSkeleton />
      )}
      { (data && mode === 'edit') && (
        <DeckFieldsHandlers
          state={state}
          dispatch={dispatch}
        />
      )}
      { data && (
        <DeckFieldsTable
          state={state}
          dispatch={dispatch}
        />
      )}
    </Feature.Section>
  );
}
