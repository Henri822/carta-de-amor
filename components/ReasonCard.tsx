
import React, { useState, useEffect } from 'react';
import { RomanticReason } from '../types';
import { generateRomanticImage, delay } from '../services/geminiService';

interface ReasonCardProps {
  reason: RomanticReason;
  isNightMode: boolean;
  index: number; // Adicionado para fazer o efeito cascata/delay
}

const ReasonCard: React.FC<ReasonCardProps> = ({ reason, isNightMode, index }) => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [isFallback, setIsFallback] = useState(false);

  useEffect(() => {
    const loadImage = async () => {
      const cacheKey = `romantic_img_reason_${reason.id}`;
      const cached = localStorage.getItem(cacheKey);

      if (cached) {
        setImageUrl(cached);
        setLoading(false);
        return;
      }

      setLoading(true);
      
      // Pequeno delay baseado no index para não sobrecarregar a API (Rate Limit)
      // O primeiro carrega em 500ms, o segundo em 2500ms, etc.
      await delay(index * 2000);

      try {
        const url = await generateRomanticImage(reason.imagePrompt);
        
        if (url && !url.startsWith('http')) {
          // Salva no cache se for uma imagem gerada com sucesso
          localStorage.setItem(cacheKey, url);
          setImageUrl(url);
          setIsFallback(false);
        } else {
          // Se falhou a API, usa um fallback estético
          throw new Error("API Failure");
        }
      } catch (err) {
        setIsFallback(true);
        // Fallback: Imagens românticas genéricas mas bonitas do Unsplash
        const fallbackThemes = ['love', 'couple', 'sunset', 'stars', 'heart'];
        const theme = fallbackThemes[reason.id % fallbackThemes.length];
        setImageUrl(`https://images.unsplash.com/photo-${1500000000000 + reason.id}?auto=format&fit=crop&q=80&w=600&h=600&sig=${reason.id}`);
      } finally {
        setLoading(false);
      }
    };

    loadImage();
  }, [reason.id, reason.imagePrompt, index]);

  return (
    <div className={`rounded-3xl overflow-hidden shadow-lg transform transition-all duration-500 hover:scale-[1.02] ${isNightMode ? 'bg-indigo-900/50 border border-indigo-700' : 'bg-white border border-rose-100'}`}>
      <div className="relative h-64 bg-rose-100 overflow-hidden">
        {loading ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
            <div className={`animate-spin rounded-full h-8 w-8 border-b-2 ${isNightMode ? 'border-indigo-400' : 'border-rose-500'}`}></div>
            <span className={`text-xs font-medium animate-pulse ${isNightMode ? 'text-indigo-300' : 'text-rose-400'}`}>
              Tecendo sonhos...
            </span>
          </div>
        ) : (
          <>
            <img 
              src={imageUrl || ''} 
              alt="Ilustração romântica" 
              className={`w-full h-full object-cover transition-opacity duration-1000 ${loading ? 'opacity-0' : 'opacity-100'}`} 
            />
            {isFallback && (
              <div className="absolute bottom-2 right-2 px-2 py-0.5 bg-black/20 backdrop-blur-md rounded-lg text-[10px] text-white/70">
                A mágica está recarregando... ✨
              </div>
            )}
          </>
        )}
        <div className="absolute top-4 left-4">
          <span className={`px-4 py-1 rounded-full text-xs font-bold shadow-sm ${isNightMode ? 'bg-indigo-800 text-indigo-100' : 'bg-rose-500 text-white'}`}>
            Motivo nº {reason.id}
          </span>
        </div>
      </div>
      <div className="p-6">
        <p className={`text-lg leading-relaxed font-medium ${isNightMode ? 'text-indigo-100' : 'text-rose-900'}`}>
          {reason.text}
        </p>
      </div>
    </div>
  );
};

export default ReasonCard;
