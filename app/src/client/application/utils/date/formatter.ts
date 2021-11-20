const formatDateValue = (value: number): string => {
  return value < 10 ? `0${value}` : `${value}`;
};

const MONTHS = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec'
];

export const dateFormatter = (dateString: string) => {
  const date = new Date(dateString);
  const day = formatDateValue(date.getDate());
  const month = MONTHS[formatDateValue(date.getMonth() + 1)];
  const hours = formatDateValue(date.getHours());
  const minutes = formatDateValue(date.getMinutes());
  return ` ${hours}:${minutes}, ${month} ${day} ${date.getFullYear()}Y`;
};