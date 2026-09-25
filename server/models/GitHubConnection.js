import mongoose from "mongoose";

const githubConnectionSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: [true, "User ID is required."], unique: true, index: true },
    githubUserId: { type: String, required: [true, "GitHub user ID is required."], trim: true },
    githubUsername: { type: String, required: [true, "GitHub username is required."], trim: true },
    githubAvatar: { type: String, trim: true, default: "" },
    accessToken: { type: String, required: [true, "GitHub access token is required."], select: false },
    accessTokenExpiresAt: { type: Date, required: [true, "GitHub access token expiry is required."], },
    refreshToken: { type: String, required: [true, "GitHub refresh token is required."], select: false },
    refreshTokenExpiresAt: { type: Date, required: [true, "GitHub refresh token expiry is required."] },
    isConnected: { type: Boolean, default: false },
    connectedAt: { type: Date, default: Date.now }
  },
  { timestamps: true }
);

const GitHubConnection = mongoose.model("GitHubConnection", githubConnectionSchema);

export default GitHubConnection;