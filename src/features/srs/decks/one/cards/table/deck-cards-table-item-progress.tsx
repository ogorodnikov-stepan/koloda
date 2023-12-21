import { useTranslation } from 'react-i18next';
import isFuture from 'date-fns/isFuture';
import { formatDateDistance } from 'features/app/date/date';
import { Card } from 'features/srs/srs-types';

const PREFIX = 'srs:decks.one.cards.many.properties';

interface Props {
  card: Card;
}

export default function DeckCardsTableItemProgress({ card }: Props) {
  const { t, i18n: { language } } = useTranslation();
  const { progress: { dueAt } = {}, meta: { status, divel } = {} } = card;
  const isOverdue = !!(dueAt && !isFuture(new Date(dueAt)));

  return (
    <td
      className="deck-cards__table-cell"
      data-cell-type="body"
      data-cell-column="progress"
    >
      <span className="deck-cards__progress">
        <span
          className="deck-cards__progress-status"
          data-status={status}
          data-is-overdue={isOverdue}
        >
          <span className="deck-cards__progress-status-text">
            { status === 'learning' ? (
              dueAt && (
                isOverdue ? (
                  t(`${PREFIX}.progress.values.overdue`)
                ) : (
                  t(`${PREFIX}.progress.values.dueAt`, {
                    value: formatDateDistance(language, new Date(dueAt)),
                  })
                )
              )
            ) : (
              t(`${PREFIX}.progress.values.${status}`)
            )}
          </span>
        </span>
        { status === 'learning' && (
          <span className="deck-cards__progress-divel">
            <span
              className="deck-cards__progress-divel-index"
              title={divel?.title || ''}
            >
              {divel?.index}
            </span>
            <span className="deck-cards__progress-divel-title">
              {divel?.title}
            </span>
          </span>
        )}
      </span>
    </td>
  );
}
