
import { Request, Response } from "express";
import pdfParse from "pdf-parse";
import { summarizeText } from "../services/summarizeService";

export const uploadAndProcessPDF = async (req: Request, res: Response): Promise<void> => {
  try {
    console.log("Processing PDF upload...");
    
    if (!req.file) {
      console.error("No file uploaded");
      res.status(400).json({ error: "No file uploaded" });
      return;
    }

    console.log("File received:", req.file.originalname, "Size:", req.file.size);

    // Parse PDF
    const pdfData = await pdfParse(req.file.buffer);
    const text = pdfData.text;

    console.log("PDF parsed, text length:", text.length);

    if (!text || text.trim().length === 0) {
      res.status(400).json({ error: "Could not extract text from PDF" });
      return;
    }

    // Summarize using AI
    const result = await summarizeText(text);
    
    console.log("AI processing complete");
    
    // Add metadata
    const response = {
      ...result,
      title: req.file.originalname.replace('.pdf', ''),
      uploadDate: new Date().toISOString(),
      fileSize: req.file.size
    };

    res.json(response);
  } catch (error) {
    console.error("Error processing PDF:", error);
    res.status(500).json({ 
      error: "Failed to process PDF",
      details: error instanceof Error ? error.message : "Unknown error"
    });
  }
};
