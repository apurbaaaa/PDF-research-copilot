
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
  origin: "*", // Allow all origins (for testing only!)
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type"],
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
