/* eslint-disable no-param-reassign */
/* eslint-disable prefer-destructuring */
import produce from 'immer';
import { ReducerActions } from 'features/app/reducer/reducer-types';
import { Subject, Category } from 'features/srs/srs-types';

interface State {
  categories?: Category[];
  subjects?: Subject[];
  category?: Category;
  subject?: Subject;
  categoryId?: Category['id'] | null;
  subjectId?: Subject['id'] | null;
  options: {
    category?: { id: null, value: Category['value'] };
    subject?: { id: null, value: Subject['value'] };
  }
}

export const subjectsDefault: State = {
  categoryId: 1,
  subjectId: 1,
  options: {},
};

// when category is changed, subject has to be changed to the first subject in list
// and subject id in the deck reducer has to be updated as well

interface InitOptions {
  categoryId?: Category['id'] | null;
  subjectId?: Subject['id'] | null;
}

export const subjectsInit = (options: InitOptions) => (
  { ...subjectsDefault, ...options }
);

const actions: ReducerActions = {
  dataReceived,
  nullOptionUpdated,
  categoryChanged,
  subjectChanged,
};

interface NullOptionUpdatedPayload {
  category: string;
  subject: string;
}

function nullOptionUpdated(draft: State, payload: NullOptionUpdatedPayload) {
  const { category, subject } = payload;
  if (category) draft.options.category = { id: null, value: category };
  if (subject) draft.options.subject = { id: null, value: subject };
}

function dataReceived(draft: State, payload: Category[]) {
  draft.categories = [...payload];
  if (draft.options.category) draft.categories.unshift(draft.options.category);
  categoryChanged(draft, draft.categoryId);
}

function categoryChanged(draft: State, payload?: Category['id']) {
  draft.categoryId = payload;
  if (!draft.categories) return;

  draft.category = payload
    ? draft.categories.find((e) => (e.id === payload))
    : draft.categories[0];

  if (!draft.category?.subjects && !draft.options.subject) return;

  draft.subjects = draft.category?.subjects || [];
  if (draft.options.subject && draft.subjects.length !== 1) {
    draft.subjects.unshift(draft.options.subject);
  }
  draft.subject = draft.subjects[0];
  draft.subjectId = draft.subject.id;
  subjectChanged(draft, draft.subjectId);
}

function subjectChanged(draft: State, payload?: Subject['id']) {
  draft.subjectId = payload;
  if (draft.category && Array.isArray(draft.subjects)) {
    draft.subject = payload
      ? draft.subjects.find((e) => (e.id === payload))
      : draft.subjects[0];
  }
}

export const subjectsReducer = produce((draft, [type, payload]) => {
  if (actions[type]) actions[type](draft, payload);
  return draft;
});
