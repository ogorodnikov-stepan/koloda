/* eslint-disable no-param-reassign */
import produce from 'immer';
import cloneDeep from 'lodash.clonedeep';
import { ReducerActions } from 'features/app/reducer/reducer-types';
import { Repping, Deck } from 'features/srs/srs-types';
import { UserProfile } from 'features/auth/auth-types';

export interface State {
  meta: {
    isSubmitted?: boolean;
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
  meta: {},
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

interface DataUpdatedPayload {
  value: any;
}

function languageUpdated(draft: State, { value }: DataUpdatedPayload) {
  if (!draft.meta.isSubmitted) draft.language = value;
}

function dataSubmitted(draft: State) {
  draft.meta.isSubmitted = true;
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
  draft.meta.isCleared = true;
  draft.reppings.load = draft.reppings.data[draft.reppings.index];
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
}

function errorReceived(draft: State) {
  draft.meta.isError = true;
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
