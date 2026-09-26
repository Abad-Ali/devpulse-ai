import { connectGitHubService } from "../services/github.service.js";

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