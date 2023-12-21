/* eslint-disable no-param-reassign */
import produce from 'immer';
import { InfiniteData } from 'react-query';
import { ReducerActions, ReducerReadOnlyEntity } from 'features/app/reducer/reducer-types';
import {
  ReducerManyState, FilterUpdatedPayload, filterBoolean,
  sortUpdated, updateFilters, updateFiltersMeta, filtersCleared,
} from 'features/app/reducer/reducer-filters';
import { isDemoSet } from 'features/app/reducer/reducer-helpers';
import { Repping } from 'features/srs/srs-types';

export const REPPINGS_SORT_OPTIONS = [
  '+title',
  '-title',
  '+created_at',
  '-created_at',
  '+updated_at',
  '-updated_at',
];

export const REPPINGS_FILTERS = [
  { name: 'isEligible', values: [true, false], convert: filterBoolean },
];

export interface State extends ReducerManyState {
  reppings: ReducerReadOnlyEntity<Repping[]>;
}

export const reppingsDefault: State = {
  meta: {
    areFiltersEmpty: true,
  },
  reppings: {},
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

type DataUpdatedPayload = InfiniteData<{ data: Repping[]; }>;

function dataUpdated(draft: State, payload: DataUpdatedPayload) {
  if (payload?.pages) {
    draft.reppings.data = payload.pages.reduce(
      (acc: Repping[], x) => ([...acc, ...x.data]),
      [],
    );
  } else {
    delete draft.reppings.data;
  }
}

function filterUpdated(draft: State, payload: FilterUpdatedPayload) {
  updateFilters(draft, payload, REPPINGS_FILTERS);
  updateFiltersMeta(draft);
}

export const reppingsReducer = produce((draft, [type, payload]) => {
  if (actions[type]) actions[type](draft, payload);
  return draft;
});
