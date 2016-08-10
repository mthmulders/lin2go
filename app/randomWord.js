// For now, define all words in a JS array.
// If this becomes a performance problem, consider storing them in a text
// file and reading it from the filesystem with react-native-fs
// (https://github.com/johanneslumpe/react-native-fs)

const words = [
  "appel",
  "kiwis",
  "peren"
]

export default () => {
  const index = Math.random() * words.length;
  const item = words[Math.floor(index)];
  console.log(`Using item ${index} from the list: ${item}`);
  return item;
};
