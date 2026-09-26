import express from "express";
import { isAuthenticated } from "../middleware/isAuthenticated.js";


const router = express.Router();

// Connect GitHub
router.get("/connect", isAuthenticated, 
  (req, res) => {
    const params = new URLSearchParams({
      client_id: process.env.GITHUB_CLIENT_ID,
      redirect_uri:
        process.env.GITHUB_INTEGRATION_CALLBACK_URL,
      scope: "user:email repo offline_access",
    });

    return res.redirect(`https://github.com/login/oauth/authorize?${params.toString()}`);
  }
);


export default router;