import axios from 'axios';
import { Program } from '../interfaces/Program';

const url =
  process.env.REACT_APP_PROGRAMS_URL || 'http://localhost:3010/programs';

export const programsFetchPrograms = async () => {
  const responses = await axios.get(url);
  const results: Program[] = responses.data;

  return results;
};
