import { INITIAL_VALUE } from 'features/app/ui/editor/editor-utility';
import {
  getPhaseActionTypeIdByValue, getPhaseOffsetTypeIdByValue,
} from 'features/srs/reppings/divel/divels-domain';

export const REPPING_DEFAULT = {
  description: INITIAL_VALUE,
  divels: [],
  isEligible: false,
  requirements: {
    divels: false,
    phases: false,
  },
};

export const REPPING_DIVELS_MAX = 9;

export const DIVEL_DEFAULT = {
  title: '',
  phases: [],
};

export const PHASE_ACTIONS_TIMES_MIN = 1;
export const PHASE_ACTIONS_TIMES_MAX = 99;

export const PHASE_TRIGGER_OFFSET_MIN = 1;
export const PHASE_TRIGGER_OFFSET_MAX = 99;

export const PHASE_ACTIONS_DRAFT = {
  type: getPhaseActionTypeIdByValue('show') || 0,
  times: 1,
};

export const PHASE_DEFAULT = {
  id: 1,
  actions: [
    {
      type: getPhaseActionTypeIdByValue('show') || 0,
      times: 1,
    },
  ],
  actionsDraft: PHASE_ACTIONS_DRAFT,
  triggers: {
    0: {
      offset: {
        type: getPhaseOffsetTypeIdByValue('forward') || 0,
        value: 0,
      },
      delay: {
        hours: 23,
        days: 0,
        weeks: 0,
        months: 0,
        years: 0,
      },
    },
    1: {
      offset: {
        type: getPhaseOffsetTypeIdByValue('back') || 0,
        value: 0,
      },
      delay: {
        hours: 23,
        days: 0,
        weeks: 0,
        months: 0,
        years: 0,
      },
    },
  },
};

export const PHASE_PERIODS = [
  'years',
  'months',
  'weeks',
  'days',
  'hours',
] as const;

export const PHASE_PERIODS_DEFAULT = {
  hours: {
    min: 0,
    max: 23,
  },
  days: {
    min: 0,
    max: 30,
  },
  weeks: {
    min: 0,
    max: 4,
  },
  months: {
    min: 0,
    max: 11,
  },
  years: {
    min: 0,
    max: 10,
  },
};
