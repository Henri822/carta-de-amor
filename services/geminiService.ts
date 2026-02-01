
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

export async function generateSurpriseMessage() {
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
    // Se for erro de cota, logamos mas retornamos null para o componente tratar
    if (error.message?.includes("429") || error.message?.includes("QUOTA")) {
      console.warn("Cota de IA atingida. Usando banco de imagens reserva.");
    } else {
      console.error("Erro na geração de imagem:", error);
    }
    return null;
  }
}
