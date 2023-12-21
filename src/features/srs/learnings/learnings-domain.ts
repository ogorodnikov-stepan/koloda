/* eslint-disable no-param-reassign */
import produce from 'immer';
import { Repping, Divel, Card } from 'features/srs/srs-types';

/**
 * Helper function to generate learning meta
 * @param cards Array of card objects
 * @param repping Repping object used for learning these cards
 * @returns Meta object
 */
const getLearningCardsMetaReducer = produce((draft, card) => {
  const { isCompleted, dueAt, divel, phase } = card.progress || {};
  if (isCompleted) {
    draft.completed += 1;
  } else if (dueAt && divel && phase) {
    draft.learning += 1;
    if (draft.divels[divel]) draft.divels[divel].total += 1;
  } else {
    draft.initial += 1;
  }
  draft.total += 1;
  return draft;
});

/**
 * Generates learning meta based on deck's cards
 * @param cards Array of card objects
 * @param repping Repping object used for learning these cards
 * @returns Meta object
 */
export function getLearningMeta(cards: Card[], repping: Repping) {
  const divels = repping.divels.map((divel: Divel) => (
    { title: divel.title, total: 0 }
  ));
  return cards.reduce(getLearningCardsMetaReducer, {
    completed: 0, learning: 0, initial: 0, total: 0, divels,
  });
}

/**
 * Adds learning meta to each card
 * Mutates card object (immer handles immutability)
 * @param cards Array of card objects
 * @param repping Repping object used for learning these cards
 */
export function updateCardsLearningMeta(cards: Card[], repping: Repping) {
  cards.forEach((_, i) => { updateCardLearningMeta(cards[i], repping); });
}

/**
 * Adds learning meta to a card
 * Mutates card object (immer handles immutability)
 * @param card Card object
 * @param repping Repping object used for learning these cards
 */
export function updateCardLearningMeta(card: Card, repping: Repping) {
  const { isCompleted, dueAt, divel, phase } = card.progress || {};
  if (isCompleted) {
    card.meta = { status: 'completed' };
  } else if (dueAt && divel && phase) {
    const index = repping.divels.findIndex((x: Divel) => (x.id === divel));
    const cardDivel = { index: index + 1, title: repping.divels?.[index]?.title };
    card.meta = { status: 'learning', divel: cardDivel };
  } else {
    card.meta = { status: 'initial' };
  }
}
