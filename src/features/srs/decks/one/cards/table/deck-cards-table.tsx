import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { ReducerDispatch } from 'features/app/reducer/reducer-types';
import { State } from 'features/srs/decks/one/deck-reducer';
import Button from 'features/app/ui/form/button';
import DeckCardsTableHead from './deck-cards-table-head';
import DeckCardsTableItem from './deck-cards-table-item';
import './deck-cards-table.scss';

const PREFIX = 'srs:decks.one.cards.many.table';

interface Props {
  state: State;
  dispatch: ReducerDispatch;
}

export default function DeckCardsTable({ state, dispatch }: Props) {
  const { t } = useTranslation('srs');
  const { fields } = state.fields?.data || {};
  const { data, status: { canAdd, editbar: { mode } } } = state.cards;
  const { cards } = data || {};

  const handleAddClick = useCallback(() => {
    dispatch(['cardAdded', {}]);
  }, []);

  const onDragEnd = useCallback(({ destination, source }) => {
    if (!destination || destination.index === source.index) return;
    dispatch(['cardMoved', { destination: destination.index, source: source.index }]);
  }, []);

  if (!fields) return null;

  return (

    <DragDropContext onDragEnd={onDragEnd}>
      <div className="deck-cards__table-wrapper">
        <table className="deck-cards__table">
          <DeckCardsTableHead
            state={state}
          />
          { cards && cards.length > 0 && (
            <Droppable droppableId="cards">
              { (providedDrop) => (
                <tbody
                  ref={providedDrop.innerRef}
                  {...providedDrop.droppableProps}
                >
                  { cards.map((card, index) => (
                    <Draggable
                      key={card.id}
                      draggableId={`${card.id}`}
                      index={index}
                      isDragDisabled={mode !== 'edit'}
                    >
                      { (providedDrag, snapshot) => (
                        <tr
                          className="deck-cards__table-row"
                          data-row-type="body"
                          data-is-dragging={snapshot.isDragging}
                          ref={providedDrag.innerRef}
                          {...providedDrag.draggableProps}
                        >
                          <DeckCardsTableItem
                            drag={providedDrag.dragHandleProps}
                            index={index}
                            card={card}
                            fields={fields}
                            state={state}
                            dispatch={dispatch}
                          />
                        </tr>
                      )}
                    </Draggable>
                  ))}
                  {providedDrop.placeholder}
                </tbody>
              )}
            </Droppable>
          )}
        </table>
      </div>
      { (mode === 'edit' && canAdd) && (
        <Button
          className="deck-cards__table-add add-button"
          onClick={handleAddClick}
          content={t(`${PREFIX}.add`)}
        />
      )}
    </DragDropContext>
  );
}
