// For now, define all words in a JS array.
// If this becomes a performance problem, consider storing them in a text
// file and reading it from the filesystem with react-native-fs
// (https://github.com/johanneslumpe/react-native-fs)

import { getWord, wordCount } from './words';

export default () => {
  const index = Math.floor(Math.random() * wordCount());
  const item = getWord(index);
  return item;
};
