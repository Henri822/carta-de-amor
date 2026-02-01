
import React from 'react';
import { TIME_CAPSULES } from '../data/romanticData';

interface TimeCapsuleSectionProps {
  isNightMode: boolean;
}

const TimeCapsuleSection: React.FC<TimeCapsuleSectionProps> = ({ isNightMode }) => {
  const isDateUnlocked = (dateStr: string) => {
    const today = new Date();
    const targetDate = new Date(dateStr);
    return today >= targetDate;
  };

  return (
    <section className="py-16 px-4 max-w-6xl mx-auto">
      <h2 className={`font-romantic text-4xl text-center mb-12 ${isNightMode ? 'text-indigo-200' : 'text-rose-800'}`}>
        Presentes do Tempo
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {TIME_CAPSULES.map((capsule) => {
          const unlocked = isDateUnlocked(capsule.date);
          return (
            <div 
              key={capsule.id} 
              className={`p-8 rounded-3xl border-2 border-dashed transition-all duration-500 ${
                unlocked 
                ? (isNightMode ? 'bg-indigo-800/30 border-indigo-500 text-indigo-50' : 'bg-rose-100 border-rose-300 text-rose-900')
                : (isNightMode ? 'bg-slate-900 border-slate-700 text-slate-500 grayscale' : 'bg-gray-50 border-gray-200 text-gray-400 grayscale')
              }`}
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-2xl font-bold">{capsule.title}</h3>
                  <p className="text-sm font-mono opacity-70">Disponível em: {new Date(capsule.date).toLocaleDateString()}</p>
                </div>
                <div className="text-3xl">
                  {unlocked ? '✨' : '🔒'}
                </div>
              </div>
              <div className="mt-4">
                {unlocked ? (
                  <p className="text-lg leading-relaxed">{capsule.content}</p>
                ) : (
                  <div className="space-y-2">
                    <div className="h-4 bg-current opacity-10 rounded w-full"></div>
                    <div className="h-4 bg-current opacity-10 rounded w-5/6"></div>
                    <div className="h-4 bg-current opacity-10 rounded w-4/6"></div>
                    <p className="text-center pt-4 italic">Conteúdo guardado pelo tempo...</p>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default TimeCapsuleSection;
