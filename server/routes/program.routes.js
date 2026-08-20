import express from 'express';
import { isAuthenticated } from '../middleware/isAuthenticated.js';
import { createProgram, getMyPrograms } from '../controllers/program.controller.js';
import rateLimiter from '../middleware/rateLimiter.js';

const router = express.Router();
router.use(isAuthenticated);

router.post("/", rateLimiter({windowMs: 10* 60 * 1000, limit: 20}), createProgram);
router.get("/", rateLimiter({windowMs: 10 * 60 * 1000, limit: 100}), getMyPrograms);

export default router;