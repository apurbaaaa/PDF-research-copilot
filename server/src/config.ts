
import dotenv from "dotenv";

dotenv.config();

export const config = {
  port: process.env.PORT || 5000,
  geminiApiKey: process.env.GEMINI_API_KEY,
  nodeEnv: process.env.NODE_ENV || 'development'
};

// Validate required environment variables
if (!config.geminiApiKey) {
  console.warn("Warning: GEMINI_API_KEY not found in environment variables");
}

export default config;
