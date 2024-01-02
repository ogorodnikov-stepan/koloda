import { INITIAL_VALUE } from 'features/app/ui/editor/editor-utility';
import { FieldSettings, LessonCard } from 'features/srs/srs-types';
import { LESSON_CARD_META } from 'features/srs/lessons/lessons-defaults';
import { getFieldTypeIdByValue, getFieldRoleIdByValue } from './one/fields/deck-fields-domain';

export const DECK_FIELDS_MAX = 9;

export const DECK_CARDS_MAX = 999;

export const DECK_DEFAULT = {
  description: INITIAL_VALUE,
  categoryId: 1,
  subjectId: 1,
  languageId: 1,
  fields: [],
  fieldsTotal: 0,
  cardsTotal: 0,
  isEligible: false,
  isLearning: false,
};

const FIELD_DEFAULT_SETTINGS: FieldSettings = {
  actions: {
    show: {
      isLabelVisible: false,
    },
    typeTest: {
      isLabelVisible: false,
      processings: [],
    },
  },
};

export const FIELD_DEFAULT = {
  title: '',
  type: getFieldTypeIdByValue('show'),
  role: getFieldRoleIdByValue('extra'),
  settings: { ...FIELD_DEFAULT_SETTINGS },
};

export const CARD_DEFAULT: LessonCard = {
  id: 0,
  content: {},
  progress: {},
  lesson: { ...LESSON_CARD_META },
  meta: { status: 'initial' },
};
