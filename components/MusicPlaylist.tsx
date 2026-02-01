
import React, { useEffect, useState } from 'react';
import { getPlaylistAudios } from '../services/supabase';

interface MusicPlaylistProps {
  isNightMode: boolean;
}

const MusicPlaylist: React.FC<MusicPlaylistProps> = ({ isNightMode }) => {
  const [playlist, setPlaylist] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlaylist = async () => {
      setLoading(true);
      const data = await getPlaylistAudios();
      setPlaylist(data);
      setLoading(false);
    };
    fetchPlaylist();
  }, []);

  if (playlist.length === 0 && !loading) return null;

  return (
    <section className={`py-16 px-4 ${isNightMode ? 'bg-indigo-950/50' : 'bg-rose-50/50'}`}>
      <div className="max-w-4xl mx-auto text-center">
        <h2 className={`font-romantic text-4xl mb-8 ${isNightMode ? 'text-indigo-200' : 'text-rose-800'}`}>
          Músicas para Você ❤️
        </h2>

        {loading ? (
          <div className="animate-pulse text-rose-400">Carregando surpresas sonoras...</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {playlist.map((audio, index) => (
              <div 
                key={index} 
                className={`p-6 rounded-3xl shadow-md transition-transform hover:scale-105 ${isNightMode ? 'bg-indigo-900 border border-indigo-700' : 'bg-white border border-rose-100'}`}
              >
                <div className="text-3xl mb-3">🎵</div>
                <h3 className={`font-bold mb-4 text-lg ${isNightMode ? 'text-indigo-100' : 'text-rose-900'}`}>
                  {audio.Nome}
                </h3>
                <audio controls className={`w-full h-10 ${isNightMode ? 'invert brightness-90' : ''}`}>
                  <source src={audio.URL} type="audio/mpeg" />
                  Seu navegador não suporta o player.
                </audio>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default MusicPlaylist;
