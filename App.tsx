
import React, { useState, useEffect } from 'react';
import Hero from './components/Hero';
import ReasonCard from './components/ReasonCard';
import ComfortZone from './components/ComfortZone';
import TimeCapsuleSection from './components/TimeCapsuleSection';
import AudioPlayerSection from './components/AudioPlayerSection';
import MusicPlaylist from './components/MusicPlaylist';
import { REASONS } from './data/romanticData';
import { generateSurpriseMessage } from './services/geminiService';

const App: React.FC = () => {
  const [isNightMode, setIsNightMode] = useState(false);
  const [surprise, setSurprise] = useState<string | null>(null);
  const [showSurprise, setShowSurprise] = useState(false);

  useEffect(() => {
    const hours = new Date().getHours();
    if (hours >= 20 || hours <= 5) {
      setIsNightMode(true);
    }
  }, []);

  const triggerSurprise = async () => {
    setSurprise('Gerando algo especial...');
    setShowSurprise(true);
    const msg = await generateSurpriseMessage();
    setSurprise(msg);
  };

  return (
    <div className={`min-h-screen transition-colors duration-1000 ${isNightMode ? 'bg-indigo-950 text-white' : 'bg-rose-50 text-rose-900'}`}>
      <button 
        onClick={() => setIsNightMode(!isNightMode)}
        className="fixed top-6 right-6 z-50 p-3 rounded-full bg-white/20 backdrop-blur-md border border-white/30 hover:scale-110 transition-transform shadow-lg"
      >
        {isNightMode ? '☀️' : '🌙'}
      </button>

      <Hero isNightMode={isNightMode} />

      <main>
        <section className="py-20 px-4 max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-romantic text-5xl mb-4">Motivos para te amar</h2>
            <p className="text-lg opacity-70">Apenas alguns dos bilhões que existem.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {REASONS.map((reason, index) => (
              <ReasonCard key={reason.id} reason={reason} isNightMode={isNightMode} index={index} />
            ))}
          </div>
        </section>

        <ComfortZone isNightMode={isNightMode} />

        <TimeCapsuleSection isNightMode={isNightMode} />

        <AudioPlayerSection isNightMode={isNightMode} />
        
        {/* Nova seção baseada no seu código de playlist */}
        <MusicPlaylist isNightMode={isNightMode} />

        <section className="py-20 text-center">
          <button
            onClick={triggerSurprise}
            className={`px-10 py-4 rounded-full font-bold text-xl shadow-xl transition-all hover:-translate-y-1 active:scale-95 ${isNightMode ? 'bg-indigo-600 hover:bg-indigo-500' : 'bg-rose-500 hover:bg-rose-400 text-white'}`}
          >
            Surpresa do Dia ✨
          </button>

          {showSurprise && (
            <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
              <div className={`relative max-w-lg w-full p-10 rounded-3xl shadow-2xl text-center fade-in ${isNightMode ? 'bg-indigo-900' : 'bg-white'}`}>
                <button 
                  onClick={() => setShowSurprise(false)}
                  className="absolute top-4 right-4 text-2xl opacity-50 hover:opacity-100"
                >
                  ✕
                </button>
                <div className="text-4xl mb-6">💌</div>
                <p className="text-2xl font-romantic leading-relaxed">
                  {surprise}
                </p>
              </div>
            </div>
          )}
        </section>
      </main>

      <footer className={`py-12 text-center text-sm opacity-50 ${isNightMode ? 'border-t border-indigo-900' : 'border-t border-rose-100'}`}>
        <p>Feito com todo o amor do mundo por mim, para você.</p>
        <p className="mt-2">© 2024 - Nossa Eternidade</p>
      </footer>
    </div>
  );
};

export default App;
