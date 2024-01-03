import { ChangeEvent } from 'react';
import { ComponentsList } from 'features/app/app-types';
import { LessonActionType, LessonField } from 'features/srs/srs-types';
import { getFieldTypeValueById } from 'features/srs/decks/one/fields/deck-fields-domain';
import LessonFieldText from './field-types/lesson-field-text';

const FIELD_TYPE_COMPONENTS: ComponentsList = {
  text: LessonFieldText,
};

export interface Props {
  type: LessonActionType;
  field: LessonField;
  value?: any;
  readonly?: boolean;
  isError?: boolean;
  onChange?: (x: ChangeEvent) => void;
}

export default function LessonActionField(
  { type, field, value, readonly, isError, onChange }: Props,
) {
  const fieldType = getFieldTypeValueById(field.type);
  const LessonFieldType = fieldType && FIELD_TYPE_COMPONENTS[fieldType];

  if (!LessonFieldType) return null;

  return (
    <LessonFieldType
      type={type}
      field={field}
      value={value}
      readonly={readonly}
      isError={isError}
      onChange={onChange}
    />
  );
}
