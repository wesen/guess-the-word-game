import React from 'react';

interface HintsListProps {
  hints: string[];
}

const HintsList: React.FC<HintsListProps> = ({ hints }) => {
  return (
    <div>
      <h2 className="text-xl font-mono mb-4 text-green-400">HINTS:</h2>
      <div className="space-y-2">
        {hints.map((hint, index) => (
          <div 
            key={`hint-${index}`} 
            className="mb-2 p-3 border-l-2 border-green-400" 
            style={{
              animation: `fadeIn 0.5s ${index * 0.2}s both`
            }}
          >
            <p className="font-mono text-green-400">
              <span className="inline-block w-16">HINT {index + 1}:</span>
              <span className="font-bold text-flicker">{hint}</span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HintsList; 