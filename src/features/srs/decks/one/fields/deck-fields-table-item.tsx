import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { DraggableProvidedDragHandleProps } from 'react-beautiful-dnd';
import { ReducerDispatch } from 'features/app/reducer/reducer-types';
import { State } from 'features/srs/decks/one/deck-reducer';
import { Field } from 'features/srs/srs-types';
import TextInput from 'features/app/ui/form/text-input';
import Select from 'features/app/ui/select/select';
import Button from 'features/app/ui/form/button';
import {
  FIELD_TYPES, FIELD_ROLES,
  getFieldTypeObjectById, getFieldRoleObjectById,
  getFieldTypeValueById, getFieldRoleValueById,
} from './deck-fields-domain';

const PREFIX = 'srs:decks.one.fields.many.table';
const T_PREFIX = 'srs:decks.one.fields';
const T_FALLBACK = 'unknown';
const OPERATION = 'fields_set';

interface Props {
  drag: DraggableProvidedDragHandleProps | undefined;
  index: number;
  field: Field;
  state: State;
  dispatch: ReducerDispatch;
}

export default function DeckFieldsTableItem({ drag, index, field, state, dispatch }: Props) {
  const { t } = useTranslation('srs');
  const { error, status: { editbar: { mode } } } = state.fields;

  const getType = useCallback((type) => (
    t(`${T_PREFIX}.types.${getFieldTypeValueById(type?.id) || T_FALLBACK}`)
  ), []);

  const getRole = useCallback((type) => (
    t(`${T_PREFIX}.roles.${getFieldRoleValueById(type?.id) || T_FALLBACK}`)
  ), []);

  const handleChange = useCallback(({ target: { name, value } }) => {
    dispatch(['fieldUpdated', { index, property: name, value }]);
  }, [index]);

  const handleDeleteClick = useCallback(() => {
    dispatch(['fieldDeleted', { index }]);
  }, [index]);

  return (
    <>
      <td
        className="deck-fields__table-cell"
        data-cell-type="body"
        data-cell-column="index"
      >
        <span className="deck-fields__table-cell-value">
          {index + 1}
        </span>
      </td>
      <td
        className="deck-fields__table-cell"
        data-cell-type="body"
        data-cell-column="title"
      >
        { (mode === 'edit') ? (
          <TextInput
            className="fields-table__title"
            name="title"
            placeholder={t(`${PREFIX}.properties.title.placeholder`)}
            isError={!!error?.meta?.errors?.[OPERATION]?.fields?.[index]?.title}
            errors={error?.meta?.errors?.[OPERATION]?.fields?.[index]?.title}
            errorPrefix={`${PREFIX}.properties.title.errors`}
            errorsDropdown
            value={field.title || ''}
            onChange={handleChange}
          />
        ) : (
          <span className="deck-fields__table-cell-value">
            {field.title}
          </span>
        )}
      </td>
      <td
        className="deck-fields__table-cell"
        data-cell-type="body"
        data-cell-column="type"
      >
        { (mode === 'edit') ? (
          <Select
            className="fields-table__type"
            name="type"
            items={FIELD_TYPES}
            selectedItem={getFieldTypeObjectById(field.type)}
            getValue={getType}
            onChange={handleChange}
          />
        ) : (
          <span className="deck-fields__table-cell-value">
            {getType(getFieldTypeObjectById(field.type))}
          </span>
        )}
      </td>
      <td
        className="deck-fields__table-cell"
        data-cell-type="body"
        data-cell-column="role"
      >
        { (mode === 'edit') ? (
          <Select
            className="fields-table__role"
            name="role"
            items={FIELD_ROLES}
            selectedItem={getFieldRoleObjectById(field.role)}
            getValue={getRole}
            onChange={handleChange}
          />
        ) : (
          <span className="deck-fields__table-cell-value">
            {getRole(getFieldRoleObjectById(field.role))}
          </span>
        )}
      </td>
      { (mode === 'edit') && (
        <td
          className="deck-fields__table-cell"
          data-cell-type="body"
          data-cell-column="actions"
        >
          <Button
            className="deck-fields__table-delete delete-inline-button"
            onClick={handleDeleteClick}
          />
          <div
            className="deck-fields__table-drag drag-handle"
            {...drag}
          />
        </td>
      )}
    </>
  );
}
