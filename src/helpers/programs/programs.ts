import {
  Program,
  ProgramSort,
  ProgramSortItems,
} from '../../interfaces/Program';
import { union, unique } from '../common/common';

export const PROGRAM_PAGE_LIMIT = 6;

/**
 * Check if a string value is part of the ProgramSort type
 * @param value (ProgramSort | string)
 * @return boolean
 */
export const programsCheckIsSort = (
  value: ProgramSort | string,
): value is ProgramSort => {
  return ProgramSortItems.indexOf(value as ProgramSort) >= 0;
};

/**
 * Compose a list of filtered programs based on the filter and sort settings
 * @param raw Program[]
 * @param selectedLearningFormats string[]
 * @param selectedTopics string[]
 * @param selectedSort ProgramSort
 * @return Program[]
 */
export const programsComposeFilteredPrograms = (
  raw: Program[],
  selectedLearningFormats: string[],
  selectedTopics: string[],
  selectedSort: ProgramSort,
) => {
  let returnArr = [...raw];
  if (!!selectedLearningFormats.length) {
    returnArr = returnArr.filter(
      // Go through each learning format and check if it is included in the selected list
      ({ learningFormats }) =>
        learningFormats.findIndex(
          (row) => selectedLearningFormats.indexOf(row) >= 0,
        ) >= 0,
    );
  }
  if (!!selectedTopics.length) {
    returnArr = returnArr.filter(
      ({ topic }) => selectedTopics.indexOf(topic) >= 0,
    );
  }
  if (selectedSort === 'alphabetically') {
    returnArr = returnArr.sort((a, b) => a.title.localeCompare(b.title));
  } else if (selectedSort === 'date') {
    returnArr = returnArr.sort(
      (a, b) =>
        new Date(a.startDate).valueOf() - new Date(b.startDate).valueOf(),
    );
  } else if (selectedSort === 'bestsellers') {
    returnArr = returnArr.sort((a, b) =>
      a.bestseller === b.bestseller ? 0 : a.bestseller ? -1 : 1,
    );
  }
  return returnArr;
};

/**
 * Extract a unique list of learning format options based on a list of programs
 * @param programs Program[]
 * @return string[]
 */
export const programsGetLearningFormatOptions = (programs: Program[]) => {
  return union(
    programs.map(({ learningFormats }) => learningFormats),
  ) as string[];
};

/**
 * Extract a unique list of topic options based on a list of programs
 * @param programs Program[]
 * @return string[]
 */
export const programsGetTopicOptions = (programs: Program[]) => {
  return unique(programs.map(({ topic }) => topic)).sort((a, b) =>
    a.localeCompare(b),
  );
};

/**
 * Trim a list of programs based on the provided page
 * @param raw Program[]
 * @param page number
 * @return Program[]
 */
export const programsPagePrograms = (raw: Program[], page: number) => {
  return raw.slice(page * PROGRAM_PAGE_LIMIT, (page + 1) * PROGRAM_PAGE_LIMIT);
};
