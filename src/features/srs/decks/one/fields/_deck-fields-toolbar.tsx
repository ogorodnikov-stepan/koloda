import { useTranslation } from 'react-i18next';
import { ReducerDispatch } from 'features/app/reducer/reducer-types';
import Feature from 'features/app/ui/feature/feature';
import Editbar from 'features/app/ui/editbar/editbar';
import { State } from 'features/srs/decks/one/deck-reducer';

const PREFIX = 'srs:decks.one.fields.many';

interface Props {
  state: State;
  dispatch: ReducerDispatch;
}

export default function DeckFieldsToolbar({ state, dispatch }: Props) {
  const { t } = useTranslation('srs');
  const { data, status } = state.fields;
  const length = data?.fields?.length || 0;

  return (
    <Feature.Toolbar>
      <span className="deck-fields__amount feature__toolbar-amount">
        <span className="deck-fields__amount-value feature__toolbar-amount-value">
          {length}
        </span>
        <span className="deck-fields__amount-caption feature__toolbar-amount-caption">
          {t(`${PREFIX}.amount`, { count: length })}
        </span>
      </span>
      <Editbar
        className="deck-fields"
        entity="fields"
        status={status}
        dispatch={dispatch}
      />
    </Feature.Toolbar>
  );
}
