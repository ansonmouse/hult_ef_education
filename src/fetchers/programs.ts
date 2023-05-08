import axios from 'axios';
import { Program } from '../interfaces/Program';

export const programsFetchPrograms = async () => {
  const responses = await axios.get('http://localhost:3010/programs');
  const results: Program[] = responses.data;

  return results;
};
