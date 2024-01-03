import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { ReducerDispatch } from 'features/app/reducer/reducer-types';
import { State } from 'features/srs/decks/one/deck-reducer';
import Button from 'features/app/ui/form/button';
import DeckFieldsEmpty from './deck-fields-empty';
import DeckFieldsTableItem from './deck-fields-table-item';

const PREFIX = 'srs:decks.one.fields.many.table';

const COLUMNS = [
  'index',
  'title',
  'type',
  'role',
  'settings',
  'actions',
];

interface Props {
  state: State;
  dispatch: ReducerDispatch;
}

export default function DeckFieldsTable({ state, dispatch }: Props) {
  const { t } = useTranslation('srs');
  const { data, status: { canAdd, editbar: { mode } } } = state.fields;
  const { fields } = data || {};

  const handleAddClick = useCallback(() => {
    dispatch(['fieldAdded', { t }]);
  }, []);

  const onDragEnd = useCallback(({ destination, source }) => {
    if (!destination || destination.index === source.index) return;
    dispatch(['fieldMoved', { destination: destination.index, source: source.index }]);
  }, []);

  if (mode === 'view' && !fields?.length) return <DeckFieldsEmpty />;

  return (
    <div className="deck-fields__content">
      <DragDropContext onDragEnd={onDragEnd}>
        <table className="deck-fields__table">
          <thead className="deck-fields__table-head">
            <tr
              className="deck-fields__table-row"
              data-row-type="head"
            >
              { COLUMNS.map((column) => (
                <td
                  key={column}
                  className="deck-fields__table-cell"
                  data-cell-type="head"
                  data-cell-column={column}
                >
                  <span className="deck-fields__table-cell-value">
                    {t(`${PREFIX}.properties.${column}.caption`)}
                  </span>
                </td>
              ))}
            </tr>
          </thead>
          { fields && fields.length > 0 && (
            <Droppable droppableId="fields">
              { (providedDrop) => (
                <tbody
                  ref={providedDrop.innerRef}
                  {...providedDrop.droppableProps}
                >
                  { fields.map((field, index) => (
                    <Draggable
                      key={field.id}
                      draggableId={`${field.id}`}
                      index={index}
                      isDragDisabled={mode !== 'edit'}
                    >
                      { (providedDrag, snapshot) => (
                        <tr
                          className="deck-fields__table-row"
                          data-row-type="body"
                          data-is-dragging={snapshot.isDragging}
                          ref={providedDrag.innerRef}
                          {...providedDrag.draggableProps}
                        >
                          <DeckFieldsTableItem
                            drag={providedDrag.dragHandleProps}
                            index={index}
                            field={field}
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
          <tbody>
            <tr>
              <td colSpan={99}>
                { (mode === 'edit' && canAdd) && (
                  <Button
                    className="deck-fields__add add-button"
                    onClick={handleAddClick}
                    content={t(`${PREFIX}.add`)}
                  />
                )}
              </td>
            </tr>
          </tbody>
        </table>
      </DragDropContext>
    </div>
  );
}
