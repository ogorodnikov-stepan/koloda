import { LessonCardMeta, LessonDeckMeta } from 'features/srs/srs-types';

export const LESSON_INITIAL_TYPE = 'new';
export const LESSON_LEARNING_TYPE = 'rep';

export const LESSON_TYPES = [
  LESSON_INITIAL_TYPE,
  LESSON_LEARNING_TYPE,
] as const;

export const LESSON_DECK_META: LessonDeckMeta = {
  isProcessed: false,
  isDone: false,
  isError: false,
  cardsTotal: 0,
  cardsDone: 0,
  currentCard: 0,
};

export const LESSON_CARD_META: LessonCardMeta = {
  actions: [],
  results: [],
  currentActionIndex: 0,
  isInitial: false,
  isDone: false,
};
