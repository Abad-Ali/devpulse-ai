import mongoose from "mongoose";

const githubRepositorySchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: [true, "User ID is required."], index: true },
    repositoryId: { type: String, required: [true, "GitHub repository ID is required."], trim: true },
    repositoryName: { type: String, required: [true, "GitHub repository name is required."], trim: true },
    fullName: { type: String, required: [true, "Repository full name is required."], trim: true },
    description: { type: String, trim: true, maxlength: [ 350, "Repository description cannot exceed 350 characters." ], default: "" },
    repositoryUrl: { type: String, required: [true, "GitHub repository URL is required."], trim: true,},
    visibility: { type: String, enum: { values: ["public", "private"], message: "Visibility must be public or private." }, required: [true, "Repository visibility is required."] },
    defaultBranch: { type: String, trim: true, default: "main" },
    githubRepoCreatedAt: { type: Date, default: null }
  },
  {
    timestamps: true,
  }
);

// Prevent duplicate records for the same user's GitHub repository.
githubRepositorySchema.index( { userId: 1, repositoryId: 1 }, { unique: true } );

// Efficiently fetch a user's repositories, newest first.
githubRepositorySchema.index({ userId: 1, createdAt: -1 });

const GitHubRepository = mongoose.model("GitHubRepository", githubRepositorySchema);

export default GitHubRepository;