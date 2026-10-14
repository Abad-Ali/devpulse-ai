import { createGitHubRepositoryService, getGitHubRepositoriesService, getGitHubRepositoryService } from "../../services/github/githubRepository.service.js";

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

export const getGitHubRepositories =  async (req, res, next) => {
    try {
        const userId = req.user._id;

        const repositories = await getGitHubRepositoriesService({ userId });

        return res.status(201).json({
            success: true,
            message: "GitHub repositories fetched successfully.", 
            count: repositories.length, 
            data: repositories
        });
    } catch (error) {
        return next(error);
    }
};

export const getGitHubRepository = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const { repositoryId } = req.params;

    const repository = await getGitHubRepositoryService({ userId, repositoryId });

    return res.status(200).json({
      success: true,
      message: "GitHub repository fetched successfully.",
      data: repository
    });
  } catch (error) {
    return next(error);
  }
};