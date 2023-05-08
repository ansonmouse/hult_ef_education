import React from 'react';
import { render, screen } from '@testing-library/react';
import Pagination from './Pagination';

describe(Pagination, () => {
  it('test if it can show the first page', () => {
    render(
      <Pagination
        currentPage={0}
        limit={2}
        total={6}
        onCurrentPageChange={() => {}}
      />,
    );
    const elements = screen.getByTestId('current-page-number');
    expect(elements.textContent).toBe('Page 1');
  });

  it('test if it can show the middle page', () => {
    render(
      <Pagination
        currentPage={1}
        limit={2}
        total={6}
        onCurrentPageChange={() => {}}
      />,
    );
    const elements = screen.getByTestId('current-page-number');
    expect(elements.textContent).toBe('Page 2');
  });

  it('test if it can show the first page', () => {
    render(
      <Pagination
        currentPage={2}
        limit={2}
        total={6}
        onCurrentPageChange={() => {}}
      />,
    );
    const elements = screen.getByTestId('current-page-number');
    expect(elements.textContent).toBe('Page 3');
  });

  it('test if it can show the correct number of page numbers', () => {
    render(
      <Pagination
        currentPage={0}
        limit={2}
        total={6}
        onCurrentPageChange={() => {}}
      />,
    );
    const elements = screen.getByTestId('page-buttons-row');
    expect(elements.textContent).toBe('123');
  });
});
