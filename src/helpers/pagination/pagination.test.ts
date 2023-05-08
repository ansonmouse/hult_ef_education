import { paginationGetPageOptions } from './pagination';

describe('pagination helper', () => {
  it('test if helper can create 1 page option', () => {
    const result = paginationGetPageOptions(0, 1, 1);
    expect(result).toEqual([0]);
  });

  it('test if helper can create multiple page options while within the display limit', () => {
    const result = paginationGetPageOptions(0, 5, 6);
    expect(result).toEqual([0, 1, 2, 3, 4]);
  });

  it('test if helper can create multiple page options while outside the display limit', () => {
    const result = paginationGetPageOptions(0, 10, 6);
    expect(result).toEqual([0, 1, 2, 3, 4, 'separator', 9]);
  });

  it('test if helper can create multiple page options while outside the display limit and the current pate is at last', () => {
    const result = paginationGetPageOptions(9, 10, 6);
    expect(result).toEqual([0, 'separator', 5, 6, 7, 8, 9]);
  });

  it('test if helper can create multiple page options while outside the display limit and the current pate is in the middle', () => {
    const result = paginationGetPageOptions(5, 10, 6);
    expect(result).toEqual([0, 'separator', 4, 5, 6, 7, 'separator', 9]);
  });
});
