
import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export const summarizeText = async (text: string) => {
  try {
    console.log("Starting AI summarization...");
    
    if (!process.env.GEMINI_API_KEY) {
      throw new Error("GEMINI_API_KEY not found in environment variables");
    }

    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    // Truncate text to fit within token limits
    const maxLength = 12000;
    const truncatedText = text.length > maxLength ? text.slice(0, maxLength) + "..." : text;

    const prompt = `
      Analyze the following research paper text and provide a comprehensive summary with key citations.
      Return the response in valid JSON format with the following structure:
      {
        "summary": "A detailed summary of the paper's main findings, methodology, and conclusions",
        "citations": ["Key quote or finding 1", "Key quote or finding 2", "Key quote or finding 3"],
        "keywords": ["keyword1", "keyword2", "keyword3"],
        "methodology": "Brief description of the research methodology used"
      }

      TEXT:
      ${truncatedText}
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response.text();

    console.log("AI response received, parsing JSON...");

    // Clean and parse JSON response
    let cleanResponse = response.trim();
    
    // Remove markdown code blocks if present
    if (cleanResponse.startsWith('```json')) {
      cleanResponse = cleanResponse.replace(/```json\n?/, '').replace(/\n?```$/, '');
    } else if (cleanResponse.startsWith('```')) {
      cleanResponse = cleanResponse.replace(/```\n?/, '').replace(/\n?```$/, '');
    }

    // Find JSON start and end
    const jsonStart = cleanResponse.indexOf("{");
    const jsonEnd = cleanResponse.lastIndexOf("}") + 1;
    
    if (jsonStart === -1 || jsonEnd === 0) {
      throw new Error("No valid JSON found in AI response");
    }
    
    const jsonString = cleanResponse.slice(jsonStart, jsonEnd);
    const parsedResult = JSON.parse(jsonString);

    // Validate required fields
    if (!parsedResult.summary) {
      throw new Error("AI response missing required 'summary' field");
    }

    // Ensure citations is an array
    if (!Array.isArray(parsedResult.citations)) {
      parsedResult.citations = [];
    }

    // Ensure keywords is an array
    if (!Array.isArray(parsedResult.keywords)) {
      parsedResult.keywords = [];
    }

    console.log("AI processing completed successfully");
    return parsedResult;

  } catch (error) {
    console.error("Error in summarizeText:", error);
    
    // Return a fallback response instead of throwing
    return {
      summary: "Unable to generate AI summary at this time. Please check your API configuration and try again.",
      citations: ["Error occurred during processing"],
      keywords: ["error"],
      methodology: "Processing failed",
      error: error instanceof Error ? error.message : "Unknown error"
    };
  }
};
