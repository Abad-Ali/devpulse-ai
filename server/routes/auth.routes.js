import express from 'express';
import { getMe, login, logout, oauthCallback, register, resendVerification, resetPassword, sendResetPassword, verifyEmail } from '../controllers/auth.controller.js';
import { isAuthenticated } from '../middleware/isAuthenticated.js';
import passport from "passport";

const router = express.Router();

router.post("/register", register);
router.get("/verify-email", verifyEmail);
router.post("/resend-verification", resendVerification);
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
  oauthCallback
);

router.get(
  "/github",
  passport.authenticate("github", {
    scope: ["user:email"],
  })
);
router.get(
  "/github/callback",
  passport.authenticate("github", {
    session: false,
  }),
  oauthCallback
);

router.post("/forgot-password", sendResetPassword);
router.post("/reset-password", resetPassword);

export default router;