import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { ReducerDispatch } from 'features/app/reducer/reducer-types';
import { Card } from 'features/srs/srs-types';
import Button from 'features/app/ui/form/button';

const PREFIX = 'srs:decks.one.cards.many.properties.progress';

interface Props {
  card: Card;
  dispatch: ReducerDispatch;
}

export default function DeckCardsTableItemProgressActions({ card, dispatch }: Props) {
  const { t } = useTranslation();
  const { progress: { isCompleted } = {}, meta: { status } = {} } = card;

  const markAsCompleted = useCallback(({ target: { name } }) => {
    dispatch(['cardProgressUpdated', { id: name, property: 'isCompleted' }]);
  }, []);

  const resetProgress = useCallback(({ target: { name } }) => {
    dispatch(['cardProgressUpdated', { id: name, property: 'progress' }]);
  }, []);

  return (
    <td
      className="deck-cards__table-cell"
      data-cell-type="body"
      data-cell-column="progress-actions"
    >
      <Button
        className="deck-cards__table-item-progress-reset-button"
        name={`${card.id}`}
        title={t(`${PREFIX}.actions.reset`)}
        disabled={status === 'initial'}
        onClick={resetProgress}
      />
      <Button
        className="deck-cards__table-item-progress-complete-button"
        name={`${card.id}`}
        title={t(`${PREFIX}.actions.complete`)}
        disabled={isCompleted}
        onClick={markAsCompleted}
      />
    </td>
  );
}
