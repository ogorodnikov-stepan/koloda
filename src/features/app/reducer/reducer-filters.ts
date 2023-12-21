/* eslint-disable no-param-reassign */
import { ReducerState } from './reducer-types';

export type FilterValue = string | number | boolean;

export interface EntityFilter {
  name: string;
  values: FilterValue[];
  convert: (x: string) => FilterValue;
}

export type RequestFilters = Record<string, FilterValue[]>;

export interface ReducerManyState extends ReducerState {
  params: {
    sort: string;
    limit: number;
    filters?: RequestFilters;
  };
  ui: {
    filters?: Record<string, boolean>;
  };
}

export const filterBoolean = (x: string) => (x === 'true');

export function sortUpdated(
  draft: ReducerManyState, payload: ReducerManyState['params']['sort'],
) {
  draft.params.sort = payload;
}

export interface FilterUpdatedPayload {
  name: string;
  checked: boolean;
  value: string;
}

export function updateFilters(
  draft: ReducerManyState, { name, checked }: FilterUpdatedPayload, entityFilters: EntityFilter[],
) {
  if (!draft.params.filters) draft.params.filters = {};
  if (!draft.ui.filters) draft.ui.filters = {};
  const { filters } = draft.params;
  const [property, value] = name.split('__');
  const { convert, values } = entityFilters.find((x) => (x.name === property)) || {};

  if (checked) {
    draft.ui.filters[name] = checked;
  } else {
    delete draft.ui.filters[name];
  }

  if (!convert || !values) return;
  if (checked) {
    if (filters[property]) {
      filters[property].push(convert(value));
      if (filters[property].length === values.length) {
        delete filters[property];
      }
    } else {
      filters[property] = [convert(value)];
    }
  }
  if (!checked) {
    if (filters[property]) {
      filters[property] = filters[property].filter((x) => (x !== convert(value)));
      if (!filters[property].length) delete filters[property];
    } else {
      filters[property] = values.filter((x) => (x !== convert(value)));
    }
  }
}

export function updateFiltersMeta(draft: ReducerManyState) {
  if (!draft.params.filters) draft.params.filters = {};
  if (!draft.ui.filters) draft.ui.filters = {};
  draft.meta.areFiltersEmpty = (Object.keys(draft.ui.filters).length === 0)
    && (Object.keys(draft.params.filters).length === 0);
}

export function filtersCleared(draft: ReducerManyState) {
  delete draft.ui.filters;
  delete draft.params.filters;
  draft.meta.areFiltersEmpty = true;
}
