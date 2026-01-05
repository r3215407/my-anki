
import { GoogleGenAI } from "@google/genai";

export const explainMistake = async (title: string, meaning: string, sentence: string) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || "" });
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `你是小智错题本的AI助手。请用通俗易懂、生动活泼的方式解释这个题目。
      题目内容: ${title}
      含义: ${meaning}
      例句: ${sentence}
      请提供详细的解析，包括可能的陷阱和记忆技巧。限制在150字以内。`,
      config: {
        temperature: 0.7,
        topP: 0.95,
      }
    });
    return response.text;
  } catch (error) {
    console.error("Gemini Error:", error);
    return "AI 解析暂时不可用，请稍后再试。";
  }
};
