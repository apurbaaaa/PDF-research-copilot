import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export const summarizeText = async (text: string) => {
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });

  const prompt = `
    Summarize the following research paper text and extract key citations. 
    Return the response in JSON format:
    {
      "summary": "...",
      "citations": ["...", "..."]
    }

    TEXT:
    ${text.slice(0, 12000)}  // Gemini input limit: ~30k tokens, keep it safe
  `;

  const result = await model.generateContent(prompt);
  const response = await result.response.text();

  // Attempt to extract valid JSON from the text
  const jsonStart = response.indexOf("{");
  const json = JSON.parse(response.slice(jsonStart));

  return json;
};
// This function uses the Google Generative AI API to summarize a given text and extract key citations.
// It constructs a prompt that instructs the model to summarize the text and return the result in a specific JSON format.
// The text is truncated to ensure it fits within the input limits of the Gemini model. 