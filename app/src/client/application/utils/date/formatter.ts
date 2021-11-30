import {getText} from '@/app/utils/i18n/helper';

const formatDateValue = (value: number): string => {
  return value < 10 ? `0${value}` : `${value}`;
};

const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
];

export const dateFormatter = (dateString: string, locale: string) => {
  const date = new Date(dateString);
  const day = formatDateValue(date.getDate());
  const month = getText(locale, MONTHS[date.getMonth()]);
  return `${month} ${day}, ${date.getFullYear()}`;
};