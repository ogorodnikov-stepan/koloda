/* eslint-disable no-param-reassign */
import produce from 'immer';
import cloneDeep from 'lodash.clonedeep';
import set from 'lodash.set';
import {
  ReducerEntity, ReducerState, ReducerActions,
} from 'features/app/reducer/reducer-types';
import {
  isDemoSet, editbarModeSet, onChangesDiscarded,
  entityUpdated, validationCompleted, validationFailed,
  savingInitiated, savingFailed, onSavingCompleted,
} from 'features/app/reducer/reducer-helpers';
import { User } from 'features/auth/auth-types';

export interface State extends ReducerState {
  user: ReducerEntity<User>;
}

export const accountDefault: State = {
  meta: {},
  user: {
    status: {
      editbar: { variant: 'click', mode: 'view' },
      message: 'initial',
      isSaved: true,
      discard: { isEnabled: true, isReady: true },
      canEdit: true,
    },
  },
};

const actions: ReducerActions = {
  isDemoSet,
  editbarModeSet,
  dataReceived,
  propertyUpdated,
  changesDiscarded,
  validationCompleted,
  validationFailed,
  savingInitiated,
  savingFailed,
  savingCompleted,
};

interface DataReceivedPayload { data: User }

function dataReceived(draft: State, { data }: DataReceivedPayload) {
  draft.user.data = cloneDeep(data);
  draft.user.status.isLoaded = true;
}

interface PropertyUpdatedPayload {
  path: string;
  value: any;
}

function propertyUpdated(draft: State, { path, value }: PropertyUpdatedPayload) {
  const { data, status } = draft.user;
  if (!data) return;
  set(data, path, value);
  entityUpdated(status);
}

function changesDiscarded(draft: State) {
  onChangesDiscarded(draft, { entity: 'user' });
}

function savingCompleted(draft: State) {
  onSavingCompleted(draft.user);
}

export const accountReducer = produce((draft, [type, payload]) => {
  if (actions[type]) actions[type](draft, payload);
  return draft;
});
