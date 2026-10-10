import mongoose from "mongoose";

const programGitHubSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: [true, "User ID is required."], index: true },
    programId: { type: mongoose.Schema.Types.ObjectId, ref: "Program", required: [true, "Program ID is required."] },

    repositoryId: { type: String, required: [true, "GitHub repository ID is required."], trim: true },
    repositoryName: { type: String, required: [true, "GitHub repository name is required."], trim: true },
    repositoryUrl: { type: String, required: [true, "GitHub repository URL is required."], trim: true },

    branch: { type: String, required: [true, "GitHub branch is required."], trim: true, default: "main" },
    filePath: { type: String, required: [true, "GitHub file path is required."], trim: true },

    lastPushedFileSha: { type: String, default: null },
    lastCommitSha: { type: String, default: null },
    lastPushedAt: { type: Date, default: null },
  },
  { timestamps: true }
);

programGitHubSchema.index({ userId: 1, programId: 1 }, { unique: true });

programGitHubSchema.index({ userId: 1, repositoryId: 1 });

const ProgramGitHub = mongoose.model("ProgramGitHub", programGitHubSchema);

export default ProgramGitHub;