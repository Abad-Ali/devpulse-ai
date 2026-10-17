import { Router } from "express";
import { createGitHubRepository, deleteGitHubRepository, getGitHubRepositories, getGitHubRepository, updateGitHubRepository } from "../../controllers/github/githubRepository.controller.js";
import { isAuthenticated } from "../../middleware/isAuthenticated.js";
import rateLimiter from "../../middleware/rateLimiter.js";

const router = Router();

router.post("/repositories", rateLimiter({ windowMs: 10 * 60 * 1000, limit: 5 }), isAuthenticated, createGitHubRepository);
router.get("/repositories", rateLimiter({ windowMs: 10 * 60 * 1000, limit: 30 }), isAuthenticated, getGitHubRepositories);
router.get( "/repositories/:repositoryId", rateLimiter({ windowMs: 10 * 60 * 1000, limit: 30 }), isAuthenticated, getGitHubRepository);
router.patch("/repositories/:repositoryId", rateLimiter({ windowMs: 10 * 60 * 1000, limit: 10 }), isAuthenticated, updateGitHubRepository);
router.delete("/repositories/:repositoryId", rateLimiter({ windowMs: 10 * 60 * 1000, limit: 3 }), isAuthenticated, deleteGitHubRepository );

export default router;