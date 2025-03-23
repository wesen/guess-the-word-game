/**
 * Checks if a guess is valid according to game rules:
 * - ASCII letters only (A-Z)
 * - Length between 1 and 10 characters
 */
export const isValidGuess = (guess: string): boolean => {
  return /^[A-Za-z]{1,10}$/.test(guess);
};

/**
 * Checks if a guess has already been made
 */
export const isDuplicateGuess = (guess: string, previousGuesses: string[]): boolean => {
  return previousGuesses.map(g => g.toUpperCase()).includes(guess.toUpperCase());
};

/**
 * Formats a guess to uppercase for consistent comparison
 */
export const formatGuess = (guess: string): string => {
  return guess.trim().toUpperCase();
}; 