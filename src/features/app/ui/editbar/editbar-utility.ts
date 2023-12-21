import { ReducerEntityStatus } from 'features/app/reducer/reducer-types';

export function getMode(status: ReducerEntityStatus) {
  return (status.editbar.mode === 'edit') ? 'view' : 'edit';
}

export function isSaveButtonDisabled(status: ReducerEntityStatus) {
  return (status.editbar.mode === 'edit') ? (status.isError || status.isSaving) : false;
}

export function isModeButtonDisabled(status: ReducerEntityStatus) {
  return (status.editbar.mode === 'edit') ? (status.isError || status.isSaving) : false;
}
