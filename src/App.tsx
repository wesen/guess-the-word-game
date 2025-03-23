import React from 'react';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Game from './components/Game';

// Render scanline effect for CRT look
const Scanlines = () => {
  return (
    <div className="pointer-events-none fixed inset-0 z-50">
      <div className="absolute inset-0 bg-scanlines opacity-10"></div>
      <div className="absolute inset-0 glow"></div>
      <div className="absolute inset-0 flicker"></div>
    </div>
  );
};

function App() {
  return (
    <Provider store={store}>
      <div className="flex flex-col min-h-screen bg-black">
        <style jsx>{`
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
          
          :global(.bg-scanlines) {
            background: repeating-linear-gradient(
              to bottom,
              transparent 0px,
              transparent 1px,
              rgba(0, 0, 0, 0.3) 1px,
              rgba(0, 0, 0, 0.3) 2px
            );
          }
          
          :global(.glow) {
            box-shadow: inset 0 0 60px rgba(0, 255, 128, 0.2);
            animation: pulse 2s infinite;
          }
          
          :global(.flicker) {
            background: radial-gradient(ellipse at center, rgba(255,255,255,0.2) 0%, rgba(0,0,0,0) 70%);
            opacity: 0;
            mix-blend-mode: overlay;
            animation: flicker 8s infinite;
          }
          
          :global(.text-flicker) {
            animation: textFlicker 3s infinite;
          }
          
          :global(.cursor-blink) {
            border-right: 2px solid;
            animation: blink 1s infinite;
          }
          
          :global(.shake-error) {
            animation: shake 0.5s;
          }
          
          :global(.glitch) {
            position: relative;
            animation: textFlicker 2s infinite;
          }
          
          :global(.glitch::before),
          :global(.glitch::after) {
            content: attr(data-text);
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            color: currentColor;
          }
          
          :global(.glitch::before) {
            animation: glitch 3s infinite;
            color: #0ff;
            z-index: -1;
          }
          
          :global(.glitch::after) {
            animation: glitch 2s infinite;
            color: #f0f;
            z-index: -2;
          }
          
          :global(::selection) {
            background: rgba(0, 255, 128, 0.99);
            color: black;
          }
        `}</style>
        <div className="container mx-auto px-4 max-w-2xl py-8">
          <Game />
          <ToastContainer 
            position="top-center" 
            autoClose={2000} 
            hideProgressBar
            theme="dark"
            toastClassName="bg-black border-2 border-green-400 text-green-400 font-mono"
          />
        </div>
        <Scanlines />
      </div>
    </Provider>
  );
}

export default App;
