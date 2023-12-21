/* eslint-disable no-param-reassign */
import produce from 'immer';
import { InfiniteData } from 'react-query';
import { ReducerEntity, ReducerActions } from 'features/app/reducer/reducer-types';
import {
  ReducerManyState, FilterUpdatedPayload,
  sortUpdated, updateFiltersMeta, filtersCleared,
} from 'features/app/reducer/reducer-filters';
import { isDemoSet } from 'features/app/reducer/reducer-helpers';
import { Deck } from 'features/srs/srs-types';

export const LEARNINGS_SORT_OPTIONS = [
  '+title',
  '-title',
  '+last_learned_at',
  '-last_learned_at',
];

export const LEARNINGS_SELECTS = [
  'categoryId', 'subjectId', 'languageId',
];

export interface State extends ReducerManyState {
  decks: ReducerEntity<Deck[]>;
}

export const learningsDefault: State = {
  meta: {},
  decks: {
    status: {
      editbar: { variant: 'click', mode: 'view' },
      message: 'initial',
      isSaved: true,
      discard: { isEnabled: true, isReady: true },
      canEdit: true,
    },
  },
  params: {
    sort: '+title',
    limit: 10,
    filters: {},
  },
  ui: {
    filters: {},
  },
};

const actions: ReducerActions = {
  isDemoSet,
  dataUpdated,
  sortUpdated,
  filterUpdated,
  filtersCleared,
};

type DataUpdatedPayload = InfiniteData<{ data: Deck[]; }>;

function dataUpdated(draft: State, payload: DataUpdatedPayload) {
  if (payload?.pages) {
    draft.decks.data = payload.pages.reduce(
      (acc: Deck[], x) => ([...acc, ...x.data]),
      [],
    );
  } else {
    draft.decks.data = undefined;
  }
}

function filterUpdated(draft: State, { name, value }: FilterUpdatedPayload) {
  if (LEARNINGS_SELECTS.includes(name)) {
    if (!draft.params.filters) draft.params.filters = {};
    if (value) {
      draft.params.filters[name] = [value];
    } else {
      delete draft.params.filters[name];
    }
    updateFiltersMeta(draft);
  }
}

export const learningsReducer = produce((draft, [type, payload]) => {
  if (actions[type]) actions[type](draft, payload);
  return draft;
});
