import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import paperRoutes from "./routes/paperRoutes";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/papers", paperRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
