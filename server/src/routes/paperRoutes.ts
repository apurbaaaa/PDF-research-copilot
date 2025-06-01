import { Router } from "express";
import multer from "multer";
import { uploadAndProcessPDF } from "../controllers/paperController";

const router = Router();
const upload = multer({ dest: "src/uploads/" });

router.post("/upload", upload.single("file"), uploadAndProcessPDF);

export default router;
// This code sets up a route for uploading PDF files and processing them using the uploadAndProcessPDF controller function.
// It uses multer for handling file uploads and defines a POST route at "/upload" that expects a file with the field name "file".
// The uploaded files are stored in the "src/uploads/" directory.
// The uploadAndProcessPDF function is responsible for reading the uploaded PDF file, extracting its text content, and summarizing it.
// The summarized result is then returned as a JSON response.