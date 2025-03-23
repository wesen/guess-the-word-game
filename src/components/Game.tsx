import React from 'react';
import { useAppSelector, useAppDispatch } from '../hooks/redux';
import { startGame } from '../store/slices/gameSlice';
import Title from './Title';
import Button from './Button';
import HintsList from './HintsList';
import GuessesList from './GuessesList';
import GuessInput from './GuessInput';
import GameStatus from './GameStatus';

const Game: React.FC = () => {
  const { state, hints, guesses, currentWord } = useAppSelector(state => state.game);
  const dispatch = useAppDispatch();

  const handleStartGame = () => {
    dispatch(startGame());
  };

  if (state === 'initial') {
    return (
      <div className="flex flex-col items-center justify-center h-full">
        <div className="text-center">
          <h1 className="text-4xl font-mono mb-8 text-green-400 tracking-wide glitch" data-text="GUESS THE WORD">
            GUESS THE WORD
          </h1>
          <p className="mb-8 text-green-400/70 font-mono">
            Try to guess the secret word using the hints provided. You have 5 attempts to guess correctly.
          </p>
          <button 
            onClick={handleStartGame}
            className="bg-black hover:bg-gray-900 text-green-400 font-mono py-3 px-6 border-2 border-green-400 text-xl tracking-widest relative overflow-hidden"
          >
            <span className="relative z-10 text-flicker">START</span>
            <span className="absolute inset-0 bg-green-400 opacity-10 transform hover:scale-x-110 hover:scale-y-125 transition-transform duration-300"></span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full font-mono tracking-wide">
      <div className="border-b-2 border-green-400 py-3">
        <h1 className="text-2xl text-center text-green-400 text-flicker">GUESS THE WORD</h1>
      </div>
      
      <GameStatus />
      
      <div className="flex-grow overflow-auto px-4 py-4 mb-4">
        <div className="grid grid-cols-1 gap-6 mb-6">
          <HintsList hints={hints} />
          <GuessesList guesses={guesses} correctWord={state === 'win' || state === 'lose' ? currentWord : undefined} />
        </div>
      </div>
      
      <GuessInput />
      
      <div className="text-center mt-4 text-sm text-green-400/70 font-mono">
        <p>ATTEMPTS: {guesses.length}/5</p>
      </div>
    </div>
  );
};

export default Game; 