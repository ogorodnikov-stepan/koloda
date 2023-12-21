import { useCallback } from 'react';
// import { useTranslation } from 'react-i18next';
import { DraggableProvidedDragHandleProps } from 'react-beautiful-dnd';
import { ReducerDispatch } from 'features/app/reducer/reducer-types';
import { State } from 'features/srs/decks/one/deck-reducer';
import { Field, Card } from 'features/srs/srs-types';
import Button from 'features/app/ui/form/button';
import DeckCardsProperty from 'features/srs/decks/one/cards/field-types/card-content-property';
import DeckCardsTableItemProgress from './deck-cards-table-item-progress';
import DeckCardsTableItemProgressActions from './deck-cards-table-item-progress-actions';

// const PREFIX = 'srs:decks.one.cards.many.properties';

interface Props {
  drag?: DraggableProvidedDragHandleProps | undefined;
  index: number;
  card: Card;
  fields: Field[];
  state: State;
  dispatch: ReducerDispatch;
}

export default function DeckCardsTableItem(
  { drag, index, card, fields, state, dispatch }: Props,
) {
  // const { t } = useTranslation();
  const isLearning = state.learning.data?.repping;
  const { status: { display: { showProgress } = {}, editbar: { mode } } } = state.cards;

  const handleChange = useCallback(({ target: { name, value } }) => {
    dispatch(['cardUpdated', { index, property: name, value }]);
  }, [index]);

  const handleDeleteClick = useCallback(() => {
    dispatch(['cardDeleted', { index }]);
  }, [index]);

  return (
    <>
      <td
        className="deck-cards__table-cell"
        data-cell-type="body"
        data-cell-column="index"
      >
        <span className="deck-cards__table-cell-value">
          {index + 1}
        </span>
      </td>
      { fields.map((field) => (
        <td
          key={field.id}
          className="deck-cards__table-cell"
          data-cell-type="body"
          data-cell-column="value"
        >
          <DeckCardsProperty
            className="deck-cards__table-item-property"
            name={field.id}
            type={field.type}
            mode={mode}
            value={card.content[field.id || 0] || {}}
            onChange={handleChange}
          />
        </td>
      ))}
      { showProgress && isLearning && (
        <DeckCardsTableItemProgress
          card={card}
        />
      )}
      { showProgress && isLearning && (mode === 'edit') && (
        <DeckCardsTableItemProgressActions
          card={card}
          dispatch={dispatch}
        />
      )}
      { (mode === 'edit') && (
        <td
          className="deck-cards__table-cell"
          data-cell-type="body"
          data-cell-column="actions"
        >
          <Button
            className="deck-cards__table-delete delete-inline-button"
            onClick={handleDeleteClick}
          />
          <div
            className="deck-cards__table-drag drag-handle"
            {...drag}
          />
        </td>
      )}
    </>
  );
}
