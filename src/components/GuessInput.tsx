import React, { useState, FormEvent } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { submitGuess, setError } from '../store/slices/gameSlice';
import { isValidGuess, isDuplicateGuess } from '../utils/validation';
import { toast } from 'react-toastify';

const GuessInput: React.FC = () => {
  const [inputValue, setInputValue] = useState('');
  const dispatch = useAppDispatch();
  const { isInputDisabled, guesses, state } = useAppSelector(state => state.game);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    
    const guess = inputValue.trim();
    
    // Validate input
    if (!guess) {
      toast.error('Please enter a guess');
      return;
    }
    
    if (!isValidGuess(guess)) {
      toast.error('Please enter a valid word (letters only, max 10 characters)');
      return;
    }
    
    if (isDuplicateGuess(guess, guesses)) {
      toast.warning(`You already guessed ${guess.toUpperCase()}`);
      return;
    }
    
    // Submit valid guess
    dispatch(submitGuess(guess));
    setInputValue('');
  };

  return (
    <div className="p-4 border-t-2 border-green-400">
      <form onSubmit={handleSubmit} className="flex">
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          disabled={isInputDisabled || state === 'win' || state === 'lose'}
          placeholder="ENTER YOUR GUESS"
          className="flex-grow p-3 bg-black text-green-400 border-2 border-green-400 focus:outline-none focus:border-yellow-400 font-mono tracking-wider placeholder-green-700 cursor-blink"
          maxLength={10}
        />
        <button 
          type="submit"
          className={`py-3 px-6 font-mono tracking-widest text-black ${
            isInputDisabled || state === 'win' || state === 'lose' || !inputValue.trim()
              ? 'bg-gray-500 border-2 border-gray-500 cursor-not-allowed' 
              : 'bg-green-400 border-2 border-green-400 hover:bg-green-300'
          }`}
          disabled={isInputDisabled || state === 'win' || state === 'lose' || !inputValue.trim()}
        >
          SUBMIT
        </button>
      </form>
    </div>
  );
};

export default GuessInput; 