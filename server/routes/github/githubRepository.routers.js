import { Router } from "express";
import { createGitHubRepository, getGitHubRepositories, getGitHubRepository } from "../../controllers/github/githubRepository.controller.js";
import { isAuthenticated } from "../../middleware/isAuthenticated.js";

const router = Router();

router.post("/repositories", isAuthenticated, createGitHubRepository);
router.get("/repositories", isAuthenticated, getGitHubRepositories);

export default router;