jest.unmock('../app/randomWord');

const word = 'kiwis';
jest.mock('../app/words', () => [word]);
const randomWord = require('../app/randomWord').default;

describe('Random Word generator', () => {
  it('should select a word from the list', () => {
    // Arrange
    // const word = 'kiwis';

    // Act
    const result = randomWord();

    // Assert
    expect(result).toBe(word);
  });
});
