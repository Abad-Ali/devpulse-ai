import { connectGitHubService, getGitHubStatusService, deactivateGitHubService } from "../services/github.service.js";

// GitHub Callback
export const githubCallback = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { code } = req.query;

    if (!code) {
      const error = new Error("GitHub authorization code is missing.");
      error.statusCode = 400;
      throw error;
    }

    await connectGitHubService({userId, code});

    return res.redirect(`${process.env.CLIENT_URL}/github?connected=true`);
  } catch (error) {
    next(error);
  }
};

// Get GitHub Status
export const getGitHubStatus = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const connection = await getGitHubStatusService(userId);

    if (!connection) {
      return res.status(200).json({
        success: true,
        connected: false,
        data: null,
      });
    }

    return res.status(200).json({
      success: true,
      data: connection
    });
  } catch (error) {
    next(error);
  }
};