/* eslint-disable no-param-reassign */
import { Repping, Divel } from 'features/srs/srs-types';

/**
 * Calculates reuirements and eligibility status of given repping
 * 1. Has at least one divel (divels)
 * 2. Every divel has at least one phase (phases)
 * @param repping Repping object
 * @returns {boolean} Eligibility status object
 */
export function getReppingEligibilityStatus(repping: Repping) {
  const divels = !!(repping?.divels?.length > 0);
  const phases = divels && repping?.divels?.every((divel) => (!!divel?.phases?.length));
  const isEligible = divels && phases;
  return { isEligible, requirements: { divels, phases } };
}

/**
 * Sets divel with given index default, others non-default
 * Mutates divel objects (immer handles immutability)
 * @param divels Array of divel objects
 * @param index Divel index
 */
export function updateDefaultDivel(divels: Divel[], index: number) {
  divels.forEach((_, i) => {
    divels[i].isDefault = (i === index);
  });
}
