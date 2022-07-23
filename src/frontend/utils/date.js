export const getPrevMonth = ({year, month}) => {
  if (month === 1) {
    return {year: year - 1, month: 12};
  }
  return {year, month: month - 1};
};

export const getNextMonth = ({year, month}) => {
  if (month === 12) {
    return {year: year + 1, month: 1};
  }
  return {year, month: month + 1};
};

export const padZero = num => num.toString().padStart(2, '0');

export const addDot = dateString => `${dateString.slice(0, 4)}.${dateString.slice(4, 6)}.${dateString.slice(6, 8)}`;

export const getTodayDateString = (option = {withDot: true}) => {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth() + 1;
  const date = today.getDate();
  const result = option.withDot
    ? `${year}.${padZero(month)}.${padZero(date)}`
    : `${year}${padZero(month)}${padZero(date)}`;
  return result;
};

export const getDateString = ({year, month, date, withDot = true}) => {
  const result = withDot ? `${year}.${padZero(month)}.${padZero(date)}` : `${year}${padZero(month)}${padZero(date)}`;
  return result;
};

