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