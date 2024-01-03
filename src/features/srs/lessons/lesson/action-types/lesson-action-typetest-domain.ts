import { LessonField } from 'features/srs/srs-types';

const ACCENT_LETTERS = [
  ['á', 'a'],
  ['Á', 'A'],
  ['é', 'e'],
  ['É', 'E'],
  ['í', 'i'],
  ['Í', 'I'],
  ['ó', 'o'],
  ['Ó', 'O'],
  ['ú', 'u'],
  ['Ú', 'U'],
  ['ü', 'u'],
  ['Ü', 'U'],
  ['ñ', 'n'],
  ['Ñ', 'N'],
];

export type TypeTestProcessing = (values: string[]) => string[];

export const typeTestProcessings: Record<string, TypeTestProcessing> = {
  trimSpaces,
  ignoreCase,
  ignorePunctuation,
  ignoreAccents,
};

/**
 * Checks whether user input for given field is correct.
 * Comparison is done according to field's settings for type test action.
 * @param field Lesson field object
 * @returns Correct - true, incorrect - false
 */
export function isTypeTestResultCorrect(field: LessonField) {
  const inputValue = field.value || '';
  const actualValue = field?.content?.text || '';
  // compare values without processing first
  if (inputValue === actualValue) return true;
  // go through processing pipeline and compare
  const { processings = {} } = field.settings.actions?.typeTest || {};
  const pipeline = Object.keys(processings).filter((i) => (processings[i]));
  const [a, b] = pipeline.reduce(([input, actual]: string[], x) => {
    const can = Object.prototype.hasOwnProperty.call(typeTestProcessings, x);
    return can ? typeTestProcessings[x]([input, actual]) : [input, actual];
  }, [inputValue, actualValue]);
  return a === b;
}

/**
 * Removes whitespace from both ends of given values
 * @param values Array of user input and card's actual values
 * @returns Array of processed input and actual values
 */
function trimSpaces(values: string[]) {
  return values.map((value) => (value.trim()));
}

/**
 * Convert values to lower case for case-insensitive comparison
 * @param values Array of user input and card's actual values
 * @returns Array of processed input and actual values
 */
function ignoreCase(values: string[]) {
  return values.map((value) => (value.toLowerCase()));
}

/**
 * Removes all punctuation marks from given values
 * @param values Array of user input and card's actual values
 * @returns Array of processed input and actual values
 */
function ignorePunctuation(values: string[]) {
  return values.map((value) => (value.replace(/[^\w\s]|_/g, '')));
}

/**
 * Replaces accented characters to normal ones in given values
 * @param values Array of user input and card's actual values
 * @returns Array of processed input and actual values
 */
function ignoreAccents(values: string[]) {
  return ACCENT_LETTERS.reduce(([i, a], [f, r]) => (
    [i.replace(f, r), a.replace(f, r)]
  ), values);
}
