// eslint-disable-next-line import/prefer-default-export
export const ceil = (number, digit) => Math.ceil(number * (0.1 ** digit)) * (10 ** digit)