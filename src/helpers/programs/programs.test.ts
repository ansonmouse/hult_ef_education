import {
  programsCheckIsSort,
  programsComposeFilteredPrograms,
  programsGetLearningFormatOptions,
  programsGetTopicOptions,
  programsPagePrograms,
} from './programs';

const MockPrograms = [
  {
    id: 0,
    title: 'program A',
    topic: 'topic 1',
    learningFormats: ['format 1', 'format 2'],
    bestseller: true,
    startDate: '2023-05-09T00:00:00+0000',
  },
  {
    id: 1,
    title: 'program C',
    topic: 'topic 2',
    learningFormats: ['format 2', 'format 3'],
    bestseller: true,
    startDate: '2023-05-08T00:00:00+0000',
  },
  {
    id: 2,
    title: 'program B',
    topic: 'topic 1',
    learningFormats: ['format 3'],
    bestseller: false,
    startDate: '2023-05-10T00:00:00+0000',
  },
  {
    id: 3,
    title: 'program D',
    topic: 'topic 4',
    learningFormats: ['format 1', 'format 2', 'format 3'],
    bestseller: true,
    startDate: '2023-05-09T00:00:00+0000',
  },
  {
    id: 4,
    title: 'program F',
    topic: 'topic 3',
    learningFormats: ['format 2', 'format 4'],
    bestseller: true,
    startDate: '2023-05-08T00:00:00+0000',
  },
  {
    id: 5,
    title: 'program G',
    topic: 'topic 1',
    learningFormats: ['format 4'],
    bestseller: false,
    startDate: '2023-05-10T00:00:00+0000',
  },
  {
    id: 6,
    title: 'program E',
    topic: 'topic 3',
    learningFormats: ['format 3'],
    bestseller: false,
    startDate: '2023-05-10T00:00:00+0000',
  },
];

describe('programs helper', () => {
  describe('programsCheckIsSort', () => {
    it('should return true with valid sort', () => {
      const result = programsCheckIsSort('alphabetically');
      expect(result).toBe(true);
    });

    it('should return true with invalid sort', () => {
      const result = programsCheckIsSort('a');
      expect(result).toBe(false);
    });
  });

  describe('programsComposeFilteredPrograms', () => {
    it('should return all programs without any filter', () => {
      const results = programsComposeFilteredPrograms(
        MockPrograms,
        [],
        [],
        'alphabetically',
      );
      expect(results).toHaveLength(MockPrograms.length);
    });

    it('should return all programs with learning formats filter', () => {
      const results = programsComposeFilteredPrograms(
        MockPrograms,
        ['format 1', 'format 2'],
        [],
        'alphabetically',
      );
      expect(results).toHaveLength(4);
    });

    it('should return all programs with topics filter', () => {
      const results = programsComposeFilteredPrograms(
        MockPrograms,
        [],
        ['topic 1', 'topic 2'],
        'alphabetically',
      );
      expect(results).toHaveLength(4);
    });

    it('should sort by alphabetically', () => {
      const results = programsComposeFilteredPrograms(
        MockPrograms,
        [],
        [],
        'alphabetically',
      );
      expect(results).toStrictEqual([
        {
          id: 0,
          title: 'program A',
          topic: 'topic 1',
          learningFormats: ['format 1', 'format 2'],
          bestseller: true,
          startDate: '2023-05-09T00:00:00+0000',
        },
        {
          id: 2,
          title: 'program B',
          topic: 'topic 1',
          learningFormats: ['format 3'],
          bestseller: false,
          startDate: '2023-05-10T00:00:00+0000',
        },
        {
          id: 1,
          title: 'program C',
          topic: 'topic 2',
          learningFormats: ['format 2', 'format 3'],
          bestseller: true,
          startDate: '2023-05-08T00:00:00+0000',
        },
        {
          id: 3,
          title: 'program D',
          topic: 'topic 4',
          learningFormats: ['format 1', 'format 2', 'format 3'],
          bestseller: true,
          startDate: '2023-05-09T00:00:00+0000',
        },
        {
          id: 6,
          title: 'program E',
          topic: 'topic 3',
          learningFormats: ['format 3'],
          bestseller: false,
          startDate: '2023-05-10T00:00:00+0000',
        },
        {
          id: 4,
          title: 'program F',
          topic: 'topic 3',
          learningFormats: ['format 2', 'format 4'],
          bestseller: true,
          startDate: '2023-05-08T00:00:00+0000',
        },
        {
          id: 5,
          title: 'program G',
          topic: 'topic 1',
          learningFormats: ['format 4'],
          bestseller: false,
          startDate: '2023-05-10T00:00:00+0000',
        },
      ]);
    });

    it('should sort by date', () => {
      const results = programsComposeFilteredPrograms(
        MockPrograms,
        [],
        [],
        'date',
      );
      expect(results).toStrictEqual([
        {
          id: 1,
          title: 'program C',
          topic: 'topic 2',
          learningFormats: ['format 2', 'format 3'],
          bestseller: true,
          startDate: '2023-05-08T00:00:00+0000',
        },
        {
          id: 4,
          title: 'program F',
          topic: 'topic 3',
          learningFormats: ['format 2', 'format 4'],
          bestseller: true,
          startDate: '2023-05-08T00:00:00+0000',
        },
        {
          id: 0,
          title: 'program A',
          topic: 'topic 1',
          learningFormats: ['format 1', 'format 2'],
          bestseller: true,
          startDate: '2023-05-09T00:00:00+0000',
        },
        {
          id: 3,
          title: 'program D',
          topic: 'topic 4',
          learningFormats: ['format 1', 'format 2', 'format 3'],
          bestseller: true,
          startDate: '2023-05-09T00:00:00+0000',
        },
        {
          id: 2,
          title: 'program B',
          topic: 'topic 1',
          learningFormats: ['format 3'],
          bestseller: false,
          startDate: '2023-05-10T00:00:00+0000',
        },
        {
          id: 5,
          title: 'program G',
          topic: 'topic 1',
          learningFormats: ['format 4'],
          bestseller: false,
          startDate: '2023-05-10T00:00:00+0000',
        },
        {
          id: 6,
          title: 'program E',
          topic: 'topic 3',
          learningFormats: ['format 3'],
          bestseller: false,
          startDate: '2023-05-10T00:00:00+0000',
        },
      ]);
    });

    it('should sort by bestsellers', () => {
      const results = programsComposeFilteredPrograms(
        MockPrograms,
        [],
        [],
        'bestsellers',
      );
      expect(results).toStrictEqual([
        {
          id: 0,
          title: 'program A',
          topic: 'topic 1',
          learningFormats: ['format 1', 'format 2'],
          bestseller: true,
          startDate: '2023-05-09T00:00:00+0000',
        },
        {
          id: 1,
          title: 'program C',
          topic: 'topic 2',
          learningFormats: ['format 2', 'format 3'],
          bestseller: true,
          startDate: '2023-05-08T00:00:00+0000',
        },
        {
          id: 3,
          title: 'program D',
          topic: 'topic 4',
          learningFormats: ['format 1', 'format 2', 'format 3'],
          bestseller: true,
          startDate: '2023-05-09T00:00:00+0000',
        },
        {
          id: 4,
          title: 'program F',
          topic: 'topic 3',
          learningFormats: ['format 2', 'format 4'],
          bestseller: true,
          startDate: '2023-05-08T00:00:00+0000',
        },
        {
          id: 2,
          title: 'program B',
          topic: 'topic 1',
          learningFormats: ['format 3'],
          bestseller: false,
          startDate: '2023-05-10T00:00:00+0000',
        },
        {
          id: 5,
          title: 'program G',
          topic: 'topic 1',
          learningFormats: ['format 4'],
          bestseller: false,
          startDate: '2023-05-10T00:00:00+0000',
        },
        {
          id: 6,
          title: 'program E',
          topic: 'topic 3',
          learningFormats: ['format 3'],
          bestseller: false,
          startDate: '2023-05-10T00:00:00+0000',
        },
      ]);
    });
  });

  describe('programsGetLearningFormatOptions', () => {
    it('should return the correct learning formats', () => {
      const result = programsGetLearningFormatOptions(MockPrograms);
      expect(result).toEqual(['format 1', 'format 2', 'format 3', 'format 4']);
    });
  });

  describe('programsGetTopicOptions', () => {
    it('should return the correct topic options', () => {
      const result = programsGetTopicOptions(MockPrograms);
      expect(result).toEqual(['topic 1', 'topic 2', 'topic 3', 'topic 4']);
    });
  });

  describe('programsPagePrograms', () => {
    it('should slice the correct amount on first page', () => {
      const result = programsPagePrograms(MockPrograms, 0);
      expect(result).toHaveLength(6);
    });

    it('should slice the correct amount on last page', () => {
      const result = programsPagePrograms(MockPrograms, 1);
      expect(result).toHaveLength(1);
    });
  });
});
