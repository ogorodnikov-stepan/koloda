import { TUTORIAL_SETTINGS } from 'features/app/app-domain';
import { LEARNING_SETTINGS } from 'features/srs/learnings/learnings-defaults';

export const UID_KEY = 'auth.uid';
export const UID_DEMO_KEY = 'auth.demo_uid';
export const TOKEN_KEY = 'auth.token';

export const USER_DEFAULT = {
  settings: {
    learning: LEARNING_SETTINGS,
    tutorial: TUTORIAL_SETTINGS,
  },
  tutorial: {
    isDone: false,
  },
};
