// For now, define all words in a JS array.
// If this becomes a performance problem, consider storing them in a text
// file and reading it from the filesystem with react-native-fs
// (https://github.com/johanneslumpe/react-native-fs)
const words = [
  "appel",
  "kiwis",
  "peren"
];

export const wordCount = () => {
  return words.length;
}

export const getWord = (idx) => {
  return words[idx];
}

export const exists = (word) => {
  return words.map(w => w.toUpperCase()).indexOf(word) != -1;
}
