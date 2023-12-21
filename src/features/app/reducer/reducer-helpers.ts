/* eslint-disable no-param-reassign */
import cloneDeep from 'lodash.clonedeep';
import { EditbarMode } from 'features/app/ui/editbar/editbar';
import {
  ReducerState, ReducerEntity, ReducerEntityStatus, ReducerMeta,
} from './reducer-types';

type Entity = string;

type State = Record<string, any>;

export function isDemoSet(draft: ReducerState, payload: ReducerMeta['isDemo']) {
  draft.meta.isDemo = payload;
}

interface EditbarModeSetPayload {
  entity: Entity;
  mode: EditbarMode;
}

export function editbarModeSet(draft: State, { entity, mode }: EditbarModeSetPayload) {
  draft[entity].status.editbar.mode = mode;
  draft[entity].status.message = 'initial';
  backupData(draft[entity]);
}

interface DisplayOptionSetPayload {
  entity: Entity;
  property: string;
  value: any;
}

export function displayOptionSet(draft: State, payload: DisplayOptionSetPayload) {
  const { entity, property, value } = payload;
  draft[entity].status.display[property] = value;
}

interface InitiatedPayload {
  entity: Entity;
}

export function savingInitiated(draft: State, { entity }: InitiatedPayload) {
  draft[entity].status.message = 'saving';
  draft[entity].status.isSaving = true;
  draft[entity].status.discard.isReady = false;
}

interface ValidationCompletedPayload {
  entity: Entity;
}

export function validationCompleted(draft: State, { entity }: ValidationCompletedPayload) {
  draft[entity].status.isError = false;
  draft[entity].status.message = 'validated';
  draft[entity].error = null;
}

interface FailedPayload {
  entity: Entity;
  error: Object;
}

export function validationFailed(draft: State, { entity, error }: FailedPayload) {
  draft[entity].status.isError = true;
  draft[entity].status.message = 'error';
  draft[entity].error = error;
}

export function savingFailed(draft: State, { entity, error }: FailedPayload) {
  draft[entity].status.isError = true;
  draft[entity].status.isSaved = false;
  draft[entity].status.isSaving = false;
  draft[entity].status.message = 'error';
  draft[entity].error = error;
}

export function onSavingCompleted(entity: ReducerEntity<any, any>) {
  const { status, backup } = entity;
  entity.error = null;
  status.isError = false;
  status.isSaved = true;
  status.isSaving = false;
  status.message = 'saved';
  status.discard.isAvailable = !!backup;
  status.discard.isReady = true;
  status.editbar.mode = 'view';
}

export function entityUpdated(status: ReducerEntityStatus) {
  status.isSaved = false;
  if (status.discard.isEnabled) status.discard.isAvailable = true;
}

export function backupData(entity: ReducerEntity<any>) {
  const { data, status: { canEdit, editbar: { mode } } } = entity;
  if (mode === 'edit' && canEdit && entity.data) {
    entity.backup = cloneDeep(data);
  }
}

interface Payload {
  entity: string;
}

export function onChangesDiscarded(draft: State, { entity }: Payload) {
  const { backup, status } = draft[entity];
  const { isEnabled, isAvailable, isReady } = status.discard;
  const canDiscard = isEnabled && isAvailable && isReady;
  if (backup && canDiscard) {
    const isClick = status.editbar.variant === 'click';
    draft[entity].data = cloneDeep(backup);
    draft[entity].backup = null;
    draft[entity].status.discard.isAvailable = false;
    // force backend request for delay type editbar
    draft[entity].status.isSaved = isClick;
    if (isClick) {
      draft[entity].status.editbar.mode = 'view';
      draft[entity].status.message = 'discarded';
      draft[entity].error = null;
    }
  }
}
