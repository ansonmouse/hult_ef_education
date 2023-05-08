import React from 'react';
import { render, screen } from '@testing-library/react';
import ProgramCard from './ProgramCard';

const MockProgram = {
  id: 0,
  title: 'program A',
  topic: 'topic 1',
  learningFormats: ['format 1', 'format 2'],
  bestseller: true,
  startDate: '2023-05-09T00:00:00+0000',
};

describe(ProgramCard, () => {
  describe('test card content', () => {
    beforeEach(() => {
      render(<ProgramCard program={MockProgram} />);
    });

    it('should have the correct title', () => {
      const element = screen.getByText(/program a/i);
      expect(element).toBeInTheDocument();
    });

    it('should have the correct topic', () => {
      const element = screen.getByText(/topic 1/i);
      expect(element).toBeInTheDocument();
    });

    it('should have the correct learning formats', () => {
      const element = screen.getByText(/format 1 • format 2/i);
      expect(element).toBeInTheDocument();
    });
  });

  describe('test best seller boolean', () => {
    it('should have the best seller shown', () => {
      render(
        <ProgramCard
          program={{
            ...MockProgram,
            bestseller: true,
          }}
        />,
      );
      const element = screen.queryByText(/bestSeller/i);
      expect(element).toBeInTheDocument();
    });

    it('should have the best seller hidden', () => {
      render(
        <ProgramCard
          program={{
            ...MockProgram,
            bestseller: false,
          }}
        />,
      );
      const element = screen.queryByText(/bestSeller/i);
      expect(element).not.toBeInTheDocument();
    });
  });
});
