jest.mock('../words');
jest.unmock('../randomWord');

import { getWord, wordCount } from '../words';
import randomWord from '../randomWord';

describe('Random Word generator', () => {
  it('should select a word from the list', () => {
    // Arrange
    const word = 'kiwis';
    wordCount.mockImplementation(() => 1);
    getWord.mockImplementation(() => word);

    // Act
    const result = randomWord();

    // Assert
    expect(result).toBe(word);
  });
});
