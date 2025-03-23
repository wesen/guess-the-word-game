import React from 'react';

interface GuessesListProps {
  guesses: string[];
  correctWord?: string;
}

const GuessesList: React.FC<GuessesListProps> = ({ guesses, correctWord }) => {
  return (
    <div>
      <h2 className="text-xl font-mono mb-4 text-green-400">YOUR GUESSES:</h2>
      {guesses.length === 0 ? (
        <p className="text-green-400/70 italic font-mono">No guesses yet</p>
      ) : (
        <div className="space-y-2">
          {guesses.map((guess, index) => {
            const isCorrect = correctWord && guess === correctWord;
            const guessColor = isCorrect ? 'text-yellow-400 border-yellow-400' : 'text-orange-500 border-orange-500';
            
            return (
              <div 
                key={`guess-${index}`} 
                className={`mb-4 p-3 border-l-2 ${guessColor}`}
                style={{
                  animation: `fadeIn 0.5s ${index * 0.2}s both, ${isCorrect ? 'pulse 2s infinite' : ''}`
                }}
              >
                <p className={`font-mono ${guessColor}`}>
                  <span className="inline-block w-16">GUESS {index + 1}:</span>
                  <span className={`font-bold ${isCorrect ? 'glitch' : ''}`} data-text={guess}>
                    {guess}
                  </span>
                </p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default GuessesList; 