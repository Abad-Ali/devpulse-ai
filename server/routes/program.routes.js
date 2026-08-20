import express from 'express';
import { isAuthenticated } from '../middleware/isAuthenticated.js';
import { createProgram, getMyPrograms, updateProgram } from '../controllers/program.controller.js';
import rateLimiter from '../middleware/rateLimiter.js';
import { getMyProgram } from '../controllers/user.controller.js';

const router = express.Router();
router.use(isAuthenticated);

router.post("/", rateLimiter({windowMs: 10* 60 * 1000, limit: 20}), createProgram);
router.get("/", rateLimiter({windowMs: 10 * 60 * 1000, limit: 100}), getMyPrograms);
router.get("/:programId", rateLimiter({windowMs: 10 * 60 * 1000, limit: 100}), getMyProgram);
router.patch("/:programId", rateLimiter({windowMs: 10 * 60 * 1000, limit: 50}), updateProgram);

export default router;