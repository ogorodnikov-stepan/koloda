import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import isFuture from 'date-fns/isFuture';
import formatDistance from 'date-fns/formatDistance';
import { ReducerDispatch } from 'features/app/reducer/reducer-types';
import { EditbarMode } from 'features/app/ui/editbar/editbar';
import { Card } from 'features/srs/srs-types';
import Button from 'features/app/ui/form/button';

const PREFIX = 'srs:decks.one.cards.many.properties.progress';

interface Props {
  card: Card;
  mode: EditbarMode;
  dispatch: ReducerDispatch;
}

export default function DeckCardsSliderItemProgress({ card, mode, dispatch }: Props) {
  const { t } = useTranslation();
  const { progress: { isCompleted, dueAt } = {}, meta: { status, divel } = {} } = card;
  const isOverdue = !!(dueAt && !isFuture(new Date(dueAt)));

  const markAsCompleted = useCallback(({ target: { name } }) => {
    dispatch(['cardProgressUpdated', { id: name, property: 'isCompleted' }]);
  }, []);

  const resetProgress = useCallback(({ target: { name } }) => {
    dispatch(['cardProgressUpdated', { id: name, property: 'progress' }]);
  }, []);

  return (
    <div className="deck-cards__slider-card-progress">
      <span
        className="deck-cards__progress-status"
        data-status={status}
        data-is-overdue={isOverdue}
      >
        { status === 'learning' ? (
          <span className="deck-cards__progress-due-at">
            { dueAt && (
              isOverdue ? (
                t(`${PREFIX}.values.overdue`)
              ) : (
                t(`${PREFIX}.values.dueAt`, {
                  value: formatDistance(new Date(dueAt), new Date()),
                })
              )
            )}
          </span>
        ) : (
          t(`${PREFIX}.values.${status}`)
        )}
      </span>
      { divel && (
        <span className="deck-cards__progress-divel">
          <span className="deck-cards__progress-divel-index">
            {divel?.index}
          </span>
          <span className="deck-cards__progress-divel-title">
            {divel?.title}
          </span>
        </span>
      )}
      { mode === 'edit' && (
        <>
          { status !== 'initial' && (
            <Button
              className="deck-cards__slider-card-progress-reset-button"
              name={`${card.id}`}
              onClick={resetProgress}
              content={t(`${PREFIX}.actions.reset`)}
            />
          )}
          { !isCompleted && (
            <Button
              className="deck-cards__slider-card-progress-complete-button"
              name={`${card.id}`}
              onClick={markAsCompleted}
              content={t(`${PREFIX}.actions.complete`)}
            />
          )}
        </>
      )}
    </div>
  );
}
