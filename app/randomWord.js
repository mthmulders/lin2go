import { getWord, wordCount } from './words';

export default () => {
  const index = Math.floor(Math.random() * wordCount());
  const item = getWord(index);
  return item;
};
