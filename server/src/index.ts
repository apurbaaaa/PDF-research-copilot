
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import paperRouter from "./routes/paperRoutes";
import { connectDatabase } from "./utils/database";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

// Connect to MongoDB
connectDatabase();

// Middleware
app.use(cors({
  origin: [
    "http://localhost:5173",
    "http://localhost:8080", 
    "http://localhost:8081",
    "https://5e78060b-ef97-4163-b830-e50f772b324c.lovableproject.com",
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type"],
  credentials: true
}));

app.use(express.json());

// Routes
app.use("/api/papers", paperRouter);

// Health check route
app.get("/health", (req, res) => {
  res.json({ status: "OK", message: "Server is running" });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});