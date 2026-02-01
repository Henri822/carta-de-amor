
import React, { useState, useRef, useEffect } from 'react';
import { AUDIO_SCRIPTS } from '../data/romanticData';
import { uploadAudio, getSavedRecordings, supabase } from '../services/supabase';

interface AudioPlayerSectionProps {
  isNightMode: boolean;
}

const AudioPlayerSection: React.FC<AudioPlayerSectionProps> = ({ isNightMode }) => {
  const [recordings, setRecordings] = useState<{ [key: number]: string }>({});
  const [isRecording, setIsRecording] = useState<number | null>(null);
  const [isUploading, setIsUploading] = useState<number | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  useEffect(() => {
    const loadData = async () => {
      if (!supabase) return;
      try {
        const saved = await getSavedRecordings();
        setRecordings(saved);
      } catch (e) {
        console.error("Erro ao sincronizar com Supabase.");
      }
    };
    loadData();
  }, []);

  const startRecording = async (id: number) => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) audioChunksRef.current.push(event.data);
      };

      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
        
        if (supabase) {
          try {
            setIsUploading(id);
            const publicUrl = await uploadAudio(id, audioBlob);
            setRecordings(prev => ({ ...prev, [id]: publicUrl }));
          } catch (err) {
            console.error("Erro no upload remoto, salvando apenas local.");
            const localUrl = URL.createObjectURL(audioBlob);
            setRecordings(prev => ({ ...prev, [id]: localUrl }));
          } finally {
            setIsUploading(null);
          }
        } else {
          const localUrl = URL.createObjectURL(audioBlob);
          setRecordings(prev => ({ ...prev, [id]: localUrl }));
        }
        
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorder.start();
      setIsRecording(id);
    } catch (err) {
      alert("Para gravar suas mensagens, preciso que você autorize o microfone no navegador. ❤️");
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setIsRecording(null);
    }
  };

  return (
    <section className={`py-16 px-4 ${isNightMode ? 'bg-indigo-900/10' : 'bg-white'}`}>
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-12">
          <h2 className={`font-romantic text-4xl mb-4 ${isNightMode ? 'text-indigo-200' : 'text-rose-800'}`}>
            Nossa Estação de Rádio
          </h2>
          <p className={`text-sm ${isNightMode ? 'text-indigo-300' : 'text-rose-600 opacity-80'}`}>
            Grave mensagens para ela ouvir sempre que sentir saudade.
          </p>
        </header>
        
        {!supabase && (
          <div className="mb-8 p-4 bg-amber-50 border border-amber-200 text-amber-800 rounded-2xl text-sm flex items-center gap-3">
            <span className="text-xl">⚠️</span>
            <p><strong>Atenção:</strong> Suas chaves do Supabase ainda não foram configuradas. Os áudios não serão salvos permanentemente.</p>
          </div>
        )}

        <div className="grid gap-6">
          {AUDIO_SCRIPTS.map((item) => (
            <div 
              key={item.id} 
              className={`p-6 md:p-8 rounded-3xl flex flex-col gap-6 border transition-all duration-500 ${isNightMode ? 'bg-indigo-950/40 border-indigo-800' : 'bg-white border-rose-100 shadow-sm'}`}
            >
              <div className="flex flex-col md:flex-row gap-6">
                <div className={`p-4 h-fit rounded-2xl flex-shrink-0 ${isNightMode ? 'bg-indigo-800 text-indigo-100' : 'bg-rose-100 text-rose-500'}`}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className={`text-lg font-bold mb-3 ${isNightMode ? 'text-indigo-100' : 'text-rose-900'}`}>{item.title}</h3>
                  <p className={`italic text-lg leading-relaxed ${isNightMode ? 'text-indigo-300' : 'text-rose-700/80'}`}>
                    "{item.script}"
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-4 pt-4 border-t border-dashed border-rose-100">
                {isRecording === item.id ? (
                  <button 
                    onClick={stopRecording} 
                    className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-3 bg-red-500 text-white rounded-full font-bold shadow-lg animate-pulse"
                  >
                    <span className="w-2 h-2 bg-white rounded-full"></span>
                    PARAR GRAVAÇÃO
                  </button>
                ) : (
                  <button
                    onClick={() => startRecording(item.id)}
                    disabled={isUploading !== null}
                    className={`w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-3 rounded-full font-bold transition-all shadow-md active:scale-95 ${isNightMode ? 'bg-indigo-600 hover:bg-indigo-500 text-white' : 'bg-rose-500 hover:bg-rose-400 text-white'} disabled:opacity-50`}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 000 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                    </svg>
                    {recordings[item.id] ? "REGRAVAR" : "GRAVAR VOZ"}
                  </button>
                )}

                {isUploading === item.id && (
                  <div className="flex items-center gap-2 text-sm font-medium animate-pulse text-rose-500">
                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Sincronizando com a nuvem...
                  </div>
                )}

                {recordings[item.id] && isUploading !== item.id && (
                  <div className="flex-1 w-full animate-fadeIn">
                    <audio 
                      src={recordings[item.id]} 
                      controls 
                      className={`w-full h-10 rounded-full ${isNightMode ? 'invert brightness-90 opacity-80' : ''}`} 
                    />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AudioPlayerSection;
