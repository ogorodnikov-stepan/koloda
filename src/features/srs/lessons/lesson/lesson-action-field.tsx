import { ChangeEvent } from 'react';
import { ComponentsList } from 'features/app/app-types';
import { LessonField } from 'features/srs/srs-types';
import { getFieldTypeValueById } from 'features/srs/decks/one/fields/deck-fields-domain';
import LessonFieldText from './field-types/lesson-field-text';

const FIELD_TYPE_COMPONENTS: ComponentsList = {
  text: LessonFieldText,
};

export interface Props {
  field: LessonField;
  value?: any;
  readonly?: boolean;
  isError?: boolean;
  onChange?: (x: ChangeEvent) => void;
}

export default function LessonActionField({ field, value, readonly, isError, onChange }: Props) {
  const type = getFieldTypeValueById(field.type);
  const LessonFieldType = type && FIELD_TYPE_COMPONENTS[type];

  if (!LessonFieldType) return null;

  return (
    <LessonFieldType
      field={field}
      value={value}
      readonly={readonly}
      isError={isError}
      onChange={onChange}
    />
  );
}
