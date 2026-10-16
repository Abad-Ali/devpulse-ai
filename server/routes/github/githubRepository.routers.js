import { Router } from "express";
import { createGitHubRepository, deleteGitHubRepository, getGitHubRepositories, getGitHubRepository, updateGitHubRepository } from "../../controllers/github/githubRepository.controller.js";
import { isAuthenticated } from "../../middleware/isAuthenticated.js";

const router = Router();

router.post("/repositories", isAuthenticated, createGitHubRepository);
router.get("/repositories", isAuthenticated, getGitHubRepositories);
router.get( "/repositories/:repositoryId", isAuthenticated, getGitHubRepository);
router.patch("/repositories/:repositoryId", isAuthenticated, updateGitHubRepository);
router.delete("/repositories/:repositoryId", isAuthenticated, deleteGitHubRepository);

export default router;