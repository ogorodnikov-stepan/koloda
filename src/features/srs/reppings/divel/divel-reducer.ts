/* eslint-disable no-param-reassign */
import produce from 'immer';
import cloneDeep from 'lodash.clonedeep';
import { getNextNumericId, int, minMax } from 'features/app/misc/misc';
import { ReducerEntity, ReducerState, ReducerActions } from 'features/app/reducer/reducer-types';
import {
  isDemoSet, editbarModeSet, onChangesDiscarded, entityUpdated,
  validationCompleted, validationFailed, savingInitiated, savingFailed,
  onSavingCompleted,
} from 'features/app/reducer/reducer-helpers';
import {
  Repping, Divel, Phase, PhaseTrigger, PhaseAction,
} from 'features/srs/srs-types';
import {
  PHASE_DEFAULT, PHASE_ACTIONS_DRAFT, PHASE_PERIODS_RANGES, PHASE_PERIODS, PHASE_TRIGGERS,
} from 'features/srs/reppings/reppings-defaults';
import { getPhaseOffsetTypeValueById } from './divels-domain';

export interface State extends ReducerState {
  phases: ReducerEntity<Phase[]>
}

export const divelDefault: State = {
  meta: {
    divel: {},
    repping: {},
  },
  phases: {
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
  reppingReceived,
  divelReceived,
  phaseAdded,
  phaseDeleted,
  titleUpdated,
  actionAdded,
  actionUpdated,
  actionDeleted,
  offsetUpdated,
  delayUpdated,
  delayDecremented,
  delayIncremented,
  changesDiscarded: onChangesDiscarded,
  validationCompleted,
  validationFailed,
  savingInitiated,
  savingFailed,
  savingCompleted,
};

function savingCompleted(draft: State) {
  onSavingCompleted(draft.phases);
}

function reppingReceived(draft: State, payload: { data: Repping }) {
  draft.meta.repping.title = payload.data.title;
  draft.meta.repping.isLoaded = true;
}

function divelReceived(draft: State, payload: { data: Divel }) {
  draft.phases.data = cloneDeep(payload.data.phases);
  draft.meta.divel.title = payload.data.title;
  // add isDelayEmpty meta to every trigger of every phase
  if (draft.phases.data) {
    draft.phases.data.forEach((phase) => {
      PHASE_TRIGGERS.forEach((total) => {
        const trigger = phase.triggers[total];
        if (trigger) {
          trigger.isDelayEmpty = updateIsDelayEmptyStatus(trigger);
        }
      });
    });
  }
  draft.phases.status.isLoaded = true;
}

function phaseAdded(draft: State) {
  const { data, status } = draft.phases;
  if (data) {
    const id = getNextNumericId(data);
    data.push({ ...PHASE_DEFAULT, id });
    entityUpdated(status);
  }
}

interface PhaseDeletedPayload {
  index: number;
}

function phaseDeleted(draft: State, { index }: PhaseDeletedPayload) {
  const { data, status } = draft.phases;
  if (data) {
    data.splice(index, 1);
    entityUpdated(status);
  }
}

interface TitleUpdatedPayload {
  phaseIndex: number;
  title: Phase['title'];
}

function titleUpdated(draft: State, payload: TitleUpdatedPayload) {
  const { phaseIndex, title } = payload;
  const phase = draft.phases.data?.[phaseIndex];
  if (phase) {
    phase.title = title;
    entityUpdated(draft.phases.status);
  }
}

interface ActionAddedPayload {
  phaseIndex: number;
}

function actionAdded(draft: State, payload: ActionAddedPayload) {
  const { phaseIndex } = payload;
  const phase = draft.phases.data?.[phaseIndex];
  if (phase) {
    phase.actions.push([...PHASE_ACTIONS_DRAFT]);
    entityUpdated(draft.phases.status);
  }
}

interface ActionUpdatedPayload {
  phaseIndex: number;
  actionIndex: number;
  property: keyof PhaseAction;
  value: any;
}

function actionUpdated(draft: State, payload: ActionUpdatedPayload) {
  const { phaseIndex, actionIndex, property, value } = payload;
  const action = draft.phases.data?.[phaseIndex]?.actions[actionIndex];
  if (action) {
    action[int(property)] = int(value);
    entityUpdated(draft.phases.status);
  }
}

interface ActionDeletedPayload {
  phaseIndex: number;
  actionIndex: number;
}

function actionDeleted(draft: State, payload: ActionDeletedPayload) {
  const { phaseIndex, actionIndex } = payload;
  const { data, status } = draft.phases;
  if (data) {
    data[phaseIndex].actions.splice(actionIndex, 1);
    entityUpdated(status);
  }
}

interface OffsetUpdatedPayload {
  phaseIndex: number;
  incorrectTotal: number;
  property: number;
  value: any;
}

function offsetUpdated(draft: State, payload: OffsetUpdatedPayload) {
  const { data, status } = draft.phases;
  if (data) {
    updateOffset(data, payload);
    entityUpdated(status);
  }
}

function updateOffset(data: Phase[], payload: OffsetUpdatedPayload) {
  const { phaseIndex, incorrectTotal, property, value } = payload;
  const { offset } = data[phaseIndex].triggers[incorrectTotal];
  if (int(property) === 1) {
    const type = getPhaseOffsetTypeValueById(offset[0]);
    offset[1] = updateOffsetValue(type, value, phaseIndex, data.length);
  }
  if (int(property) === 0) {
    const type = getPhaseOffsetTypeValueById(value);
    offset[0] = value;
    offset[1] = updateOffsetValue(type, offset[1], phaseIndex, data.length);
  }
}

function updateOffsetValue(type: any, value: any, phaseIndex: number, phasesTotal: number) {
  if (type === 'to') return minMax(int(value), 1, phasesTotal, false);
  if (type === 'back') return minMax(int(value), 0, phaseIndex, false);
  if (type === 'forward') return minMax(int(value), 0, phasesTotal - phaseIndex - 1, false);
  return value;
}

interface SetDelayPayload {
  phaseIndex: number;
  incorrectTotal: number;
  period: number;
  value?: any;
  shift?: -1 | 1;
}

function delayUpdated(draft: State, payload: SetDelayPayload) {
  const { phaseIndex, incorrectTotal, period, shift } = payload;
  const trigger = draft.phases.data?.[phaseIndex]?.triggers?.[incorrectTotal];
  if (trigger) {
    const value = shift
      ? trigger.delay[period] + shift
      : int(payload.value);
    trigger.delay[period] = getDelayValue({ ...payload, value });
    trigger.isDelayEmpty = updateIsDelayEmptyStatus(trigger);
    entityUpdated(draft.phases.status);
  }
}

function getDelayValue(payload: SetDelayPayload) {
  const { period, value } = payload;
  const { min, max } = PHASE_PERIODS_RANGES[PHASE_PERIODS[period]];
  return minMax(value, min, max, true);
}

function updateIsDelayEmptyStatus(trigger: PhaseTrigger) {
  const total = PHASE_PERIODS.reduce((acc, _, i) => (
    acc + (trigger.delay[i] || 0)
  ), 0);
  return total === 0;
}

function delayDecremented(draft: State, payload: SetDelayPayload) {
  delayUpdated(draft, { ...payload, shift: -1 });
}

function delayIncremented(draft: State, payload: SetDelayPayload) {
  delayUpdated(draft, { ...payload, shift: 1 });
}

export const divelReducer = produce((draft, [type, payload]) => {
  if (actions[type]) actions[type](draft, payload);
  return draft;
});
