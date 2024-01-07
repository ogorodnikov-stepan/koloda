/* eslint-disable no-param-reassign */
import addDateTime from 'date-fns/add';
import { formatDateTime } from 'features/app/date/date';
import {
  Repping, Divel, Phase, PhaseTrigger, Deck, Field,
  LessonDeck, LessonCard, LessonActionResult, LessonResults, PhaseAction,
} from 'features/srs/srs-types';
import {
  PHASE_DEFAULT_ACTIONS, getDivelById, getPhaseById,
  getPhaseByIndex, getPhaseIndexById, getPhaseTrigger, getPhaseActions,
  getPhaseOffsetTypeValueById, getPhaseActionTypeValueById, getPhaseActionTestedRole,
} from 'features/srs/reppings/divel/divels-domain';
import {
  getFieldRoleValueById, getFieldDefaultContent,
} from 'features/srs/decks/one/fields/deck-fields-domain';
import { LESSON_CARD_META } from './lessons-defaults';
import { State } from './lesson/lesson-reducer';

/**
 * Prepares deck for a lesson:
 * 1. Initialize each card meta
 * 2. Initialize deck meta
 * Mutates deck and cards objects (immer handles immutability)
 * @param deck Deck object
 * @param repping Repping object used for this collection of cards
 */
export function preprocessLessonDeck(deck: LessonDeck, repping: Repping) {
  if (deck.lesson.isProcessed) return;
  deck.cards.forEach((card: LessonCard) => {
    const { divel: divelId, phase: phaseId } = card.progress || {};
    const isInitial = !divelId || !phaseId;
    const divel = getDivelById(repping, divelId);
    const phase = divel && getPhaseById(divel, phaseId);
    const actions = isInitial ? PHASE_DEFAULT_ACTIONS : (phase && getPhaseActions(phase));
    card.lesson = { ...LESSON_CARD_META, isInitial };
    if (isInitial && divel) card.lesson.divel = divel.id;
    if (actions) {
      card.lesson.actions = actions;
    } else {
      card.lesson.isError = true;
    }
  });

  const currentCard = deck.cards.findIndex((card) => !card.lesson.isError);
  updateDeckProgress(deck);
  deck.lesson.currentCard = currentCard;
  deck.lesson.isError = currentCard === -1;
  deck.lesson.isProcessed = true;
}

/**
 * Applies lesson action result to the current card
 * Mutates state object (immer handles immutability)
 * @param draft Lesson state object
 * @param payload Action result
 * @returns Nothing
 */
export function submitLessonAction(
  card: LessonCard, repping: Repping, payload: LessonActionResult,
) {
  const { result, isError } = payload;
  const { results, currentActionIndex } = card.lesson;

  if (!isError && results) {
    if (!results[currentActionIndex]) results[currentActionIndex] = { correct: 0, incorrect: 0 };
    if (result) {
      results[currentActionIndex].correct += 1;
    } else {
      results[currentActionIndex].incorrect += 1;
    }
    if (isActionDone(results[currentActionIndex])) {
      if (isCardDone(card)) {
        if (card.lesson.isInitial) {
          const divel = getDivelById(repping, card.lesson.divel);
          const phase = divel && getPhaseById(divel);
          const actions = phase && getPhaseActions(phase);
          if (divel && phase && actions) {
            card.lesson = { ...LESSON_CARD_META, divel: divel.id, phase: phase.id, actions };
            // update progress so next phase could be calculated
            card.progress = { divel: divel.id, phase: phase.id };
          } else {
            card.lesson.isError = true;
          }
        } else {
          card.lesson.isDone = true;
        }
      } else {
        card.lesson.currentActionIndex = currentActionIndex + 1;
      }
    }
  } else {
    card.lesson.isError = true;
  }
}

/**
 * Checks whether action is done or not based on current lesson results
 * @param totals Object containing number of correct and incorrect action results
 */
function isActionDone({ correct = 0, incorrect = 0 }) {
  return correct >= (incorrect + 1);
}

/**
 * Checks whether card is done for this lesson
 * @param card Card object
 */
function isCardDone({ lesson }: LessonCard) {
  return lesson.currentActionIndex >= (lesson.actions.length - 1);
}

/**
 * Updates deck completion status after action result submition
 * Checks current card first to avoid unnecessary calls
 * @param deck Deck object
 * @param card Current card object
 */
export function updateLessonDeckMeta(deck: Deck) {
  const { currentCard } = deck.lesson;

  const nextCard = findNextDeckCard(deck, currentCard);

  if (nextCard !== -1) {
    deck.lesson.currentCard = nextCard;
  } else {
    const firstCard = findNextDeckCard(deck, -1);
    deck.lesson.currentCard = firstCard;
    deck.lesson.isDone = firstCard === -1;
  }
}

/**
 * Looks for a first card that is not done with index higher that provided
 * @param deck Deck object
 * @param index Deck's current card index
 * @returns Card's index | -1 - not found
 */
function findNextDeckCard(deck: Deck, index: number) {
  return deck.cards.findIndex(({ lesson }: LessonCard, i: number) => (
    !lesson.isDone && !lesson.isError && (i > index)
  ));
}

/**
 * 1. Finds new index after action result submition
 *    or after pending deck/repping loaded
 * 2. Checks if lesson is done
 * 3. Updates pending status if necessary
 * @param draft Lesson's state object
 */
export function updateLessonIndex(draft: State) {
  const { queue, current: { index }, decks } = draft;
  const deck = draft.current.deck || decks[queue.decks[index.deck]];
  if (!deck) return;

  // current deck lookup
  if (!deck.lesson.isDone && (deck.lesson.currentCard > index.card)) {
    index.card = deck.lesson.currentCard;
    updateLessonCurrentMeta(draft);
    return;
  }
  // next deck lookup
  const nextIndex = queue.decks.findIndex((deckId, i) => (
    !decks[deckId].data?.lesson.isDone && (i > index.deck)
  ));
  if (nextIndex !== -1) {
    const nextDeckId = queue.decks[nextIndex];
    index.deck = nextIndex;
    if (decks[nextDeckId]) {
      if (decks[nextDeckId].lesson.isProcessed) {
        index.card = decks[nextDeckId].lesson.currentCard;
        updateLessonCurrentMeta(draft);
      } else {
        index.card = -1;
      }
    } else {
      draft.meta.isPending = true;
      draft.meta.pendingDeck = nextDeckId;
      index.card = -1;
    }
  // first available lookup
  } else {
    const firstIndex = queue.decks.findIndex((deckId) => (
      !decks[deckId]?.lesson.isDone && !decks[deckId]?.lesson.isError
    ));
    if (firstIndex !== -1) {
      const firstDeckId = queue.decks[firstIndex];
      index.deck = firstIndex;
      index.card = decks[firstDeckId].lesson.currentCard;
      updateLessonCurrentMeta(draft);
    } else {
      draft.meta.isDone = true;
    }
  }
}

/**
 * Updates lesson's current meta after index update
 * @param draft Lesson's state object
 */
export function updateLessonCurrentMeta(draft: State) {
  const { plan, decks, reppings, current } = draft;
  const { deckId, reppingId } = plan.find((x, i) => (i === current.index.deck)) || {};
  const deck = deckId ? decks[deckId] : undefined;
  const repping = reppingId ? reppings[reppingId] : undefined;
  const card = deck && deck.cards[current.index.card];
  const { actions = [], currentActionIndex = 0 } = card?.lesson || {};
  const type = actions[currentActionIndex][0];

  if (deck && card && repping && type) {
    draft.meta.isStarted = true;
    current.deckId = deck.id;
    current.reppingId = repping.id;
    current.deck = deck;
    current.card = card;
    current.repping = repping;
    if (!current.action) current.action = {};
    const { action } = current;
    action.isInitial = card.lesson.isInitial;
    action.divelIndex = card.lesson.isInitial
      ? repping.divels.findIndex((x) => (x.id === card.lesson.divel))
      : repping.divels.findIndex((x) => (x.id === card?.progress?.divel));
    action.type = getPhaseActionTypeValueById(type);
    action.fields = makeLessonFields(deck.fields, card, type);
    action.actionResetFlag = !action.actionResetFlag;
  }
}

/**
 * Forms a collection of fields to be consumed by a component
 * 1. Adds card's content for that field
 * 2. Sorts (if necessary) and adds action-related data
 * @param fields Deck fields array
 * @param card Card
 * @param type Phase action type
 * @returns Fields array
 */
function makeLessonFields(fields: Field[], card: LessonCard, type: PhaseAction[0]) {
  const testedRole = getPhaseActionTestedRole(type);
  const lessonFields = card && fields.map((field) => (
    {
      ...field,
      content: card?.content?.[`${field.id}`] || getFieldDefaultContent(field),
      isTested: (testedRole === getFieldRoleValueById(field.role)),
    }
  ));

  return lessonFields;
}

/**
 * Updates lesson's results if card is done
 * @param results Current lesson's results
 * @param deck Current deck object
 * @param card Current card object
 * @param repping Repping object used for this card
 */
export function updateResults(
  results: LessonResults, deck: Deck, card: LessonCard, repping: Repping,
) {
  if (!card.lesson.isDone) return;
  const result = getLessonCardResult(card, repping);
  if (result) {
    const index = results.findIndex((x) => (x.deckId === deck.id));
    results[index].cards.push(result);
  }
}

/**
 * Returns lesson result object for given card
 * @param card Current card object
 * @param repping Repping object used for this card
 * @returns Result object | null - error
 */
function getLessonCardResult(card: LessonCard, repping: Repping) {
  const { divel: divelId, phase: phaseId } = card.progress || {};
  if (!divelId || !phaseId) return null;
  const divel = getDivelById(repping, divelId);
  const phase = divel && getPhaseById(divel, phaseId);
  const trigger = phase && getPhaseTrigger(phase, card);
  const nextPhase = !!trigger && getNextPhase(trigger, divel, phaseId);

  switch (nextPhase) {
    // error case
    case false:
      return null;
    // mark card as completed case
    case true:
      return { cardId: card.id, dueAt: formatDateTime(new Date()), isCompleted: true };
    // next phase found case
    default: {
      const dueAt = calculatePhaseDelay(trigger!.delay);
      return { cardId: card.id, dueAt: formatDateTime(dueAt), divel: divelId, phase: nextPhase };
    }
  }
}

/**
 * Calculates next phase for given phase trigger
 * @param trigger Phase trigger object
 * @param divel Current divel object
 * @param phaseId Current phase id
 * @returns Next phase id | true - completed | false - error
 */
function getNextPhase(trigger: PhaseTrigger, divel: Divel, phaseId: Phase['id']) {
  if (!trigger) return false;
  const [type, value = 0] = trigger.offset;

  switch (getPhaseOffsetTypeValueById(type)) {
    case 'back': {
      const index = getPhaseIndexById(divel, phaseId);
      const phase = (index !== null) && getPhaseByIndex(divel, index - value);
      return phase ? phase.id : false;
    }

    case 'forward': {
      const index = getPhaseIndexById(divel, phaseId);
      const phase = (index !== null) && getPhaseByIndex(divel, index + value);
      return phase ? phase.id : false;
    }

    case 'to':
      return getPhaseById(divel, value) ? value : false;

    case 'repeat':
      return phaseId;

    case 'complete':
      return true;

    default:
      return false;
  }
}

/**
 * Applies phase delay to a given time value, i.e. generates time value for the next lesson
 * @param delay Phase delay object
 * @param time DateTime object to add delay to; default value - now
 * @returns Delayed DateTime object
 */
function calculatePhaseDelay(delay: PhaseTrigger['delay'], time = new Date()) {
  const shift = {
    years: delay[0],
    months: delay[0],
    weeks: delay[0],
    days: delay[0],
    hours: delay[0],
  };
  return addDateTime(time, shift);
}

/**
 * Calculates the number of cards (total and done) and updates deck lesson meta
 * @param deck Deck object
 */
export function updateDeckProgress(deck: LessonDeck) {
  deck.lesson.cardsTotal = deck.cards.length;
  deck.lesson.cardsDone = deck.cards.filter((card) => (
    card.lesson.isError || card.lesson.isDone
  )).length;
}

/**
 * Sums up each deck progress meta and sets lesson progress meta
 * @param draft Lesson state object
 */
export function updateLessonProgress(draft: State) {
  const { progress, plan, decks } = draft;
  progress.cardsTotal = plan.reduce((acc, { deckId }) => (
    acc + (decks[deckId]?.lesson?.cardsTotal || 0)
  ), 0);
  progress.cardsDone = plan.reduce((acc, { deckId }) => (
    acc + (decks[deckId]?.lesson?.cardsDone || 0)
  ), 0);
  progress.percentage = ((progress.cardsDone / progress.cardsTotal) * 100).toFixed(1);
}
