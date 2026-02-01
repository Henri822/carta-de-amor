
import { GoogleGenAI } from "@google/genai";

// Proteção para evitar ReferenceError em ambientes onde process não existe (ex: GitHub Pages direto)
const safeApiKey = typeof process !== 'undefined' && process.env ? process.env.API_KEY : '';

// Inicializa a IA apenas se a chave existir para evitar erros fatais
const ai = safeApiKey ? new GoogleGenAI({ apiKey: safeApiKey }) : null;

export const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

export async function generateSurpriseMessage() {
  if (!ai) return "Você é a constante mais bonita em todas as minhas variáveis. (Modo Offline)";
  
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: "Crie uma declaração de amor curta, intensa e criativa para uma namorada especial. Use uma metáfora moderna ou tech. Seja fofo mas não brega.",
      config: {
        temperature: 0.9,
        topP: 0.95,
      },
    });
    return response.text;
  } catch (error) {
    console.error("Error generating surprise message:", error);
    return "Você é a constante mais bonita em todas as minhas variáveis.";
  }
}

export async function generateRomanticImage(prompt: string) {
  if (!ai) return null;
  
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-image",
      contents: {
        parts: [{ text: prompt }]
      },
      config: {
        imageConfig: {
          aspectRatio: "1:1"
        }
      }
    });
    
    const parts = response.candidates?.[0]?.content.parts || [];
    for (const part of parts) {
      if (part.inlineData) {
        return `data:image/png;base64,${part.inlineData.data}`;
      }
    }
    return null;
  } catch (error: any) {
    if (error.message?.includes("429") || error.message?.includes("QUOTA")) {
      console.warn("Cota de IA atingida. Usando banco de imagens reserva.");
    } else {
      console.error("Erro na geração de imagem:", error);
    }
    return null;
  }
}
