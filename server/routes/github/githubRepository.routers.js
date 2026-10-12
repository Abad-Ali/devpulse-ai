import { Router } from "express";
import { createGitHubRepository } from "../../controllers/github/githubRepository.controller.js";
import { isAuthenticated } from "../../middleware/isAuthenticated.js";

const router = Router();

router.post("/repositories", isAuthenticated, createGitHubRepository);

export default router;