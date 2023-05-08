import { union, unique } from './common';

describe('common helpers', () => {
  describe('unique', () => {
    it('test if it can return unique values with unique inputs', () => {
      const result = unique([1, 2]);
      expect(result).toEqual([1, 2]);
    });

    it('test if it can return unique values with duplicate inputs', () => {
      const result = unique([1, 2, 1, 2]);
      expect(result).toEqual([1, 2]);
    });
  });

  describe('union', () => {
    it('test if it can provide unique values with unique inputs', () => {
      const result = union([[1, 2], [3]]);
      expect(result).toEqual([1, 2, 3]);
    });

    it('test if it can provide unique values with duplicate inputs', () => {
      const result = union([[1, 2, 3], [3], [4, 5]]);
      expect(result).toEqual([1, 2, 3, 4, 5]);
    });
  });
});
