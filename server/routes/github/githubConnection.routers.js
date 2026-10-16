import express from "express";
import { isAuthenticated } from "../../middleware/isAuthenticated.js";
import rateLimiter from "../../middleware/rateLimiter.js";
import { deactivateGitHub, getGitHubStatus, githubCallback, reconnectGitHub } from "../../controllers/github/githubConnection.controller.js";


const router = express.Router();

// Connect GitHub
router.get("/connect",rateLimiter({windowMs: 10 * 60 * 1000, limit: 10}), isAuthenticated, 
  (req, res) => {
    const params = new URLSearchParams({
      client_id: process.env.GITHUB_CLIENT_ID,
      redirect_uri:
        process.env.GITHUB_INTEGRATION_CALLBACK_URL,
      scope: "user:email repo delete_repo offline_access",
    });

    return res.redirect(`https://github.com/login/oauth/authorize?${params.toString()}`);
  }
);

router.get("/connect/callback", rateLimiter({windowMs: 10 * 60 * 1000, limit: 20}), isAuthenticated, githubCallback);
router.get("/status", rateLimiter({windowMs: 10 * 60 * 1000, limit: 100}), isAuthenticated, getGitHubStatus);
router.patch("/deactivate", rateLimiter({windowMs: 10 * 60 * 1000, limit: 5}), isAuthenticated, deactivateGitHub);
router.post( "/reconnect", rateLimiter({windowMs: 10 * 60 * 1000, limit: 5}), isAuthenticated, reconnectGitHub);

export default router;