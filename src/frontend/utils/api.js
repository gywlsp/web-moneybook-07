// eslint-disable-next-line import/prefer-default-export
export const getQueryString = filter => {
  const filterKeys = Object.keys(filter);
  if (filterKeys.length === 0) return '';
  const result = filterKeys.reduce(
    (acc, key, index) => acc.concat(`${index === 0 ? '' : '&'}${key}=${filter[key]}`),
    '?',
  );
  return result;
};
