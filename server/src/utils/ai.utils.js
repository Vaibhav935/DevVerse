const useHuggingFace = async (prompt, key) => {
  const finalPrompt = `You are a helpful assistant. Always reply in English. And try to cover full ans in 500 tokens only. Query: ${prompt}`;
  const query = async (data) => {
    const response = await fetch(
      "https://router.huggingface.co/v1/chat/completions",
      {
        headers: {
          Authorization: `Bearer ${key}`,
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(data),
      },
    );

    const result = await response.json();
    return result;
  };

  const response = await query({
    messages: [
      //   {
      //     role: "system",
      //     content: "You are a helpful assistant. Always reply in English. And try to cover full ans in 500 tokens only.",
      //   },
      {
        role: "user",
        content: finalPrompt,
      },
    ],
    model: "zai-org/GLM-5.1:novita",
    maxtokens: 500,
    temperature: 0.7,
  });

  return response.choices?.[0]?.message?.content || "No response";
};

import { GoogleGenAI } from "@google/genai";
import config from "../config/config.js";

// The client gets the API key from the environment variable `GEMINI_API_KEY`.
const ai = new GoogleGenAI({
  apiKey: config.GEMINI_API_KEY,
});

export async function GeminiAPI(prompt) {
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: prompt,
  });

  return response.text;
}

export default useHuggingFace;
