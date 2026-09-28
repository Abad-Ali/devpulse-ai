import axios from "axios";
import GitHubConnection from "../models/GitHubConnection.js";

// Connect GitHub Service
export const connectGitHubService = async ({ userId, code }) => {
  if (!userId || !code) {
    const error = new Error("User ID and GitHub authorization code are required.");
    error.statusCode = 400;
    throw error;
  }

  // Exchange authorization code for GitHub access token
  const tokenResponse = await axios.post("https://github.com/login/oauth/access_token", {
      client_id: process.env.GITHUB_CLIENT_ID,
      client_secret: process.env.GITHUB_CLIENT_SECRET,
      code,
      redirect_uri: process.env.GITHUB_INTEGRATION_CALLBACK_URL,
    },
    {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    },
  );

  const tokenData = tokenResponse.data;

  if (tokenData.error || !tokenData.access_token) {
    const error = new Error(tokenData.error_description || "Failed to connect GitHub account.");
    error.statusCode = 400;
    throw error;
  }

  // Get GitHub account information
  const githubResponse = await axios.get("https://api.github.com/user", {
      headers: {
        Accept: "application/vnd.github+json",
        Authorization: `Bearer ${tokenData.access_token}`,
        "X-GitHub-Api-Version": "2022-11-28",
      },
    },
  );

  const githubUser = githubResponse.data;

  if (!githubUser?.id || !githubUser?.login) {
    const error = new Error("Failed to retrieve GitHub account information.");
    error.statusCode = 400;
    throw error;
  }

  // Calculate access token expiry
  const accessTokenExpiresAt = new Date(Date.now() + tokenData.expires_in * 1000);

  // Calculate refresh token expiry
  const refreshTokenExpiresAt = new Date(Date.now() + tokenData.refresh_token_expires_in * 1000);

  // Save GitHub connection
  const connection = await GitHubConnection.findOneAndUpdate(
      { userId },
      {
        userId,

        githubUserId: String(githubUser.id),
        githubUsername: githubUser.login,
        githubAvatar: githubUser.avatar_url || "",

        accessToken: tokenData.access_token,
        accessTokenExpiresAt,

        refreshToken: tokenData.refresh_token,
        refreshTokenExpiresAt,

        isConnected: true,

        connectedAt: new Date(),
      },
      {
        new: true,
        upsert: true,
        runValidators: true,
        setDefaultsOnInsert: true,
      },
    );

  return connection;
};

// Get GitHub Status Service
export const getGitHubStatusService = async ( userId ) => {
  if (!userId) {
    const error = new Error("User ID is required.");
    error.statusCode = 400;
    throw error;
  }

  const connection = await GitHubConnection.findOne({ userId });

  if (!connection) {
    return null;
  }

  return {
    githubUserId: connection.githubUserId,
    githubUsername: connection.githubUsername,
    githubAvatar: connection.githubAvatar,
    isConnected: connection.isConnected,
    connectedAt: connection.connectedAt,
  };
};

// Deactivate GitHub Service
export const deactivateGitHubService = async ( userId ) => {
  if (!userId) {
    const error = new Error("User ID is required.");
    error.statusCode = 400;
    throw error;
  }

  const connection = await GitHubConnection.findOneAndUpdate(
      { userId },
      {
        isConnected: false,
      },
      {
        new: true,
      },
    );

  if (!connection) {
    const error = new Error("GitHub account is not connected.");
    error.statusCode = 404;
    throw error;
  }

  return connection;
};