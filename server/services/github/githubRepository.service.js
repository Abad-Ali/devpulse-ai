import axios from "axios";
import GitHubConnection from "../../models/github/GitHubConnection.js";
import buildDevPulseReadme from "../../templates/github/devPulseReadme.js";
import GitHubRepository from "../../models/github/GitHubRepository.js";
import mongoose from "mongoose";

const githubApi = axios.create({
  baseURL: "https://api.github.com",
  timeout: 15000,
  headers: {
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
  },
});

const getGitHubError = (error, fallbackMessage) => {
  const githubResponse = error.response?.data;

  const githubError = new Error(githubResponse?.errors?.[0]?.message || githubResponse?.message || (error.code === "ECONNABORTED" ? "GitHub API request timed out." : fallbackMessage));

  githubError.statusCode = error.response?.status || 502;
  githubError.details = githubResponse?.errors ?? null;

  return githubError;
};

export const createGitHubRepositoryService = async ({ userId, name, description = "", visibility = "private" }) => {
  if (!userId) {
    const error = new Error("User ID is required.");
    error.statusCode = 400;
    throw error;
  }
  if (typeof name !== "string" || !name.trim()) {
    const error = new Error("Repository name is required.");
    error.statusCode = 400;
    throw error;
  }

  if (name.trim().length > 100) {
    const error = new Error("Repository name cannot exceed 100 characters.");
    error.statusCode = 400;
    throw error;
  }

  if (typeof description !== "string" || description.length > 350) {
    const error = new Error("Description must be a string of at most 350 characters.");
    error.statusCode = 400;
    throw error;
  }

  if (!["public", "private"].includes(visibility)) {
    const error = new Error("Visibility must be public or private.");
    error.statusCode = 400;
    throw error;
  }

  // Get the user's connected GitHub account.
  const githubConnection = await GitHubConnection.findOne({ userId, isConnected: true }).select("+accessToken");
  if (!githubConnection?.accessToken) {
    const error = new Error("GitHub account is not connected.");
    error.statusCode = 400;
    throw error;
  }

  const authorizationHeaders = { Authorization: `Bearer ${githubConnection.accessToken}` };

  let repository;

  // Create the GitHub repository.
  try {
    const { data } = await githubApi.post("/user/repos", {
      name: name.trim(),
      description: description.trim(),
      private: visibility === "private",
      auto_init: true,
    },
      {
        headers: authorizationHeaders,
      }
    );

    repository = data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw getGitHubError(error, "Failed to create GitHub repository.");
    }

    throw error;
  }

  // Generate and add the DevPulse AI README.
  let readmeCreated = false;
  let readmeWarning = null;

  try {
    const readmeContent = buildDevPulseReadme({ repositoryName: repository.name, description: description.trim() });

    // Get the default README created by GitHub's auto_init.
    const { data: existingReadme } = await githubApi.get(`/repos/${repository.full_name}/contents/README.md`, {
      headers: authorizationHeaders,
    }
    );

    // Replace the default README with our custom template.
    await githubApi.put(`/repos/${repository.full_name}/contents/README.md`, {
      message: `chore: initialize ${repository.name}`,
      content: Buffer.from(readmeContent, "utf8").toString("base64"),
      sha: existingReadme.sha,
    },
      {
        headers: authorizationHeaders,
      }
    );

    readmeCreated = true;
  } catch (error) {
    // Repository creation succeeded, even if README setup failed.
    readmeWarning = axios.isAxiosError(error) ? error.response?.data?.message || (error.code === "ECONNABORTED" ? "The README request timed out." : "The repository was created, but the README could not be added.") : "The repository was created, but the README could not be added.";
  }

  // Save the created repository in MongoDB.
  let savedRepository;
  try {
    savedRepository = await GitHubRepository.create({
      userId,
      repositoryId: String(repository.id),
      repositoryName: repository.name,
      fullName: repository.full_name,
      description: repository.description || "",
      repositoryUrl: repository.html_url,
      visibility: repository.private ? "private" : "public",
      defaultBranch: repository.default_branch || "main",
      githubRepoCreatedAt: repository.created_at,
    });
  } catch (error) {
    // GitHub repository exists, but saving its record failed.
    error.statusCode = error.statusCode || 500;
    error.message = "GitHub repository was created, but saving it to DevPulse AI failed.";

    throw error;
  }

  // Return repository details and README status.
  return {
    repository: savedRepository,
    readmeCreated,
    readmeWarning,
  };
};

export const getGitHubRepositoriesService = async ({ userId }) => {
  if (!userId) {
    const error = new Error("User ID is required.");
    error.statusCode = 400;
    throw error;
  }
  if (!mongoose.isValidObjectId(userId)) {
    const error = new Error("Invalid user ID.");
    error.statusCode = 400;
    throw error;
  }

  const repositories = await GitHubRepository.find({ userId }).sort({ createdAt: -1 }).select("repositoryId repositoryName fullName description repositoryUrl visibility defaultBranch githubRepoCreatedAt createdAt updatedAt").lean();
  if (repositories.length === 0) {
    const error = new Error("No GitHub repositories found in database.");
    error.statusCode = 404;
    throw error;
  }

  return repositories;
};


export const getGitHubRepositoryService = async ({ userId, repositoryId }) => {
  if (!userId) {
    const error = new Error("User ID is required.");
    error.statusCode = 400;
    throw error;
  }
  if (!mongoose.isValidObjectId(userId)) {
    const error = new Error("Invalid user ID.");
    error.statusCode = 400;
    throw error;
  }
  if (typeof repositoryId !== "string" || !repositoryId.trim()) {
    const error = new Error("Repository ID is required.");
    error.statusCode = 400;
    throw error;
  }

  const repository = await GitHubRepository.findOne({ userId, repositoryId: repositoryId.trim() }).select("repositoryId repositoryName fullName description repositoryUrl visibility defaultBranch githubRepoCreatedAt createdAt updatedAt").lean();
  if (!repository) {
    const error = new Error("GitHub repository not found in database.");
    error.statusCode = 404;
    throw error;
  }

  return repository;
};

export const updateGitHubRepositoryService = async ({ userId, repositoryId, name, description, visibility }) => {
  if (!userId || !mongoose.isValidObjectId(userId)) {
    const error = new Error("A valid user ID is required.");
    error.statusCode = 400;
    throw error;
  }
  if (typeof repositoryId !== "string" || !repositoryId.trim()) {
    const error = new Error("Repository ID is required.");
    error.statusCode = 400;
    throw error;
  }

  const isNameProvided = name !== undefined;
  const isDescriptionProvided = description !== undefined;
  const isVisibilityProvided = visibility !== undefined;
  if (!isNameProvided && !isDescriptionProvided && !isVisibilityProvided) {
    const error = new Error("Provide at least one field to update.");
    error.statusCode = 400;
    throw error;
  }

  // Prepare the payload for GitHub's API
  const githubUpdatePayload = {};

  if (isNameProvided) {
    if (typeof name !== "string" || !name.trim()) {
      const error = new Error("Repository name must be a non-empty string.");
      error.statusCode = 400;
      throw error;
    }

    githubUpdatePayload.name = name.trim();
  }
  if (isDescriptionProvided) {
    if (typeof description !== "string") {
      const error = new Error("Repository description must be a string.");
      error.statusCode = 400;
      throw error;
    }

    if (description.length > 350) {
      const error = new Error("Repository description cannot exceed 350 characters.");
      error.statusCode = 400;
      throw error;
    }

    githubUpdatePayload.description = description;
  }
  if (isVisibilityProvided) {
    if (!["public", "private"].includes(visibility)) {
      const error = new Error("Visibility must be public or private.");
      error.statusCode = 400;
      throw error;
    }

    githubUpdatePayload.private = visibility === "private";
  }

  // Find the existing repository owned by the authenticated user
  const existingRepository = await GitHubRepository.findOne({ userId, repositoryId: repositoryId.trim() }).lean();
  if (!existingRepository) {
    const error = new Error("GitHub repository not found.");
    error.statusCode = 404;
    throw error;
  }

  // Check whether any submitted value has changed
  const isNameUnchanged = name === undefined || name.trim() === existingRepository.repositoryName;
  const isDescriptionUnchanged = description === undefined || description === existingRepository.description;
  const isVisibilityUnchanged = visibility === undefined || visibility === existingRepository.visibility;
  if (isNameUnchanged && isDescriptionUnchanged && isVisibilityUnchanged) {
    const error = new Error("No changes detected. Please provide a different name, description, or visibility.");
    error.statusCode = 400;
    throw error;
  }

  // Get the user's connected GitHub account and access token
  const githubConnection = await GitHubConnection.findOne({ userId, isConnected: true }).select("+accessToken");
  if (!githubConnection?.accessToken) {
    const error = new Error("Please connect your GitHub account first.");
    error.statusCode = 400;
    throw error;
  }

  // Get the repository owner's username and the current repository name
  const [repositoryOwner, currentRepositoryName] = existingRepository.fullName.split("/");
  if (!repositoryOwner || !currentRepositoryName) {
    const error = new Error("The saved GitHub repository details are invalid.");
    error.statusCode = 500;
    throw error;
  }

  let updatedGitHubRepository;

  // Update the repository on GitHub
  try {
    const githubResponse = await githubApi.patch(`/repos/${encodeURIComponent(repositoryOwner)}/${encodeURIComponent(currentRepositoryName)}`, githubUpdatePayload, {
        headers: {
          Authorization: `Bearer ${githubConnection.accessToken}`,
        },
      }
    );

    updatedGitHubRepository = githubResponse.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw getGitHubError(error, "Failed to update GitHub repository.");
    }

    throw error;
  }

  // Update the saved repository details in MongoDB
  const repositoryDetails = {
    repositoryName: updatedGitHubRepository.name,
    fullName: updatedGitHubRepository.full_name,
    description: updatedGitHubRepository.description || "",
    repositoryUrl: updatedGitHubRepository.html_url,
    visibility: updatedGitHubRepository.private ? "private" : "public",
    defaultBranch: updatedGitHubRepository.default_branch || existingRepository.defaultBranch || "main"
  };
  
  // updating the repo details in DB
  const updatedRepository = await GitHubRepository.findOneAndUpdate( { userId, repositoryId: String(updatedGitHubRepository.id) },
    { $set: repositoryDetails },
    { new: true, runValidators: true }
  ).select("repositoryId repositoryName fullName description repositoryUrl visibility defaultBranch githubRepoCreatedAt createdAt updatedAt").lean();
  
  if (!updatedRepository) {
    const error = new Error("Repository updated on GitHub, but failed to update it in the database.");
    error.statusCode = 500;
    error.githubUpdated = true;
    throw error;
  }
  
  return updatedRepository;
};