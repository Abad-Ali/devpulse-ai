import express from "express";
import dotenv from "dotenv";

dotenv.config();
const PORT = process.env.PORT || 8000;
const app = express();

app.get("/api/v1/health", (req, res) => {
  res.json({
    success: true,
    message: "DevPulse AI server is running...",
  });
});

app.listen(PORT, () => {
  console.log(`DevPulse AI server is running on port ${PORT}`);
})