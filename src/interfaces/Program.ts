export interface Program {
  id: number;
  title: string;
  topic: string;
  learningFormats: string[];
  bestseller: boolean;
  startDate: string;
}

export type ProgramSort = 'alphabetically' | 'date' | 'bestsellers';

export const ProgramSortItems: ProgramSort[] = [
  'alphabetically',
  'date',
  'bestsellers',
];
