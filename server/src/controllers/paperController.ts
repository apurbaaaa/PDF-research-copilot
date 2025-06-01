import { Request, Response } from "express";
import pdfParse from "pdf-parse";
import { summarizeText } from "../services/summarizeService";

export const uploadAndProcessPDF = async (req: Request, res: Response): Promise<void> => {
  try {
    if (!req.file) {
      res.status(400).json({ error: "No file uploaded" });
      return;
    }

    const pdfData = await pdfParse(req.file.buffer);
    const text = pdfData.text;

    const result = await summarizeText(text);

    res.json(result); // ✅ send response, don't return it
  } catch (error) {
    console.error("Error processing PDF:", error);
    res.status(500).json({ error: "Failed to process PDF" });
  }
};
// This function handles the PDF upload and processing.
// It uses the pdf-parse library to extract text from the uploaded PDF file.