
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import paperRouter from "./routes/paperRoutes";

dotenv.config();
// console.log("Loaded GEMINI_API_KEY:", process.env.GEMINI_API_KEY); // <== Add this line

const app = express();
const PORT = process.env.PORT || 4000;

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
