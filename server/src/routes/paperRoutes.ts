import { Router } from "express";
import multer from "multer";
import { 
  uploadAndProcessPDF, 
  getAllPapers, 
  getPaperById, 
  downloadPaper 
} from "../controllers/paperController";

const router = Router();

// Configure multer to store files in memory
const upload = multer({ 
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 50 * 1024 * 1024 // 50MB limit
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'application/pdf') {
      cb(null, true);
    } else {
      cb(new Error('Only PDF files are allowed'));
    }
  }
});

// Define routes (all are now fully valid in Express 5)
router.post("/upload", upload.single("file"), uploadAndProcessPDF);
router.get("/", getAllPapers);
router.get("/:id", getPaperById);
router.get("/:id/download", downloadPaper);

export default router;
