/**
 * Finds first available numeric id value in a collection of objects
 * @param array Array of objects with numeric "id" property
 * @returns First available numeric value; 1 if array is empty
 */
export function getNextNumericId(array: { id?: number | null; }[]) {
  const ids = <number[]> array.filter((x) => x.id).map((x) => x.id);
  return getNextNumber(ids);
}

/**
 * Helper function
 * @param array Array of integers
 * @returns First available numeric value; 1 if array is empty
 */
export function getNextNumber(array: number[]) {
  const sorted = array.sort((a, b) => a - b);
  return sorted.reduce((acc, x) => ((acc + 1 === x) ? x : acc), 0) + 1;
}

/**
 * Formats any value to an integer
 * @param value Value to be formatted
 * @param fallback Value to be returned if value is NaN
 * @returns Parsed integer value or fallback if parsing fails
 */
export function int(value: any, fallback = 0) {
  const parsed = parseInt(value, 10);
  return Number.isNaN(parsed) ? fallback : parsed;
}

/**
 * Validates integer against given range
 * Loop mode:
 * @param value Integer to be validated
 * @param min Min value
 * @param max Max value
 * @param loop Loop mode flag
 * @returns
 */
export function minMax(value: number, min: number, max: number, loop = false) {
  if (value < min) return loop ? max : min;
  if (value > max) return loop ? min : max;
  return value;
}
