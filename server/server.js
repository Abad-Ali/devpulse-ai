import "dotenv/config";
import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/auth.routes.js";
import userRoutes from './routes/user.routes.js';
import programRoutes from './routes/program.routes.js';
import executionRoutes from './routes/execution.routes.js';
import dashboardRoutes from "./routes/dashboard.routes.js";
import searchRoutes from "./routes/search.routes.js";
import githubConnectionRoutes from "./routes/github/githubConnection.routers.js";
import githubRepositoryRoutes from "./routes/github/githubRepository.routers.js";
import { errorMiddleware } from "./middleware/error.middleware.js";
import cookieParser from "cookie-parser";
import passport from "./config/passport.js";

const PORT = process.env.PORT || 8000;
const app = express();

//middlerwares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const corsOptions = {
  origin: process.env.CLIENT_URL,
  credentials: true,
};
app.use(cors(corsOptions));
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
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/programs", programRoutes);
app.use("/api/v1/executions", executionRoutes);
app.use("/api/v1/dashboard", dashboardRoutes);
app.use("/api/v1/search", searchRoutes);
app.use("/api/v1/github", githubConnectionRoutes);
app.use("/api/v1/github", githubRepositoryRoutes);

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