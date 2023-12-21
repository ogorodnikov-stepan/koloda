/* eslint-disable no-param-reassign */
import produce from 'immer';
import { ReducerEntity, ReducerState, ReducerActions } from 'features/app/reducer/reducer-types';
import {
  isDemoSet, editbarModeSet, onChangesDiscarded, entityUpdated,
  validationCompleted, validationFailed, savingInitiated, savingFailed,
  onSavingCompleted,
} from 'features/app/reducer/reducer-helpers';
import { Repping, Divel } from 'features/srs/srs-types';
import { getNextNumericId } from 'features/app/misc/misc';
import { DIVEL_DEFAULT, REPPING_DIVELS_MAX } from 'features/srs/reppings/reppings-defaults';
import { updateDefaultDivel } from '../reppings-domain';

interface Divels {
  reppingId?: Repping['id'];
  divels?: Divel[];
}

export interface State extends ReducerState {
  repping: ReducerEntity<Repping>,
  divels: ReducerEntity<Divels>,
}

type Entity = 'repping' | 'divels';

export const reppingDefault: State = {
  meta: {
    tabs: {
      headers: ['about', 'divels'],
      items: {
        about: { disabled: false },
        divels: { disabled: false },
      },
    },
  },
  repping: {
    status: {
      editbar: { variant: 'click', mode: 'view' },
      message: 'initial',
      isSaved: true,
      discard: { isEnabled: true, isReady: true },
      canEdit: true,
    },
  },
  divels: {
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
  reppingUpdated,
  divelAdded,
  divelUpdated,
  divelDeleted,
  divelMoved,
  changesDiscarded,
  validationCompleted,
  validationFailed,
  savingInitiated,
  savingFailed,
  savingCompleted,
};

interface DataReceivedPayload {
  data: Repping;
}

function dataReceived(draft: State, { data }: DataReceivedPayload) {
  draft.repping.data = data;
  draft.repping.status.isLoaded = true;
  draft.divels.data = { reppingId: data.id, divels: data.divels };
  draft.divels.status.isLoaded = true;
  draft.meta.title = data.title;
  setCanAddDivel(draft);
  removePhases(draft);
}

function setCanAddDivel(draft: State) {
  const { divels } = draft.divels?.data || {};
  if (divels) {
    draft.divels.status.canAdd = divels.length < REPPING_DIVELS_MAX;
  }
}

interface ReppingUpdatedPayload {
  property: keyof Repping;
  value: any;
}

function reppingUpdated(draft: State, payload: ReppingUpdatedPayload) {
  const { property, value } = payload;
  const { data, status } = draft.repping;
  if (data && data[property] !== value) {
    entityUpdated(status);
    data[property] = value;
  }
}

function divelAdded(draft: State) {
  if (!draft.divels.data?.divels) return;
  const { data: { divels }, status } = draft.divels;
  const id = getNextNumericId(divels);
  divels.push({ ...DIVEL_DEFAULT, id, isDefault: (divels.length < 1) });
  entityUpdated(status);
  setCanAddDivel(draft);
}

interface DivelUpdatedPayload {
  index: number;
  property: keyof Divel;
  value: Divel[keyof Divel];
}

function divelUpdated(draft: State, payload: DivelUpdatedPayload) {
  const { index, property, value } = payload;
  const { data, status } = draft.divels;
  const { divels } = data!;
  if (divels?.[index]) {
    if (property === 'isDefault') {
      updateDefaultDivel(divels, index);
    } else {
      divels[index][property] = value;
    }
    entityUpdated(status);
  }
}

interface DivelDeletedPayload {
  index: number;
}

function divelDeleted(draft: State, payload: DivelDeletedPayload) {
  const { data, status } = draft.divels;
  const { divels } = data || {};
  if (divels) {
    divels.splice(payload.index, 1);
    entityUpdated(status);
  }
}

interface DivelMovedPayload {
  destination: number;
  source: number;
}

function divelMoved(draft: State, payload: DivelMovedPayload) {
  const { destination, source } = payload;
  const { data, status } = draft.divels;
  const { divels } = data || {};
  if (divels) {
    divels.splice(destination, 0, divels.splice(source, 1)[0]);
    entityUpdated(status);
  }
}

interface ChangesDiscardedPayload {
  entity: Entity;
}

function changesDiscarded(draft: State, { entity }: ChangesDiscardedPayload) {
  onChangesDiscarded(draft, { entity });
  if (entity === 'divels') setCanAddDivel(draft);
}

interface SavingCompletedPayload {
  entity: Entity;
  data: Repping;
}

function savingCompleted(draft: State, { entity, data }: SavingCompletedPayload) {
  onSavingCompleted(draft[entity]);
  if (draft.repping.data) {
    draft.repping.data.isEligible = data.isEligible;
    draft.repping.data.updatedAt = data.updatedAt;
    if (entity === 'repping') draft.meta.title = draft.repping.data.title;
    if (entity === 'divels') removePhases(draft);
  }
}

function removePhases(draft: State) {
  if (draft.divels?.data?.divels) {
    const divels = draft.divels.data.divels.map(({ phases, ...x }) => (x));
    draft.divels.data.divels = divels;
  }
}

export const reppingReducer = produce((draft, [type, payload]) => {
  if (actions[type]) actions[type](draft, payload);
  return draft;
});
