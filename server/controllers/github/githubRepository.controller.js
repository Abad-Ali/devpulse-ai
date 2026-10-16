import { createGitHubRepositoryService, deleteGitHubRepositoryService, getGitHubRepositoriesService, getGitHubRepositoryService, updateGitHubRepositoryService } from "../../services/github/githubRepository.service.js";

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

export const updateGitHubRepository = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const { repositoryId } = req.params;
    const { name, description, visibility } = req.body;

    if (!userId) {
      const error = new Error("Authentication is required.");
      error.statusCode = 401;
      throw error;
    }

    const updatedRepository = await updateGitHubRepositoryService({ userId, repositoryId, name, description, visibility });

    return res.status(200).json({
      success: true,
      message: "GitHub repository updated successfully.",
      data: updatedRepository,
    });
  } catch (error) {
    return next(error);
  }
};

export const deleteGitHubRepository = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const { repositoryId } = req.params;
    const { deletionScope } = req.body;

    // Check whether the user is authenticated.
    if (!userId) {
      const error = new Error("Authentication is required.");
      error.statusCode = 401;
      throw error;
    }

    // Delete the repository using the requested scope.
    const result = await deleteGitHubRepositoryService({ userId, repositoryId, deletionScope });

    return res.status(200).json({
      success: true,
      message: result.message,
      data: result,
    });
  } catch (error) {
    return next(error);
  }
};