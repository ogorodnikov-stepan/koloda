import { Field } from 'features/srs/srs-types';

export const FIELD_TYPES = [
  { id: 1, value: 'text' },
];

export const FIELD_ROLES = [
  { id: 1, value: 'front' },
  { id: 2, value: 'back' },
  { id: 3, value: 'extra' },
];

export const getFieldTypeObjectById = (id: Field['type']) => (
  FIELD_TYPES.find((x) => (x.id === id))
);

export const getFieldTypeValueById = (id: Field['type']) => (
  getFieldTypeObjectById(id)?.value
);

export const getFieldTypeObjectByValue = (value: string) => (
  FIELD_TYPES.find((x) => (x.value === value)) || FIELD_TYPES[0]
);

export const getFieldTypeIdByValue = (value: string) => (
  getFieldTypeObjectByValue(value).id
);

export const getFieldRoleObjectById = (id: Field['role']) => (
  FIELD_ROLES.find((x) => (x.id === id))
);

export const getFieldRoleValueById = (id: Field['role']) => (
  getFieldRoleObjectById(id)?.value
);

export const getFieldRoleObjectByValue = (value: string) => (
  FIELD_ROLES.find((x) => (x.value === value)) || FIELD_ROLES[0]
);

export const getFieldRoleIdByValue = (value: string) => (
  getFieldRoleObjectByValue(value).id
);

export function getFieldDefaultContent(field: Field) {
  switch (getFieldTypeValueById(field.type)) {
    case 'text':
      return { text: '' };
    default:
      return {};
  }
}
