/* eslint-disable no-param-reassign */
import produce from 'immer';
import { ReducerState, ReducerActions } from 'features/app/reducer/reducer-types';
import { LessonField } from 'features/srs/srs-types';
import { int } from 'features/app/misc/misc';
import { isTypeTestResultCorrect } from 'features/srs/lessons/lesson/action-types/lesson-action-typetest-domain';

export interface State extends ReducerState {
  result: boolean;
  fields: LessonField[];
}

const actions: ReducerActions = {
  actionReset,
  fieldChanged,
  actionSubmitted,
};

export const typeTestDefault: State = {
  meta: {},
  result: true,
  fields: [],
};

interface LessonResetPayload {
  fields: LessonField[];
}

function actionReset(draft: State, { fields }: LessonResetPayload) {
  draft.meta = {};
  draft.result = true;
  draft.fields = fields.map((field) => (
    { ...field, value: '' }
  ));
  const focusIndex = draft.fields.findIndex((field) => (field.isTested));
  if (focusIndex !== -1) draft.fields[focusIndex].isFocused = true;
}

interface FieldChangedPayload {
  field: string;
  value: string;
}

function fieldChanged(draft: State, { field, value }: FieldChangedPayload) {
  const index = draft.fields.findIndex((x) => (x.id === int(field)));
  if (draft.fields[index]) draft.fields[index].value = value;
}

function actionSubmitted(draft: State) {
  const { fields, meta } = draft;
  if (meta.isSubmited === true) {
    meta.isDone = true;
  } else {
    meta.isSubmited = true;
    fields.forEach((field, index) => {
      if (field.isTested) fields[index].isCorrect = isTypeTestResultCorrect(field);
    });
    const isCorrect = fields.findIndex((field) => (field.isTested && !field.isCorrect)) === -1;
    meta.isDone = isCorrect;
    draft.result = draft.result && isCorrect;
  }
}

export const typeTestReducer = produce((draft: State, [type, payload]) => {
  if (actions[type]) actions[type](draft, payload);
  return draft;
});
