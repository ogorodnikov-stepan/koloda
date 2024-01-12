/* eslint-disable no-param-reassign */
import produce from 'immer';
import cloneDeep from 'lodash.clonedeep';
import { ReducerActions } from 'features/app/reducer/reducer-types';
import { Repping, Deck } from 'features/srs/srs-types';
import { UserProfile } from 'features/auth/auth-types';

export interface State {
  meta: {
    status: 'idle' | 'loading' | 'error' | 'success';
    isLoading?: boolean;
    isLoaded?: boolean;
    isCleared?: boolean;
    isDone?: boolean;
    isError?: boolean;
  };
  language: string;
  reppings: {
    data: string[];
    ids: Record<string, Repping['id']>;
    index: number;
    load?: string;
    add?: Repping;
  };
  decks: {
    data: string[];
    index: number;
    load?: string;
    add?: Deck;
  };
  user: {
    data?: UserProfile;
    load?: boolean;
    add?: UserProfile;
  }
}

export const demoDefault: State = {
  meta: {
    status: 'idle',
  },
  language: '',
  reppings: {
    ids: {},
    data: [],
    index: 0,
  },
  decks: {
    data: [],
    index: 0,
  },
  user: {},
};

interface InitPayload {
  language: string;
}

export function demoInit({ language }: InitPayload) {
  return { ...demoDefault, language };
}

const actions: ReducerActions = {
  languageUpdated,
  dataSubmitted,
  dataReceived,
  dataCleared,
  userAdded,
  errorReceived,
  reppingReceived,
  reppingAdded,
  deckReceived,
  deckAdded,
};

interface LanguageUpdatedPayload {
  value: string;
}

function languageUpdated(draft: State, { value }: LanguageUpdatedPayload) {
  draft.language = value;
}

function dataSubmitted(draft: State) {
  draft.meta.isLoading = true;
  draft.meta.status = 'loading';
}

interface DataReceivedPayload {
  user: UserProfile;
  reppings: string[];
  decks: string[];
}

function dataReceived(draft: State, payload: DataReceivedPayload) {
  draft.meta.isLoaded = true;
  draft.user.data = payload.user;
  draft.reppings.data = payload.reppings;
  draft.decks.data = payload.decks;
}

function dataCleared(draft: State) {
  const { reppings, decks } = draft;
  draft.meta.isCleared = true;
  if (reppings.data.length) {
    reppings.load = reppings.data[reppings.index];
  } else if (decks.data.length) {
    decks.load = decks.data[decks.index];
  } else {
    draft.user.add = draft.user.data;
  }
}

function reppingReceived(draft: State, payload: Repping) {
  draft.reppings.add = cloneDeep(payload);
}

interface RepppingAddedPayload {
  data: { id: Repping['id']; };
}

function reppingAdded(draft: State, { data }: RepppingAddedPayload) {
  const name = draft.reppings.data[draft.reppings.index];
  if (name) {
    draft.reppings.ids[name] = data.id;
    draft.reppings.index += 1;
    if (draft.reppings.index > (draft.reppings.data.length - 1)) {
      draft.decks.load = draft.decks.data[draft.decks.index];
    } else {
      draft.reppings.load = draft.reppings.data[draft.reppings.index];
      delete draft.reppings.add;
    }
  }
}

function deckReceived(draft: State, payload: Deck) {
  if (draft.reppings.ids[payload.reppingId]) {
    payload.reppingId = draft.reppings.ids[payload.reppingId];
  }
  draft.decks.add = cloneDeep(payload);
}

function deckAdded(draft: State) {
  draft.decks.index += 1;
  if (draft.decks.index > (draft.decks.data.length - 1)) {
    draft.user.add = draft.user.data;
  } else {
    draft.decks.load = draft.decks.data[draft.decks.index];
    delete draft.decks.add;
  }
}

function userAdded(draft: State) {
  draft.meta.isDone = true;
  draft.meta.status = 'success';
}

function errorReceived(draft: State) {
  draft.meta.isError = true;
  draft.meta.isLoading = false;
  draft.meta.status = 'error';
  delete draft.reppings.load;
  delete draft.reppings.add;
  delete draft.decks.load;
  delete draft.decks.add;
  delete draft.user.load;
}

export const demoReducer = produce((draft, [type, payload]) => {
  if (actions[type]) actions[type](draft, payload);
  return draft;
});
