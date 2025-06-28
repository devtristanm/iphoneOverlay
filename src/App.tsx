import React from 'react';
import { iPhone16StatusBar } from './components/iPhone16StatusBar';

function App() {
  return (
    <div className="min-h-screen bg-green-500 flex flex-col items-center justify-start p-4">
      {/* Simple status bar overlay - perfect for OBS */}
      <div className="w-full max-w-[390px]">
        <iPhone16StatusBar />
      </div>
      
      {/* OBS Instructions */}
      <div className="mt-8 text-center text-black max-w-md bg-white/90 p-4 rounded-lg">
        <h2 className="text-xl font-bold mb-2">OBS Overlay Ready!</h2>
        <p className="text-sm">
          Use Chroma Key filter in OBS with green screen removal. 
          The status bar shows live system time and will update automatically.
        </p>
        <p className="text-xs mt-2 opacity-70">
          Set Color Key to #22C55E (green-500) for best results
        </p>
      </div>
    </div>
  );
}

export default App;