
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import paperRouter from "./routes/paperRoutes";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
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
