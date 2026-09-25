import express from 'express';
import { getMe, login, logout, oauthCallback, register, resendVerification, resetPassword, sendResetPassword, verifyEmail } from '../controllers/auth.controller.js';
import { isAuthenticated } from '../middleware/isAuthenticated.js';
import passport from "passport";
import rateLimiter from '../middleware/rateLimiter.js';

const router = express.Router();

router.post("/register", rateLimiter({windowMs: 10* 60 * 1000, limit: 5}), register);
router.get("/verify-email", rateLimiter({windowMs: 10* 60 * 1000, limit: 10}), verifyEmail);
router.post("/resend-verification", rateLimiter({windowMs: 10* 60 * 1000, limit: 3}), resendVerification);
router.post("/login", rateLimiter({windowMs: 10* 60 * 1000, limit: 10}), login);
router.get("/me", rateLimiter({windowMs: 10* 60 * 1000, limit: 100}), isAuthenticated, getMe);
router.post("/logout", rateLimiter({windowMs: 10* 60 * 1000, limit: 20}),isAuthenticated, logout);

router.get(
  "/google",
  rateLimiter({windowMs: 10* 60 * 1000, limit: 10}),
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
  rateLimiter({windowMs: 10* 60 * 1000, limit: 10}),
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

router.post("/forgot-password", rateLimiter({windowMs: 10* 60 * 1000, limit: 3}), sendResetPassword);
router.post("/reset-password", rateLimiter({windowMs: 10* 60 * 1000, limit: 5}), resetPassword);

export default router;