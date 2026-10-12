import { createGitHubRepositoryService } from "../../services/github/githubRepository.service.js";

export const createGitHubRepository =  async (req, res, next) => {
    try {
        const userId = req.user._id;
        const { name, description = "", visibility = "private" } = req.body;

        const repository = await createGitHubRepositoryService({ userId, name, description, visibility });

        return res.status(201).json({
            success: true,
            message: repository.readmeCreated ? "GitHub repository created successfully." : "GitHub repository created, but the README could not be added.",
            data: repository
        });
    } catch (error) {
        return next(error);
    }
};