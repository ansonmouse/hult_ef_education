/**
 * Compose a list of page options with separator based on the current page and the amount of pages available
 * @param currentPage number
 * @param totalPage number
 * @param displayLimit number
 * @return (number | 'separator')
 */
export const paginationGetPageOptions = (
  currentPage: number,
  totalPage: number,
  displayLimit: number,
) => {
  let returnArr: (number | 'separator')[] = [];

  // If the total number of pages is within the display limit, then just list all pages
  if (totalPage <= displayLimit) {
    for (let i = 0; i < totalPage; i++) {
      returnArr.push(i);
    }
  } else {
    if (currentPage < displayLimit - 2) {
      // If the current page is within the first displayLimit-1 page
      for (let i = 0; i < displayLimit - 1; i++) {
        returnArr.push(i);
      }
      returnArr.push('separator');
      returnArr.push(totalPage - 1);
    } else if (currentPage >= totalPage - (displayLimit - 2)) {
      // If the current page is within the last displayLimit-1 page
      returnArr.push(0);
      returnArr.push('separator');
      for (let i = totalPage - (displayLimit - 1); i < totalPage; i++) {
        returnArr.push(i);
      }
    } else {
      // Any pages in between
      returnArr = [
        0,
        'separator',
        currentPage - 1,
        currentPage,
        currentPage + 1,
        currentPage + 2,
        'separator',
        totalPage - 1,
      ];
    }
  }

  return returnArr;
};
