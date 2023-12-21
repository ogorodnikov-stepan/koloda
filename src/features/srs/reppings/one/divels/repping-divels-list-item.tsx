import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { DraggableProvidedDragHandleProps } from 'react-beautiful-dnd';
import { Link } from 'react-router-dom';
import { useStore, isDemoSelector } from 'features/app/app-store';
import urls from 'features/app/routing/urls';
import { ReducerDispatch } from 'features/app/reducer/reducer-types';
import { State } from 'features/srs/reppings/one/repping-reducer';
import TextInput from 'features/app/ui/form/text-input';
import Button from 'features/app/ui/form/button';

const PREFIX = 'srs:divels.many';
const OPERATION = 'divels_update';

interface Props {
  drag: DraggableProvidedDragHandleProps | undefined;
  index: number;
  state: State;
  dispatch: ReducerDispatch;
}

export default function ReppingDivelsEditItem({ drag, index, state, dispatch }: Props) {
  const { t } = useTranslation('srs');
  const isDemo = useStore(isDemoSelector);
  const { data, error, status: { editbar: { mode } } } = state.divels;
  const { reppingId, divels } = data!;
  const divel = divels?.[index]!;

  const handleChange = useCallback(({ target: { name, value } }) => {
    dispatch(['divelUpdated', { index, property: name, value }]);
  }, [index]);

  const handleDeleteClick = useCallback(() => {
    dispatch(['divelDeleted', { index }]);
  }, [divel.id, reppingId, index]);

  return (
    <>
      <Link
        className="divels-list__item-link"
        to={urls.divel({ isDemo, reppingId, id: divel.id })}
      >
        <span className="divels-list__item-index">
          {index + 1}
        </span>
        { (mode === 'view') && (
          <span className="divels-list__item-title">
            {divel.title || ''}
          </span>
        )}
        { (mode === 'view') && divel.isDefault && (
          <span
            className="divels-list__item-default"
            title={t(`${PREFIX}.list.properties.default.active`)}
          />
        )}
      </Link>
      { (mode === 'edit') && (
        <>
          <TextInput
            className="divels-list__item-title"
            name="title"
            placeholder={t(`${PREFIX}.list.properties.title.placeholder`)}
            isError={!!error?.meta?.errors?.[OPERATION]?.divels?.[index]?.title}
            errors={error?.meta?.errors?.[OPERATION]?.divels?.[index]?.title}
            errorPrefix={`${PREFIX}.list.properties.title.errors`}
            errorsDropdown
            value={divel.title || ''}
            onChange={handleChange}
          />
          <Button
            className="divels-list__item-default-button"
            name="isDefault"
            data-is-selected={divel.isDefault === true}
            title={t(`${PREFIX}.list.properties.default.button`)}
            onClick={handleChange}
          />
          <Button
            className="divels-list__item-delete delete-inline-button"
            onClick={handleDeleteClick}
          />
          <div
            className="divels-list__item-drag drag-handle"
            {...drag}
          />
        </>
      )}
    </>
  );
}
