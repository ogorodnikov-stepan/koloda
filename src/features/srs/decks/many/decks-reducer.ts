/* eslint-disable no-param-reassign */
import produce from 'immer';
import { InfiniteData } from 'react-query';
import { ReducerActions, ReducerReadOnlyEntity } from 'features/app/reducer/reducer-types';
import {
  ReducerManyState, FilterUpdatedPayload, filterBoolean,
  sortUpdated, updateFilters, updateFiltersMeta, filtersCleared,
} from 'features/app/reducer/reducer-filters';
import { isDemoSet } from 'features/app/reducer/reducer-helpers';
import { Deck } from 'features/srs/srs-types';

export const DECKS_SORT_OPTIONS = [
  '+title',
  '-title',
  '+created_at',
  '-created_at',
  '+updated_at',
  '-updated_at',
];

export const DECKS_FILTERS = [
  { name: 'isEligible', values: [true, false], convert: filterBoolean },
];

export const DECKS_SELECTS = [
  'categoryId', 'subjectId', 'languageId',
];

export interface State extends ReducerManyState {
  decks: ReducerReadOnlyEntity<Deck[]>;
}

export const decksDefault: State = {
  meta: {},
  decks: {},
  params: {
    sort: '+title',
    limit: 10,
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

type DataReceivedPayload = InfiniteData<{ data: Deck[]; }>;

function dataUpdated(draft: State, payload: DataReceivedPayload) {
  if (payload?.pages) {
    draft.decks.data = payload.pages.reduce(
      (acc: Deck[], x) => ([...acc, ...x.data]),
      [],
    );
  } else {
    draft.decks.data = undefined;
  }
}

function filterUpdated(draft: State, payload: FilterUpdatedPayload) {
  const { name, value } = payload;
  if (DECKS_SELECTS.includes(name)) {
    if (!draft.params.filters) draft.params.filters = {};
    if (value) {
      draft.params.filters[name] = [value];
    } else {
      delete draft.params.filters[name];
    }
  } else {
    updateFilters(draft, payload, DECKS_FILTERS);
  }
  updateFiltersMeta(draft);
}

export const decksReducer = produce((draft, [type, payload]) => {
  if (actions[type]) actions[type](draft, payload);
  return draft;
});
