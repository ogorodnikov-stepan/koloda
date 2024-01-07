import { Repping, Divel, Phase, PhaseAction, LessonCard } from 'features/srs/srs-types';

export const PHASE_ACTION_TYPES = [
  { id: 1, value: 'show', roleTested: null },
  { id: 2, value: 'typeTest', roleTested: 'back' },
  { id: 3, value: 'typeTestReverse', roleTested: 'front' },
];

export const PHASE_OFFSET_TYPES = [
  { id: 1, value: 'back' },
  { id: 2, value: 'forward' },
  { id: 3, value: 'to' },
  { id: 4, value: 'repeat' },
  { id: 5, value: 'complete' },
];

export const PHASE_DEFAULT_ACTIONS: PhaseAction[] = [
  [
    getPhaseActionTypeIdByValue('show')!,
    1,
  ],
];

/**
 * Retrieves divel with provided id or default divel if not provided
 * @param repping Repping object
 * @param id Divel id or null (for default divel)
 * @returns Divel object or null if error/not found
 */
export function getDivelById(repping: Repping, id?: Divel['id'] | null) {
  if (!Array.isArray(repping?.divels)) return null;
  return id
    ? repping.divels.find((x) => (x?.id === id))
    : repping.divels.find((x) => (x.isDefault)) || repping.divels[0];
}

/**
 * Retrieves phase with provided id or default phase if not provided
 * @param divel Divel object
 * @param id Phase id or null
 * @returns Phase object | null - error/not found
 */
export function getPhaseById(divel: Divel, id?: Phase['id'] | null) {
  if (!Array.isArray(divel?.phases)) return null;
  return id
    ? divel.phases.find((e) => e?.id && e.id === id)
    : divel.phases[0];
}

/**
 * Retrieves phase by it's index
 * @param divel Divel object
 * @param index Phase index to look for
 * @returns Phase object | null - not found
 */
export function getPhaseByIndex(divel: Divel, index: number) {
  return divel?.phases?.[index] || null;
}

/**
 * Returns phase index for provided id
 * @param divel Divel object
 * @param id Phase id to look for
 * @returns Phase index | null - not found or error
 */
export function getPhaseIndexById(divel: Divel, id: Phase['id']) {
  const index = divel.phases?.findIndex((phase) => (phase.id === id));
  return (index === undefined || index === -1) ? null : index;
}

export function getPhaseActions(phase: Phase) {
  return phase ? phase.actions : null;
}

export function getPhaseActionTestedRole(type: PhaseAction[1]) {
  return PHASE_ACTION_TYPES.find((x) => (x.id === type))?.roleTested;
}

/**
 * Retrieves phase trigger based on card's lesson progress
 * @param phase Current phase object
 * @param card Current card object
 * @returns Trigger object | null - not found or error
 */
export function getPhaseTrigger(phase: Phase, { lesson }: LessonCard) {
  if (!phase.triggers || !lesson.results) return null;
  const incorrectTotal = lesson.results.reduce((acc, result) => (
    result.incorrect + acc
  ), 0);
  return (incorrectTotal > 0) ? phase.triggers[1] : phase.triggers[0];
}

export function getPhaseActionTypeObjectById(id: number) {
  return PHASE_ACTION_TYPES.find((x) => (x.id === id));
}

export function getPhaseActionTypeValueById(id: number) {
  return getPhaseActionTypeObjectById(id)?.value;
}

export function getPhaseActionTypeObjectByValue(value: string) {
  return PHASE_ACTION_TYPES.find((x) => (x.value === value));
}

export function getPhaseActionTypeIdByValue(value: string) {
  return getPhaseActionTypeObjectByValue(value)?.id;
}

export function getPhaseOffsetTypeObjectById(id: number) {
  return PHASE_OFFSET_TYPES.find((x) => (x.id === id));
}

export function getPhaseOffsetTypeValueById(id: number) {
  return getPhaseOffsetTypeObjectById(id)?.value;
}

export function getPhaseOffsetTypeObjectByValue(value: string) {
  return PHASE_OFFSET_TYPES.find((x) => (x.value === value));
}

export function getPhaseOffsetTypeIdByValue(value: string) {
  return getPhaseOffsetTypeObjectByValue(value)?.id;
}
