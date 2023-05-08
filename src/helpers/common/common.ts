/**
 * Union the values of a 2D array into a 1D array
 * @param arr any[]
 * @return any[]
 */
export const union = <T>(arr: T[][]): T[] => {
  return unique([...arr].flat());
};

/**
 * Filter out duplicated values in a 1D array
 * @param arr any[]
 * @return any[]
 */
export const unique = <T>(arr: T[]): T[] => {
  return arr.filter((item, index) => arr.indexOf(item) === index);
};
