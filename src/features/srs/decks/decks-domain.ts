import { Deck } from 'features/srs/srs-types';

/**
 * Calculates reuirements and eligibility status of given deck
 * 1. Has at least one field (fields)
 * 2. Has at least one card (cards)
 * @param repping Deck object
 * @returns {boolean} Eligibility status object
 */
export function getDeckEligibilityStatus(deck: Deck) {
  const fields = deck?.fieldsTotal > 0;
  const cards = deck?.cardsTotal > 0;
  const isEligible = fields && cards;
  return { isEligible, requirements: { fields, cards } };
}
