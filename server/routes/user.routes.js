import express from "express";
import { isAuthenticated } from "../middleware/isAuthenticated.js";
import { getMyProfile, setOrChangePassword, updateMyProfile } from "../controllers/user.controller.js";

const router = express.Router();

router.get("/me", isAuthenticated, getMyProfile);
router.patch("/me", isAuthenticated, updateMyProfile);
router.patch("/me/password", isAuthenticated, setOrChangePassword);

export default router;