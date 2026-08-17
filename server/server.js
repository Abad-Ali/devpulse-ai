import "dotenv/config";
import express from "express";
import connectDB from "./config/db.js";
import authRoutes from "./routes/auth.routes.js";
import { errorMiddleware } from "./middleware/error.middleware.js";
import cookieParser from "cookie-parser";
import passport from "./config/passport.js";

const PORT = process.env.PORT || 8000;
const app = express();

//middlerwares
app.use(express.json());
app.use(cookieParser());
app.use(passport.initialize());

app.get("/api/v1/health", (req, res) => {
  res.json({
    success: true,
    message: "DevPulse AI server is running...",
  });
});

// Routes
app.use("/api/v1/auth", authRoutes);

// Error handler
app.use(errorMiddleware);

const startServer = async () => {
  try {
    await connectDB();

    app.listen(PORT, () => {
      console.log(`DevPulse AI server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

startServer();