import React from 'react';
import { useAppSelector, useAppDispatch } from '../hooks/redux';
import { restartGame } from '../store/slices/gameSlice';

const GameStatus: React.FC = () => {
  const { state, currentWord } = useAppSelector(state => state.game);
  const dispatch = useAppDispatch();

  const handleRestart = () => {
    dispatch(restartGame());
  };

  if (state === 'win' || state === 'lose') {
    return (
      <div className="mx-4 mb-4 p-4 border-2 border-green-400 text-center" style={{animation: 'fadeIn 0.5s both'}}>
        <p className="text-xl font-mono text-green-400 text-flicker">
          {state === 'win' 
            ? 'YOU GOT IT! THE SECRET WORD IS '
            : 'I\'M SORRY, BUT THE SECRET WORD IS '
          }
          <span className={`font-bold ${state === 'win' ? 'text-yellow-400 glitch' : 'text-red-500'}`} data-text={currentWord}>
            {currentWord}
          </span>
        </p>
        <button 
          onClick={handleRestart}
          className="mt-6 bg-black text-green-400 border-2 border-green-400 font-mono py-2 px-6 tracking-widest relative overflow-hidden"
          style={{animation: 'fadeIn 0.8s both'}}
        >
          <span className="relative z-10">RESTART</span>
          <span className="absolute inset-0 bg-green-400 opacity-10 transform hover:scale-x-110 hover:scale-y-125 transition-transform duration-300"></span>
        </button>
      </div>
    );
  }

  return null;
};

export default GameStatus; 