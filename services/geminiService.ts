
import { GoogleGenAI } from "@google/genai";
import { AIAnalysisResult } from "../types";

// Always use a named parameter for apiKey and rely exclusively on process.env.API_KEY
// DO NOT use fallback values or define process.env here.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const analyzePriceDeal = async (productName: string, price: number, currentStore: string): Promise<AIAnalysisResult | null> => {
  try {
    // When using googleSearch grounding, we must NOT use responseMimeType: "application/json" 
    // and must not attempt to parse response.text as JSON. 
    // Instead, we request a structured text format and parse it manually.
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Compare o preço de R$ ${price} para o produto "${productName}" no mercado ${currentStore}. 
      Pesquise nos sites do Assaí, Pão de Açúcar, Bergamini, Trimais, Extra, Andorinha, Carrefour e Sonda. 
      Determine se este é o melhor preço da região e forneça sua análise.
      
      Responda exatamente no seguinte formato:
      SCORE: [nota de 0 a 100]
      SUMMARY: [resumo curto]
      REASONING: [explicação da comparação]
      RECOMMENDATION: [veredito]`,
      config: {
        tools: [{ googleSearch: {} }],
      }
    });

    const text = response.text;
    if (!text) return null;

    // Manually parse the text response as recommended when using grounding tools
    const scoreMatch = text.match(/SCORE:\s*(\d+)/i);
    const summaryMatch = text.match(/SUMMARY:\s*(.*)/i);
    const reasoningMatch = text.match(/REASONING:\s*([\s\S]*?)(?=RECOMMENDATION:|$)/i);
    const recommendationMatch = text.match(/RECOMMENDATION:\s*([\s\S]*)/i);

    const result: AIAnalysisResult = {
      score: scoreMatch ? parseInt(scoreMatch[1], 10) : 0,
      summary: summaryMatch ? summaryMatch[1].trim() : "Análise de Oferta",
      reasoning: reasoningMatch ? reasoningMatch[1].trim() : text,
      recommendation: recommendationMatch ? recommendationMatch[1].trim() : "Verifique as fontes abaixo para mais detalhes."
    };
    
    // CRITICAL: Extract URLs from groundingChunks and include them in the result for transparency
    const sources = response.candidates?.[0]?.groundingMetadata?.groundingChunks
      ?.filter(chunk => chunk.web)
      ?.map(chunk => ({
        uri: chunk.web?.uri || '',
        title: chunk.web?.title || 'Fonte de Mercado'
      })) || [];

    return { ...result, sources };
  } catch (error) {
    console.error("AI Analysis failed:", error);
    return null;
  }
};
