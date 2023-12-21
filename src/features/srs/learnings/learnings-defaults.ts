import { LESSON_INITIAL_TYPE, LESSON_LEARNING_TYPE } from 'features/srs/lessons/lessons-defaults';
import { LearningSettings } from '../srs-types';

export const LEARNING_SETTINGS: LearningSettings = {
  lessonLimits: {
    [LESSON_INITIAL_TYPE]: 10,
    [LESSON_LEARNING_TYPE]: 50,
  },
};
