import { useTranslation } from 'react-i18next';
import { State } from 'features/srs/decks/one/deck-reducer';

const PREFIX = 'srs:decks.one.cards.many';

interface Props {
  state: State;
}

export default function DeckCardsTableHead({ state }: Props) {
  const { t } = useTranslation('srs');
  const { fields } = state.fields?.data! || {};
  const isLearning = state.learning.data?.repping;
  const { status: { display: { showProgress } = {}, editbar: { mode } } } = state.cards;

  return (
    <thead className="deck-cards__table-head">
      <tr
        className="deck-cards__table-row"
        data-row-type="head"
      >
        <td
          className="deck-cards__table-cell"
          data-cell-type="head"
          data-cell-column="index"
        >
          <span className="deck-cards__table-cell-value">
            {t(`${PREFIX}.properties.index.caption`)}
          </span>
        </td>
        { fields && fields.map((field) => (
          <td
            key={field.id}
            className="deck-cards__table-cell"
            data-cell-type="head"
            data-cell-column="value"
          >
            <span className="deck-cards__table-cell-value">
              {field.title}
            </span>
          </td>
        ))}
        { showProgress && isLearning && (
          <td
            className="deck-cards__table-cell"
            data-cell-type="head"
            data-cell-column="progress"
          >
            <span className="deck-cards__table-cell-value">
              {t(`${PREFIX}.properties.progress.caption`)}
            </span>
          </td>
        )}
        { showProgress && (mode === 'edit') && (
          <td
            className="deck-cards__table-cell"
            data-cell-type="head"
            data-cell-column="progress-actions"
          >
            <span className="deck-cards__table-cell-value">
              {t(`${PREFIX}.properties.progressActions.caption`)}
            </span>
          </td>
        )}
        { mode === 'edit' && (
          <td
            className="deck-cards__table-cell"
            data-cell-type="head"
            data-cell-column="actions"
          >
            <span className="deck-cards__table-cell-value">
              {t(`${PREFIX}.properties.actions.caption`)}
            </span>
          </td>
        )}
      </tr>
    </thead>
  );
}
