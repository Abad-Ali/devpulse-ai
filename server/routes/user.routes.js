import express from "express";
import { isAuthenticated } from "../middleware/isAuthenticated.js";
import { deleteAccount, getMyProfile, setOrChangePassword, updateMyProfile } from "../controllers/user.controller.js";
import rateLimiter from "../middleware/rateLimiter.js";

const router = express.Router();

router.get("/me", rateLimiter({windowMs: 10 * 60 * 1000, limit: 100}), isAuthenticated, getMyProfile);
router.patch("/me", rateLimiter({windowMs: 10 * 60 * 1000, limit: 20}), isAuthenticated, updateMyProfile);
router.patch("/me/password", rateLimiter({windowMs: 10 * 60 * 1000, limit: 5}), isAuthenticated, setOrChangePassword);
router.delete("/me/delete-account", rateLimiter({windowMs: 10 * 60 * 1000, limit: 3}), isAuthenticated, deleteAccount);

export default router;