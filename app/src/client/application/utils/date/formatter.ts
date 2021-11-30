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

export const dateFormatter = (dateString: string) => {
  const date = new Date(dateString);
  const day = formatDateValue(date.getDate());
  const month = MONTHS[date.getMonth()];
  return `${month} ${day}, ${date.getFullYear()}`;
};