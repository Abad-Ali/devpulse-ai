import express from "express";
import { isAuthenticated } from "../middleware/isAuthenticated.js";
import rateLimiter from "../middleware/rateLimiter.js";
import { createExecution, getMyExecutions } from "../controllers/execution.controller.js";

const router = express.Router();

router.use(isAuthenticated);

router.post("/", rateLimiter({windowMs: 10 * 60 * 1000, limit: 100}), createExecution);
router.get("/", rateLimiter({windowMs: 10 * 60 * 1000, limit: 100}), getMyExecutions);

export default router;