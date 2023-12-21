/* eslint-disable no-param-reassign */
import produce from 'immer';
import cloneDeep from 'lodash.clonedeep';
import { ReducerActions } from 'features/app/reducer/reducer-types';
import {
  Repping, Deck,
  LessonPlan, LessonIndex, LessonActionResult, LessonResults,
  LessonField, LessonDeck, LessonCard,
} from 'features/srs/srs-types';
import { PHASE_ACTION_TYPES } from 'features/srs/reppings/divel/divels-domain';
import { LESSON_DECK_META } from 'features/srs/lessons/lessons-defaults';
import {
  preprocessLessonDeck, submitLessonAction, updateLessonDeckMeta,
  updateResults, updateLessonIndex, updateLessonProgress, updateDeckProgress,
} from 'features/srs/lessons/lessons-domain';

export interface State {
  meta: {
    isLoaded?: boolean;
    isStarted?: boolean;
    isPending?: boolean;
    pendingDeck?: Deck['id'];
    pendingRepping?: Repping['id'];
    isPaused?: boolean;
    isTerminated?: boolean;
    isDone?: boolean;
  };
  plan: LessonPlan;
  queue: {
    decks: Deck['id'][];
    reppings: Repping['id'][];
    deck?: Deck['id'];
    repping?: Repping['id'];
  };
  decks: Record<Deck['id'], LessonDeck>;
  reppings: Record<Repping['id'], Repping>;
  results: LessonResults;
  progress: {
    cardsTotal: number;
    cardsDone: number;
    percentage: string;
  };
  current: {
    index: LessonIndex;
    deckId?: Deck['id'];
    reppingId?: Repping['id'];
    deck?: Deck;
    card?: LessonCard;
    repping?: Repping;
    action?: {
      divelIndex?: number;
      type?: typeof PHASE_ACTION_TYPES[number]['value'];
      fields?: LessonField[];
      isInitial?: boolean;
      isSubmited?: boolean;
      isCorrect?: boolean;
      actionResetFlag?: boolean;
    };
  };
}

export const lessonDefault: State = {
  meta: {},
  plan: [],
  queue: {
    decks: [],
    reppings: [],
  },
  decks: {},
  reppings: {},
  results: [],
  progress: {
    cardsTotal: 0,
    cardsDone: 0,
    percentage: '0',
  },
  current: {
    index: { deck: 0, card: -1 },
  },
};

const actions: ReducerActions = {
  planReceived,
  reppingReceived,
  deckReceived,
  actionSubmitted,
  divelSet,
  lessonTerminated,
};

interface DataReceivedPayload {
  data: LessonPlan;
}

function planReceived(draft: State, { data }: DataReceivedPayload) {
  draft.plan = data;
  draft.meta.isLoaded = true;
  draft.queue.decks = data.map((x) => x.deckId);
  draft.queue.reppings = [...new Set(data.map((x) => x.reppingId))];
  draft.meta.isPending = true;
  draft.meta.pendingDeck = data[0].deckId;
  draft.meta.pendingRepping = data[0].reppingId;
  draft.queue.deck = data[0].deckId;
  draft.queue.repping = data[0].reppingId;
}

interface ReppingReceivedPayload {
  data: Repping;
}

function reppingReceived(draft: State, { data }: ReppingReceivedPayload) {
  const reppingId = data.id;
  draft.reppings[reppingId] = cloneDeep(data);
  // list of deck ids that use this repping
  const decks = draft.plan
    .filter((deck) => (deck.reppingId === reppingId))
    .map((deck) => deck.deckId);
  // prepare cards for decks that are loaded
  decks.forEach((deckId) => {
    if (draft.decks[deckId]) preprocessLessonDeck(draft.decks[deckId], data);
  });
  updateLessonProgress(draft);
  // possibly update pending status
  if (draft.meta.pendingRepping === reppingId) {
    draft.meta.pendingRepping = undefined;
    if (!draft.meta.pendingDeck) {
      draft.meta.isPending = false;
      updateLessonIndex(draft);
    }
  }
  // load next repping if any
  const index = draft.queue.reppings.findIndex((x) => (x === data.id));
  draft.queue.repping = draft.queue.reppings[index + 1];
}

interface DeckReceivedPayload {
  data: LessonDeck;
}

function deckReceived(draft: State, { data }: DeckReceivedPayload) {
  const deckId = data.id;
  draft.decks[deckId] = cloneDeep(data);
  draft.decks[deckId].lesson = cloneDeep(LESSON_DECK_META);
  // prepare cards for this deck if repping is loaded
  const repping = draft.reppings[data.reppingId];
  if (repping) {
    preprocessLessonDeck(draft.decks[deckId], repping);
    updateLessonProgress(draft);
  }
  // initialize results
  const index = draft.plan.findIndex((x) => (x.deckId === deckId));
  draft.results[index] = { deckId, cards: [] };
  // possibly update pending status
  if (draft.meta.pendingDeck === deckId) {
    draft.meta.pendingDeck = undefined;
    if (repping && !draft.meta.pendingRepping) {
      draft.meta.isPending = false;
      updateLessonIndex(draft);
    }
  }
  // load next deck if any
  draft.queue.deck = draft.queue.decks[index + 1];
}

function actionSubmitted(draft: State, payload: LessonActionResult) {
  const { decks, reppings, current: { deckId, reppingId, index }, results } = draft;
  if (!deckId || !reppingId) return;
  const deck = decks[deckId];
  const repping = reppings[reppingId];
  const card = deck.cards[index.card];

  if (repping && deck && card) {
    submitLessonAction(card, repping, payload);
    updateLessonDeckMeta(deck);
    updateResults(results, deck, card, repping);
    if (card.lesson.isDone || card.lesson.isError) {
      updateDeckProgress(deck);
      updateLessonProgress(draft);
    }
    updateLessonIndex(draft);
  }
}

interface DivelSetPayload {
  index: number;
}

function divelSet(draft: State, { index }: DivelSetPayload) {
  const { current: { card, repping, action } } = draft;
  const divel = repping?.divels[index];
  if (divel && card && action) {
    card.lesson.divel = divel.id;
    action.divelIndex = index;
  }
}

function lessonTerminated(draft: State) {
  draft.meta.isTerminated = true;
}

export const lessonReducer = produce((draft, [type, payload]) => {
  if (actions[type]) actions[type](draft, payload);
  return draft;
});
