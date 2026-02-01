
import React, { useState, useEffect } from 'react';
import { RANDOM_PHRASES, NIGHT_PHRASES } from '../data/romanticData';

interface HeroProps {
  isNightMode: boolean;
}

const Hero: React.FC<HeroProps> = ({ isNightMode }) => {
  const [phrase, setPhrase] = useState('');

  useEffect(() => {
    const phrases = isNightMode ? NIGHT_PHRASES : RANDOM_PHRASES;
    const randomIdx = Math.floor(Math.random() * phrases.length);
    setPhrase(phrases[randomIdx]);
  }, [isNightMode]);

  return (
    <section className={`relative min-h-[60vh] flex items-center justify-center text-center p-8 transition-colors duration-1000 ${isNightMode ? 'bg-indigo-950 text-indigo-100' : 'bg-rose-100 text-rose-900'}`}>
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className={`absolute rounded-full animate-pulse ${isNightMode ? 'bg-indigo-400 opacity-10' : 'bg-rose-400 opacity-20'}`}
            style={{
              width: `${Math.random() * 100 + 20}px`,
              height: `${Math.random() * 100 + 20}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          />
        ))}
      </div>
      
      <div className="relative z-10 max-w-2xl fade-in">
        <h1 className="font-romantic text-4xl md:text-6xl mb-6">
          {isNightMode ? 'Nasce a Lua...' : 'Bom dia, Amor.'}
        </h1>
        <p className="text-xl md:text-2xl font-light italic leading-relaxed">
          "{phrase}"
        </p>
      </div>
    </section>
  );
};

export default Hero;
