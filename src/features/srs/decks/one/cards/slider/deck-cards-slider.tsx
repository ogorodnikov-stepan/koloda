import { useMemo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { ReducerDispatch } from 'features/app/reducer/reducer-types';
import { State } from 'features/srs/decks/one/deck-reducer';
import Button from 'features/app/ui/form/button';
import DeckCardsSliderItem from './deck-cards-slider-item';
import './deck-cards-slider.scss';

const PREFIX = 'srs:decks.one.cards.many.slider';

interface Props {
  state: State;
  dispatch: ReducerDispatch;
}

export default function DeckCardsSlider({ state, dispatch }: Props) {
  const { t } = useTranslation('srs');
  const { data, status: { canAdd, display, editbar: { mode } } } = state.cards;
  const { fields } = state.fields?.data || {};
  const { cards } = data || {};
  const { currentItem = {} } = display || {};

  const currentCard = useMemo(() => (
    cards && cards.find((x) => x.id === currentItem.id)
  ), [cards, currentItem]);

  const handleItemClick = useCallback(({ target: { name } }) => {
    dispatch(['currentCardSet', { id: name }]);
  }, []);

  const handleAddClick = useCallback(() => {
    dispatch(['cardAdded', {}]);
  }, []);

  const onDragEnd = useCallback(({ destination, source }) => {
    if (!destination || destination.index === source.index) return;
    dispatch(['cardMoved', { destination: destination.index, source: source.index }]);
  }, []);

  if (!fields) return null;

  return (
    <div className="deck-cards__slider">
      <DragDropContext onDragEnd={onDragEnd}>
        { cards && (
          <Droppable droppableId="deck-cards" direction="horizontal">
            { (providedDrop) => (
              <div className="deck-cards__slider-header">
                <ul
                  className="deck-cards__slider-list"
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
                        <li
                          className="deck-cards__slider-list-item"
                          data-is-dragging={snapshot.isDragging}
                          ref={providedDrag.innerRef}
                          {...providedDrag.draggableProps}
                        >
                          <Button
                            className="deck-cards__slider-list-item-index"
                            name={`${card.id}`}
                            data-is-selected={card.id === currentItem.id}
                            onClick={handleItemClick}
                          >
                            {index + 1}
                          </Button>
                          { mode === 'edit' && (
                            <div
                              className="deck-cards__slider-drag drag-handle"
                              {...providedDrag.dragHandleProps}
                            />
                          )}
                        </li>
                      )}
                    </Draggable>
                  ))}
                  {providedDrop.placeholder}
                  { (mode === 'edit' && canAdd) && (
                    <li className="deck-cards__slider-list-item">
                      <Button
                        className="deck-cards__slider-add add-button"
                        onClick={handleAddClick}
                        content={t(`${PREFIX}.add`)}
                      />
                    </li>
                  )}
                </ul>
              </div>
            )}
          </Droppable>
        )}
      </DragDropContext>
      { currentCard && (
        <DeckCardsSliderItem
          index={currentItem.index}
          card={currentCard}
          fields={fields}
          state={state}
          dispatch={dispatch}
        />
      )}
    </div>
  );
}
