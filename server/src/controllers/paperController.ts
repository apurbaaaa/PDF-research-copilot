
import { Request, Response } from "express";
import pdfParse from "pdf-parse";
import { summarizeText } from "../services/summarizeService";
import { Paper } from "../models/Paper";

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
    const aiResult = await summarizeText(text);
    
    console.log("AI processing complete");
    
    // Save to MongoDB
    const paper = new Paper({
      title: req.file.originalname.replace('.pdf', ''),
      summary: aiResult.summary,
      citations: aiResult.citations || [],
      keywords: aiResult.keywords || [],
      methodology: aiResult.methodology,
      fileName: req.file.originalname,
      fileSize: req.file.size,
      fileData: req.file.buffer,
      uploadDate: new Date()
    });

    const savedPaper = await paper.save();
    console.log("Paper saved to database with ID:", savedPaper._id);

    // Prepare response (excluding file data for performance)
    const response = {
      id: savedPaper._id,
      title: savedPaper.title,
      summary: savedPaper.summary,
      citations: savedPaper.citations,
      keywords: savedPaper.keywords,
      methodology: savedPaper.methodology,
      uploadDate: savedPaper.uploadDate,
      fileSize: savedPaper.fileSize,
      fileName: savedPaper.fileName
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

export const getAllPapers = async (req: Request, res: Response): Promise<void> => {
  try {
    // Get papers without file data for performance
    const papers = await Paper.find({}, { fileData: 0 }).sort({ uploadDate: -1 });
    res.json(papers);
  } catch (error) {
    console.error("Error fetching papers:", error);
    res.status(500).json({ 
      error: "Failed to fetch papers",
      details: error instanceof Error ? error.message : "Unknown error"
    });
  }
};

export const getPaperById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const paper = await Paper.findById(id, { fileData: 0 });
    
    if (!paper) {
      res.status(404).json({ error: "Paper not found" });
      return;
    }
    
    res.json(paper);
  } catch (error) {
    console.error("Error fetching paper:", error);
    res.status(500).json({ 
      error: "Failed to fetch paper",
      details: error instanceof Error ? error.message : "Unknown error"
    });
  }
};

export const downloadPaper = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const paper = await Paper.findById(id);
    
    if (!paper) {
      res.status(404).json({ error: "Paper not found" });
      return;
    }
    
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="${paper.fileName}"`);
    res.send(paper.fileData);
  } catch (error) {
    console.error("Error downloading paper:", error);
    res.status(500).json({ 
      error: "Failed to download paper",
      details: error instanceof Error ? error.message : "Unknown error"
    });
  }
};
