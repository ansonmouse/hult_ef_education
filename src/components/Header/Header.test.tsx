import React from 'react';
import { render, screen } from '@testing-library/react';
import Header from './Header';

describe(Header, () => {
  beforeEach(() => {
    render(<Header title="Test Title" description="Test Description" />);
  });

  it('header display the correct title', () => {
    const element = screen.getByText(/test title/i);
    expect(element).toBeInTheDocument();
  });

  it('header display the correct description', () => {
    const element = screen.getByText(/test description/i);
    expect(element).toBeInTheDocument();
  });
});
