import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getRandomWord, getHintForWord } from '../../utils/mockWords';
import { formatGuess } from '../../utils/validation';

export type GameState = 'initial' | 'playing' | 'submitting' | 'win' | 'lose';

interface GameSliceState {
  state: GameState;
  currentWord: string;
  hints: string[];
  guesses: string[];
  isInputDisabled: boolean;
  lastError?: string;
}

const initialState: GameSliceState = {
  state: 'initial',
  currentWord: '',
  hints: [],
  guesses: [],
  isInputDisabled: false,
};

export const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    startGame: (state) => {
      const word = getRandomWord();
      state.currentWord = word;
      state.hints = [getHintForWord(word, 0)];
      state.guesses = [];
      state.state = 'playing';
      state.isInputDisabled = false;
      state.lastError = undefined;
    },
    submitGuess: (state, action: PayloadAction<string>) => {
      const guess = formatGuess(action.payload);
      
      // Add to guesses array
      state.guesses.push(guess);
      
      // Check if correct
      if (guess === state.currentWord) {
        state.state = 'win';
        state.isInputDisabled = true;
        return;
      }

      // Check if lost (5 guesses used up)
      if (state.guesses.length === 5) {
        state.state = 'lose';
        state.isInputDisabled = true;
        return;
      }

      // Provide next hint
      state.hints.push(getHintForWord(state.currentWord, state.hints.length));
    },
    setError: (state, action: PayloadAction<string>) => {
      state.lastError = action.payload;
    },
    clearError: (state) => {
      state.lastError = undefined;
    },
    restartGame: () => {
      return initialState;
    }
  },
});

export const { startGame, submitGuess, setError, clearError, restartGame } = gameSlice.actions;

export default gameSlice.reducer; 