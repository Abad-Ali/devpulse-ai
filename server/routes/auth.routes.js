import express from 'express';
import { getMe, googleCallback, login, logout, register } from '../controllers/auth.controller.js';
import { isAuthenticated } from '../middleware/isAuthenticated.js';
import passport from "passport";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/me", isAuthenticated, getMe);
router.post("/logout", logout);

router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    session: false,
  }),
  googleCallback
);

export default router;