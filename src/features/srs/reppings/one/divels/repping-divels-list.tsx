import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { ReducerDispatch } from 'features/app/reducer/reducer-types';
import { State } from 'features/srs/reppings/one/repping-reducer';
import Button from 'features/app/ui/form/button';
import ReppingDivelsEmpty from './repping-divels-empty';
import ReppingDivelsListItem from './repping-divels-list-item';

const PREFIX = 'srs:divels.many';

interface Props {
  state: State;
  dispatch: ReducerDispatch;
}

export default function ReppingDivelsList({ state, dispatch }: Props) {
  const { t } = useTranslation('srs');
  const { data, status: { canAdd, editbar: { mode } } } = state.divels;
  const { divels } = data || {};

  const handleAddClick = useCallback(() => {
    dispatch(['divelAdded', {}]);
  }, []);

  const onDragEnd = useCallback(({ destination, source }) => {
    if (!destination || destination.index === source.index) return;
    dispatch(['divelMoved', { destination: destination.index, source: source.index }]);
  }, []);

  if (mode === 'view' && !divels?.length) return <ReppingDivelsEmpty />;

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      { divels && divels.length > 0 && (
        <Droppable droppableId="divels">
          { (providedDrop) => (
            <ul
              className="divels-list"
              ref={providedDrop.innerRef}
              {...providedDrop.droppableProps}
            >
              { divels.map((divel, index) => (
                <Draggable
                  key={divel.id}
                  draggableId={`${divel.id}`}
                  index={index}
                  isDragDisabled={mode !== 'edit'}
                >
                  { (providedDrag, snapshot) => (
                    <li
                      className="divels-list__item"
                      data-is-dragging={snapshot.isDragging}
                      ref={providedDrag.innerRef}
                      {...providedDrag.draggableProps}
                    >
                      <ReppingDivelsListItem
                        drag={providedDrag.dragHandleProps}
                        index={index}
                        state={state}
                        dispatch={dispatch}
                      />
                    </li>
                  )}
                </Draggable>
              ))}
              {providedDrop.placeholder}
            </ul>
          )}
        </Droppable>
      )}
      { (mode === 'edit' && canAdd) && (
        <Button
          className="divels__add add-button"
          onClick={handleAddClick}
          content={t(`${PREFIX}.list.add`)}
        />
      )}
    </DragDropContext>
  );
}
