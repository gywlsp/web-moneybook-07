// eslint-disable-next-line import/prefer-default-export
export const getNumString = string => {
  const regex = /[^0-9]/g;
  const refinedValue = string.replace(regex, '');
  return refinedValue;
};
