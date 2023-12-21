import formatDistance from 'date-fns/formatDistance';
import { ru } from 'date-fns/locale';

/**
 * Formats native JS DateTime object to backend-compatible string format
 * @param value DateTime object
 * @returns String representation of DateTime object
 */
export function formatDateTime(value: Date) {
  return value.toISOString();
}

/**
 * Formats localized distance between two given dates
 * @param language App language
 * @param target Target DateTime object
 * @param base Base DateTime object (defaults to now)
 * @returns String representation of distance
 */
export function formatDateDistance(
  language: string, target: Date, base: Date = new Date(),
) {
  const options = language === 'en' ? {} : { locale: ru };
  return formatDistance(target, base, options);
}
