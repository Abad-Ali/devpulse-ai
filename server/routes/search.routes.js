import express from "express";
import rateLimiter from "../middleware/rateLimiter.js";
import { searchPrograms, searchUsers } from "../controllers/search.controller.js";
import { isAuthenticated } from "../middleware/isAuthenticated.js";

const router = express.Router();
router.use(isAuthenticated);

router.get("/users", rateLimiter({ windowMs: 10 * 60 * 1000, limit: 100 }), searchUsers);
router.get("/programs", rateLimiter({ windowMs: 10 * 60 * 1000, limit: 100 }), searchPrograms);

export default router;