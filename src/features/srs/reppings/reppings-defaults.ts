import { INITIAL_VALUE } from 'features/app/ui/editor/editor-utility';
import {
  getPhaseActionTypeIdByValue, getPhaseOffsetTypeIdByValue,
} from 'features/srs/reppings/divel/divels-domain';
import { Phase, PhaseAction } from 'features/srs/srs-types';

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

export const PHASE_ACTIONS_DRAFT: PhaseAction = [
  getPhaseActionTypeIdByValue('show') || 0,
  1,
];

export const PHASE_DEFAULT: Phase = {
  id: 1,
  actions: [
    [getPhaseActionTypeIdByValue('show') || 0, 1],
  ],
  actionsDraft: PHASE_ACTIONS_DRAFT,
  triggers: {
    0: {
      offset: [getPhaseOffsetTypeIdByValue('forward') || 0, 0],
      delay: [0, 0, 0, 0, 0],
    },
    1: {
      offset: [getPhaseOffsetTypeIdByValue('back') || 0, 0],
      delay: [0, 0, 0, 0, 0],
    },
  },
};

export const PHASE_TRIGGERS = [1, 0] as const;

export const PHASE_PERIODS = [
  'years',
  'months',
  'weeks',
  'days',
  'hours',
] as const;

export const PHASE_PERIODS_RANGES = {
  years: {
    min: 0,
    max: 10,
  },
  months: {
    min: 0,
    max: 11,
  },
  weeks: {
    min: 0,
    max: 4,
  },
  days: {
    min: 0,
    max: 30,
  },
  hours: {
    min: 0,
    max: 23,
  },
};
