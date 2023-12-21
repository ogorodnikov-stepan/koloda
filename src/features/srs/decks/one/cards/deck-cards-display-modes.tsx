import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { ReducerDispatch } from 'features/app/reducer/reducer-types';
import { State } from 'features/srs/decks/one/deck-reducer';
import Button from 'features/app/ui/form/button';

const entity = 'cards';
const DISPLAY_MODES = ['table', 'slider'];
const PREFIX = 'srs:decks.one.cards.many.displayModes';

interface Props {
  state: State;
  dispatch: ReducerDispatch;
}

export default function DeckCardsDisplayModes({ state, dispatch }: Props) {
  const { t } = useTranslation();

  const setMode = useCallback(({ target: { name } }) => {
    dispatch(['displayOptionSet', { entity, property: 'mode', value: name }]);
  }, []);

  return (
    <ul className="deck-cards__display-modes">
      { DISPLAY_MODES.map((mode) => (
        <li
          key={mode}
          className="deck-cards__display-mode"
        >
          <Button
            className="deck-cards__display-mode-button"
            name={mode}
            data-is-active={state.cards.status.display?.mode === mode}
            title={t(`${PREFIX}.${mode}`)}
            onClick={setMode}
          />
        </li>
      ))}
    </ul>
  );
}
