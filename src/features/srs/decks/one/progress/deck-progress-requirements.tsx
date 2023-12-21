import { useTranslation } from 'react-i18next';
import { State } from 'features/srs/decks/one/deck-reducer';

const PREFIX = 'srs:decks.one.progress.requirements';

interface Props {
  state: State;
}

export default function DeckProgressRequirements({ state }: Props) {
  const { t } = useTranslation('srs');
  const deck = state.deck.data!;
  const reppings = state.reppings.data || [];

  return (
    <div className="deck-progress__requirements">
      <h3 className="deck-progress__requirements-title">
        {t(`${PREFIX}.title`)}
      </h3>
      <ul className="deck-progress__requirements-list">
        <li
          className="deck-progress__requirements-list-item"
          data-requirement-value={deck.fieldsTotal > 0}
        >
          {t(`${PREFIX}.fields`)}
        </li>
        <li
          className="deck-progress__requirements-list-item"
          data-requirement-value={deck.cardsTotal > 0}
        >
          {t(`${PREFIX}.cards`)}
        </li>
        <li
          className="deck-progress__requirements-list-item"
          data-requirement-value={!!reppings.length}
        >
          {t(`${PREFIX}.reppings`)}
        </li>
      </ul>
    </div>
  );
}
