import express from "express";
import dotenv from "dotenv";
import paperRouter from "./routes/paperRoutes";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use("/api/paper", paperRouter);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
