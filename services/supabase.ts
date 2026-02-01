
import { createClient } from '@supabase/supabase-js';

/** 
 * --- CONFIGURAÇÃO DO SUPABASE ---
 */
const SUPABASE_URL = "https://uotxwlivrksvtgmnxdiq.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_OaetYXgJE8bjv0d_ZcNJtw_qRMa_S64";
// --------------------------------

export const supabase = (SUPABASE_URL && SUPABASE_ANON_KEY) 
  ? createClient(SUPABASE_URL, SUPABASE_ANON_KEY) 
  : null;

/**
 * Busca áudios da tabela 'arquivos_audio' (Músicas/Uploads manuais)
 */
export async function getPlaylistAudios() {
  if (!supabase) return [];
  try {
    const { data, error } = await supabase
      .from('arquivos_audio')
      .select('*');
    
    if (error) throw error;
    return data || [];
  } catch (err) {
    console.error("Erro ao buscar playlist:", err);
    return [];
  }
}

/**
 * Faz o upload do arquivo de áudio para o Storage e salva na tabela 'recordings' (Rádio)
 */
export async function uploadAudio(id: number, blob: Blob) {
  if (!supabase) throw new Error("Supabase não configurado.");

  const fileName = `audio-script-${id}-${Date.now()}.wav`;
  
  const { data: storageData, error: storageError } = await supabase.storage
    .from('audio-recordings')
    .upload(fileName, blob, {
      contentType: 'audio/wav',
      cacheControl: '3600',
      upsert: false
    });

  if (storageError) throw storageError;

  const { data: { publicUrl } } = supabase.storage
    .from('audio-recordings')
    .getPublicUrl(fileName);

  const { error: dbError } = await supabase
    .from('recordings')
    .upsert({ 
      script_id: id, 
      url: publicUrl,
      created_at: new Date().toISOString()
    }, { onConflict: 'script_id' });

  if (dbError) throw dbError;

  return publicUrl;
}

/**
 * Busca gravações da rádio
 */
export async function getSavedRecordings() {
  if (!supabase) return {};
  try {
    const { data, error } = await supabase
      .from('recordings')
      .select('script_id, url');
    if (error) return {};
    return data.reduce((acc: any, curr: any) => {
      acc[curr.script_id] = curr.url;
      return acc;
    }, {});
  } catch (err) {
    return {};
  }
}
