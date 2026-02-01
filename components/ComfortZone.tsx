
import React, { useState } from 'react';
import { COMFORT_MESSAGES } from '../data/romanticData';

interface ComfortZoneProps {
  isNightMode: boolean;
}

const ComfortZone: React.FC<ComfortZoneProps> = ({ isNightMode }) => {
  const [activeMessage, setActiveMessage] = useState<string | null>(null);

  const handleClick = () => {
    const randomIdx = Math.floor(Math.random() * COMFORT_MESSAGES.length);
    setActiveMessage(COMFORT_MESSAGES[randomIdx].message);
  };

  return (
    <section className={`py-16 px-4 text-center transition-colors duration-500 ${isNightMode ? 'bg-indigo-950' : 'bg-rose-50'}`}>
      <div className="max-w-xl mx-auto">
        <h2 className={`font-romantic text-3xl mb-8 ${isNightMode ? 'text-indigo-200' : 'text-rose-800'}`}>
          Se estiver triste, clica aqui...
        </h2>
        
        <button
          onClick={handleClick}
          className={`group relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium rounded-full hover:scale-110 transition-transform duration-300 ${isNightMode ? 'text-white bg-gradient-to-br from-indigo-500 to-purple-800' : 'text-rose-900 bg-gradient-to-br from-rose-400 to-orange-200'}`}
        >
          <span className={`relative px-8 py-8 transition-all ease-in duration-75 rounded-full ${isNightMode ? 'bg-indigo-900/50' : 'bg-white/80'} group-hover:bg-opacity-0`}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
            </svg>
          </span>
        </button>

        {activeMessage && (
          <div className={`mt-8 p-8 rounded-3xl border fade-in shadow-inner ${isNightMode ? 'bg-indigo-900/40 border-indigo-700 text-indigo-50' : 'bg-white border-rose-100 text-rose-900'}`}>
            <p className="text-xl font-light italic">
              {activeMessage}
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default ComfortZone;
