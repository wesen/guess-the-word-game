import React, { useState } from 'react';

const GuessTheWordGame = () => {
  const [gameState, setGameState] = useState('initial'); // initial, playing, submitting, win, lose
  const [errorMessage, setErrorMessage] = useState('');
  
  // Mock data for UI layout demonstration
  const mockData = {
    hints: ['GRAIN', 'BUTTER', 'CRUST', 'SLICE', 'BAKER'],
    guesses: ['FARMER', 'FOOD', 'PIZZA'],
    secretWord: 'BREAD'
  };
  
  // Show different screens based on game state
  const renderGameContent = () => {
    switch (gameState) {
      case 'initial':
        return (
          <div className="flex flex-col items-center justify-center h-full">
            <div className="text-center">
              <h1 className="text-4xl font-mono mb-8 text-green-400 tracking-wide glitch" data-text="GUESS THE WORD">GUESS THE WORD</h1>
              <button 
                onClick={() => setGameState('playing')}
                className="bg-black hover:bg-gray-900 text-green-400 font-mono py-3 px-6 border-2 border-green-400 text-xl tracking-widest relative overflow-hidden"
              >
                <span className="relative z-10 text-flicker">START</span>
                <span className="absolute inset-0 bg-green-400 opacity-10 transform hover:scale-x-110 hover:scale-y-125 transition-transform duration-300"></span>
              </button>
            </div>
          </div>
        );
        
      case 'playing':
      case 'submitting':
      case 'win':
      case 'lose':
        return (
          <div className="flex flex-col h-full font-mono tracking-wide">
            <div className="border-b-2 border-green-400 py-3">
              <h1 className="text-2xl text-center text-green-400 text-flicker">GUESS THE WORD</h1>
            </div>
            
            {/* Game area with hints and guesses */}
            <div className="flex-grow overflow-auto px-4 py-4 mb-4">
              {renderHintsAndGuesses()}
            </div>
            
            {/* Completion message area */}
            {(gameState === 'win' || gameState === 'lose') && (
              <div className="mx-4 mb-4 p-4 border-2 border-green-400 text-center" style={{animation: 'fadeIn 0.5s both'}}>
                <p className="text-xl font-mono text-green-400 text-flicker">
                  {gameState === 'win' 
                    ? `YOU GOT IT! THE SECRET WORD IS `
                    : `I'M SORRY, BUT THE SECRET WORD IS `
                  }
                  <span className={`font-bold ${gameState === 'win' ? 'text-yellow-400 glitch' : 'text-red-500'}`} data-text={mockData.secretWord}>
                    {mockData.secretWord}
                  </span>
                  .
                </p>
                <button 
                  onClick={() => setGameState('initial')}
                  className="mt-6 bg-black text-green-400 border-2 border-green-400 font-mono py-2 px-6 tracking-widest relative overflow-hidden"
                  style={{animation: 'fadeIn 0.8s both'}}
                >
                  <span className="relative z-10">RESTART</span>
                  <span className="absolute inset-0 bg-green-400 opacity-10 transform hover:scale-x-110 hover:scale-y-125 transition-transform duration-300"></span>
                </button>
              </div>
            )}
            
            {/* Error message */}
            {errorMessage && (
              <div className="mx-4 mb-2 p-2 border-2 border-red-500 text-red-500 text-center shake-error">
                {errorMessage}
              </div>
            )}
            
            {/* Input area */}
            <div className="p-4 border-t-2 border-green-400">
              <div className="flex">
                <input 
                  type="text" 
                  placeholder="ENTER YOUR GUESS" 
                  className="flex-grow p-3 bg-black text-green-400 border-2 border-green-400 focus:outline-none focus:border-yellow-400 font-mono tracking-wider placeholder-green-700 cursor-blink"
                  disabled={gameState === 'submitting' || gameState === 'win' || gameState === 'lose'}
                  onChange={() => setErrorMessage('')}
                />
                <button 
                  className={`py-3 px-6 font-mono tracking-widest text-black ${
                    gameState === 'submitting' 
                      ? 'bg-gray-500 border-2 border-gray-500' 
                      : 'bg-green-400 border-2 border-green-400 hover:bg-green-300'
                  }`}
                  disabled={gameState === 'submitting' || gameState === 'win' || gameState === 'lose'}
                  onClick={() => {
                    // Mock submission - in a real game, you'd validate the input here
                    setGameState('submitting');
                    setTimeout(() => {
                      // Fake response from backend
                      if (mockData.guesses.length >= 4) {
                        setGameState('lose');
                      } else {
                        setGameState('playing');
                      }
                    }, 1000);
                  }}
                >
                  {gameState === 'submitting' ? (
                    <div className="flex justify-center items-center">
                      <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-white"></div>
                    </div>
                  ) : (
                    'SUBMIT'
                  )}
                </button>
              </div>
            </div>
          </div>
        );
        
      default:
        return <div>Something went wrong</div>;
    }
  };
  
  // Render the list of hints and guesses with a retro terminal style
  const renderHintsAndGuesses = () => {
    const items : React.ReactNode[] = [];
    const maxItems = Math.max(mockData.hints.length, mockData.guesses.length);
    
    for (let i = 0; i < maxItems; i++) {
      // Add hint
      if (i < mockData.hints.length) {
        items.push(
          <div key={`hint-${i}`} className="mb-2 p-3 border-l-2 border-green-400" style={{
            animation: `fadeIn 0.5s ${i * 0.2}s both`
          }}>
            <p className="font-mono text-green-400">
              <span className="inline-block w-16">HINT {i+1}:</span> 
              <span className="font-bold text-flicker">{mockData.hints[i]}</span>
            </p>
          </div>
        );
      }
      
      // Add guess (if exists)
      if (i < mockData.guesses.length) {
        const isCorrect = i === mockData.guesses.length - 1 && gameState === 'win';
        const guessColor = isCorrect ? 'text-yellow-400 border-yellow-400' : 'text-orange-500 border-orange-500';
        
        items.push(
          <div 
            key={`guess-${i}`} 
            className={`mb-4 p-3 border-l-2 ${guessColor}`}
            style={{
              animation: `fadeIn 0.5s ${i * 0.2}s both, ${isCorrect ? 'pulse 2s infinite' : ''}`
            }}
          >
            <p className={`font-mono ${guessColor}`}>
              <span className="inline-block w-16">GUESS {i+1}:</span> 
              <span className={`font-bold ${isCorrect ? 'glitch' : ''}`} data-text={mockData.guesses[i]}>
                {mockData.guesses[i]}
              </span>
            </p>
          </div>
        );
      }
    }
    
    return <div>{items}</div>;
  };
  
  // Show different demo states based on buttons
  const renderDemoControls = () => {
    return (
      <div className="fixed bottom-0 left-0 right-0 bg-black p-2 flex justify-center gap-2 border-t-2 border-green-400">
        <button 
          onClick={() => setGameState('initial')}
          className="px-2 py-1 bg-black text-green-400 border border-green-400 text-xs"
        >
          INITIAL
        </button>
        <button 
          onClick={() => setGameState('playing')}
          className="px-2 py-1 bg-black text-green-400 border border-green-400 text-xs"
        >
          PLAYING
        </button>
        <button 
          onClick={() => setGameState('submitting')}
          className="px-2 py-1 bg-black text-green-400 border border-green-400 text-xs"
        >
          SUBMITTING
        </button>
        <button 
          onClick={() => setGameState('win')}
          className="px-2 py-1 bg-black text-green-400 border border-green-400 text-xs"
        >
          WIN
        </button>
        <button 
          onClick={() => setGameState('lose')}
          className="px-2 py-1 bg-black text-green-400 border border-green-400 text-xs"
        >
          LOSE
        </button>
        <button 
          onClick={() => setErrorMessage("NOT A VALID GUESS")}
          className="px-2 py-1 bg-black text-red-500 border border-red-500 text-xs"
        >
          ERROR: INVALID
        </button>
        <button 
          onClick={() => setErrorMessage("YOU ALREADY GUESSED FARMER. TRY AGAIN.")}
          className="px-2 py-1 bg-black text-red-500 border border-red-500 text-xs"
        >
          ERROR: REPEAT
        </button>
      </div>
    );
  };
  
  // Create scanline effect for CRT look
  const renderScanlines = () => {
    return (
      <div className="pointer-events-none fixed inset-0 z-50">
        <div className="absolute inset-0 bg-scanlines opacity-10"></div>
        <div className="absolute inset-0 glow"></div>
        <div className="absolute inset-0 flicker"></div>
      </div>
    );
  };
  
  return (
    <div className="flex flex-col h-screen bg-black">
      <style jsx global>{`
        @keyframes pulse {
          0% { opacity: 0.97; }
          50% { opacity: 1; }
          100% { opacity: 0.97; }
        }
        
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes fadeInLeft {
          from { opacity: 0; transform: translateX(-20px); }
          to { opacity: 1; transform: translateX(0); }
        }
        
        @keyframes fadeInRight {
          from { opacity: 0; transform: translateX(20px); }
          to { opacity: 1; transform: translateX(0); }
        }
        
        @keyframes flicker {
          0% { opacity: 0.1; }
          1% { opacity: 0.2; }
          2% { opacity: 0.1; }
          3% { opacity: 0.2; }
          4% { opacity: 0.1; }
          5% { opacity: 0; }
          6% { opacity: 0.1; }
          100% { opacity: 0; }
        }
        
        @keyframes textFlicker {
          0% { opacity: 1; }
          52% { opacity: 1; }
          53% { opacity: 0.8; }
          54% { opacity: 1; }
          57% { opacity: 1; }
          58% { opacity: 0.9; }
          59% { opacity: 1; }
          92% { opacity: 1; }
          93% { opacity: 0.8; }
          94% { opacity: 1; }
        }
        
        @keyframes blink {
          0%, 49% { border-color: currentColor; }
          50%, 100% { border-color: transparent; }
        }
        
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          10%, 30%, 50%, 70%, 90% { transform: translateX(-1px); }
          20%, 40%, 60%, 80% { transform: translateX(1px); }
        }
        
        @keyframes glitch {
          0% {
            clip-path: inset(10% 0 40% 0);
            transform: translate(-2px, 2px);
          }
          20% {
            clip-path: inset(60% 0 8% 0);
            transform: translate(2px, -2px);
          }
          40% {
            clip-path: inset(30% 0 60% 0);
            transform: translate(1px, 3px);
          }
          60% {
            clip-path: inset(80% 0 3% 0);
            transform: translate(3px, -1px);
          }
          80% {
            clip-path: inset(10% 0 60% 0);
            transform: translate(-3px, 1px);
          }
          100% {
            clip-path: inset(40% 0 20% 0);
            transform: translate(2px, -2px);
          }
        }
        
        .bg-scanlines {
          background: repeating-linear-gradient(
            to bottom,
            transparent 0px,
            transparent 1px,
            rgba(0, 0, 0, 0.3) 1px,
            rgba(0, 0, 0, 0.3) 2px
          );
        }
        
        .glow {
          box-shadow: inset 0 0 60px rgba(0, 255, 128, 0.2);
          animation: pulse 2s infinite;
        }
        
        .flicker {
          background: radial-gradient(ellipse at center, rgba(255,255,255,0.2) 0%, rgba(0,0,0,0) 70%);
          opacity: 0;
          mix-blend-mode: overlay;
          animation: flicker 8s infinite;
        }
        
        .text-flicker {
          animation: textFlicker 3s infinite;
        }
        
        .cursor-blink {
          border-right: 2px solid;
          animation: blink 1s infinite;
        }
        
        .shake-error {
          animation: shake 0.5s;
        }
        
        .glitch {
          position: relative;
          animation: textFlicker 2s infinite;
        }
        
        .glitch::before,
        .glitch::after {
          content: attr(data-text);
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          color: currentColor;
        }
        
        .glitch::before {
          animation: glitch 3s infinite;
          color: #0ff;
          z-index: -1;
        }
        
        .glitch::after {
          animation: glitch 2s infinite;
          color: #f0f;
          z-index: -2;
        }
        
        ::selection {
          background: rgba(0, 255, 128, 0.99);
          color: black;
        }
      `}</style>
      {renderGameContent()}
      {renderScanlines()}
      {renderDemoControls()}
    </div>
  );
};

export default GuessTheWordGame;