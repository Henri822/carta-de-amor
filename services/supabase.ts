
import { createClient } from '@supabase/supabase-js';

/** 
 * --- CONFIGURAÇÃO DO SUPABASE ---
 * Conexão estabelecida e pronta para uso! 🚀
 */
const SUPABASE_URL = "https://uotxwlivrksvtgmnxdiq.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_OaetYXgJE8bjv0d_ZcNJtw_qRMa_S64";
// --------------------------------

// Inicialização segura do cliente Supabase
export const supabase = (SUPABASE_URL && SUPABASE_ANON_KEY) 
  ? createClient(SUPABASE_URL, SUPABASE_ANON_KEY) 
  : null;

/**
 * Faz o upload do arquivo de áudio para o Storage e salva a URL no Database.
 * 
 * Requisitos no painel do Supabase:
 * 1. Criar um Bucket chamado 'audio-recordings' e torná-lo público.
 * 2. Criar uma Tabela chamada 'recordings' com:
 *    - script_id (int4, UNIQUE ou PRIMARY KEY)
 *    - url (text)
 *    - created_at (timestamptz)
 */
export async function uploadAudio(id: number, blob: Blob) {
  if (!supabase) throw new Error("Supabase não configurado.");

  const fileName = `audio-script-${id}-${Date.now()}.wav`;
  
  // 1. Enviar o arquivo para o Storage
  const { data: storageData, error: storageError } = await supabase.storage
    .from('audio-recordings')
    .upload(fileName, blob, {
      contentType: 'audio/wav',
      cacheControl: '3600',
      upsert: false
    });

  if (storageError) {
    console.error("Erro no Storage:", storageError);
    throw storageError;
  }

  // 2. Obter a URL pública do arquivo enviado
  const { data: { publicUrl } } = supabase.storage
    .from('audio-recordings')
    .getPublicUrl(fileName);

  // 3. Salvar o registro na tabela 'recordings' (usando upsert para atualizar se já existir)
  const { error: dbError } = await supabase
    .from('recordings')
    .upsert({ 
      script_id: id, 
      url: publicUrl,
      created_at: new Date().toISOString()
    }, { onConflict: 'script_id' });

  if (dbError) {
    console.error("Erro no Database:", dbError);
    throw dbError;
  }

  return publicUrl;
}

/**
 * Busca todos os áudios salvos para persistência entre sessões.
 */
export async function getSavedRecordings() {
  if (!supabase) return {};

  try {
    const { data, error } = await supabase
      .from('recordings')
      .select('script_id, url');

    if (error) {
      console.warn("Aviso: A tabela 'recordings' pode ainda não ter sido criada no Supabase.");
      return {};
    }
    
    // Converte o array em um objeto mapeado pelo script_id
    return data.reduce((acc: any, curr: any) => {
      acc[curr.script_id] = curr.url;
      return acc;
    }, {});
  } catch (err) {
    console.error("Erro ao carregar gravações:", err);
    return {};
  }
}
